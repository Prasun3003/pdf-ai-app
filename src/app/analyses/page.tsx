"use client";

import { useEffect, useState } from "react";
import {
  getAnalysesList,
  deleteAnalysisAction,
} from "@/actions/analysis-actions";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Loader2, Trash2, FileText, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Analysis {
  id: string;
  title: string;
  file_name: string;
  created_at: string;
  status: string;
}

export default function AnalysesList() {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadAnalyses();
  }, []);

  async function loadAnalyses() {
    const result = await getAnalysesList();
    if (result.success && result.data) {
      setAnalyses(result.data);
    } else {
      toast.error(result.error || "Failed to load analyses");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    try {
      setDeleting(id);
      const result = await deleteAnalysisAction(id);
      if (result.success) {
        setAnalyses((prev) => prev.filter((a) => a.id !== id));
        toast.success("Analysis deleted successfully");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete analysis"
      );
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Your Analyses
      </h1>

      {analyses.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
            No analyses found
          </h3>
          <p className="text-gray-500 mt-2">
            Upload a PDF to get started with your first analysis
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-white truncate">
                      {analysis.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleDelete(analysis.id)}
                    disabled={deleting === analysis.id}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {deleting === analysis.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {analysis.file_name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {formatDistanceToNow(new Date(analysis.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        analysis.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      }`}
                    >
                      {analysis.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
