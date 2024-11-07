import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const adapter = PrismaAdapter(prisma)
