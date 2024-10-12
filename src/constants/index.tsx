import { Rocket } from "lucide-react"

const appConfig = {
	name: "NitroStart",
	logo: <Rocket />,
	domain: "https://starter.conova.tech",
	useI18n: false,
	canonical: false,
	header: {
		showLanguage: true,
		showTheme: true,
		links: [
			{
				code: "blog",
				label: "Blog",
				href: "/blog",
			},
			{
				code: "pricing",
				label: "Pricing",
				href: "/pricing",
			},
		],
	},
	pages: {
		home: {
			hero: {
				badge: {
					emoji: "🚀",
					label: "Introducing Nitro Start, Help You Ship In 1 Day",
					labelCode: "badge.label",
					link: "/blog/introducing-nitrostart",
				},
				slogan: "Let you ship faster, earn faster",
				sloganCode: "slogan",
				description: "A powerful starter kit for build your web SaaS with Next.js, Shadcn/UI and more.",
				descriptionCode: "description",
				cta: {
					label: "Get Started for Free",
					labelCode: "cta.label",
					link: "/docs",
					showDescription: true,
					description: "7 days free trial for Pro. No credit card required.",
					descriptionCode: "cta.description",
				},
				image: "",
				avatars: {
					urls: [
						"https://wx1.sinaimg.cn/mw2000/62a3cab1ly8gvvv400jwbj20ru0ruwfs.jpg",
						"https://wx1.sinaimg.cn/mw2000/62a3cab1ly8gl5bi57qiqj20ru0ruta0.jpg",
						"https://wx4.sinaimg.cn/mw690/005PO4XTgy1htw7b8wwmmj31401z47pm.jpg",
						"https://wx2.sinaimg.cn/mw690/006YEDE5gy1hpti2nkuu1j30u00ywq4q.jpg",
						"https://wx2.sinaimg.cn/mw2000/62a3cab1ly1hrthv07twwj22gw1n97wh.jpg",
						"https://wx1.sinaimg.cn/mw2000/62a3cab1ly8gzgm99gtguj20u00u0n1p.jpg",
						"https://wx3.sinaimg.cn/mw2000/008D1RUQly8hstg4qb6tkj30go0gon0p.jpg",
					],
					description: "Trusted by 100+ delighted users",
					descriptionCode: "avatars",
				},
				rating: 4.6,
				demo: {
					light: "https://wx1.sinaimg.cn/mw2000/62a3cab1gy1hug1i6xc0qj21900u0tf0.jpg",
					dark: "https://wx1.sinaimg.cn/mw2000/62a3cab1gy1hug1i6xc0qj21900u0tf0.jpg",
				},
				logo: {
					label: "TECHNOLOGY STACK YOU ARE FAMILIAR WITH",
					labelCode: "logo.label",
					src: [
						<span key="react">React</span>,
						<span key="next">Next.js</span>,
						<span key="shadcn">Shadcn/UI</span>,
						<span key="tailwind">TailwindCSS</span>,
						<span key="framer">Framer Motion</span>,
						<span key="supabase">Supabase</span>,
						<span key="auth">NextAuth</span>,
						<span key="vercel">Vercel</span>,
						<span key="typescript">TypeScript</span>,
						<span key="stripe">Stripe</span>,
						<span key="lemon">Lemon Squeezy</span>,
					],
				},
			},
			section: [
				{
					headline: "Features",
					title: "What we offer",
					headlineCode: "features.headline",
					titleCode: "features.title",
				},
			],
			cta: {
				icon: <Rocket />,
				title: "Ship more, earn more today",
				titleCode: "cta.title",
				description: "Start your 7-day free trial today and see how NitroStart can help you ship your product faster.",
				descriptionCode: "cta.description",
				link: "/signup",
				button: "Get Started for Free",
				buttonCode: "cta.button",
			}
		},
	},
}

export default appConfig
