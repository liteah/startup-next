import { uploadToR2 } from '@/actions/upload'
import { config } from '@/modules/auth'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(config)
    if (!session?.user?.id)
      throw new Error('Unauthorized')

    const formData = await request.formData()
    const file = formData.get('file') as File
    const compress = formData.get('compress') === 'true'

    if (!file)
      throw new Error('No file provided')

    const result = await uploadToR2(file, { compress })

    if (!result.success)
      throw new Error(result.error)

    return NextResponse.json(result)
  }
  catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 },
    )
  }
}
