"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DEMO_IDEA = {
  title: "EcoTrack — AI-Powered Carbon Footprint Tracker",
  problem:
    "Individuals and small businesses struggle to understand and reduce their carbon footprint. Existing tools are either too complex for consumers or too expensive for small companies, leaving a massive gap in personal sustainability.",
  audience:
    "Environmentally conscious millennials and Gen-Z consumers aged 22-40, plus small business owners who want to track and offset their carbon emissions",
  solution:
    "EcoTrack uses AI to automatically analyze spending data, travel patterns, and energy usage to calculate a real-time carbon footprint score. It provides personalized reduction tips, gamified challenges, and one-tap carbon offset purchases through verified partners.",
  industry: "Climate / Sustainability",
  revenue_model: "Freemium with premium insights at $9.99/mo, plus commission on carbon offset purchases",
};

const DEMO_ANALYSIS = {
  personas: [
    {
      name: "Ava Rodriguez",
      age: 28,
      profession: "UX Designer at a remote-first startup",
      goals: [
        "Live a more sustainable lifestyle without spending hours researching",
        "Track personal carbon impact with real data, not guesswork",
        "Share progress with friends to inspire collective action",
      ],
      pain_points: [
        "Overwhelmed by contradicting sustainability advice online",
        "No single tool connects spending habits to environmental impact",
        "Feels guilty about carbon footprint but doesn't know where to start",
      ],
      why_use:
        "EcoTrack gives Ava a clear, data-driven picture of her carbon footprint and actionable steps to reduce it — without hours of manual tracking.",
    },
    {
      name: "James Okafor",
      age: 35,
      profession: "Small restaurant chain owner (3 locations)",
      goals: [
        "Reduce operational costs through energy efficiency",
        "Market his restaurants as eco-friendly to attract conscious consumers",
        "Meet upcoming local sustainability reporting requirements",
      ],
      pain_points: [
        "Enterprise carbon accounting tools cost $20K+/year",
        "No time to manually audit energy usage across locations",
        "Customers increasingly ask about sustainability practices",
      ],
      why_use:
        "EcoTrack's business tier lets James automatically track emissions across all three locations, generate reports for regulators, and display a verified sustainability badge to customers.",
    },
    {
      name: "Dr. Mei-Lin Chang",
      age: 42,
      profession: "Climate Tech Venture Partner",
      goals: [
        "Find consumer-facing climate startups with viral growth potential",
        "Invest in products with strong data network effects",
        "Back companies that make sustainability accessible to the mainstream",
      ],
      pain_points: [
        "Most climate startups focus on B2B enterprise, not consumers",
        "Hard to find climate products with genuine product-market fit",
        "Consumer climate apps often lack a clear monetization path",
      ],
      why_use:
        "EcoTrack's freemium model, spending-data integration, and carbon offset marketplace create the kind of flywheel Mei-Lin looks for — engaged users, recurring revenue, and measurable impact.",
    },
  ],
  market_insights: {
    estimated_market_size: "$28.9B by 2030",
    growth_trends: [
      "The voluntary carbon offset market grew 40% YoY, reaching $2B in 2025",
      "73% of millennials say they are willing to pay more for sustainable products",
      "ESG regulations are expanding to small businesses in the EU and US, creating mandatory reporting demand",
      "Consumer sustainability app downloads have tripled since 2023, signaling mainstream adoption",
    ],
    why_attractive:
      "The convergence of consumer demand, tightening regulation, and maturing carbon offset infrastructure creates a massive tailwind. Unlike past waves, today's consumers expect automated, data-driven solutions — not manual spreadsheets. The $28.9B market is still early, with no dominant consumer brand, making this a once-in-a-decade entry window.",
  },
  competitors: [
    {
      name: "Joro",
      description:
        "Consumer carbon tracking app that connects to bank accounts to estimate emissions from purchases.",
      strengths: [
        "First-mover in bank-connected carbon tracking",
        "Strong media coverage and brand awareness",
        "Clean, user-friendly mobile app",
      ],
      weaknesses: [
        "US-only, limited international coverage",
        "No gamification or social features to drive retention",
        "No B2B or small business offering",
        "Limited carbon offset marketplace",
      ],
    },
    {
      name: "Pawprint",
      description:
        "UK-based carbon footprint calculator for individuals and employers with a workplace engagement focus.",
      strengths: [
        "Strong B2B2C channel through employer programs",
        "Established in the UK market",
        "Detailed transport and diet tracking",
      ],
      weaknesses: [
        "No automatic spending data integration",
        "Heavy reliance on manual user input",
        "Limited direct-to-consumer traction",
        "No real-time AI-powered insights",
      ],
    },
    {
      name: "Klima",
      description:
        "Subscription-based app focused on carbon offsetting through monthly contributions to climate projects.",
      strengths: [
        "Simple subscription model is easy to understand",
        "Vetted offset project portfolio",
        "Good onboarding flow and impact visualization",
      ],
      weaknesses: [
        "Primarily an offset purchasing tool, not a tracker",
        "No behavioral change recommendations",
        "No business tier",
        "Offset-only model faces growing consumer skepticism",
      ],
    },
  ],
  moat: "EcoTrack builds a compounding moat through three reinforcing layers: (1) Data network effects — every connected bank account and energy meter improves the AI emission-estimation models, making the product more accurate for all users over time. (2) Habit loop + social graph — gamified challenges and friend leaderboards create switching costs that pure-utility tools cannot replicate. (3) Two-sided offset marketplace — as EcoTrack aggregates consumer demand for offsets, it can negotiate exclusive rates with project developers, creating a cost advantage no new entrant can match on day one.",
  validation_score: {
    score: 82,
    breakdown: {
      market_demand: 90,
      innovation: 78,
      competition: 75,
      feasibility: 85,
    },
    explanation:
      "EcoTrack scores very high on market demand (90) — consumer sustainability is a clear macro trend backed by regulation and generational values. Feasibility is strong (85) because the core technologies (bank APIs, emission factor databases, offset APIs) already exist. Innovation is solid (78) — the AI auto-tracking and gamification layer differentiates it, though the core concept of carbon tracking is well-understood. Competition scores 75 — there are players in the space, but none have achieved dominant market share or combined tracking + offsets + social + B2B in one platform.",
  },
  pitch:
    "EcoTrack is an AI-powered carbon footprint platform that turns everyday spending data into actionable climate insights for consumers and small businesses. We're entering a $28.9B market where 73% of millennials actively seek sustainable solutions, yet no single app combines automatic tracking, personalized reduction plans, and one-tap carbon offsets. Our freemium model drives viral adoption through gamified challenges and social leaderboards, while our business tier captures the fast-growing SMB sustainability reporting market created by new ESG regulations. With 3x growth in consumer climate app adoption and a capital-efficient marketplace model, EcoTrack is positioned to become the default brand for personal and small-business carbon management.",
  customer_feedback: [
    "I've wanted something like this for years — I tried calculating my carbon footprint manually once and gave up after 20 minutes. If EcoTrack actually connects to my bank and does it automatically, I'd use it daily.",
    "As a small business owner, I love that this could replace the $15K sustainability consultant I was quoted. The gamification is a nice touch for my personal use, but for my business the reporting features would be the real selling point.",
    "The concept is solid but I'm a bit skeptical about carbon offsets in general — I'd want to see really transparent data about where my money goes. If EcoTrack can nail that trust factor, it could be huge.",
  ],
};

export default function Hero() {
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);

  const handleWatchDemo = () => {
    setDemoLoading(true);
    // Store demo data directly — no API call, works fully offline
    sessionStorage.setItem("valtrix_analysis", JSON.stringify(DEMO_ANALYSIS));
    sessionStorage.setItem("valtrix_idea", JSON.stringify(DEMO_IDEA));
    // Brief delay to feel intentional
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background orbs */}
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />
      <div className="bg-orb-3" />

      {/* Floating glass cards (decorative) */}
      <div className="absolute top-32 left-10 md:left-20 animate-float opacity-40">
        <div className="glass w-48 h-32 p-4">
          <div className="w-8 h-2 bg-accent/50 rounded mb-2" />
          <div className="w-full h-2 bg-white/10 rounded mb-1" />
          <div className="w-3/4 h-2 bg-white/10 rounded mb-1" />
          <div className="w-1/2 h-2 bg-white/10 rounded" />
          <div className="mt-3 flex gap-2">
            <div className="w-12 h-6 bg-amber-500/30 rounded" />
            <div className="w-12 h-6 bg-rose-400/30 rounded" />
          </div>
        </div>
      </div>

      <div className="absolute top-48 right-10 md:right-24 animate-float-delayed opacity-30">
        <div className="glass w-40 h-40 p-4">
          <div className="w-full h-full rounded-lg bg-gradient-to-br from-amber-500/20 to-rose-400/20 flex items-center justify-center">
            <span className="text-3xl font-bold gradient-text">87</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-32 left-16 md:left-32 animate-float-slow opacity-30">
        <div className="glass w-52 h-28 p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-amber-400/30" />
            <div className="w-20 h-2 bg-white/10 rounded" />
          </div>
          <div className="w-full h-2 bg-white/10 rounded mb-1" />
          <div className="w-4/5 h-2 bg-white/10 rounded" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 mb-8 text-sm text-gray-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          AI-Powered Startup Validation
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Turn Startup Ideas Into{" "}
          <span className="gradient-text">Investor-Ready Plans</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Valtrix uses AI to convert raw ideas into personas, market insights,
          validation scores, and investor pitches in minutes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/validate" className="btn-primary text-lg !py-4 !px-10">
            Validate Idea
          </Link>
          <button
            onClick={handleWatchDemo}
            disabled={demoLoading}
            className="btn-secondary text-lg !py-4 !px-10 flex items-center gap-2 disabled:opacity-50"
          >
            {demoLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Loading Demo...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                Watch Demo
              </>
            )}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          {[
            { value: "10K+", label: "Ideas Validated" },
            { value: "95%", label: "Accuracy" },
            { value: "<2min", label: "Analysis Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}