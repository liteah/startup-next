import { withContentCollections } from "@content-collections/next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "wx1.sinaimg.cn",
				port: "",
				pathname: "/mw2000/**",
			},
		],
	},
}

export default withContentCollections(withNextIntl(nextConfig))
