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
    const { urlInfo, concept, promptOverrides, mode = "both", companyInfo } =
      await request.json();

    if (!concept && !promptOverrides) {
      return NextResponse.json(
        { error: "Concept or prompt is required" },
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

    // Step 1: Analyze requirements
    thinkingSteps.push({
      step: "Analyzing banner requirements",
      timestamp: Date.now() - startTime,
      content: "Reading company information and concept details...",
    });
    await delay(800); // Simulate thinking time

    // Step 2: Build prompt
    thinkingSteps.push({
      step: "Building generation prompt",
      timestamp: Date.now() - startTime,
      content: "Combining concept, company info, and user requirements...",
    });
    await delay(600);

    let finalPrompt: string;
    if (concept) {
      finalPrompt = `Marketing banner: ${concept.headline}. ${concept.subheadline}. Style: ${concept.styleGuide.mood}. Colors: ${concept.styleGuide.colors.join(", ")}. CTA: ${concept.cta}`;
    } else {
      finalPrompt = promptOverrides || "";
    }

    if (promptOverrides && concept) {
      finalPrompt = `${finalPrompt}. Additional requirements: ${promptOverrides}`;
    }

    thinkingSteps.push({
      step: "Prompt finalized",
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

    // Step 3: Generate HTML/CSS (prioritize this - it's faster and more reliable)
    if (mode === "code" || mode === "both") {
      thinkingSteps.push({
        step: "Designing banner layout",
        timestamp: Date.now() - startTime,
        content: "Planning banner structure: company name, services, CTA placement...",
      });
      await delay(1000);

      thinkingSteps.push({
        step: "Generating HTML structure",
        timestamp: Date.now() - startTime,
        content: "Creating semantic HTML with company name, headline, and call-to-action...",
      });
      await delay(800);

      try {
        const htmlResult = await generateHtmlLayout(
          finalPrompt,
          concept as AnalyzeResult["conceptSuggestions"][0] | undefined,
          companyInfo
        );
        result.htmlLayout = htmlResult.html;
        result.css = htmlResult.css;

        thinkingSteps.push({
          step: "HTML structure created",
          timestamp: Date.now() - startTime,
          content: "HTML markup generated with company information",
          code: htmlResult.html.substring(0, 300) + "...",
        });
        await delay(500);

        thinkingSteps.push({
          step: "Applying CSS styles",
          timestamp: Date.now() - startTime,
          content: "Styling banner with gradients, typography, and modern design...",
        });
        await delay(700);

        thinkingSteps.push({
          step: "HTML/CSS generation complete",
          timestamp: Date.now() - startTime,
          content: "Banner code ready for preview",
          code: `HTML:\n${htmlResult.html.substring(0, 250)}...\n\nCSS:\n${htmlResult.css.substring(0, 250)}...`,
        });
      } catch (error) {
        thinkingSteps.push({
          step: "HTML/CSS generation failed",
          timestamp: Date.now() - startTime,
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }

    // Step 4: Generate image (optional, can be slow)
    if (mode === "image" || mode === "both") {
      thinkingSteps.push({
        step: "Preparing image generation",
        timestamp: Date.now() - startTime,
        content: "Setting up image generation with DALL-E...",
      });
      await delay(600);

      thinkingSteps.push({
        step: "Calling image generation API",
        timestamp: Date.now() - startTime,
        content: "Generating banner image with DALL-E (this may take 10-20 seconds)...",
      });

      try {
        const imageResult = await generateBannerImage(finalPrompt);
        if (imageResult.imageUrl) {
          result.imageUrl = imageResult.imageUrl;
          thinkingSteps.push({
            step: "Image generated successfully",
            timestamp: Date.now() - startTime,
            content: `Image URL received: ${imageResult.imageUrl.substring(0, 60)}...`,
          });
        } else {
          thinkingSteps.push({
            step: "Image generation returned no URL",
            timestamp: Date.now() - startTime,
            content: "DALL-E API returned empty image URL",
          });
        }
      } catch (error) {
        console.error("Image generation error in API:", error);
        thinkingSteps.push({
          step: "Image generation failed",
          timestamp: Date.now() - startTime,
          content: `Error: ${error instanceof Error ? error.message : "Unknown error"}. HTML/CSS banner is still available.`,
        });
      }
    }

    thinkingSteps.push({
      step: "Generation complete",
      timestamp: Date.now() - startTime,
      content: result.imageUrl 
        ? "Banner image and code ready for preview" 
        : result.htmlLayout 
        ? "HTML/CSS code ready (image generation skipped or failed)"
        : "Generation completed but no output available",
    });

    console.log("Final result:", {
      hasImageUrl: !!result.imageUrl,
      hasHtmlLayout: !!result.htmlLayout,
      hasCss: !!result.css,
      imageUrl: result.imageUrl?.substring(0, 80),
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Generate design error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
