import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/utils/blog";
import { formatDate } from "@/lib/date";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <h1 className="text-6xl font-bold mb-16 md:text-7xl">Posts</h1>
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
              <div className="h-full overflow-hidden border border-border bg-white/5 rounded-none transition-colors hover:bg-card/5 rounded-t-2xl">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex h-[240px] flex-col p-6">
                  <h2 className="text-2xl font-semibold group-hover:text-primary/80 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-muted-foreground flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <time>{formatDate(post.date)}</time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
