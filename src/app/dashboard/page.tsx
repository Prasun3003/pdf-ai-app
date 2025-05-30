"use client";

import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome back, {user?.firstName || "User"}!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your PDF documents and analysis here
          </p>
        </div>

        {/* Upload Section */}
        <div className="mt-8 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 mb-4 rounded-xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Upload PDF
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Drag and drop your PDF file here, or click to select
            </p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Select File
            </button>
          </div>
        </div>

        {/* Recent Documents */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Empty state */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 text-center">
                No documents yet. Upload your first PDF to get started!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
