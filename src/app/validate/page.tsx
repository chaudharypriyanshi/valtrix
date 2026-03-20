"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import LoadingAnimation from "@/components/LoadingAnimation";


const industries = [
  "SaaS",
  "FinTech",
  "HealthTech",
  "EdTech",
  "E-Commerce",
  "AI / ML",
  "Marketplace",
  "Social Media",
  "Developer Tools",
  "Climate / Sustainability",
  "Real Estate",
  "Gaming",
  "Food & Beverage",
  "Logistics",
  "Cybersecurity",
  "Other",
];

interface FormData {
  title: string;
  problem: string;
  audience: string;
  solution: string;
  industry: string;
  revenue_model: string;
}

export default function ValidatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    title: "",
    problem: "",
    audience: "",
    solution: "",
    industry: "",
    revenue_model: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Store the analysis data and form data in sessionStorage
        sessionStorage.setItem("valtrix_analysis", JSON.stringify(data));
        sessionStorage.setItem("valtrix_idea", JSON.stringify(form));
        router.push("/dashboard");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      {loading && <LoadingAnimation />}

      {/* Background orbs */}
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Validate Your <span className="gradient-text">Startup Idea</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Describe your idea and let AI generate a comprehensive startup
              blueprint in minutes.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="glass border border-red-500/30 bg-red-500/10 rounded-xl px-5 py-4 flex items-start gap-3 text-red-300">
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass-strong p-8 md:p-10 space-y-6">
            {/* Idea Title */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Idea Title <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., AI-powered recipe generator for busy professionals"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              />
            </div>

            {/* Problem Statement */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Problem Statement <span className="text-amber-400">*</span>
              </label>
              <textarea
                name="problem"
                required
                value={form.problem}
                onChange={handleChange}
                rows={3}
                placeholder="What problem does your startup solve? Who suffers from this problem?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Audience <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                name="audience"
                required
                value={form.audience}
                onChange={handleChange}
                placeholder="e.g., Working professionals aged 25-45 in urban areas"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              />
            </div>

            {/* Solution Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Solution Description <span className="text-amber-400">*</span>
              </label>
              <textarea
                name="solution"
                required
                value={form.solution}
                onChange={handleChange}
                rows={3}
                placeholder="How does your product solve the problem? What makes it unique?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none"
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Industry <span className="text-amber-400">*</span>
              </label>
              <select
                name="industry"
                required
                value={form.industry}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="bg-gray-900">
                  Select an industry
                </option>
                {industries.map((ind) => (
                  <option key={ind} value={ind} className="bg-gray-900">
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Revenue Model (optional) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Revenue Model{" "}
                <span className="text-gray-600 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                name="revenue_model"
                value={form.revenue_model}
                onChange={handleChange}
                placeholder="e.g., Subscription, Freemium, Marketplace fees, Ads"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary text-lg !py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Analyzing..." : "Analyze Idea"}
            </button>

            <p className="text-center text-gray-600 text-xs">
              Analysis typically takes 15-30 seconds depending on complexity.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}