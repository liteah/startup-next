import { updateUserGeneralSettings } from '@/actions/user'
import { updateWorkspaceSettings } from '@/actions/workspace'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Loader2, Upload, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'

interface UploadImageProps {
  mode?: 'avatar' | 'image'
  currentImage?: string
  fallback?: string
  maxSize?: number // in MB
  compress?: boolean
  onUploadComplete?: (url: string) => void
  onRemove?: () => void
  trigger?: React.ReactNode
}

export function UploadImage({
  mode = 'image',
  currentImage,
  fallback = 'U',
  maxSize = 2,
  compress = mode === 'avatar',
  onUploadComplete,
  onRemove,
  trigger,
}: UploadImageProps) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxSize: maxSize * 1024 * 1024,
    disabled: isUploading,
    onDropRejected: () => {
      toast.error(t('upload.error.size', { size: maxSize }))
    },
    onDrop: async (files) => {
      if (files.length === 0)
        return

      setIsUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('compress', compress.toString())

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const result = await response.json()

        if (result.success && result.url) {
          if (mode === 'avatar') {
            const updateResult = await updateUserGeneralSettings({ avatar: result.url })
            if (!updateResult.success)
              throw new Error(updateResult.error)
          }
          onUploadComplete?.(result.url)
          setOpen(false)
          toast.success(t('upload.success'))
        }
        else {
          throw new Error(result.error)
        }
      }
      catch (error) {
        toast.error((error as Error).message)
      }
      finally {
        setIsUploading(false)
      }
    },
  })

  const handleRemove = async () => {
    try {
      if (mode === 'avatar') {
        await updateUserGeneralSettings({ avatar: '' })
      }
      onRemove?.()
      toast.success(t('upload.removed'))
    }
    catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {mode === 'avatar'
        ? (
            <div className="relative group cursor-pointer">
              <Avatar className="size-20" onClick={() => setOpen(true)}>
                <AvatarImage src={currentImage} />
                <AvatarFallback>{fallback}</AvatarFallback>
                <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="size-6 text-white" />
                </div>
              </Avatar>
              {currentImage && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 size-6 rounded-full"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )
        : (
            trigger
          )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('upload.title')}</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors',
            isDragActive && 'border-primary bg-primary/10',
            isUploading && 'pointer-events-none opacity-50',
          )}
        >
          <input {...getInputProps()} />
          {isUploading
            ? <Loader2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-spin" />
            : <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />}
          <p className="text-sm text-muted-foreground">
            {isUploading
              ? t('upload.uploading')
              : isDragActive
                ? t('upload.drop')
                : t('upload.drag')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
