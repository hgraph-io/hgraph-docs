---
sidebar_position: 5
---

# GraphQL Subscriptions

The Hgraph SDK includes built-in GraphQL subscription management capabilities, simplifying the process of handling and interacting with subscriptions. This feature encapsulates all active subscriptions and their lifecycle control within the `Client`. WebSockets are utilized by the GraphQL API to enable subscriptions.

## Key Features

- The `subscribe` and `patchedSubscribe` methods return an immutable `ObservableSubscription` object.
- `ObservableSubscription` serves as both a subscription identifier and contains an `unsubscribe` method.
- `Client` methods for subscription management:
  ```typescript title="Typescript"
  removeSubscription: (subscription: ObservableSubscription) => void
  removeAllSubscriptions: () => void
  getSubscriptions: () => ObservableSubscription[]
  ```
## Example Usage

### Creating a Subscription:

```typescript title="Typescript"
import Client, { Network, Environment, ObservableSubscription } from '@hgraph.io/sdk';
const hg = new Client({
  network: Network.HederaMainnet,
  environment: Environment.Production,
});
const transactionSubscription: ObservableSubscription = hg.subscribe({
  query: `
  subscription LastTransaction {
    transaction(limit: 1, order_by: {consensus_timestamp: desc}) {
      id
      consensus_timestamp
    }
  }`
}, {
  next: (data) => {
    console.log(data);
  },
  error: (errors) => {
    console.error('LastTransaction subscription closed with errors:', errors);
  },
  complete: () => {
    console.log("LastTransaction subscription complete");
  }
});
```

### Unsubscribing from an Active Subscription

Using the subscription object:
```typescript title="Typescript"
transactionSubscription.unsubscribe();
```
Or using the client method:
```typescript title="Typescript"
hg.removeSubscription(transactionSubscription);
```
> Attempting to unsubscribe from an already completed subscription will raise an exception to prevent unwanted side effects.

### Unsubscribing from All Active Subscriptions

```typescript title="Typescript"
hg.removeAllSubscriptions();
```
> When unsubscribing (by any method), the `complete` subscription handler is called.

### Retrieving All Active Subscriptions

```typescript title="Typescript"
const subscriptions: ObservableSubscription[] = hg.getSubscriptions();
```

## patchedSubscribe Method

The `patchedSubscribe` method extends the functionality of the existing `subscribe` method by providing detailed patches indicating changes in data. These patches follow the [RFC6902](https://datatracker.ietf.org/doc/html/rfc6902) standard, with operations such as "add", "remove", and "replace". This allows developers to precisely understand the modifications in the updated data, making it especially useful for scenarios like tracking ownership transfers of NFTs.


### Patch Operation Structure:

```typescript title="Typescript"
interface PatchOperation {
  op: 'add' | 'remove' | 'replace';
  path: string;
  value: any;
}
```

- `op`: Indicates the type of operation performed.
- `path`: A JSON Pointer string that specifies the location in the data where the operation is performed. JSON Pointers are defined in [RFC6901](https://datatracker.ietf.org/doc/html/rfc6901).
- `value`: The value associated with the operation. For `add` and `replace` operations, this is the new value being added or replacing the old value. For `remove` operations, this is the value being removed.

### Example Usage

When a change occurs, the method generates patches that describe the exact differences between the previous and current states. Here is a basic example demonstrating the usage of `patchedSubscribe`:

```typescript title="Typescript"
import Client, { Network, Environment } from '@hgraph.io/sdk';

const hg = new Client({
  network: Network.HederaTestnet,
  environment: Environment.Production,
});

const observableSpender = "12345678";

hg.patchedSubscribe({
  query: `
  subscription GetNFTs($spender: bigint!) {
    nft(where: { spender: { _eq: $spender } }) {
      token_id
      serial_number
      metadata
    }
  }`,
  variables: {
    spender: observableSpender
  }
}, {
  next: (data, patches) => {
    patches.forEach(patch => {
      switch (patch.op) {
        case 'add':
          console.log("New NFT grant rights to spender:", patch.value);
          break;
        case 'remove':
          console.log("NFT owner revoked rights:", patch.value);
          break;
        case 'replace':
          console.log(`NFT data replaced at path: ${patch.path}, replaced value:`, patch.value);
          break;
      }
    });
  },
  error: (err) => {
    console.error(err);
  },
  complete: () => {
    console.log("Subscription complete");
  }
});
```

> In this example, the `patchedSubscribe` method is used to subscribe to NFTs based on a spender. The `next` handler processes the patches to determine what NFTs has been added, removed or what data in NFT replaced.