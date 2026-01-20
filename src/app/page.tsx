"use client";

import { useState, useEffect } from "react";
import AssetFormatterDemo from "@/components/AssetFormatterDemo";
import { Button } from "@/components/ui/button";
import { Zap, ArrowDown, Sparkles, Grid3X3, Download, Image as ImageIcon } from "lucide-react";

const PLATFORMS = [
  "X", "Instagram", "TikTok", "Facebook", "LinkedIn", "Pinterest",
  "YouTube", "Discord", "Twitch", "Reddit", "Threads", "Bluesky", "Mastodon"
];

const PIXEL_ICONS = ["3"];

function PixelRain() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; delay: number; icon: string; color: string }>>([]);
  
  useEffect(() => {
    const colors = ["text-[var(--neon-green)]", "text-[var(--neon-pink)]", "text-[var(--neon-cyan)]", "text-[var(--neon-yellow)]"];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      icon: PIXEL_ICONS[Math.floor(Math.random() * PIXEL_ICONS.length)],
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute text-xl ${p.color} opacity-20 animate-pixel-rain font-pixel`}
          style={{ left: `${p.x}%`, animationDelay: `${p.delay}s` }}
        >
          {p.icon}
        </div>
      ))}
    </div>
  );
}

function AnimatedLogo() {
  const [isFlipping, setIsFlipping] = useState(false);
  
  return (
    <div 
      className={`relative cursor-pointer ${isFlipping ? 'animate-somersault' : ''}`}
      onClick={() => setIsFlipping(true)}
      onAnimationEnd={() => setIsFlipping(false)}
    >
      <div className="w-24 h-24 mx-auto relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--neon-green)] to-[var(--neon-cyan)] opacity-20 blur-xl" />
        <div className="relative w-full h-full border-4 border-[var(--neon-green)] bg-background/80 flex items-center justify-center neon-box">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className="w-5 h-5 bg-[var(--neon-green)]"
                style={{ 
                  opacity: [0, 1, 2, 3, 5, 6, 7, 8].includes(i) ? 0.3 + (i * 0.08) : 1,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlatformMarquee() {
  return (
    <div className="relative overflow-hidden py-4 my-8">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex gap-6 animate-[marquee_30s_linear_infinite]">
        {[...PLATFORMS, ...PLATFORMS].map((platform, i) => (
          <div 
            key={i} 
            className="px-4 py-2 bg-card border border-[var(--neon-green)]/30 text-sm font-pixel text-[var(--neon-green)] whitespace-nowrap platform-badge"
          >
            {platform}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }: { icon: any; title: string; description: string; delay: number }) {
  return (
    <div 
      className="pixel-card p-6 opacity-0 animate-cascade"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="w-12 h-12 border-2 border-[var(--neon-cyan)] flex items-center justify-center mb-4 hover-somersault">
        <Icon className="w-6 h-6 text-[var(--neon-cyan)]" />
      </div>
      <h3 className="font-pixel text-xs text-[var(--neon-green)] mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

function StatBlock({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div 
      className="text-center opacity-0 animate-cascade"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="font-pixel text-2xl md:text-4xl text-gradient-neon mb-2">{value}</div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </div>
  );
}

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (showApp) {
    return (
      <div className="min-h-screen bg-background retro-grid">
        <PixelRain />
        <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
          <button 
            onClick={() => setShowApp(false)}
            className="mb-6 text-[var(--neon-green)] font-pixel text-xs hover:text-[var(--neon-cyan)] transition-colors"
          >
            ← BACK TO HOME
          </button>
          <div className="text-center mb-6">
            <h1 className="font-pixel text-lg md:text-xl text-[var(--neon-green)] neon-text mb-2">SUMRRRSALT</h1>
            <p className="text-muted-foreground text-sm">
              Upload your image. Select platforms. Download pixel-perfect assets.
            </p>
          </div>
          <AssetFormatterDemo />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background retro-grid crt-effect overflow-hidden">
      <PixelRain />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="animate-float">
            <AnimatedLogo />
          </div>
          
          <h1 className="font-pixel text-2xl md:text-4xl text-center mt-8 mb-4">
            <span className="text-gradient-neon">SUMRRRSALT</span>
          </h1>
          
          <p className="font-pixel text-xs md:text-sm text-[var(--neon-cyan)] text-center mb-2 opacity-0 animate-cascade stagger-2">
            ONE IMAGE → EVERY PLATFORM
          </p>
          
          <p className="text-muted-foreground text-center max-w-md mb-8 opacity-0 animate-cascade stagger-3">
            Stop manually resizing. Upload once, export pixel-perfect assets for 
            <span className="text-[var(--neon-pink)]"> 15+ social platforms</span> instantly.
          </p>

          <Button 
            onClick={() => setShowApp(true)}
            className="font-pixel text-xs px-8 py-6 bg-[var(--neon-green)] text-background hover:bg-[var(--neon-cyan)] transition-all animate-pixel-pulse opacity-0 animate-cascade stagger-4"
          >
            <Zap className="w-4 h-4 mr-2" />
            START FORMATTING
          </Button>

          <div className="mt-16 opacity-0 animate-cascade stagger-5">
            <ArrowDown className="w-6 h-6 text-[var(--neon-green)] animate-bounce" />
          </div>
        </section>

        {/* Platform Marquee */}
        <PlatformMarquee />

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatBlock value="15+" label="Platforms" delay={0.1} />
            <StatBlock value="50+" label="Export Sizes" delay={0.2} />
            <StatBlock value="100%" label="Free" delay={0.3} />
            <StatBlock value="0" label="Uploads to Server" delay={0.4} />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-sm md:text-base text-center text-[var(--neon-green)] mb-12">
              {">> FEATURES <<"}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={Grid3X3}
                title="MULTI-STEP SCALING"
                description="Pro-grade 50% step downscaling prevents aliasing artifacts. Your 16px favicons look crisp, not blurry."
                delay={0.1}
              />
              <FeatureCard 
                icon={Sparkles}
                title="AUTO SHARPENING"
                description="Convolution-based sharpening on small assets. Every icon stays sharp at any size."
                delay={0.2}
              />
              <FeatureCard 
                icon={ImageIcon}
                title="SMART CROP"
                description="Automatic center-crop with aspect ratio preservation. No more stretched or squished images."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Value Prop Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="pixel-card p-8 md:p-12">
              <h2 className="font-pixel text-xs md:text-sm text-[var(--neon-pink)] mb-6">
                THE PROBLEM
              </h2>
              <p className="text-muted-foreground mb-6">
                Every platform wants different sizes. X wants 400×400. Instagram wants 320×320. 
                TikTok wants 200×200. YouTube wants 800×800. You waste hours in Photoshop 
                exporting the same image over and over.
              </p>
              
              <div className="w-16 h-1 bg-[var(--neon-green)] mx-auto my-8" />
              
              <h2 className="font-pixel text-xs md:text-sm text-[var(--neon-green)] mb-6">
                THE SOLUTION
              </h2>
              <p className="text-foreground">
                Upload once. Click the platforms you need. Download all assets in seconds. 
                <span className="text-[var(--neon-cyan)]"> Everything runs in your browser</span> — 
                your images never leave your device.
              </p>
            </div>
          </div>
        </section>

        {/* Supported Platforms Grid */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-sm md:text-base text-center text-[var(--neon-cyan)] mb-12">
              {">> SUPPORTED PLATFORMS <<"}
            </h2>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {PLATFORMS.map((platform, i) => (
                <div 
                  key={platform}
                  className="p-3 bg-card border border-border text-center hover:border-[var(--neon-green)] hover:neon-box transition-all cursor-default opacity-0 animate-cascade"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="text-sm">{platform}</span>
                </div>
              ))}
              <div 
                className="p-3 bg-card border border-[var(--neon-pink)] text-center opacity-0 animate-cascade"
                style={{ animationDelay: `${PLATFORMS.length * 0.05}s` }}
              >
                <span className="text-sm text-[var(--neon-pink)]">+ Mobile</span>
              </div>
              <div 
                className="p-3 bg-card border border-[var(--neon-yellow)] text-center opacity-0 animate-cascade"
                style={{ animationDelay: `${(PLATFORMS.length + 1) * 0.05}s` }}
              >
                <span className="text-sm text-[var(--neon-yellow)]">+ Favicons</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-xl mx-auto text-center">
            <div className="font-pixel text-[var(--neon-green)] text-xs mb-4 animate-blink">
              {">>> READY TO FORMAT? <<<"}
            </div>
            
            <Button 
              onClick={() => setShowApp(true)}
              size="lg"
              className="font-pixel text-sm px-12 py-8 bg-[var(--neon-green)] text-background hover:bg-[var(--neon-cyan)] transition-all neon-box"
            >
              <Download className="w-5 h-5 mr-3" />
              LAUNCH SUMRRRSALT
            </Button>
            
            <p className="text-muted-foreground text-xs mt-6">
              Free forever • No signup • Browser-based
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-border">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-pixel text-xs text-muted-foreground">
              SUMRRRSALT v1.0
            </div>
            <div className="text-muted-foreground text-xs">
              Built with pixel-perfect precision
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
