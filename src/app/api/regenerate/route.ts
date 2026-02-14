import { NextRequest, NextResponse } from "next/server";
import {
  generateBannerImage,
  generateHtmlLayout,
  type AnalyzeResult,
} from "@/lib/aiClient";

// Helper function to add delay (simulate thinking)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  try {
    const { basePrompt, userPrompt, mode = "both", companyInfo } = await request.json();
    const userModification = typeof userPrompt === "string" ? userPrompt.trim() : "";

    if (!basePrompt || !userPrompt) {
      return NextResponse.json(
        { error: "Base prompt and user prompt are required" },
        { status: 400 }
      );
    }

    const thinkingSteps: Array<{
      step: string;
      timestamp: number;
      content?: string;
      code?: string;
    }> = [];

    const startTime = Date.now();

    // Analyze new requirements
    thinkingSteps.push({
      step: "Analyzing new requirements",
      timestamp: Date.now() - startTime,
      content: "Processing user's modification requests...",
    });
    await delay(800);

    // Merge prompts
    thinkingSteps.push({
      step: "Merging prompts",
      timestamp: Date.now() - startTime,
      content: `Base: ${basePrompt.substring(0, 100)}...\nUser modifications: ${userPrompt}`,
    });
    await delay(600);

    const finalPrompt = `${basePrompt}. ${userPrompt}`;

    thinkingSteps.push({
      step: "Prompt merged",
      timestamp: Date.now() - startTime,
      content: finalPrompt,
    });

    const result: {
      imageUrl?: string;
      htmlLayout?: string;
      css?: string;
      promptUsed: string;
      thinkingSteps: typeof thinkingSteps;
    } = {
      promptUsed: finalPrompt,
      thinkingSteps,
    };

    // Generate image
    if (mode === "image" || mode === "both") {
      thinkingSteps.push({
        step: "Regenerating image",
        timestamp: Date.now() - startTime,
        content: "Applying new prompt to image generation...",
      });

      try {
        const imageResult = await generateBannerImage(finalPrompt);
        result.imageUrl = imageResult.imageUrl;

        thinkingSteps.push({
          step: "Image regenerated",
          timestamp: Date.now() - startTime,
          content: "New image ready",
        });
      } catch (error) {
        thinkingSteps.push({
          step: "Regeneration failed",
          timestamp: Date.now() - startTime,
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }

    // Generate HTML/CSS (prioritize)
    if (mode === "code" || mode === "both") {
      thinkingSteps.push({
        step: "Redesigning banner layout",
        timestamp: Date.now() - startTime,
        content: "Applying modifications to banner structure...",
      });
      await delay(1000);

      thinkingSteps.push({
        step: "Regenerating HTML/CSS",
        timestamp: Date.now() - startTime,
        content: "Updating layout code with new requirements...",
      });
      await delay(800);

      try {
        const htmlResult = await generateHtmlLayout(finalPrompt, undefined, companyInfo, userModification);
        result.htmlLayout = htmlResult.html;
        result.css = htmlResult.css;

        thinkingSteps.push({
          step: "Code regenerated",
          timestamp: Date.now() - startTime,
          content: "Updated layout ready with modifications",
          code: `HTML:\n${htmlResult.html.substring(0, 250)}...\n\nCSS:\n${htmlResult.css.substring(0, 250)}...`,
        });
      } catch (error) {
        thinkingSteps.push({
          step: "Code regeneration failed",
          timestamp: Date.now() - startTime,
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }

    thinkingSteps.push({
      step: "Regeneration complete",
      timestamp: Date.now() - startTime,
      content: "Updated banner ready",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Regenerate error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
