'use server'

import {auth} from "@clerk/nextjs/server";

import { fetchAndExtractText } from "@/lib/langchain";
import { getDbConnection } from "@/lib/db";
import { formatFileNameAsTitle } from "../utils/format-utils";

export async function generatePdfSummary(uploadResponse :[{
    serverData : {
        userId : string;
        file:{
            url : string;
            name : string;
        }
    }
}]){
    console.log("Starting generatePdfSummary with response:", JSON.stringify(uploadResponse, null, 2));
    
    if(!uploadResponse || !uploadResponse[0]){
        console.log("No upload response provided");
        return {
            success : false,
            message : "No file uploaded",
            data : null,
        };
    }

    const {
        serverData : {
            file: {url: fileUrl, name: fileName},
        }
    } = uploadResponse[0];

    // Get the authenticated user's ID
    const { userId } = await auth();
    if (!userId) {
        return {
            success: false,
            message: "User not authenticated",
            data: null,
        };
    }

    console.log("Extracted URL:", fileUrl);
    console.log("File name:", fileName);

    if(!fileUrl){
        console.log("No file URL found in response");
        return {
            success : false,
            message : "No file URL provided",
            data : null,
        };
    }

    try{
        console.log("Starting PDF text extraction for:", fileName);
        console.log("Using file URL:", fileUrl);
        
        const extractedText = await fetchAndExtractText(fileUrl);
        
        if (!extractedText) {
            throw new Error("No text extracted from PDF");
        }
        
        // Save to database with formatted title
        const title = formatFileNameAsTitle(fileName);
        await savePdfSummary({
            userId,
            originalFileUrl: fileUrl,
            summaryText: extractedText,
            title,
            fileName
        });
        
        console.log("Extraction successful!");
        console.log("Extracted Text Preview:", extractedText.substring(0, 500) + "...");
        console.log("Total text length:", extractedText.length);
        
        return {
            success: true,
            message: "PDF text extracted and saved successfully",
            data: extractedText,
        };
    } catch(error){
        const errorMessage = error instanceof Error ? error.message : "Error extracting PDF text";
        console.error("Error extracting PDF text:", errorMessage);
        return {
            success : false,
            message : errorMessage,
            data : null,
        };
    }
}

interface PdfSummaryType{
    userId: string;
    originalFileUrl: string;
    summaryText : string;
    title : string;
    fileName : string;
}
async function savePdfSummary({userId, originalFileUrl, summaryText, title, fileName}: PdfSummaryType){
    try{
        const sql = await getDbConnection();
        await sql`INSERT INTO pdf_summaries (user_id, original_file_url, summary_text , title, file_name) VALUES (${userId}, ${originalFileUrl}, ${summaryText}, ${title}, ${fileName})`;
    }
    catch(error){
        console.error("Error saving PDF summary:", error);
        return {
            success : false,
            message : "Error saving PDF summary",
            data : null,
        };
    }
}
export async function storePdfSummaryAction({ originalFileUrl, summaryText, title, fileName}: Omit<PdfSummaryType, 'userId'>){
    try{
        const {userId} = await auth();
        if(!userId){
            return {
                success : false,
                message : "User not authenticated",
                data : null,
            };
        }
        
        const saveSummary = await savePdfSummary({
            userId,
            originalFileUrl,
            summaryText,
            title,
            fileName
        });

        if(!saveSummary){
            return {
                success : false,
                message : "Error saving PDF summary",
                data : null,
            };
        }
        return {
            success : true,
            message : "PDF summary saved successfully",
            data : saveSummary,
        };
    }catch(error){
        console.error("Error saving PDF summary:", error);
        return {
            success : false,
            message : "Error saving PDF summary",
            data : null,
        };
    }
}