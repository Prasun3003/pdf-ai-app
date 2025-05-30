'use server'

import { neon } from "@neondatabase/serverless";

export async function getDbConnection(){
    if(!process.env.DATABASE_URL){
        throw new Error("DATABASE_URL is not set");
    }
    const sql = neon(process.env.DATABASE_URL!);
    return sql;
}

export async function getUserAnalyses(userId: string) {
    try {
        const sql = await getDbConnection();
        const analyses = await sql`
            SELECT id, title, file_name, created_at, status
            FROM pdf_summaries
            WHERE user_id = ${userId}
            ORDER BY created_at DESC
        `;
        return analyses;
    } catch (error) {
        console.error("Error fetching user analyses:", error);
        throw error;
    }
}

export async function deleteAnalysis(id: string, userId: string) {
    try {
        const sql = await getDbConnection();
        const result = await sql`
            DELETE FROM pdf_summaries
            WHERE id = ${id} AND user_id = ${userId}
            RETURNING id
        `;
        return result.length > 0;
    } catch (error) {
        console.error("Error deleting analysis:", error);
        throw error;
    }
}

export async function savePdfSummary({
    userId,
    originalFileUrl,
    summaryText,
    title,
    fileName
}: {
    userId: string;
    originalFileUrl: string;
    summaryText: string;
    title: string;
    fileName: string;
}) {
    try {
        const sql = await getDbConnection();
        const result = await sql`
            INSERT INTO pdf_summaries (
                user_id,
                original_file_url,
                summary_text,
                title,
                file_name,
                status
            ) VALUES (
                ${userId},
                ${originalFileUrl},
                ${summaryText},
                ${title},
                ${fileName},
                'completed'
            )
            RETURNING id
        `;
        return result[0];
    } catch (error) {
        console.error("Error saving PDF summary:", error);
        throw error;
    }
}