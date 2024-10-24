import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/utils/blog";
import { formatDate } from "@/lib/date";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(params.slug);

  return (
    <article className="flex-1">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">{post.title}</h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <time>{formatDate(post.date)}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="relative w-full mt-6 mb-12">
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 relative">
          <div className="relative -mx-8 aspect-[2/1] overflow-hidden rounded-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>
      </div>

      {relatedPosts.length > 0 && (
        <div className="border-t border-border mt-16">
          <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16">
            <h2 className="text-2xl font-semibold mb-8">MORE POSTS</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {relatedPosts.slice(0, 4).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex h-32 bg-card hover:bg-card/80 transition-colors rounded-lg overflow-hidden border border-border shadow-md"
                >
                  <div className="relative w-32 flex-none overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-4">
                    <h3 className="text-lg font-medium group-hover:text-primary/80 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
