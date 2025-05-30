import {
  IconBrain,
  IconSchool,
  IconBriefcase,
  IconChartBar,
  IconScale,
  IconStethoscope,
  IconReceipt,
  IconBook,
  IconCode,
  IconLoader2,
  IconBrandOpenai,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import { useState } from "react";
import { generateAnalysis, type UserRole, type AnalysisType } from "@/actions/ai-analysis";
import { toast } from "sonner";

interface PdfAnalysisProps {
  extractedText: string;
  fileName: string;
}

interface AIOption {
  role: UserRole;
  icon: typeof IconSchool;
  title: string;
  description: string;
  options: {
    type: AnalysisType;
    label: string;
    description: string;
  }[];
}

const aiOptions: AIOption[] = [
  {
    role: 'student',
    icon: IconSchool,
    title: "Student",
    description: "Academic analysis and study aids",
    options: [
      {
        type: 'summary',
        label: "Summarize Content",
        description: "Quick understanding of textbooks and notes"
      },
      {
        type: 'questions',
        label: "Generate Questions",
        description: "Create MCQs and flashcards"
      },
      {
        type: 'notes',
        label: "Create Study Notes",
        description: "Convert to bullet-point notes"
      }
    ]
  },
  {
    role: 'recruiter',
    icon: IconBriefcase,
    title: "Recruiter / HR",
    description: "Resume and candidate analysis",
    options: [
      {
        type: 'resume',
        label: "Parse Resume",
        description: "Extract candidate information"
      },
      {
        type: 'summary',
        label: "Match Job Description",
        description: "Compare against requirements"
      }
    ]
  },
  {
    role: 'analyst',
    icon: IconChartBar,
    title: "Data Analyst",
    description: "Data extraction and analysis",
    options: [
      {
        type: 'tables',
        label: "Extract Tables",
        description: "Pull structured data from documents"
      },
      {
        type: 'financial',
        label: "Financial Analysis",
        description: "Analyze financial metrics"
      }
    ]
  }
];

function ApiToggle({ useGemini, onToggle }: { useGemini: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <IconBrandOpenai className={cn(
          "w-5 h-5 transition-colors",
          !useGemini ? "text-green-500" : "text-gray-400"
        )} />
        <span className={cn(
          "text-sm font-medium transition-colors",
          !useGemini ? "text-gray-200" : "text-gray-400"
        )}>OpenAI</span>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
          useGemini ? "bg-blue-600" : "bg-green-600"
        )}
      >
        <span className="sr-only">Toggle API</span>
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            useGemini ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
      <div className="flex items-center gap-2">
        <IconBrandGoogle className={cn(
          "w-5 h-5 transition-colors",
          useGemini ? "text-blue-500" : "text-gray-400"
        )} />
        <span className={cn(
          "text-sm font-medium transition-colors",
          useGemini ? "text-gray-200" : "text-gray-400"
        )}>Gemini</span>
      </div>
    </div>
  );
}

export function PdfAnalysis({ extractedText, fileName }: PdfAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [useGemini, setUseGemini] = useState(false);

  const handleAnalysis = async (role: UserRole, analysisType: AnalysisType) => {
    setIsAnalyzing(true);
    setAnalysisResult("");
    
    try {
      const result = await generateAnalysis({
        text: extractedText,
        role,
        analysisType,
        useGemini
      });

      if (!result.success) {
        throw new Error(result.error || "Analysis failed");
      }

      setAnalysisResult(result.content);
      toast.success(`Analysis completed successfully using ${useGemini ? 'Gemini' : 'OpenAI'}!`);
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error(error instanceof Error ? error.message : "Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Extracted Text Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <IconCode className="w-5 h-5 text-blue-500" />
            Extracted Text from {fileName}
          </h3>
          <ApiToggle useGemini={useGemini} onToggle={() => setUseGemini(!useGemini)} />
        </div>
        <Terminal className="w-full max-w-full bg-gray-950/50 backdrop-blur-sm">
          <AnimatedSpan delay={500}>
            $ pdf-extract {fileName}
          </AnimatedSpan>
          <AnimatedSpan delay={1000}>
            Extracting text from PDF...
          </AnimatedSpan>
          <AnimatedSpan delay={1500}>
            Successfully extracted {extractedText.length} characters.
          </AnimatedSpan>
          <AnimatedSpan delay={2000}>
            $ cat extracted_text.txt
          </AnimatedSpan>
          <TypingAnimation delay={2500} duration={10} as="pre" className="whitespace-pre-wrap text-sm text-gray-300">
            {`${extractedText.substring(0, 500)}...`}
          </TypingAnimation>
        </Terminal>
      </div>

      {/* Analysis Result Section */}
      {analysisResult && (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <IconBrain className="w-5 h-5 text-green-500" />
            Analysis Results
            <span className="text-sm font-normal text-gray-500">
              (via {useGemini ? 'Gemini' : 'OpenAI'})
            </span>
          </h3>
          <Terminal className="w-full max-w-full bg-gray-950/50 backdrop-blur-sm">
            <TypingAnimation delay={500} duration={20} as="pre" className="whitespace-pre-wrap text-sm text-gray-300">
              {analysisResult}
            </TypingAnimation>
          </Terminal>
        </div>
      )}

      {/* AI Options Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <IconBrain className="w-5 h-5 text-blue-500" />
          AI Analysis Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aiOptions.map((option, idx) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6",
                "hover:shadow-lg transition-shadow duration-300",
                selectedRole === option.role && "ring-2 ring-blue-500"
              )}
              onClick={() => setSelectedRole(option.role)}
            >
              <div className="flex items-center gap-3 mb-4">
                <option.icon className="w-6 h-6 text-blue-500" />
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {option.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {option.description}
              </p>
              <ul className="space-y-2">
                {option.options.map((opt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + i * 0.1 }}
                  >
                    <button
                      onClick={() => handleAnalysis(option.role, opt.type)}
                      disabled={isAnalyzing}
                      className="w-full text-left flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
                    >
                      {isAnalyzing ? (
                        <IconLoader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      )}
                      <div>
                        <div className="font-medium">{opt.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {opt.description}
                        </div>
                      </div>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
