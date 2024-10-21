import { allPosts } from "content-collections"
import { getLocale, getTranslations } from "next-intl/server"

import BlurFade from "@/components/magicui/blur-fade"
import { PostListItem } from "@/components/content/post-list"
import SectionTitle from "@/components/marketing/section-title"

export async function generateMetadata() {
	const t = await getTranslations("pages")
	return {
		title: t("blog.title"),
	}
}

export default async function BlogListPage() {
	const locale = await getLocale()
	const t = await getTranslations()

	return (
		<div className="container flex max-w-6xl flex-col gap-10 pb-16 pt-32">
			<BlurFade delay={0.15} inView className="flex flex-col items-center justify-center gap-4">
				<SectionTitle headline={t("blog.headline")} title={t("blog.title")} />
				<p className="text-muted-foreground">{t("blog.description")}</p>
			</BlurFade>

			<div className="grid gap-8 md:grid-cols-2">
				{allPosts
					.filter((post) => post.published && locale === post.locale)
					.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
					.map((post, index) => (
						<BlurFade key={post.path} inView delay={0.25 * index}>
							<PostListItem post={post} />
						</BlurFade>
					))}
			</div>
		</div>
	)
}
