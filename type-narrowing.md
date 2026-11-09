# Type Narrowing: Checking a Value Before Using It

## Introduction

A union type gives a variable several possible types. Before calling a method that belongs to just one of them, we need evidence about the current value. Type narrowing lets TypeScript use our checks to identify which operations are safe.

## Checking primitive values

The `typeof` operator works well for strings, numbers, and booleans. Here, the string branch permits `toUpperCase()`. After that branch returns, the remaining value must be a number.

```typescript
function formatPrice(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toFixed(2);
}
```

## Checking objects

For class instances, `instanceof` checks the constructor's prototype against the object's prototype chain. An error message can therefore come from either an `Error` instance or a plain string.

```typescript
function failureMessage(failure: Error | string): string {
  if (failure instanceof Error) {
    return failure.message;
  }

  return failure;
}
```

The `in` operator checks whether a property exists, including inherited properties. It helps distinguish objects with different required fields. Optional fields can occur on both sides of this check, so they need more care.

```typescript
type Delivery = { trackingId: string } | { pickupPoint: string };

function deliveryLabel(delivery: Delivery): string {
  if ("trackingId" in delivery) {
    return delivery.trackingId;
  }

  return delivery.pickupPoint;
}
```

These checks guide TypeScript's analysis of each branch; they do not convert the value. See the [TypeScript narrowing guide](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

## Conclusion

Choose a check that matches the data: `typeof` for primitives, `instanceof` for class instances, and `in` for object properties.
