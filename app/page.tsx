import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
	const posts = getAllPosts();
	const featuredPost = posts[0];
	const remainingPosts = posts.slice(1);

	return (
		<main className='flex-1'>
			<div className='mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 md:py-24'>
				<div className='mb-16 md:mb-24'>
					<h1 className='text-4xl font-bold mb-6 md:text-6xl lg:text-7xl'>
						Insights on Modern
						<span className='block text-primary/80'>
							Web Development
						</span>
					</h1>
					<p className='text-lg text-muted-foreground md:text-xl max-w-2xl'>
						Exploring the latest in web development, from React and
						Next.js to performance optimization and best practices.
					</p>
				</div>

				{featuredPost && (
					<div className='mb-16 md:mb-24'>
						<h2 className='text-lg font-semibold mb-8 text-primary/80'>
							FEATURED POST
						</h2>
						<Link
							href={`/blog/${featuredPost.slug}`}
							className='group'
							aria-label={`Read more about ${featuredPost.title}`}
						>
							<div className='grid gap-8 md:grid-cols-2'>
								<div className='relative aspect-[4/3] overflow-hidden rounded-2xl'>
									<Image
										src={featuredPost.image}
										alt={featuredPost.title}
										fill
										className='object-cover transition-transform duration-300 group-hover:scale-105'
										priority
									/>
								</div>
								<div className='flex flex-col justify-center'>
									<h3 className='text-2xl font-semibold mb-4 group-hover:text-primary/80 transition-colors md:text-3xl'>
										{featuredPost.title}
									</h3>
									<p className='text-muted-foreground mb-4'>
										{featuredPost.excerpt}
									</p>
									<div className='flex items-center gap-2 text-sm text-muted-foreground'>
										<time>
											{formatDate(featuredPost.date)}
										</time>
										<span>•</span>
										<span>
											{featuredPost.readingTime} min read
										</span>
									</div>
								</div>
							</div>
						</Link>
					</div>
				)}

				<div>
					<h2 className='text-lg font-semibold mb-8 text-primary/80'>
						ALL POSTS
					</h2>
					<div className='grid gap-8 sm:grid-cols-2'>
						{[...remainingPosts, featuredPost].map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								aria-label={`Read more about ${post.title}`}
							>
								<Card className='h-full overflow-hidden group'>
									<div className='relative aspect-[4/3] overflow-hidden'>
										<Image
											src={post.image}
											alt={post.title}
											fill
											className='object-cover transition-transform duration-300 group-hover:scale-105'
										/>
									</div>
									<CardContent className='flex flex-col h-[240px] p-4'>
										<h3 className='text-xl font-semibold mb-2 group-hover:text-primary/80 transition-colors line-clamp-2'>
											{post.title}
										</h3>
										<p className='text-muted-foreground line-clamp-2'>
											{post.excerpt}
										</p>
										<CardFooter className='px-0 mt-auto'>
											<div className='flex items-center gap-2 text-sm text-muted-foreground'>
												<time>
													{formatDate(post.date)}
												</time>
												<span>•</span>
												<span>
													{post.readingTime} min read
												</span>
											</div>
										</CardFooter>
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
