import Header from "@/components/header"

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="mx-auto flex w-full flex-1">{children}</main>
		</>
	)
}
