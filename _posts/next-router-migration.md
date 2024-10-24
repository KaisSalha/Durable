---
title: "'next/router' to 'next/navigation' migration cheatsheet"
date: "2024-10-22"
excerpt: "Wrote down the sheet I wish I had."
image: "https://images.unsplash.com/photo-1618335829737-2228915674e0?q=80&w=2070&auto=format&fit=crop"
---

When migrating from `next/router` to `next/navigation`, there are several key differences to keep in mind. Here's a quick cheatsheet to help you navigate the changes.

## Router Methods

### Old Way (next/router)

```javascript
import { useRouter } from "next/router";

const router = useRouter();
router.push("/dashboard");
router.replace("/login");
router.back();
```

### New Way (next/navigation)

```javascript
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/dashboard");
router.replace("/login");
router.back();
```

## Query Parameters

The biggest change is how query parameters are handled:

### Old Way

```javascript
const { query } = useRouter();
const { id } = query;
```

### New Way

```javascript
const searchParams = useSearchParams();
const id = searchParams.get("id");
```

Remember to update your dependencies and test thoroughly after migration!
