import { OpenAI } from "openai";

// Initialize OpenAI client
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

interface AIAnalysisResponse {
    success: boolean;
    content: string;
    error?: string;
}

// Base function for OpenAI API calls
async function createCompletion(
    text: string,
    systemPrompt: string,
    temperature: number = 0.7,
    maxTokens: number = 1500
): Promise<AIAnalysisResponse> {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                {
                    role: "user",
                    content: text,
                },
            ],
            temperature,
            max_tokens: maxTokens,
        });

        const result = completion.choices[0]?.message?.content;
        if (!result) {
            throw new Error("No response generated");
        }

        return {
            success: true,
            content: result,
        };
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return {
            success: false,
            content: "",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}

// Student-focused functions
export async function generateSummary(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As an educational assistant, create a clear and concise summary of the following text. 
    Focus on the main ideas and key points. Format the summary with:
    - Main points in bullet points
    - Important concepts in bold
    - Examples or supporting details as sub-bullets
    
    Text to summarize:`;
    
    return createCompletion(text, prompt, 0.7);
}

export async function generateQuestions(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As an educational expert, create a comprehensive set of questions based on the following text.
    Generate:
    - 5 multiple choice questions
    - 3 short answer questions
    - 2 essay/discussion questions
    
    Format each question with:
    - Clear question text
    - For MCQs: 4 options with the correct answer marked
    - For other questions: sample answer or key points to include
    
    Text to analyze:`;
    
    return createCompletion(text, prompt, 0.7);
}

export async function generateNotes(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a study guide creator, convert the following text into organized study notes.
    Include:
    - Main topics and subtopics
    - Key definitions
    - Important concepts
    - Examples or illustrations
    - Bullet points for easy reading
    
    Text to convert:`;
    
    return createCompletion(text, prompt, 0.7);
}

// HR/Recruiter functions
export async function parseResume(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a recruitment specialist, analyze this resume/CV and extract key information:
    - Personal Information
    - Skills and Expertise
    - Work Experience
    - Education
    - Key Achievements
    - Technical Proficiencies
    
    Present the information in a structured format with clear sections.
    
    Resume text:`;
    
    return createCompletion(text, prompt, 0.5);
}

export async function matchJobDescription(text: string, jobDescription: string): Promise<AIAnalysisResponse> {
    const prompt = `As a recruitment matcher, analyze this resume against the job description.
    Evaluate:
    - Skills match percentage
    - Required qualifications met
    - Experience relevance
    - Potential gaps
    - Overall fit score (0-100)
    
    Resume text:
    ${text}
    
    Job Description:
    ${jobDescription}`;
    
    return createCompletion(prompt, prompt, 0.5);
}

// Data Analysis functions
export async function extractTables(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a data analyst, extract and format tables from this text.
    For each table:
    - Identify headers
    - Organize data in rows and columns
    - Add any relevant notes about the data
    
    Present in a clean, structured format.
    
    Text to analyze:`;
    
    return createCompletion(text, prompt, 0.3);
}

export async function analyzeFinancialData(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a financial analyst, analyze this financial document and provide:
    - Key financial metrics
    - Important ratios
    - Trends and patterns
    - Notable changes or anomalies
    - Risk factors
    
    Format with clear sections and explanations.
    
    Financial text:`;
    
    return createCompletion(text, prompt, 0.4);
}

// Legal Analysis functions
export async function analyzeLegalDocument(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a legal analyst, review this legal document and provide:
    - Document type and purpose
    - Key clauses and terms
    - Potential risks or issues
    - Important dates and deadlines
    - Recommendations or concerns
    
    Format with clear sections and legal context.
    
    Legal text:`;
    
    return createCompletion(text, prompt, 0.3);
}

// General Analysis functions
export async function extractTopics(text: string): Promise<AIAnalysisResponse> {
    const prompt = `As a content analyzer, identify and categorize the main topics in this text.
    Provide:
    - Main themes
    - Subtopics
    - Key concepts
    - Related terms
    - Topic hierarchy
    
    Format with clear categorization and relationships.
    
    Text to analyze:`;
    
    return createCompletion(text, prompt, 0.6);
}

export async function simplifyContent(text: string, targetLevel: string = "general"): Promise<AIAnalysisResponse> {
    const prompt = `As a content simplifier, rewrite this text for a ${targetLevel} audience.
    Make it:
    - Easy to understand
    - Clear and concise
    - Well-structured
    - Engaging
    - Accessible
    
    Text to simplify:`;
    
    return createCompletion(text, prompt, 0.7);
}