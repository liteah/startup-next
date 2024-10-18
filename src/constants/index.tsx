import { Rocket } from "lucide-react"

const appConfig = {
	name: "NitroStart",
	logo: <Rocket />,
	domain: "https://starter.conova.tech",
	useI18n: false,
	canonical: false,
	header: {
		showLanguage: false,
		showTheme: false,
		showAuth: true,
		links: [
			{
				code: "home",
				label: "Home",
				href: "/",
			},
			{
				code: "features",
				label: "Features",
				href: "/features",
			},
			{
				code: "pricing",
				label: "Pricing",
				href: "/pricing",
			},
		],
	},
	footer: {
		links: [
			{
				group: "Product",
				code: "product",
				list: [
					{
						code: "product.features",
						label: "Features",
						href: "/features",
					},
					{
						code: "product.pricing",
						label: "Pricing",
						href: "/pricing",
					},
					{
						code: "product.changelog",
						label: "Changelog",
						href: "/changelog",
					},
					{
						code: "product.roadmap",
						label: "Roadmap",
						href: "/roadmap",
					},
				],
			},
			{
				group: "Resources",
				code: "resources",
				list: [
					{
						code: "resources.blog",
						label: "Blog",
						href: "/blog",
					},
					{
						code: "resources.docs",
						label: "Docs",
						href: "/docs",
					},
				],
			},
			{
				group: "Legal",
				code: "legal",
				list: [
					{
						code: "legal.terms",
						label: "Terms of Service",
						href: "/terms",
					},
					{
						code: "legal.privacy",
						label: "Privacy Policy",
						href: "/privacy",
					},
				],
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
				{
					headline: "Features 2",
					title: "What we offer 2",
					headlineCode: "features.headline",
					titleCode: "features.title",
				},
			],
			testimonial: {
				headline: "Testimonial",
				title: "What our users say",
				headlineCode: "testimonial.headline",
				titleCode: "testimonial.title",
			},
			faq: {
				headline: "FAQ",
				title: "Frequently Asked Questions",
				headlineCode: "faq.headline",
				titleCode: "faq.title",
				list: [
					{
						question: "What is NitroStart?",
						answer: "NitroStart is a powerful starter kit for build your web SaaS with Next.js, Shadcn/UI and more.",
					},
					{
						question: "What is NitroStart?",
						answer: "NitroStart is a powerful starter kit for build your web SaaS with Next.js, Shadcn/UI and more.",
					},
					{
						question: "What is NitroStart?",
						answer: "NitroStart is a powerful starter kit for build your web SaaS with Next.js, Shadcn/UI and more.",
					},
				],
			},
		},
	},
	email: {
		support: "support@conova.tech",
	},
	pricing: {
		yearlySave: "-20%",
		plans: [
			{
				name: "Starter",
				description: "For users who want to get started with a simple and affordable plan.",
				descriptionCode: "plans.starter.description",
				popluar: false,
				price: {
					yearly: 29,
					monthly: 35,
				},
				features: [
					"Unlimited placeholder text",
					"Consectetur adipiscing elit",
					"Excepteur sint occaecat cupidatat",
					"Officia deserunt mollit anim",
				],
			},
			{
				name: "Pro",
				description: "For users who want to get started with a simple and affordable plan.",
				descriptionCode: "plans.pro.description",
				popluar: true,
				price: {
					yearly: 49,
					monthly: 55,
				},
				features: [
					"Unlimited placeholder text",
					"Consectetur adipiscing elit",
					"Excepteur sint occaecat cupidatat",
					"Officia deserunt mollit anim",
				],
			},
			{
				name: "Enterprise",
				description: "For users who want to get started with a simple and affordable plan.",
				descriptionCode: "plans.enterprise.description",
				popluar: false,
				price: {
					yearly: 99,
					monthly: 110,
				},
				features: [
					"Unlimited placeholder text",
					"Consectetur adipiscing elit",
					"Excepteur sint occaecat cupidatat",
					"Officia deserunt mollit anim",
				],
			},
		],
	},
}

export default appConfig
