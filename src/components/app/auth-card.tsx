"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import constant from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { GoogleLogoIcon } from "@/components/icons/google-logo"

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
})

interface AuthCardProps {
	type: "login" | "signup"
}

export default function AuthCard({ type }: AuthCardProps) {
	const [showPassword, setShowPassword] = React.useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			let error
			if (type === "login") {
				const { error: signInError } = await supabase.auth.signInWithPassword({
					email: values.email,
					password: values.password,
				})
				error = signInError
			} else {
				const { error: signUpError } = await supabase.auth.signUp({
					email: values.email,
					password: values.password,
				})
				error = signUpError
			}
			if (error) throw error
			router.push("/")
			toast.success(
				type === "login" ? "Login Success" : "Sign Up Success",
				{
					description:
						type === "login"
							? `Welcome back to ${constant.name}!`
							: `Welcome to ${constant.name}! Please check your email to verify your account.`,
				},
			)
		} catch (error: any) {
			console.error(`${type === "login" ? "Login" : "Sign Up"} failed:`, error)
			toast.error(
				`${type === "login" ? "Login" : "Sign Up"} Failed`,
				{
					description: error.message || `Please check your ${type === "login" ? "email and password" : "information"}`,
				},
			)
		}
	}

	async function signInWithOAuth(provider: "google" | "github") {
		try {
			const { error } = await supabase.auth.signInWithOAuth({
				provider: provider,
			})
			if (error) throw error
			router.push("/")
		} catch (error: any) {
			console.error("OAuth Login Failed:", error)
			toast.error("Login Failed", {
				description: error.message || `${provider} Login Failed, please try again later`,
			})
		}
	}

	const title = type === "login" ? `Welcome back to ${constant.name}` : "Create an account"
	const description =
		type === "login" ? "Sign in to your account to continue" : `Sign up to get started with ${constant.name}`
	const buttonText = type === "login" ? "Sign in" : "Create account"

	return (
		<Card className="w-[350px] sm:w-[400px] md:w-[450px]">
			<CardHeader>
				<CardTitle className="text-left text-2xl font-semibold">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<Button variant="outline" className="w-full" onClick={() => signInWithOAuth("google")}>
							<GoogleLogoIcon className="h-4 w-4" />
							Continue with Google
						</Button>
						<Button variant="outline" className="w-full" onClick={() => signInWithOAuth("github")}>
							<GitHubLogoIcon className="h-4 w-4" />
							Continue with GitHub
						</Button>
					</div>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<Separator />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
						</div>
					</div>
				</div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="your@email.com" {...field} />
									</FormControl>
									<FormMessage className="text-red-500 dark:text-red-400" />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									{type === "login" && (
										<div className="flex items-center justify-between">
											<FormLabel>Password</FormLabel>
											<Link href="/forgot-password" className="text-sm text-primary hover:underline">
												Forgot password?
											</Link>
										</div>
									)}
									{type === "signup" && <FormLabel>Password</FormLabel>}
									<FormControl>
										<div className="relative">
											<Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
											<Button
												type="button"
												variant="ghost"
												size="sm"
												className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
												onClick={() => setShowPassword(!showPassword)}
											>
												{showPassword ? (
													<EyeOffIcon className="h-4 w-4 text-gray-500" />
												) : (
													<EyeIcon className="h-4 w-4 text-gray-500" />
												)}
											</Button>
										</div>
									</FormControl>
									<FormMessage className="text-red-500 dark:text-red-400" />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							{buttonText}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center space-y-2">
				<div className="text-sm text-muted-foreground">
					{type === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
					<Link href={type === "signup" ? "/login" : "/signup"} className="text-primary hover:underline">
						{type === "signup" ? "Sign up" : "Login"}
					</Link>
				</div>
				<p className="text-center text-xs text-muted-foreground">
					By continuing, you agree to our{" "}
					<Link href="/terms" className="underline">
						terms of service
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="underline">
						privacy policy
					</Link>
					.
				</p>
			</CardFooter>
		</Card>
	)
}
