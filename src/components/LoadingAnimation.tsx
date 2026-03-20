"use client";

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="glass-strong p-12 flex flex-col items-center gap-6 max-w-md mx-4">
        {/* Animated spinner */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-cyan animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent-light border-l-cyan animate-spin-slow" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-accent to-cyan animate-pulse" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Analyzing Your Idea
          </h3>
          <p className="text-gray-400 text-sm">
            AI is generating personas, market insights, competitor analysis, and
            more...
          </p>
        </div>

        {/* Progress indicators */}
        <div className="w-full space-y-3">
          {[
            "Generating user personas",
            "Analyzing market opportunity",
            "Detecting competitors",
            "Calculating validation score",
            "Crafting investor pitch",
          ].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-3 text-sm animate-fade-in"
              style={{ animationDelay: `${i * 0.8}s`, opacity: 0 }}
            >
              <div className="w-5 h-5 rounded-full border border-accent/30 flex items-center justify-center shrink-0">
                <div
                  className="w-2 h-2 rounded-full bg-accent animate-pulse"
                  style={{ animationDelay: `${i * 0.5}s` }}
                />
              </div>
              <span className="text-gray-400">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}