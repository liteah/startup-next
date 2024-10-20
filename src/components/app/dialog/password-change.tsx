import { useState } from "react"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PasswordChangeDialog({ hasPassword }: { hasPassword: boolean }) {
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const handlePasswordChange = async () => {
		if (newPassword !== confirmPassword) {
			toast.error("New passwords do not match")
			return
		}

		const { error } = await supabase.auth.updateUser({
			password: newPassword,
		})

		if (error) {
			toast.error("Failed to update password", {
				description: error.message,
			})
		} else {
			toast.success("Password updated successfully")
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Change Password</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Change Password</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					{hasPassword && (
						<>
							<Label htmlFor="currentPassword">Current Password</Label>
							<Input
								id="currentPassword"
								type="password"
								value={currentPassword}
								onChange={(e) => setCurrentPassword(e.target.value)}
							/>
						</>
					)}
					<Label htmlFor="newPassword">New Password</Label>
					<Input
						id="newPassword"
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
					<Label htmlFor="confirmPassword">Confirm New Password</Label>
					<Input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<Button onClick={handlePasswordChange}>Update Password</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
