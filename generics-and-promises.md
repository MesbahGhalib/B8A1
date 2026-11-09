# Using Generics with Promises

## Introduction

Suppose a function returns the first item from an array. Writing separate functions for names and scores would repeat the same code. A generic function handles both while keeping its return type connected to the array's element type.

## Keeping the item type

Here is a function that works with different arrays:

```typescript
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
```

`T` represents the element type. Passing `["Rakib", "Sadia"]` makes it `string`; passing `[80, 95]` makes it `number`. TypeScript infers this from the argument. The return type includes `undefined` because an empty array has no first item. A caller must check for that before using a string or number method.

## Waiting for an array

The array may also come from a promise. We can keep the same type relationship after waiting for it.

```typescript
async function firstResult<T>(response: Promise<T[]>): Promise<T | undefined> {
  const items: T[] = await response;
  return firstItem(items);
}

async function readFirstName(): Promise<string | undefined> {
  return firstResult(Promise.resolve(["Rakib", "Sadia"]));
}
```

`Promise<T[]>` describes a promise that resolves to an array of `T`. After `await`, `items` has type `T[]`. In `readFirstName`, the resolved result is a string or `undefined`.

If the input promise rejects, `firstResult` rejects too. `Promise<T>` describes success values, not the rejection type. It also does not validate server data at runtime; that needs a separate check.

## Conclusion

Generics suit functions where the steps stay the same but the data type changes. With promises, they preserve the result type after `await`, including the possibility of an empty result.
