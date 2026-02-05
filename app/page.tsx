import { ToolCard } from "@/components/ToolCard";
import { Plus } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ClientSearch from "./client-search";

// Helper to get tools server-side
async function getTools() {
  const tools = await prisma.tool.findMany({
    orderBy: { createdAt: "desc" },
  });
  return tools;
}

export const dynamic = "force-dynamic"; // Ensure fresh data on every request

export default async function Home() {
  const tools = await getTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));

  return (
    <main className="min-h-screen p-8 md:p-24 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              AI Tools Directory
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Discover the best AI tools to supercharge your workflow.
            </p>
          </div>
          
          <Link
            href="/submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            <Plus size={20} />
            Submit Tool
          </Link>
        </div>

        <ClientSearch tools={tools} categories={categories} />
      </div>
    </main>
  );
}
