import { useEffect, useState } from "react"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ConfirmDeletionDialog() {
	const [isOpen, setIsOpen] = useState(false)
	const [confirmation, setConfirmation] = useState("")
	const [isConfirmed, setIsConfirmed] = useState(false)

	useEffect(() => {
		setIsConfirmed(confirmation.toLowerCase() === "yes")
	}, [confirmation])

	const handleDelete = async () => {
		try {
			const { error } = await supabase.rpc("delete_user")
			if (error) throw error
			await supabase.auth.signOut()
			toast.success("Account deleted successfully")
		} catch (error) {
			toast.error("Failed to delete account", {
				description: error instanceof Error ? error.message : String(error),
			})
		}
		setIsOpen(false)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete Account</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
				</DialogHeader>
				<p>
					This action cannot be undone. This will permanently delete your account and remove your data from our servers.
				</p>
				<Label htmlFor="confirmation">{`Type "YES" to confirm:`}</Label>
				<Input
					id="confirmation"
					value={confirmation}
					onChange={(e) => setConfirmation(e.target.value)}
					placeholder="Type YES"
				/>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={handleDelete} disabled={!isConfirmed}>
						I understand, delete my account
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
