import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextReveal } from "@/components/magicui/text-reveal";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <AuroraText className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              PDF Intelligence
            </AuroraText>
            
             <div  className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-4 text-gray-800 dark:text-gray-200"> Unlock the Power of Your <LineShadowText
              className="text-3xl sm:text-4xl lg:text-5xl font-medium mt-4 text-blue-800 dark:text-gray-200"
              shadowColor="#0070F3"
            >Documents
            </LineShadowText></div>
          </div>

          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transform your PDFs into actionable insights. Analyze, summarize,
            and extract information with advanced AI technology.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="/upload"
              className="rounded-full bg-blue-600 px-8 py-4 text-white font-medium text-lg hover:bg-blue-700 transition-colors"
            >
              Try it Now
            </a>
            <a
              href="#features"
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-8 py-4 font-medium text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div
          id="features"
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Summaries</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get concise summaries of lengthy documents in seconds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Extract key insights and patterns from your documents.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
              <svg
                className="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find exactly what you need with AI-powered search.
            </p>
          </div>
        </div>

        {/* Scroll Text Section */}
        <div className="mt-32">
          <TextReveal>
            Transform your document workflow with our powerful AI tools. Save
            time, gain insights, and make better decisions.
          </TextReveal>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 PDF Intelligence. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
