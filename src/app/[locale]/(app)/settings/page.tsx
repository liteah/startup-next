"use client"

import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AvatarUploadDialog } from "@/components/app/dialog/avatar-upload"
import { ConfirmDeletionDialog } from "@/components/app/dialog/confirm-deletion"
import { PasswordChangeDialog } from "@/components/app/dialog/password-change"
import SideNav, { type NavItem } from "@/components/layout/side-nav"

export default function SettingsPage() {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")

	const navItems: NavItem[] = [
		{ link: "#profile", name: "Profile" },
		{ link: "#security", name: "Security" },
		{ link: "#linked-accounts", name: "Linked Accounts" },
		{ link: "#danger-zone", name: "Danger Zone", isDanger: true },
	]

	useEffect(() => {
		async function getUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser()
			setUser(user)
			if (user) {
				setName(user.user_metadata.name || "")
				setEmail(user.email || "")
			}
			setLoading(false)
		}
		getUser()
	}, [])

	async function handleProfileUpdate() {
		try {
			const { error } = await supabase.auth.updateUser({
				email: email,
				data: { name: name },
			})
			if (error) throw error
			toast.success("Profile updated successfully")
		} catch (error) {
			toast.error("Failed to update profile")
		}
	}

	async function handleProviderLink(provider: "google" | "github") {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: provider,
				options: {
					redirectTo: `${window.location.origin}/settings`,
				},
			})
			if (error) throw error
		} catch (error) {
			toast.error(`Failed to link ${provider} account`)
		}
	}

	if (loading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<Loader2 className="mr-2 animate-spin" />
				<span>Loading...</span>
			</div>
		)
	}

	return (
		<div className="container mx-auto py-10">
			<h1 className="mb-8 text-3xl font-bold">Account Settings</h1>
			<div className="flex flex-col gap-8 lg:flex-row">
				<SideNav navItems={navItems} />
				<main className="space-y-6 lg:w-3/4">
					<Card id="profile">
						<CardHeader>
							<CardTitle>Profile</CardTitle>
							<CardDescription>Manage your account information</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="mb-4 flex items-center space-x-4">
								<Avatar className="h-20 w-20">
									<AvatarImage src={user?.user_metadata?.avatar_url} />
									<AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
								</Avatar>
								<AvatarUploadDialog
									onAvatarUpdate={(url: any) =>
										setUser({ ...user!, user_metadata: { ...user!.user_metadata, avatar_url: url } })
									}
								/>
							</div>
							<div className="space-y-4">
								<div>
									<Label htmlFor="name">Name</Label>
									<Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
								</div>
								<div>
									<Label htmlFor="email">Email</Label>
									<Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<Button onClick={handleProfileUpdate}>Update Profile</Button>
						</CardFooter>
					</Card>

					<Card id="security">
						<CardHeader>
							<CardTitle>Security</CardTitle>
							<CardDescription>Manage your password</CardDescription>
						</CardHeader>
						<CardContent>
							<PasswordChangeDialog hasPassword={!!user?.app_metadata?.provider} />
						</CardContent>
					</Card>

					<Card id="linked-accounts">
						<CardHeader>
							<CardTitle>Linked Accounts</CardTitle>
							<CardDescription>Manage your linked accounts</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-medium">Google</h3>
									<p className="text-sm text-muted-foreground">
										{user?.app_metadata?.providers?.includes("google") ? "Connected" : "Not connected"}
									</p>
								</div>
								<Button onClick={() => handleProviderLink("google")}>
									{user?.app_metadata?.providers?.includes("google") ? "Disconnect" : "Connect"}
								</Button>
							</div>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg font-medium">GitHub</h3>
									<p className="text-sm text-muted-foreground">
										{user?.app_metadata?.providers?.includes("github") ? "Connected" : "Not connected"}
									</p>
								</div>
								<Button onClick={() => handleProviderLink("github")}>
									{user?.app_metadata?.providers?.includes("github") ? "Disconnect" : "Connect"}
								</Button>
							</div>
						</CardContent>
					</Card>

					<Card id="danger-zone">
						<CardHeader>
							<CardTitle className="text-destructive">Danger Zone</CardTitle>
							<CardDescription className="text-destructive/75">Irreversible and destructive actions</CardDescription>
						</CardHeader>
						<CardContent>
							<ConfirmDeletionDialog />
						</CardContent>
					</Card>
				</main>
			</div>
		</div>
	)
}
