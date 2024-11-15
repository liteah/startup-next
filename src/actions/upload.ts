/* eslint-disable node/prefer-global/process */
/* eslint-disable node/prefer-global/buffer */
import { s3 } from '@/lib/s3'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import Sharp from 'sharp'

interface UploadOptions {
  compress?: boolean
  maxWidth?: number
  maxHeight?: number
}

export async function uploadToR2(
  file: File,
  options: UploadOptions = {},
) {
  try {
    const bytes = await file.arrayBuffer()
    let processedBuffer: Buffer | ArrayBuffer = bytes

    if (options.compress) {
      processedBuffer = await Sharp(Buffer.from(bytes))
        .resize(options.maxWidth || 400, options.maxHeight || 400, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 70 })
        .toBuffer()
    }

    const key = `${Date.now()}-${file.name}`
    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(processedBuffer),
      ContentType: file.type,
    })

    await s3.send(command)
    const url = `${process.env.R2_PUBLIC_URL}/${key}`

    return { success: true, url }
  }
  catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
