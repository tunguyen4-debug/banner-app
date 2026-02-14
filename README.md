# AI Marketing Banner Studio

A Next.js webapp that generates marketing banners and posters from any company website URL using AI.

## Features

- **URL Analysis**: Paste any company/product website URL and AI analyzes the brand, messaging, and visual style
- **AI Banner Generation**: Generate professional marketing banners using DALL-E 3
- **HTML/CSS Code Generation**: Get ready-to-use HTML/CSS code for your banners
- **Prompt-Based Editing**: Refine banners using natural language prompts
- **Thinking Panel**: See real-time AI generation steps, prompts, and code snippets
- **Professional UI**: Modern, responsive design with dark theme

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Clone or navigate to the project directory:
```bash
cd ai-banner-app
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Landing Page**: Enter a company/product website URL and click "Analyze"
2. **Editor Page**: 
   - Review AI-generated concepts
   - Select a concept or enter custom prompt
   - Click "Generate Banner" to create your design
   - Use "Regenerate" to refine with new prompts
   - View "Thinking Panel" to see AI steps and code
   - Switch between "Image" and "Code" views
   - Copy HTML/CSS code or open image in new tab

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini (text analysis) + DALL-E 3 (image generation)
- **Web Scraping**: Cheerio
- **UI**: React Hot Toast (notifications)

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── analyze-url/      # Analyze website content
│   │   ├── generate-design/  # Generate banner (image + HTML/CSS)
│   │   └── regenerate/        # Regenerate with new prompt
│   ├── editor/                # Editor page with components
│   │   ├── page.tsx           # Main editor page
│   │   ├── prompt-editor.tsx  # Prompt input component
│   │   ├── design-preview.tsx # Preview component
│   │   └── thinking-panel.tsx # AI thinking/log panel
│   ├── layout.tsx             # Root layout with header/footer
│   ├── page.tsx               # Landing page
│   └── url-input-form.tsx     # URL input form component
└── lib/
    └── aiClient.ts            # OpenAI API client functions
```

## Environment Variables

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy

## License

MIT
