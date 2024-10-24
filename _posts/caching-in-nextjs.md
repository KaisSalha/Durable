---
title: "Caching in Next.js 14"
date: "2024-10-23"
excerpt: "Enhanced caching strategies for faster, more scalable web applications"
image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
---

Caching is essential for improving the performance of web applications by reducing server load and speeding up page delivery. Next.js 14 offers several caching mechanisms to help developers manage and optimize their applications effectively.

- **Static Generation with Revalidation**: Use `getStaticProps` with the `revalidate` option to keep static pages fresh. For example:

  ```js
  export async function getStaticProps() {
    const data = await fetchData();
    return { props: { data }, revalidate: 10 };
  }
  ```

  This allows static pages to be updated without a complete rebuild.

- **Server-Side Rendering with HTTP Caching**: Set cache headers in `getServerSideProps` to control caching behavior:

  ```js
  export async function getServerSideProps(context) {
    const res = await fetch("https://api.example.com/data");
    context.res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, stale-while-revalidate=30"
    );
    return { props: { data: await res.json() } };
  }
  ```

  This helps manage freshness and reduce server load.

- **Edge Caching with Middleware**: Use middleware for edge caching, enabling personalized yet fast responses:

  ```js
  import { NextResponse } from "next/server";
  export function middleware(request) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=3600");
    return response;
  }
  export const config = { matcher: "/api/:path*" };
  ```

- **Client-Side Caching with SWR**: Use SWR for client-side data fetching with automatic caching and revalidation:
  ```js
  import useSWR from "swr";
  const { data, error } = useSWR("/api/dashboard", (url) =>
    fetch(url).then((res) => res.json())
  );
  ```
  This makes client-side data fetching efficient and responsive.

By combining these caching strategies, you can deliver fast and scalable applications with up-to-date content and minimal latency.
