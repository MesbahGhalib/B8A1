# Type Narrowing in TypeScript

## Introduction

A price might arrive as a number or as text. We cannot call a number method on both. Type narrowing means checking a value so TypeScript can work out which type it has in that part of the code.

## Checking primitive values

The `typeof` operator checks primitive types. In this function, a string gets trimmed, while a number gets two decimal places.

```typescript
function formatPrice(value: string | number): string {
  if (typeof value === "string") {
    return value.trim();
  }

  return value.toFixed(2);
}
```

After the string branch returns, TypeScript knows that the remaining value is a number. That makes `toFixed()` safe to call.

## Checking objects

With `instanceof`, we can check for a class instance. Here, an `Error` has a `message` property, but a string can be returned directly.

```typescript
function failureMessage(failure: Error | string): string {
  if (failure instanceof Error) {
    return failure.message;
  }

  return failure;
}
```

The `in` operator checks for a property. A delivery has either a tracking number or a pickup point, so checking `trackingId` tells us which field to read.

```typescript
type Delivery = { trackingId: string } | { pickupPoint: string };

function deliveryLabel(delivery: Delivery): string {
  if ("trackingId" in delivery) {
    return delivery.trackingId;
  }

  return delivery.pickupPoint;
}
```

This check includes inherited properties. Optional properties need more care: a missing property does not necessarily rule out a type that declares it as optional.

## Conclusion

Narrowing lets a function handle different inputs without guessing their types. The checks do not change the value; they help TypeScript understand it before a method or property is used.
