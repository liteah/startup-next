import { MDXContent } from "@content-collections/mdx/react"
import { allDocsPages } from "content-collections"
import { getLocale } from "next-intl/server"

import { getActivePathFromUrlParam } from "@/lib/content"
import { mdxComponents } from "@/components/content/mdx-components"
import { TableOfContents } from "@/components/content/table-of-contents"
import { redirect } from "@/app/navigation"

type Params = {
	path: string | string[]
}

export default async function DocsPage({ params: { path } }: { params: Params }) {
	const activePath = getActivePathFromUrlParam(path)
	const locale = await getLocale()

	const page = allDocsPages
		.filter((page) => page.path === activePath)
		.sort((page) => (page.locale === locale ? -1 : 1))[0]

	if (!page) {
		redirect("/")
	}

	const { title, subtitle, body, toc } = page

	return (
		<div>
			<div className="mb-8">
				<h1 className="text-4xl font-bold">{title}</h1>

				{subtitle && <p className="mt-3 text-2xl text-foreground/60">{subtitle}</p>}
			</div>

			<div className="flex flex-col gap-6 lg:flex-row-reverse">
				{toc.length > 0 && <TableOfContents items={toc} />}
				<div className="flex-1 pb-8">
					<MDXContent code={body} components={mdxComponents} />
				</div>
			</div>
		</div>
	)
}
