module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/aiClient.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeWebsite",
    ()=>analyzeWebsite,
    "generateBannerImage",
    ()=>generateBannerImage,
    "generateHtmlLayout",
    ()=>generateHtmlLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
// Initialize OpenAI client (will use env vars)
const openai = process.env.OPENAI_API_KEY ? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: process.env.OPENAI_API_KEY
}) : null;
// Check if API key is configured
if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️  OPENAI_API_KEY not found in environment variables. AI features will use mock data.");
}
async function analyzeWebsite(content) {
    const prompt = `You are an expert marketing strategist and brand analyst. Carefully analyze this company website content in detail. Extract ALL key information including company name, what they do, their main services/products, and brand identity.

Website content (read EVERY section carefully - company info, hero, about, sections by H2, paragraphs, key phrases, navigation, list items):
${content.substring(0, 16000)}

Your task - extract in DETAIL:
1. COMPANY NAME: From title, OG title, logo alt, or main H1. Be exact.
2. WHAT THE COMPANY DOES: From meta description, hero/intro, about section, and first paragraphs. Write 2-3 clear sentences covering industry, main business, and key value proposition.
3. MAIN SERVICES/PRODUCTS: From navigation, list items, and section headings. List 4-6 specific offerings (not generic "Services").
4. SUMMARY: A rich 4-6 sentence overview: who they are, what they do, who they serve, key differentiators or numbers (e.g. "500+ engineers"), and tone. Use concrete details from the content.
5. TONE & AUDIENCE: Infer from wording and sections. Be specific (e.g. "B2B enterprises in Asia" not just "businesses").
6. BANNER CONCEPTS: Headlines must include company name; subheadlines must reflect real services/value from the content.

Provide a JSON response with:
- companyName: Exact company name
- companyDescription: 2-3 sentences (what they do, for whom, key strength)
- mainServices: Array of 4-6 specific services/products from the site
- summary: Detailed 4-6 sentence brand overview (use numbers, key phrases, differentiators from content)
- tone: Brand voice (one or two words)
- audience: Specific target (e.g. "B2B enterprises", "SMB in Vietnam")
- conceptSuggestions: Array of 2-3 concepts with headline (company name + value), subheadline (specific services/value), cta, styleGuide (colors, font, mood)
- recommendedPrompt: Detailed banner prompt with company name, real services, and style

Return ONLY valid JSON, no markdown formatting.`;
    // Mock mode if no API key: parse content in detail for rich analysis
    if (!openai) {
        console.log("Using mock analysis (no API key) - extracting from website content");
        const companyNameMatch = content.match(/Company Name \(from title\):\s*(.+?)(?:\n|$)/i) || content.match(/Page Title:\s*(.+?)(?:\s*[-|]\s|$)/i) || content.match(/OG Title:\s*(.+?)(?:\n|$)/i);
        const companyName = companyNameMatch ? companyNameMatch[1].trim().replace(/\s*[-|].*$/, "").substring(0, 80) : "Company";
        const metaDesc = content.match(/Meta Description:\s*(.+?)(?:\n\n|\n===|$)/is);
        const ogDesc = content.match(/OG Description:\s*(.+?)(?:\n\n|\n===|$)/is);
        const companyDescription = (metaDesc?.[1]?.trim() || ogDesc?.[1]?.trim() || "").substring(0, 220) || "Professional services and solutions for your business.";
        const h1Match = content.match(/H1:\s*(.+?)(?:\n\n|\n===|$)/i);
        const h1Text = h1Match ? h1Match[1].trim().split("|").map((s)=>s.trim()).filter(Boolean)[0] : "";
        const heroMatch = content.match(/HERO \/ INTRO TEXT ===\s*\n([\s\S]+?)(?:\n\n===|$)/i);
        const heroText = heroMatch ? heroMatch[1].trim().substring(0, 300) : "";
        const sectionsMatch = content.match(/CONTENT BY SECTIONS \(H2\) ===\s*\n([\s\S]+?)(?:\n\n===|$)/i);
        const sectionsText = sectionsMatch ? sectionsMatch[1].trim().substring(0, 600) : "";
        const navMatch = content.match(/NAVIGATION \/ MENU \/ SERVICES ===\s*\n([\s\S]+?)(?:\n\n===|$)/i);
        const navStr = navMatch ? navMatch[1].trim() : "";
        const mainServices = navStr ? navStr.split("|").map((s)=>s.trim()).filter((s)=>s.length > 2 && s.length < 45).slice(0, 6) : [];
        const listMatch = content.match(/LIST ITEMS \/ FEATURES ===\s*\n-?\s*([\s\S]+?)(?:\n\n===|$)/i);
        const listStr = listMatch ? listMatch[1].trim() : "";
        const listItems = listStr.split(/\n-/).map((s)=>s.trim()).filter((s)=>s.length > 5 && s.length < 80).slice(0, 8);
        if (listItems.length && mainServices.length < 3) mainServices.push(...listItems.slice(0, 4));
        const services = mainServices.length ? mainServices.slice(0, 6) : h1Text ? [
            h1Text
        ] : [
            "Services",
            "Solutions",
            "Consulting"
        ];
        const paragraphsMatch = content.match(/ALL PARAGRAPHS \(main body\) ===\s*\n([\s\S]+?)(?:\n\n===|$)/i);
        const paraText = paragraphsMatch ? paragraphsMatch[1].trim().substring(0, 500) : "";
        const summaryParts = [
            companyName,
            companyDescription,
            heroText || paraText,
            sectionsText
        ].filter(Boolean);
        const summary = summaryParts.join(" ").substring(0, 520) + (summaryParts.join(" ").length > 520 ? "…" : "");
        return {
            companyName: companyName || "Company",
            companyDescription: companyDescription || "Professional solutions",
            mainServices: services,
            summary: summary || "Company information extracted from website.",
            tone: "professional",
            audience: "Businesses and clients seeking quality services",
            conceptSuggestions: [
                {
                    headline: `${companyName} — ${h1Text || "Solutions"}`,
                    subheadline: (companyDescription + (heroText ? " " + heroText.substring(0, 80) : "")).substring(0, 120),
                    cta: "Contact Us",
                    styleGuide: {
                        colors: [
                            "#1e3a5f",
                            "#2563eb",
                            "#0ea5e9"
                        ],
                        font: "Inter",
                        mood: "modern, confident, professional"
                    }
                },
                {
                    headline: `${companyName}`,
                    subheadline: (h1Text || companyDescription).substring(0, 120),
                    cta: "Learn More",
                    styleGuide: {
                        colors: [
                            "#0f766e",
                            "#0d9488",
                            "#14b8a6"
                        ],
                        font: "Inter",
                        mood: "trustworthy, innovative"
                    }
                }
            ],
            recommendedPrompt: `Professional marketing banner for ${companyName}. Display company name prominently. Include: ${companyDescription.substring(0, 100)}. Services: ${services.slice(0, 4).join(", ")}. Modern, clean design.`
        };
    }
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a marketing strategist. Return only valid JSON, no markdown or code blocks."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.7
        });
        const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
        return result;
    } catch (error) {
        console.error("AI analysis error:", error);
        // Return fallback data
        return {
            summary: "Brand analysis completed. Ready to generate banners.",
            tone: "professional",
            audience: "General audience",
            conceptSuggestions: [
                {
                    headline: "Transform Your Business",
                    subheadline: "Discover innovative solutions",
                    cta: "Get Started",
                    styleGuide: {
                        colors: [
                            "#6366f1",
                            "#8b5cf6",
                            "#06b6d4"
                        ],
                        font: "Inter",
                        mood: "modern, confident"
                    }
                }
            ],
            recommendedPrompt: "Modern marketing banner with gradient background, professional typography, clean layout"
        };
    }
}
async function generateBannerImage(prompt) {
    // Mock mode if no API key
    if (!openai) {
        console.log("Using mock image (no API key)");
        // Return a placeholder image URL
        return {
            imageUrl: "https://via.placeholder.com/1200x400/6366f1/ffffff?text=Mock+Banner+Preview%0A(Add+OPENAI_API_KEY+to+generate+real+images)"
        };
    }
    try {
        console.log("Generating image with prompt:", prompt);
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Marketing banner design: ${prompt}. Professional, high-quality, suitable for web advertising.`,
            size: "1024x1792",
            quality: "standard",
            n: 1
        });
        console.log("DALL-E response:", response);
        const imageUrl = response.data[0]?.url || "";
        console.log("Generated image URL:", imageUrl);
        if (!imageUrl) {
            throw new Error("No image URL returned from DALL-E");
        }
        return {
            imageUrl
        };
    } catch (error) {
        console.error("Image generation error:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("Failed to generate image");
    }
}
/**
 * Parse color hints from user prompt (e.g. "vàng đen", "yellow black", "đỏ")
 */ function parseColorsFromPrompt(prompt) {
    const p = prompt.toLowerCase();
    const colorMap = {
        "vàng đen": [
            "#1a1a1a",
            "#2d2d2d",
            "#FACC15"
        ],
        "yellow black": [
            "#1a1a1a",
            "#2d2d2d",
            "#FACC15"
        ],
        "vàng và đen": [
            "#1a1a1a",
            "#FACC15"
        ],
        "đen vàng": [
            "#1a1a1a",
            "#262626",
            "#FACC15"
        ],
        "black yellow": [
            "#1a1a1a",
            "#262626",
            "#FACC15"
        ],
        "đỏ": [
            "#dc2626",
            "#b91c1c",
            "#f87171"
        ],
        "red": [
            "#dc2626",
            "#b91c1c",
            "#f87171"
        ],
        "xanh dương": [
            "#2563eb",
            "#1d4ed8",
            "#3b82f6"
        ],
        "blue": [
            "#2563eb",
            "#1d4ed8",
            "#3b82f6"
        ],
        "xanh lá": [
            "#16a34a",
            "#15803d",
            "#22c55e"
        ],
        "green": [
            "#16a34a",
            "#15803d",
            "#22c55e"
        ],
        "tím": [
            "#7c3aed",
            "#6d28d9",
            "#8b5cf6"
        ],
        "purple": [
            "#7c3aed",
            "#6d28d9",
            "#8b5cf6"
        ],
        "cam": [
            "#ea580c",
            "#c2410c",
            "#f97316"
        ],
        "orange": [
            "#ea580c",
            "#c2410c",
            "#f97316"
        ]
    };
    for (const [key, colors] of Object.entries(colorMap)){
        if (p.includes(key)) return colors;
    }
    if (/\b(vàng|yellow)\b/.test(p) && /\b(đen|black)\b/.test(p)) return [
        "#1a1a1a",
        "#2d2d2d",
        "#FACC15"
    ];
    return null;
}
async function generateHtmlLayout(prompt, concept, companyInfo, userModification) {
    // Mock mode if no API key
    if (!openai) {
        console.log("Using mock HTML/CSS (no API key)");
        const companyName = companyInfo?.companyName || concept?.headline.split(/[-—]/)[0]?.trim() || "Company Name";
        const headline = concept?.headline?.replace(companyName + " - ", "")?.replace(companyName + " — ", "")?.replace(companyName + " ", "") || "Solutions & Services";
        const subheadline = concept?.subheadline || companyInfo?.companyDescription || "Discover innovative solutions for your business.";
        const servicesList = companyInfo?.mainServices?.slice(0, 4) || [];
        const cta = concept?.cta || "Get Started";
        // Apply user's color/modification from prompt (e.g. "vàng đen", "yellow black")
        const promptColors = parseColorsFromPrompt(prompt);
        const colors = promptColors || concept?.styleGuide.colors || [
            "#1e3a5f",
            "#2563eb",
            "#0ea5e9"
        ];
        const servicesHtml = servicesList.length ? `<ul class="banner-services-list">${servicesList.map((s)=>`<li><span class="banner-service-pill">${s}</span></li>`).join("")}</ul>` : "";
        return {
            html: `
        <div class="banner">
          <div class="banner-bg-pattern"></div>
          <div class="banner-inner">
            <div class="banner-main">
              <div class="banner-badge">Professional</div>
              <h1 class="banner-company-name">${companyName}</h1>
              <p class="banner-tagline">${headline}</p>
              <p class="banner-description">${subheadline}</p>
              ${servicesHtml}
              <div class="banner-cta-wrap">
                <button class="banner-cta primary">${cta}</button>
                <span class="banner-cta-secondary">Learn more</span>
              </div>
            </div>
            <div class="banner-side">
              <div class="banner-card">
                <div class="banner-card-value">Trusted</div>
                <div class="banner-card-label">Partner</div>
              </div>
              <div class="banner-card">
                <div class="banner-card-value">Quality</div>
                <div class="banner-card-label">Focus</div>
              </div>
            </div>
          </div>
        </div>
      `,
            css: `
        .banner {
          width: 1200px;
          min-height: 480px;
          background: linear-gradient(135deg, ${colors[0]} 0%, ${colors[1] || colors[0]} 50%, ${colors[2] || colors[1] || colors[0]} 100%);
          border-radius: 16px;
          box-shadow: 0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
        }
        .banner-bg-pattern {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 50% at 100% 50%, rgba(255,255,255,0.12) 0%, transparent 50%),
                      linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.06) 100%);
          pointer-events: none;
        }
        .banner-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          padding: 48px 56px;
          min-height: 480px;
        }
        .banner-main {
          flex: 1;
          max-width: 720px;
          color: #fff;
        }
        .banner-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.18);
          padding: 6px 14px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .banner-company-name {
          font-size: 42px;
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 12px 0;
          text-shadow: 0 2px 20px rgba(0,0,0,0.2);
        }
        .banner-tagline {
          font-size: 22px;
          font-weight: 600;
          opacity: 0.95;
          margin: 0 0 16px 0;
          line-height: 1.35;
        }
        .banner-description {
          font-size: 16px;
          line-height: 1.6;
          opacity: 0.9;
          margin: 0 0 28px 0;
          max-width: 540px;
        }
        .banner-services-list {
          list-style: none;
          margin: 0 0 32px 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .banner-services-list li { margin: 0; padding: 0; }
        .banner-service-pill {
          display: inline-block;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.95);
          background: rgba(255,255,255,0.2);
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.25);
        }
        .banner-cta-wrap {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .banner-cta {
          border: none;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .banner-cta.primary {
          background: #fff;
          color: ${colors[0]};
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .banner-cta.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.25);
        }
        .banner-cta-secondary {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
        }
        .banner-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 16px;
          margin-left: 40px;
        }
        .banner-card {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 12px;
          padding: 20px 28px;
          min-width: 140px;
          text-align: center;
        }
        .banner-card-value {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }
        .banner-card-label {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `
        };
    }
    const companyInfoText = companyInfo ? `\nCompany Name: ${companyInfo.companyName}\nCompany Description: ${companyInfo.companyDescription}\nMain Services: ${companyInfo.mainServices?.join(", ")}` : "";
    const userRequestBlock = userModification && userModification.length > 0 ? `\n\n*** CRITICAL - USER MODIFICATION REQUEST (you MUST apply this): ***\n"${userModification}"\n*** Apply the above changes (colors, style, layout) to the banner. Then follow the requirements below. ***\n\n` : "";
    const layoutPrompt = `${userRequestBlock}You are an expert web designer. Create a RICH, PROFESSIONAL marketing banner (HTML + CSS) that looks like a high-end SaaS/corporate landing hero.

REQUIRED ELEMENTS (include all):
1. COMPANY NAME - large, bold (e.g. 38-44px), prominent at top
2. SHORT TAGLINE or HEADLINE - under company name (e.g. 20-24px)
3. DESCRIPTION - 1-2 sentences explaining what the company does (e.g. 15-17px, max-width for readability)
4. SERVICES / KEY OFFERINGS - display as 3-5 pills or badges (e.g. "Software Development", "Consulting") in a row
5. PRIMARY CTA BUTTON - main action (e.g. "Contact Us", "Get Started")
6. OPTIONAL: small badge at top (e.g. "Professional" or "Trusted Partner") and/or 1-2 small value cards (e.g. "Trusted Partner", "Quality Focus") on the right side

Design requirements:
- Size: 1200px width, min-height 480px (not 400px)
- Layout: main content left (company name, tagline, description, services, CTA); optional cards or accent on right
- Use gradient background with the provided colors; subtle overlay or pattern is fine
- Professional typography: clear hierarchy, good line-height, text-shadow if needed for readability
- Pills/badges for services: rounded, semi-transparent background, readable
- One primary CTA button (white or contrasting), optional secondary text link
- Rounded corners (12-16px), subtle shadow. No simple one-line layout.

Concept details:
Prompt: ${prompt}
${concept ? `Headline: ${concept.headline}\nSubheadline: ${concept.subheadline}\nCTA: ${concept.cta}\nColors: ${concept.styleGuide.colors.join(", ")}\nMood: ${concept.styleGuide.mood}` : ""}
${companyInfoText}

Return a JSON object with:
- html: Complete HTML (semantic: divs with classes like banner, banner-company-name, banner-tagline, banner-description, banner-services-list or banner-service-pill, banner-cta, etc.)
- css: Full CSS for all classes (gradient, spacing, typography, pills, button, cards). Banner must be 1200px wide, min-height 480px.

The banner must look professional and information-rich: anyone should immediately see company name, what they do, and key services.
Return ONLY valid JSON, no markdown formatting.`;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a frontend developer. Return only valid JSON with 'html' and 'css' keys."
                },
                {
                    role: "user",
                    content: layoutPrompt
                }
            ],
            response_format: {
                type: "json_object"
            },
            temperature: 0.8
        });
        const result = JSON.parse(completion.choices[0]?.message?.content || "{}");
        return {
            html: result.html || "<div>Banner HTML</div>",
            css: result.css || "div { padding: 20px; }"
        };
    } catch (error) {
        console.error("HTML generation error:", error);
        return {
            html: '<div class="banner"><h1>Banner</h1></div>',
            css: ".banner { padding: 20px; }"
        };
    }
}
}),
"[project]/src/app/api/regenerate/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/aiClient.ts [app-route] (ecmascript)");
;
;
// Helper function to add delay (simulate thinking)
const delay = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
async function POST(request) {
    try {
        const { basePrompt, userPrompt, mode = "both", companyInfo } = await request.json();
        const userModification = typeof userPrompt === "string" ? userPrompt.trim() : "";
        if (!basePrompt || !userPrompt) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Base prompt and user prompt are required"
            }, {
                status: 400
            });
        }
        const thinkingSteps = [];
        const startTime = Date.now();
        // Analyze new requirements
        thinkingSteps.push({
            step: "Analyzing new requirements",
            timestamp: Date.now() - startTime,
            content: "Processing user's modification requests..."
        });
        await delay(800);
        // Merge prompts
        thinkingSteps.push({
            step: "Merging prompts",
            timestamp: Date.now() - startTime,
            content: `Base: ${basePrompt.substring(0, 100)}...\nUser modifications: ${userPrompt}`
        });
        await delay(600);
        const finalPrompt = `${basePrompt}. ${userPrompt}`;
        thinkingSteps.push({
            step: "Prompt merged",
            timestamp: Date.now() - startTime,
            content: finalPrompt
        });
        const result = {
            promptUsed: finalPrompt,
            thinkingSteps
        };
        // Generate image
        if (mode === "image" || mode === "both") {
            thinkingSteps.push({
                step: "Regenerating image",
                timestamp: Date.now() - startTime,
                content: "Applying new prompt to image generation..."
            });
            try {
                const imageResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateBannerImage"])(finalPrompt);
                result.imageUrl = imageResult.imageUrl;
                thinkingSteps.push({
                    step: "Image regenerated",
                    timestamp: Date.now() - startTime,
                    content: "New image ready"
                });
            } catch (error) {
                thinkingSteps.push({
                    step: "Regeneration failed",
                    timestamp: Date.now() - startTime,
                    content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
                });
            }
        }
        // Generate HTML/CSS (prioritize)
        if (mode === "code" || mode === "both") {
            thinkingSteps.push({
                step: "Redesigning banner layout",
                timestamp: Date.now() - startTime,
                content: "Applying modifications to banner structure..."
            });
            await delay(1000);
            thinkingSteps.push({
                step: "Regenerating HTML/CSS",
                timestamp: Date.now() - startTime,
                content: "Updating layout code with new requirements..."
            });
            await delay(800);
            try {
                const htmlResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$aiClient$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateHtmlLayout"])(finalPrompt, undefined, companyInfo, userModification);
                result.htmlLayout = htmlResult.html;
                result.css = htmlResult.css;
                thinkingSteps.push({
                    step: "Code regenerated",
                    timestamp: Date.now() - startTime,
                    content: "Updated layout ready with modifications",
                    code: `HTML:\n${htmlResult.html.substring(0, 250)}...\n\nCSS:\n${htmlResult.css.substring(0, 250)}...`
                });
            } catch (error) {
                thinkingSteps.push({
                    step: "Code regeneration failed",
                    timestamp: Date.now() - startTime,
                    content: `Error: ${error instanceof Error ? error.message : "Unknown error"}`
                });
            }
        }
        thinkingSteps.push({
            step: "Regeneration complete",
            timestamp: Date.now() - startTime,
            content: "Updated banner ready"
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    } catch (error) {
        console.error("Regenerate error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ce9f4c39._.js.map