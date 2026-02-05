import { Tool } from "@/data/tools";
import { ExternalLink, Tag } from "lucide-react";
import Link from "next/link";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {tool.name}
          </h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              tool.pricing === "Free"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : tool.pricing === "Paid"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            }`}
          >
            {tool.pricing}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
          {tool.description}
        </p>

        <div className="flex items-center gap-2 mt-auto text-sm text-gray-500 dark:text-gray-400">
          <Tag size={16} />
          <span>{tool.category}</span>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-80 transition-opacity font-medium text-sm"
        >
          Visit Website
          <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
}
