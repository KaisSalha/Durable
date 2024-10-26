import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "_posts");

export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	content: string;
	image: string;
	readingTime: string;
}

export function getAllPosts(): Post[] {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}

	const fileNames = fs.readdirSync(postsDirectory);
	const posts = fileNames
		.filter((fileName) => fileName.endsWith(".md"))
		.map((fileName) => {
			const slug = fileName.replace(/\.md$/, "");
			const fullPath = path.join(postsDirectory, fileName);
			const fileContents = fs.readFileSync(fullPath, "utf8");
			const { data, content } = matter(fileContents);
			const wordCount = content.split(/\s+/).length;
			const readingTime = Math.ceil(wordCount / 200);

			return {
				slug,
				title: data.title,
				date: data.date,
				excerpt: data.excerpt,
				content,
				image: data.image,
				readingTime: `${readingTime}`,
			};
		})
		.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));

	return posts;
}

export function getPostBySlug(slug: string): Post | null {
	if (!fs.existsSync(postsDirectory)) {
		return null;
	}

	const fullPath = path.join(postsDirectory, `${slug}.md`);

	if (!fs.existsSync(fullPath)) {
		return null;
	}

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);
	const wordCount = content.split(/\s+/).length;
	const readingTime = Math.ceil(wordCount / 200);

	return {
		slug,
		title: data.title,
		date: data.date,
		excerpt: data.excerpt || "",
		content,
		image: data.image,
		readingTime: `${readingTime}`,
	};
}

export function getRelatedPosts(currentSlug: string, limit = 6): Post[] {
	const allPosts = getAllPosts();
	return allPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}
