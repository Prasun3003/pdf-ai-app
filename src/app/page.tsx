import Image from "next/image";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
import { TextReveal } from "@/components/magicui/text-reveal";
import { FeatureCarousel } from "@/components/feature-carousel";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ShineBorder } from "@/components/magicui/shine-border";
import { GeminiSection } from "@/components/magicui/gemini-section";
import { PricingSection } from "@/components/pricing-section";
import Link from "next/link";

// Mock images for the carousel (we'll replace these with actual feature screenshots)
const mockFeatureImages = {
  step1light1: "/features/upload.png",
  step1light2: "/features/analyze.png",
  step2light1: "/features/summary.png",
  step2light2: "/features/insights.png",
  step3light: "/features/search.png",
  step4light: "/features/export.png",
  alt: "PDF Intelligence Features",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-black">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          <div className="relative inline-flex">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <AnimatedShinyText className="text-sm font-medium">
                Powered by AI
              </AnimatedShinyText>
            </div>
            <ShineBorder
              borderWidth={1}
              duration={4}
              shineColor={["#3b82f6", "#60a5fa", "#93c5fd"]}
              className="rounded-full"
            />
          </div>

          <div className="space-y-4">
            <AuroraText className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
              PDF Intelligence
            </AuroraText>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">
              Unlock the Power of Your{" "}
              <LineShadowText shadowColor="#0070F3">Documents</LineShadowText>
            </h2>
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

        {/* Gemini Effect Section */}
        <div className="w-full">
          <GeminiSection />
        </div>

        {/* Interactive Feature Showcase */}
        <div className="mt-32">
          <FeatureCarousel
            title="Powerful PDF Features"
            description="Experience the next generation of PDF analysis"
            image={mockFeatureImages}
          />
        </div>

        {/* How It Works Section */}
        <div className="mt-32 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 blur-3xl" />
            <div className="absolute right-0 top-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
          </div>

          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full text-sm font-medium bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              Simple Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Transform your documents into insights in three simple steps
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            {/* Steps Container */}
            <div className="relative">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600 to-blue-600/0 transform -translate-y-1/2" />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Step 1 */}
                <div className="group relative">
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute -top-4 -left-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 absolute -inset-2 animate-pulse" />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                          1
                        </div>
                      </div>
                    </div>
                    <div className="h-12 w-12 mb-8 rounded-2xl bg-blue-600/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-600"
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
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Upload Your PDF
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Drag and drop your PDF document or click to upload. We
                      handle files up to 50MB with enterprise-grade security.
                    </p>
                    <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      100% Secure & Private
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="group relative">
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute -top-4 -left-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600/10 absolute -inset-2 animate-pulse" />
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                          2
                        </div>
                      </div>
                    </div>
                    <div className="h-12 w-12 mb-8 rounded-2xl bg-indigo-600/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-indigo-600"
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
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      AI Processing
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Our advanced AI analyzes your document in real-time,
                      extracting key information and generating comprehensive
                      insights.
                    </p>
                    <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
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
                      Lightning Fast Processing
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="group relative">
                  <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className="absolute -top-4 -left-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-lg bg-purple-600/10 absolute -inset-2 animate-pulse" />
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
                          3
                        </div>
                      </div>
                    </div>
                    <div className="h-12 w-12 mb-8 rounded-2xl bg-purple-600/10 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-purple-600"
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
                    <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Get Results
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Access summaries, insights, and smart search. Export your
                      findings or share them with your team instantly.
                    </p>
                    <div className="flex items-center text-sm text-purple-600 dark:text-purple-400 font-medium">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Ready in Seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-20 text-center relative">
              <div className="relative inline-block group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200" />
                <Link
                  href="/upload"
                  className="relative inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                >
                  Try It Now
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
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

        {/* Pricing Section */}
        <div id="pricing" className="mt-32">
          <PricingSection />
        </div>

        {/* Scroll Text Section */}
        <div className="mt-32 mb-32">
          <TextReveal>
            Transform your document workflow with our powerful AI tools. Save
            time, gain insights, and make better decisions.
          </TextReveal>
        </div>
      </main>
    </div>
  );
}
