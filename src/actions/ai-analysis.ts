'use server'

import * as ai from '@/lib/openai';
import { generateGeminiResponse } from '@/lib/gemini';

export type UserRole = 'student' | 'recruiter' | 'analyst' | 'legal' | 'general';
export type AnalysisType = 'summary' | 'questions' | 'notes' | 'resume' | 'tables' | 'financial' | 'legal' | 'topics' | 'simplify';

interface AnalysisRequest {
    text: string;
    role: UserRole;
    analysisType: AnalysisType;
    additionalContext?: string; // For job descriptions, target audience level, etc.
    useGemini?: boolean; // Flag to determine which API to use
}

export async function generateAnalysis({ 
    text, 
    role, 
    analysisType, 
    additionalContext,
    useGemini = false // Default to OpenAI for first analysis
}: AnalysisRequest) {
    try {
        console.log(`Starting ${analysisType} analysis for ${role} role using ${useGemini ? 'Gemini' : 'OpenAI'}`);

        // Get the appropriate prompt based on role and analysis type
        const prompt = getPromptForAnalysis(role, analysisType, additionalContext);

        // Use Gemini for subsequent analyses if specified
        if (useGemini) {
            return await generateGeminiResponse(text, prompt);
        }

        // Use OpenAI for initial analysis
        switch (role) {
            case 'student':
                switch (analysisType) {
                    case 'summary':
                        return await ai.generateSummary(text);
                    case 'questions':
                        return await ai.generateQuestions(text);
                    case 'notes':
                        return await ai.generateNotes(text);
                    default:
                        throw new Error('Invalid analysis type for student role');
                }

            case 'recruiter':
                switch (analysisType) {
                    case 'resume':
                        return await ai.parseResume(text);
                    case 'summary':
                        if (additionalContext) {
                            return await ai.matchJobDescription(text, additionalContext);
                        }
                        return await ai.parseResume(text);
                    default:
                        throw new Error('Invalid analysis type for recruiter role');
                }

            case 'analyst':
                switch (analysisType) {
                    case 'tables':
                        return await ai.extractTables(text);
                    case 'financial':
                        return await ai.analyzeFinancialData(text);
                    default:
                        throw new Error('Invalid analysis type for analyst role');
                }

            case 'legal':
                switch (analysisType) {
                    case 'legal':
                        return await ai.analyzeLegalDocument(text);
                    default:
                        throw new Error('Invalid analysis type for legal role');
                }

            case 'general':
                switch (analysisType) {
                    case 'topics':
                        return await ai.extractTopics(text);
                    case 'simplify':
                        return await ai.simplifyContent(text, additionalContext || 'general');
                    default:
                        throw new Error('Invalid analysis type for general role');
                }

            default:
                throw new Error('Invalid role selected');
        }
    } catch (error) {
        console.error('Analysis Error:', error);
        return {
            success: false,
            content: '',
            error: error instanceof Error ? error.message : 'An error occurred during analysis'
        };
    }
}

// Helper function to get the appropriate prompt for Gemini analysis
function getPromptForAnalysis(role: UserRole, analysisType: AnalysisType, additionalContext?: string): string {
    switch (role) {
        case 'student':
            switch (analysisType) {
                case 'summary':
                    return `As an educational assistant, create a clear and concise summary of the following text. 
                    Focus on the main ideas and key points. Format the summary with:
                    - Main points in bullet points
                    - Important concepts in bold
                    - Examples or supporting details as sub-bullets`;
                case 'questions':
                    return `As an educational expert, create a comprehensive set of questions based on the following text.
                    Generate:
                    - 5 multiple choice questions
                    - 3 short answer questions
                    - 2 essay/discussion questions
                    
                    Format each question with:
                    - Clear question text
                    - For MCQs: 4 options with the correct answer marked
                    - For other questions: sample answer or key points to include`;
                case 'notes':
                    return `As a study guide creator, convert the following text into organized study notes.
                    Include:
                    - Main topics and subtopics
                    - Key definitions
                    - Important concepts
                    - Examples or illustrations
                    - Bullet points for easy reading`;
                default:
                    throw new Error('Invalid analysis type for student role');
            }

        case 'recruiter':
            switch (analysisType) {
                case 'resume':
                    return `As a recruitment specialist, analyze this resume/CV and extract key information:
                    - Personal Information
                    - Skills and Expertise
                    - Work Experience
                    - Education
                    - Key Achievements
                    - Technical Proficiencies
                    
                    Present the information in a structured format with clear sections.`;
                case 'summary':
                    return `As a recruitment matcher, analyze this resume against the job description.
                    Evaluate:
                    - Skills match percentage
                    - Required qualifications met
                    - Experience relevance
                    - Potential gaps
                    - Overall fit score (0-100)
                    
                    Job Description: ${additionalContext || 'Not provided'}`;
                default:
                    throw new Error('Invalid analysis type for recruiter role');
            }

        case 'analyst':
            switch (analysisType) {
                case 'tables':
                    return `As a data analyst, extract and format tables from this text.
                    For each table:
                    - Identify headers
                    - Organize data in rows and columns
                    - Add any relevant notes about the data
                    
                    Present in a clean, structured format.`;
                case 'financial':
                    return `As a financial analyst, analyze this financial document and provide:
                    - Key financial metrics
                    - Important ratios
                    - Trends and patterns
                    - Notable changes or anomalies
                    - Risk factors
                    
                    Format with clear sections and explanations.`;
                default:
                    throw new Error('Invalid analysis type for analyst role');
            }

        default:
            return `Analyze the following text and provide insights based on the role: ${role} and analysis type: ${analysisType}.`;
    }
} 