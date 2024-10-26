import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import fs from "fs";
import path from "path";

vi.mock("fs");
vi.mock("path");

const mockFileContent = `---
title: "Test Post"
date: "2024-03-24"
excerpt: "Test excerpt"
image: "https://example.com/image.jpg"
---
Test content`;

describe("Blog Utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.existsSync).mockReturnValue(true);

    // Mock readdirSync to return an array of file names (strings)
    vi.mocked(fs.readdirSync).mockReturnValue([
      "test-post.md",
    ] as unknown as fs.Dirent[]);

    vi.mocked(fs.readFileSync).mockReturnValue(mockFileContent);
    vi.mocked(path.join).mockImplementation((...args) => args.join("/"));
  });

  describe("getAllPosts", () => {
    it("returns all posts sorted by date", () => {
      const posts = getAllPosts();
      expect(posts).toHaveLength(1);
      expect(posts[0]).toMatchObject({
        slug: "test-post",
        title: "Test Post",
        date: "2024-03-24",
      });
    });

    it("returns empty array when posts directory does not exist", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const posts = getAllPosts();
      expect(posts).toHaveLength(0);
    });
  });

  describe("getPostBySlug", () => {
    it("returns post data for valid slug", () => {
      const post = getPostBySlug("test-post");
      expect(post).toMatchObject({
        slug: "test-post",
        title: "Test Post",
        date: "2024-03-24",
      });
    });

    it("returns null for invalid slug", () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);
      const post = getPostBySlug("invalid-slug");
      expect(post).toBeNull();
    });
  });

  describe("getRelatedPosts", () => {
    it("returns related posts excluding current post", () => {
      const relatedPosts = getRelatedPosts("test-post");
      expect(relatedPosts).toHaveLength(0);
    });

    it("limits number of related posts", () => {
      vi.mocked(fs.readdirSync).mockReturnValue([
        "post1.md",
        "post2.md",
        "post3.md",
        "post4.md",
      ] as unknown as fs.Dirent[]);
      const relatedPosts = getRelatedPosts("post1", 2);
      expect(relatedPosts).toHaveLength(2);
    });
  });
});
