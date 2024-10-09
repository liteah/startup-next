import { Rocket } from "lucide-react"

const appConfig = {
	name: "Next Starter",
	logo: <Rocket />,
	domain: "https://starter.conova.tech",
	canonical: false,
	header: {
		showLanguage: true,
		showTheme: true,
		links: [
			{
				code: "blog",
				href: "/blog",
			},
			{
				code: "pricing",
				href: "/pricing",
			},
		],
	},
}

export default appConfig
