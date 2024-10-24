---
title: "Generating TypeScript types for environment variables"
date: "2024-10-21"
excerpt: "A type-safe approach to handling environment variables in TypeScript projects."
image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
---

Environment variables are a crucial part of any application, but they can be a source of runtime errors if not handled properly. Let's explore how to make them type-safe.

## The Problem

```typescript
// This could fail at runtime
const apiKey = process.env.API_KEY;
```

## The Solution

Create a schema for your environment variables:

```typescript
import { z } from "zod";

const envSchema = z.object({
  API_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  PORT: z.string().transform(Number),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
```

Now TypeScript will help you catch errors before they happen!
