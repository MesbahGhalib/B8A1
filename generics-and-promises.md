# Keeping Response Types with Generics and Promises

## Introduction

A helper that handles several kinds of data should preserve the type it receives. Generics let us express that relationship once. A type parameter such as `T` represents a type chosen for a particular call.

## Carrying a type through a function

This helper wraps a value in an object without losing its type.

```typescript
function wrapValue<T>(value: T): { data: T } {
  return { data: value };
}

const wrappedScore = wrapValue(92);
const wrappedName = wrapValue("Nadia");
```

TypeScript infers `number` for the first call and `string` for the second. Consequently, `wrappedScore.data.toFixed(1)` is valid, while `wrappedName.data.toFixed(1)` is rejected. Inside the helper, operations must be valid for every allowed `T`. A constraint can limit those possibilities when specific properties are required. The [generics guide](https://www.typescriptlang.org/docs/handbook/2/generics.html) explains inference and constraints.

## Preserving asynchronous results

The same relationship applies when a value arrives later.

```typescript
async function wrapResponse<T>(response: Promise<T>): Promise<{ data: T }> {
  const data: T = await response;
  return { data };
}

async function readScore(): Promise<number> {
  const result = await wrapResponse(Promise.resolve(92));
  return result.data;
}
```

`Promise<T>` describes the fulfillment value. Awaiting the response exposes `T`, and the wrapper preserves it inside `data`. Async return annotations use `Promise`, as shown in the [function return type documentation](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#return-type-annotations).

A rejected input also rejects `wrapResponse`; its type parameter does not specify an error type. Generics provide compile-time checks, not runtime validation. Data from a server still needs checking before it can be trusted as a declared type.

## Conclusion

Generics connect inputs and outputs. Combining them with promises keeps that connection through an asynchronous operation, so callers can use the resolved data correctly.
