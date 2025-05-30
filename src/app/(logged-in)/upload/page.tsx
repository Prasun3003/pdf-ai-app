"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { PdfAnalysis } from "@/components/ui/pdf-analysis";
import { useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [extractedText, setExtractedText] = useState<string>("");
  const [currentFileName, setCurrentFileName] = useState<string>("");

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
    setExtractedText(""); // Reset extracted text when new file is selected
    console.log("Files to upload:", newFiles);
  };

  const handleUploadComplete = async (urls: string[]) => {
    if (files[0]) {
      setCurrentFileName(files[0].name);
    }
  };

  const handleTextExtracted = (text: string) => {
    setExtractedText(text);
  };

  return (
    <div className="min-h-screen py-32">
      <HeroHighlight containerClassName="h-auto py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Upload Your <Highlight>PDF Document</Highlight>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Transform your PDF into actionable insights. Our AI will analyze
              your document and provide smart summaries, key points, and more.
            </p>
          </div>

          <div className="mt-12">
            <FileUpload
              onChange={handleFileChange}
              onUploadComplete={handleUploadComplete}
              onTextExtracted={handleTextExtracted}
            />
          </div>

          {/* Show PdfAnalysis component when text is extracted */}
          {extractedText && (
            <PdfAnalysis
              extractedText={extractedText}
              fileName={currentFileName}
            />
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Upload Features */}
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Secure Upload
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your documents are encrypted and securely processed
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Fast Processing
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get insights within seconds of uploading
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Smart Analysis
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                AI-powered insights and summaries
              </p>
            </div>
          </div>
        </div>
      </HeroHighlight>
    </div>
  );
}
