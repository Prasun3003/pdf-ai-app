import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { Document } from "langchain/document";

export const fetchAndExtractText = async (pdfUrl: string) => {
    try {
        console.log("Fetching PDF from URL:", pdfUrl);
        const response = await fetch(pdfUrl, {
            headers: {
                'Accept': 'application/pdf'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }

        const blob = await response.blob();
        console.log("PDF blob size:", blob.size, "bytes");
        console.log("PDF blob type:", blob.type);

        if (blob.size === 0) {
            throw new Error("Received empty PDF file");
        }

        if (!blob.type.includes('pdf')) {
            throw new Error(`Invalid file type: ${blob.type}. Expected PDF.`);
        }

        const arrayBuffer = await blob.arrayBuffer();
        const loader = new PDFLoader(new Blob([arrayBuffer], { type: 'application/pdf' }));
        console.log("PDF loader created");

        const docs = await loader.load();
        console.log("Number of pages processed:", docs.length);

        const text = docs.map((doc: Document) => doc.pageContent).join("\n");
        console.log("Extracted text length:", text.length);
        
        return text;
    } catch (error) {
        console.error("Error in fetchAndExtractText:", error);
        throw error;
    }
}