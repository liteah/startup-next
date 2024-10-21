import type { PropsWithChildren } from "react"
import { allDocsMetas, allDocsPages } from "content-collections"
import { getLocale } from "next-intl/server"

import { getContentStructure } from "@/lib/content"
import { ContentMenu } from "@/components/content/menu"

export default async function DocsLayout({
	children,
	params: { path },
}: PropsWithChildren<{ params: { path: string | string[] } }>) {
	const locale = await getLocale()

	const activePath = Array.isArray(path) ? path.join("/") : path || ""

	const contentStructure = getContentStructure({
		documents: allDocsPages,
		meta: allDocsMetas,
		locale,
	})

	return (
		<div className="container pb-24 pt-32">
			<div className="grid grid-cols-1 gap-8 md:grid-cols-[200px_auto]">
				<ContentMenu items={contentStructure} activePath={activePath} />

				<div>{children}</div>
			</div>
		</div>
	)
}
