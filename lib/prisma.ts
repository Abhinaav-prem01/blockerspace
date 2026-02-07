import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient | undefined

export function getPrisma() {
  if (!prisma) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set')
    }
    prisma = new PrismaClient()
  }
  return prisma
}
