import { PrismaClient } from '@prisma/client'
import { promises as fs } from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  try {
    const dataFilePath = path.join(process.cwd(), 'data', 'tools.json')
    const data = await fs.readFile(dataFilePath, 'utf8')
    const tools = JSON.parse(data)

    console.log(`Start seeding ${tools.length} tools...`)

    for (const tool of tools) {
      // Check if tool already exists to avoid duplicates during re-runs
      const existing = await prisma.tool.findFirst({
        where: { name: tool.name }
      })

      if (!existing) {
        await prisma.tool.create({
          data: {
            name: tool.name,
            description: tool.description,
            category: tool.category,
            url: tool.url,
            pricing: tool.pricing,
            image: tool.image || undefined,
          }
        })
        console.log(`Created tool: ${tool.name}`)
      } else {
        console.log(`Skipping existing tool: ${tool.name}`)
      }
    }

    console.log('Seeding finished.')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
