"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass-strong p-12 md:p-16 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-amber-500/15 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-rose-400/15 rounded-full blur-[100px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Validate Your{" "}
              <span className="gradient-text">Startup Idea</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
              Join thousands of founders who use Valtrix to turn raw ideas into
              investor-ready blueprints.
            </p>
            <Link
              href="/validate"
              className="btn-primary text-lg !py-4 !px-12 inline-block"
            >
              Start Validating Your Idea
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}