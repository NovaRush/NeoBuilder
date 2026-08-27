'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Eye, Globe, MessageSquare, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg"></div>
            <span className="font-bold text-xl">NeoBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="text-gray-600 hover:text-gray-900 font-medium">
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            Build websites with AI.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Describe what you want. AI builds it for you. No coding required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/auth/signup"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-bold flex items-center justify-center gap-2 text-lg"
            >
              Start Building <ArrowRight size={20} />
            </Link>
            <a
              href="#how-it-works"
              className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg hover:border-gray-400 font-bold text-lg"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">1. Describe</h3>
              <p className="text-gray-600">Tell AI what you want to build</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">2. Generate</h3>
              <p className="text-gray-600">AI plans and builds your site</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">3. Preview</h3>
              <p className="text-gray-600">See live preview instantly</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">4. Publish</h3>
              <p className="text-gray-600">Deploy to your custom domain</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Zap className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI Generation</h3>
                <p className="text-gray-600">Advanced AI understands your vision and builds production-ready websites</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Eye className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Live Preview</h3>
                <p className="text-gray-600">See changes instantly as you build. Desktop, tablet, and mobile views</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Clock className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Version History</h3>
                <p className="text-gray-600">Never lose your work. Restore any previous version with one click</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Globe className="text-blue-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Custom Domains</h3>
                <p className="text-gray-600">Publish instantly to custom subdomains. Your brand, your domain</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-bold mb-2">Do I need to know how to code?</h3>
              <p className="text-gray-600">No! NeoBuilder is designed for everyone. Just describe what you want, and AI handles the technical details.</p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-bold mb-2">Can I edit my website after it's created?</h3>
              <p className="text-gray-600">Absolutely. Use the AI chat to request any changes. Every modification creates a new version you can revert to.</p>
            </div>
            <div className="border-b pb-6">
              <h3 className="text-lg font-bold mb-2">How do I publish my website?</h3>
              <p className="text-gray-600">Choose a subdomain and click publish. Your site is instantly live at yourname.neobuilder.io</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">What if I'm not happy with the result?</h3>
              <p className="text-gray-600">Our AI learns from feedback. Describe what you'd like changed, and it refines the design until you're satisfied.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to build your next website?</h2>
          <p className="text-xl mb-8 opacity-90">Create an account in seconds and start building with AI.</p>
          <Link
            href="/auth/signup"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 font-bold inline-flex items-center gap-2 text-lg"
          >
            Get Started Free <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 NeoBuilder. Build websites with AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
