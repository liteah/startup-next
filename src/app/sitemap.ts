import type { MetadataRoute } from "next"
import { languages } from "@/i18n"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

	const routes = ["", "/blog", "/docs"]

	const locales = languages.map((lang) => lang.lang)

	const localizedUrls = locales.flatMap((locale) =>
		routes.map((route) => ({
			url: locale === "en" ? `${baseUrl}${route}` : `${baseUrl}/${locale}${route}`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 0.7,
		})),
	)

	// 添加其他动态生成的URL
	// 例如: 博客文章、文档页面等
	// const dynamicUrls = [
	//   // 这里可以添加动态生成的URL
	//   // 例如从数据库或API获取的博客文章URL
	// ];

	// return [...localizedUrls, ...dynamicUrls];
	return [...localizedUrls]
}
