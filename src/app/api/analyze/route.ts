import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `You are a world-class startup advisor, venture capitalist, and product strategist.

Analyze the startup idea provided by the user and generate a detailed startup analysis.

Your analysis must include:

1. User Personas
Generate 3 detailed personas including:
- name
- age
- profession
- goals (array of strings)
- pain_points (array of strings)
- why_use (why they would use this product)

2. Market Insights
Include:
- estimated_market_size (string, e.g. "$50B by 2028")
- growth_trends (array of strings)
- why_attractive (string explaining why the market is attractive)

3. Competitor Analysis
Identify 3 competitors with:
- name
- description
- strengths (array of strings)
- weaknesses (array of strings)

4. Startup Moat
Explain the defensibility of the idea as a string.

5. Validation Score
Score the idea out of 100 based on:
- market_demand (0-100)
- innovation (0-100)
- competition (0-100, higher means less competition = better)
- feasibility (0-100)
Overall score is the average. Provide explanation for the score.

Return as an object with:
- score (number)
- breakdown: { market_demand, innovation, competition, feasibility } (all numbers)
- explanation (string)

6. Investor Pitch
Write a compelling 4-5 sentence investor pitch as a string.

7. Simulated Customer Feedback
Generate 3 realistic customer reactions to the product idea as an array of strings.

Return everything as valid JSON with this exact structure:
{
  "personas": [
    {
      "name": "string",
      "age": number,
      "profession": "string",
      "goals": ["string"],
      "pain_points": ["string"],
      "why_use": "string"
    }
  ],
  "market_insights": {
    "estimated_market_size": "string",
    "growth_trends": ["string"],
    "why_attractive": "string"
  },
  "competitors": [
    {
      "name": "string",
      "description": "string",
      "strengths": ["string"],
      "weaknesses": ["string"]
    }
  ],
  "moat": "string",
  "validation_score": {
    "score": number,
    "breakdown": {
      "market_demand": number,
      "innovation": number,
      "competition": number,
      "feasibility": number
    },
    "explanation": "string"
  },
  "pitch": "string",
  "customer_feedback": ["string", "string", "string"]
}

Return only the raw JSON, no markdown code blocks.`;

export async function POST(request: NextRequest) {
  try {
    const { title, problem, audience, solution, industry, revenue_model } = await request.json();

    if (!title || !problem || !audience || !solution || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured. Please set GOOGLE_GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const userMessage = `
Startup Idea: ${title}
Problem: ${problem}
Target Audience: ${audience}
Solution: ${solution}
Industry: ${industry}
${revenue_model ? `Revenue Model: ${revenue_model}` : ""}
    `.trim();

    const fullPrompt = `${SYSTEM_PROMPT}\n\n${userMessage}`;

    const result = await model.generateContent(fullPrompt);
    const content = result.response.text();

    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const analysis = JSON.parse(cleaned);

    return NextResponse.json(analysis);
  } catch (error: unknown) {
    console.error("Analysis error:", error);
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}