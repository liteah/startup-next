import { defineCollection, defineConfig } from "@content-collections/core"
import { compileMDX } from "@content-collections/mdx"
import rehypeShiki from "@shikijs/rehype"
// @ts-expect-error the markdown-toc package does not have types
import markdownToc from "markdown-toc"
import rehypeImgSize from "rehype-img-size"
import { z } from "zod"

import { slugifyHeadline } from "@/lib/content"

function sanitizePath(path: string) {
	return path
		.replace(/(\.[a-zA-Z\\-]{2,5})$/, "")
		.replace(/^\//, "")
		.replace(/\/$/, "")
		.replace(/index$/, "")
}

function getLocaleFromFilePath(path: string) {
	return path.match(/(\.[a-zA-Z\\-]{2,5})+\.(md|mdx|json)$/)?.[1]?.replace(".", "") ?? "en"
}

const posts = defineCollection({
	name: "posts",
	directory: "./src/contents/posts",
	include: "**/*.{mdx,md}",
	schema: (z) => ({
		title: z.string(),
		date: z.string(),
		image: z.string().optional(),
		authorName: z.string(),
		authorImage: z.string().optional(),
		authorLink: z.string().optional(),
		excerpt: z.string().optional(),
		tags: z.array(z.string()),
		published: z.boolean(),
	}),
	transform: async (document, context) => {
		const body = await compileMDX(context, document, {
			rehypePlugins: [
				[
					rehypeShiki,
					{
						theme: "nord",
					},
				],
			],
		})

		return {
			...document,
			body,
			locale: getLocaleFromFilePath(document._meta.filePath),
			path: sanitizePath(document._meta.path),
		}
	},
})

const legalPages = defineCollection({
	name: "legalPages",
	directory: "contents/legal",
	include: "**/*.{mdx,md}",
	schema: (z) => ({
		title: z.string(),
	}),
	transform: async (document, context) => {
		const body = await compileMDX(context, document)

		return {
			...document,
			body,
			locale: getLocaleFromFilePath(document._meta.filePath),
			path: sanitizePath(document._meta.path),
		}
	},
})

const docsPages = defineCollection({
	name: "docsPages",
	directory: "contents/docs",
	include: "**/*.{mdx,md}",
	schema: (z) => ({
		title: z.string(),
		subtitle: z.string().optional(),
	}),
	transform: async (document, context) => {
		const body = await compileMDX(context, document, {
			rehypePlugins: [
				[
					rehypeShiki,
					{
						theme: "nord",
					},
				],
				[rehypeImgSize, { dir: "public" }],
			],
		})

		const toc = markdownToc(document.content, { slugify: slugifyHeadline }).json as {
			content: string
			slug: string
			lvl: number
		}[]

		return {
			...document,
			body,
			locale: getLocaleFromFilePath(document._meta.filePath),
			path: sanitizePath(document._meta.path),
			toc,
		}
	},
})

const docsMeta = defineCollection({
	name: "docsMeta",
	directory: "contents/docs",
	include: "**/*.json",
	parser: "json",
	schema: () => ({
		items: z.record(
			z.union([
				z.string(),
				z.object({
					title: z.string(),
				}),
			]),
		),
	}),
	transform: async (document) => {
		return {
			data: document.items,
			path: document._meta.path.split("/").slice(0, -1).join("/"),
			locale: getLocaleFromFilePath(document._meta.filePath),
		}
	},
})

export default defineConfig({
	collections: [posts, legalPages, docsPages, docsMeta],
})
