import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { analyzeWebsite } from "@/lib/aiClient";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    // Normalize URL: ensure it has a protocol
    let urlToFetch = url.trim();
    if (!/^https?:\/\//i.test(urlToFetch)) {
      urlToFetch = "https://" + urlToFetch;
    }

    // Validate URL format
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(urlToFetch);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format. Please use a full URL (e.g. https://example.com)" },
        { status: 400 }
      );
    }

    // Only allow http and https
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return NextResponse.json(
        { error: "Only HTTP and HTTPS URLs are supported" },
        { status: 400 }
      );
    }

    // Fetch website content (try https first, then http if needed)
    let html: string | undefined;
    const urlsToTry = [parsedUrl.href];
    if (parsedUrl.protocol === "https:") {
      urlsToTry.push(parsedUrl.href.replace(/^https:\/\//i, "http://"));
    }

    let lastError: Error | null = null;

    for (const fetchUrl of urlsToTry) {
      try {
        console.log("Fetching URL:", fetchUrl);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000);

        const response = await fetch(fetchUrl, {
          method: "GET",
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
            "Cache-Control": "no-cache",
            "Upgrade-Insecure-Requests": "1",
          },
          signal: controller.signal,
          redirect: "follow",
          cache: "no-store",
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const contentType = response.headers.get("content-type") || "";
        if (
          !contentType.includes("text/html") &&
          !contentType.includes("text/plain")
        ) {
          console.warn("Content-Type is not HTML:", contentType);
        }

        html = await response.text();

        if (!html || html.length < 100) {
          throw new Error("Website returned empty or very short content");
        }

        console.log(`Fetched ${html.length} characters of HTML`);
        lastError = null;
        break;
      } catch (error) {
        lastError = error as Error;
        console.warn("Fetch attempt failed for", fetchUrl, lastError.message);
        if (urlsToTry.indexOf(fetchUrl) < urlsToTry.length - 1) {
          continue; // try next URL
        }
      }
    }

    if (lastError != null || html == null) {
      const err = (lastError || new Error("Unknown")) as Error & {
        cause?: Error;
        code?: string;
      };
      console.error("Fetch error:", err);

      let userMessage: string;

      if (err.name === "AbortError" || err.message?.includes("aborted")) {
        userMessage =
          "Request timeout. The website took too long to respond. Try again or use a different URL.";
      } else if (err.message?.includes("fetch failed")) {
        const cause = err.cause?.message || err.cause?.toString() || "";
        if (
          cause.includes("certificate") ||
          cause.includes("SSL") ||
          cause.includes("TLS")
        ) {
          userMessage =
            "SSL certificate error. Try entering the URL with http:// instead of https:// for this site.";
        } else if (
          cause.includes("ENOTFOUND") ||
          cause.includes("getaddrinfo")
        ) {
          userMessage =
            "Domain not found. Check the URL (e.g. https://example.com) and try again.";
        } else if (
          cause.includes("ECONNREFUSED") ||
          cause.includes("ECONNRESET")
        ) {
          userMessage =
            "Connection refused or reset. The site may be down or blocking requests. Try another URL.";
        } else {
          userMessage =
            "Could not connect. Check: (1) URL has https:// or http:// (2) Site opens in your browser (3) Try another company website.";
        }
      } else if (
        err.message?.includes("timeout") ||
        err.message?.includes("HTTP 5")
      ) {
        userMessage =
          "Website did not respond in time or returned an error. Try again or another URL.";
      } else {
        userMessage =
          err.message ||
          "Could not fetch website. Check the URL and try again.";
      }

      return NextResponse.json(
        { error: userMessage },
        { status: 500 }
      );
    }

    // Parse HTML and extract comprehensive content (detailed for rich analysis)
    const $ = cheerio.load(html as string);

    // Basic meta
    const title = $("title").text().trim();
    const metaDescription = $('meta[name="description"]').attr("content") || "";
    const metaKeywords = $('meta[name="keywords"]').attr("content") || "";
    const ogTitle = $('meta[property="og:title"]').attr("content") || "";
    const ogDescription = $('meta[property="og:description"]').attr("content") || "";

    const logoAlt = $("img[alt*='logo'], img[alt*='Logo'], .logo img").attr("alt") || "";
    const companyNameFromTitle = title.split(" - ")[0].split(" | ")[0].trim();

    const headings = {
      h1: $("h1").map((_, el) => $(el).text().trim()).get().slice(0, 8),
      h2: $("h2").map((_, el) => $(el).text().trim()).get().slice(0, 15),
      h3: $("h3").map((_, el) => $(el).text().trim()).get().slice(0, 15),
    };

    // More paragraphs and longer text (hero, intro, about sections)
    const allParagraphs = $("p")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(p => p.length > 15)
      .slice(0, 35);
    const heroIntro = $(".hero p, .intro p, .banner p, [class*='hero'] p, [class*='intro'] p").map((_, el) => $(el).text().trim()).get().filter(Boolean).slice(0, 5);
    const aboutSection = $("[class*='about'] p, #about p").map((_, el) => $(el).text().trim()).get().filter(p => p.length > 20).slice(0, 5);

    // Sections by H2: for each H2, take the following text until next H2
    const sectionsByH2: string[] = [];
    $("h2").slice(0, 12).each((_, h2El) => {
      const h2Text = $(h2El).text().trim();
      const next = $(h2El).nextUntil("h2").map((_, el) => $(el).text().trim()).get().join(" ").trim();
      if (h2Text && next.length > 30) sectionsByH2.push(`[${h2Text}]: ${next.substring(0, 400)}`);
    });

    const navItems = $("nav a, .menu a, .navigation a, header a")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(item => item.length > 1 && item.length < 60)
      .slice(0, 25);

    const listItems = $("li")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(item => item.length > 8 && item.length < 250)
      .slice(0, 30);

    const buttons = $("button, .btn, .button, a[class*='button'], a[class*='btn']")
      .map((_, el) => $(el).text().trim())
      .get()
      .filter(btn => btn.length > 0 && btn.length < 50)
      .slice(0, 12);

    // Strong/bold phrases (often key value props)
    const strongPhrases = $("strong, b").map((_, el) => $(el).text().trim()).get().filter(s => s.length > 3 && s.length < 100).slice(0, 15);

    const content = [
      `=== COMPANY & PAGE INFO ===`,
      `Company Name (from title): ${companyNameFromTitle}`,
      `Logo Alt: ${logoAlt}`,
      `Page Title: ${title}`,
      `Meta Description: ${metaDescription}`,
      `Meta Keywords: ${metaKeywords}`,
      `OG Title: ${ogTitle}`,
      `OG Description: ${ogDescription}`,
      ``,
      `=== HEADINGS STRUCTURE ===`,
      `H1: ${headings.h1.join(" | ")}`,
      `H2: ${headings.h2.join(" | ")}`,
      `H3: ${headings.h3.join(" | ")}`,
      ``,
      `=== HERO / INTRO TEXT ===`,
      heroIntro.join("\n\n"),
      ``,
      `=== ABOUT SECTION ===`,
      aboutSection.join("\n\n"),
      ``,
      `=== CONTENT BY SECTIONS (H2) ===`,
      sectionsByH2.join("\n\n"),
      ``,
      `=== ALL PARAGRAPHS (main body) ===`,
      allParagraphs.join("\n\n"),
      ``,
      `=== KEY PHRASES (bold/strong) ===`,
      strongPhrases.join(" | "),
      ``,
      `=== NAVIGATION / MENU / SERVICES ===`,
      navItems.join(" | "),
      ``,
      `=== LIST ITEMS / FEATURES ===`,
      listItems.join("\n- "),
      ``,
      `=== BUTTONS / CTAs ===`,
      buttons.join(" | "),
    ]
      .filter(Boolean)
      .join("\n\n");

    if (!content.trim() || content.length < 50) {
      console.error("Extracted content too short:", content.substring(0, 200));
      return NextResponse.json(
        { error: "Could not extract meaningful content from the website. The page might be empty, require JavaScript to load content, or be blocked." },
        { status: 500 }
      );
    }

    console.log(`Extracted ${content.length} characters of content`);
    console.log("Content preview:", content.substring(0, 500));

    // Analyze with AI
    let analysis;
    try {
      analysis = await analyzeWebsite(content);
      console.log("Analysis completed:", {
        companyName: analysis.companyName,
        hasConcepts: analysis.conceptSuggestions?.length > 0,
      });
    } catch (error) {
      console.error("AI analysis error:", error);
      return NextResponse.json(
        { error: `AI analysis failed: ${error instanceof Error ? error.message : "Unknown error"}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: parsedUrl.toString(),
      analysis,
    });
  } catch (error) {
    console.error("Analyze URL error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Internal server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
