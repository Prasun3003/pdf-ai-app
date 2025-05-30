'use server'

import { auth } from "@clerk/nextjs/server";
import { getUserAnalyses, deleteAnalysis } from "@/lib/db";

export async function getAnalysesList() {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        const analyses = await getUserAnalyses(userId);
        return {
            success: true,
            data: analyses
        };
    } catch (error) {
        console.error("Error fetching analyses:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch analyses"
        };
    }
}

export async function deleteAnalysisAction(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        await deleteAnalysis(id, userId);
        return {
            success: true,
            message: "Analysis deleted successfully"
        };
    } catch (error) {
        console.error("Error deleting analysis:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to delete analysis"
        };
    }
} 