export interface Post {
	slug: string
	title: string
	content: string
	excerpt: string
	publishDate: string
	modifiedDate?: string
	coverImage?: string
	tags: string[]
	category: string
}
