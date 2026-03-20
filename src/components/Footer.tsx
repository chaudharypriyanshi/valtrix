import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-cyan flex items-center justify-center">
            <span className="text-white font-bold text-xs">V</span>
          </div>
          <span className="text-sm text-gray-400">
            Valtrix &copy; {new Date().getFullYear()}. AI-Powered Startup Validation.
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/validate" className="text-sm text-gray-500 hover:text-white transition-colors">
            Validate
          </Link>
          <a href="#features" className="text-sm text-gray-500 hover:text-white transition-colors">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}