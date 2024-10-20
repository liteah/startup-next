"use client"

import { useState } from "react"
import { toast } from "sonner"

import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CropImageDialog } from "@/components/app/dialog/crop-image"

export function AvatarUploadDialog({ onAvatarUpdate }: { onAvatarUpdate: (url: string) => void }) {
	const [file, setFile] = useState<File | null>(null)
	const [croppedImage, setCroppedImage] = useState<Blob | null>(null)
	const [isCropDialogOpen, setIsCropDialogOpen] = useState(false)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0]
		if (selectedFile) {
			setFile(selectedFile)
			setIsCropDialogOpen(true)
		}
	}

	const handleCrop = (croppedImageBlob: Blob | null) => {
		setCroppedImage(croppedImageBlob)
	}

	const handleUpload = async () => {
		if (!croppedImage) return

		const file = new File([croppedImage], "avatar.png", { type: "image/png" })

		const {
			data: { user },
		} = await supabase.auth.getUser()

		if (!user) {
			toast.error("User not authenticated")
			return
		}

		const filePath = `${user.id}/avatar.png`

		const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, {
			upsert: true,
		})

		if (error) {
			toast.error("Failed to upload avatar", {
				description: error.message,
			})
			return
		}

		const {
			data: { publicUrl },
		} = supabase.storage.from("avatars").getPublicUrl(filePath)

		const { error: updateError } = await supabase.auth.updateUser({
			data: { avatar_url: publicUrl },
		})

		if (updateError) {
			toast.error("Failed to update user avatar", {
				description: updateError.message,
			})
			return
		}

		onAvatarUpdate(publicUrl)
		toast.success("Avatar updated successfully")
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Change Avatar</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Upload Avatar</DialogTitle>
				</DialogHeader>
				<div className="space-y-4">
					<Label htmlFor="avatar">Select an image</Label>
					<Input id="avatar" type="file" accept="image/*" onChange={handleFileChange} />
					{croppedImage && (
						<div className="mt-4">
							<img
								src={URL.createObjectURL(croppedImage)}
								alt="Cropped preview"
								className="h-32 w-32 rounded-full object-cover"
							/>
						</div>
					)}
					<Button onClick={handleUpload} disabled={!croppedImage}>
						Upload
					</Button>
				</div>
			</DialogContent>
			<CropImageDialog image={file} open={isCropDialogOpen} onOpenChange={setIsCropDialogOpen} onCrop={handleCrop} />
		</Dialog>
	)
}
