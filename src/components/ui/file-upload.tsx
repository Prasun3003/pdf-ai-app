import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { useUploadThing } from "../../../utils/uploadthing";
import type { FileWithPath } from "react-dropzone";
import { toast } from "sonner";
import { generatePdfSummary } from "../../../actions/upload-actions";

// Maximum file size: 8MB in bytes
const MAX_FILE_SIZE = 8 * 1024 * 1024;

// Zod schema for file validation
const FileSchema = z.object({
  name: z.string().endsWith(".pdf", { message: "File must be a PDF" }),
  size: z
    .number()
    .max(MAX_FILE_SIZE, { message: "File size must be less than 8MB" }),
  type: z.string().refine((val) => val === "application/pdf", {
    message: "Only PDF files are allowed",
  }),
});

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
  onUploadComplete,
  onTextExtracted,
}: {
  onChange?: (files: File[]) => void;
  onUploadComplete?: (urls: string[]) => void;
  onTextExtracted?: (text: string) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastId = useRef<string | number | null>(null);

  const { startUpload } = useUploadThing("pdfUploader", {
    onUploadBegin: () => {
      setIsUploading(true);
      setUploadSuccess(false);
      toastId.current = toast.loading("Uploading file...", {
        duration: Infinity,
      });
    },
    onClientUploadComplete: async (res) => {
      setIsUploading(false);
      setUploadSuccess(true);

      if (!res || res.length === 0) {
        console.error("No response from upload");
        toast.error("Upload failed - no response");
        return;
      }

      console.log("Upload response:", res);
      const fileData = res[0]; // Get the first file
      console.log("File data:", fileData);

      // Get the URL using ufsUrl
      const fileUrl = fileData.ufsUrl;
      console.log("File URL for processing:", fileUrl);

      if (!fileUrl) {
        console.error("No file URL in response");
        toast.error("Upload failed - no file URL");
        return;
      }

      onUploadComplete?.([fileUrl]);

      if (toastId.current) {
        toast.success("File uploaded successfully!", {
          id: toastId.current,
        });
      }

      // Process the PDF
      try {
        console.log("Starting PDF processing with URL:", fileUrl);
        const result = await generatePdfSummary([
          {
            serverData: {
              userId: "user_id",
              file: {
                url: fileUrl,
                name: files[0].name,
              },
            },
          },
        ]);

        if (!result.success) {
          console.error("PDF processing failed:", result.message);
          toast.error(result.message);
        } else {
          console.log("PDF processing successful");
          toast.success("PDF processed successfully!");
          // Pass the extracted text to the parent component if it exists
          if (result.data) {
            onTextExtracted?.(result.data);
          }
        }
      } catch (error) {
        console.error("Error processing PDF:", error);
        toast.error("Failed to process PDF");
      }
    },
    onUploadError: (error: Error) => {
      setIsUploading(false);
      setUploadSuccess(false);
      setError(error.message);

      // Update the existing toast with the error
      if (toastId.current) {
        toast.error(`Upload failed: ${error.message}`, {
          id: toastId.current,
        });
      }
    },
  });

  const validateFile = (file: File) => {
    try {
      const validatedFields = FileSchema.parse({
        name: file.name,
        size: file.size,
        type: file.type,
      });

      console.log("Validated PDF File:", {
        name: validatedFields.name,
        size: `${(validatedFields.size / (1024 * 1024)).toFixed(2)}MB`,
        type: validatedFields.type,
        lastModified: new Date(file.lastModified).toLocaleString(),
      });

      setError(null);
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessage = err.errors[0].message;
        console.error("File Validation Error:", {
          error: errorMessage,
          file: {
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
            type: file.type,
          },
        });
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        console.error("Unexpected Validation Error:", err);
        setError("An error occurred while validating the file");
        toast.error("An error occurred while validating the file");
      }
      return false;
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setUploadSuccess(false);
    // Clear any existing files when new ones are selected
    setFiles([]);

    const validFiles = newFiles.filter(validateFile);
    if (validFiles.length > 0) {
      setFiles(validFiles);
      onChange && onChange(validFiles);
      toast.success("File selected successfully!");
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select a file first");
      return;
    }

    try {
      await startUpload(files);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload file");
      toast.error("Failed to upload file");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxSize: MAX_FILE_SIZE,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection?.errors[0]?.code === "file-too-large") {
        setError("File size must be less than 8MB");
      } else {
        setError("Only PDF files are allowed");
      }
      console.log(fileRejections);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          accept=".pdf,application/pdf"
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            {uploadSuccess ? "PDF Uploaded Successfully" : "Upload PDF"}
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            {uploadSuccess
              ? "Your file has been uploaded and is ready for processing"
              : "Drag or drop your PDF file here or click to upload"}
          </p>
          {error && (
            <p className="relative z-20 font-sans font-normal text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-sm",
                    uploadSuccess && "border-2 border-green-500"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800"
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      {uploadSuccess ? (
                        <span className="text-green-500 flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          Uploaded successfully
                        </span>
                      ) : (
                        `modified ${new Date(
                          file.lastModified
                        ).toLocaleDateString()}`
                      )}
                    </motion.p>
                  </div>
                </motion.div>
              ))}

            {files.length > 0 && !uploadSuccess && (
              <motion.button
                onClick={handleUpload}
                disabled={isUploading}
                className={cn(
                  "mt-4 w-full py-2 px-4 rounded-md text-white font-medium",
                  isUploading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isUploading ? "Uploading..." : "Upload File"}
              </motion.button>
            )}

            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
