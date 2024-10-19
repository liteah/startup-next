"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import constant from "@/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { GoogleLogoIcon } from "@/components/icons/google-logo"

interface AuthCardProps {
	type: "login" | "signup" | "forgot-password"
}

export default function AuthCard({ type }: AuthCardProps) {
	const formSchema = z.object({
		email: z.string().email({
			message: "Please enter a valid email address.",
		}),
		password:
			type !== "forgot-password"
				? z.string().min(6, {
						message: "Password must be at least 6 characters.",
					})
				: z.string().optional(),
	})

	const [showPassword, setShowPassword] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true)
		try {
			let error
			if (type === "login") {
				if (typeof values.password === "string") {
					const { error: signInError } = await supabase.auth.signInWithPassword({
						email: values.email,
						password: values.password,
					})
					error = signInError
				} else {
					throw new Error("Password is required for login")
				}
			} else if (type === "signup") {
				if (typeof values.password === "string") {
					const { error: signUpError } = await supabase.auth.signUp({
						email: values.email,
						password: values.password,
					})
					error = signUpError
				} else {
					throw new Error("Password is required for signup")
				}
			} else if (type === "forgot-password") {
				const { error: resetError } = await supabase.auth.resetPasswordForEmail(values.email)
				error = resetError
			}
			if (error) throw error
			if (type === "forgot-password") {
				toast.success("Password Reset Email Sent", {
					description: "Please check your email for further instructions.",
				})
			} else {
				router.push("/")
				toast.success(type === "login" ? "Login Success" : "Sign Up Success", {
					description:
						type === "login"
							? `Welcome back to ${constant.name}!`
							: `Welcome to ${constant.name}! Please check your email to verify your account.`,
				})
			}
		} catch (error: any) {
			console.error(`${type === "login" ? "Login" : type === "signup" ? "Sign Up" : "Password Reset"} failed:`, error)
			toast.error(`${type === "login" ? "Login" : type === "signup" ? "Sign Up" : "Password Reset"} Failed`, {
				description: error.message || `Please check your ${type === "login" ? "email and password" : "information"}`,
			})
		} finally {
			setIsLoading(false)
		}
	}

	async function signInWithOAuth(provider: "google" | "github") {
		setIsLoading(true)
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
		} finally {
			setIsLoading(false)
		}
	}

	const title =
		type === "login" ? `Welcome back to ${constant.name}` : type === "signup" ? "Create an account" : "Forgot Password?"
	const description =
		type === "login"
			? "Sign in to your account to continue"
			: type === "signup"
				? `Sign up to get started with ${constant.name}`
				: "Please enter your email address to reset your password."
	const buttonText = type === "login" ? "Sign in" : type === "signup" ? "Create account" : "Reset Password"

	return (
		<Card className="w-[350px] sm:w-[400px] md:w-[450px]">
			<CardHeader>
				<CardTitle className="text-left text-2xl font-semibold">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				{type !== "forgot-password" && (
					<div className="space-y-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<Button
								variant="outline"
								className="w-full"
								onClick={() => signInWithOAuth("google")}
								disabled={isLoading}
							>
								<GoogleLogoIcon className="h-4 w-4" />
								Continue with Google
							</Button>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => signInWithOAuth("github")}
								disabled={isLoading}
							>
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
				)}
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
						{type !== "forgot-password" && (
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
						)}
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? (
								<>
									<LoaderCircleIcon className="size-4 animate-spin" />
								</>
							) : (
								buttonText
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter className="flex flex-col items-center space-y-2">
				<div className="text-sm text-muted-foreground">
					{type === "signup"
						? "Already have an account?"
						: type === "login"
							? "Don't have an account?"
							: "Remember your password?"}{" "}
					<Link
						href={type === "signup" ? "/login" : type === "login" ? "/signup" : "/login"}
						className="text-primary hover:underline"
					>
						{type === "signup" ? "Sign in" : type === "login" ? "Sign up" : "Sign in"}
					</Link>
				</div>
				{type !== "forgot-password" && (
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
				)}
			</CardFooter>
		</Card>
	)
}
