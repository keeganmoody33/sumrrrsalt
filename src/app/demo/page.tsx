"use client";

import { Badge } from "@/components/ui/badge";
import AssetFormatterDemo from "@/components/AssetFormatterDemo";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Interactive Demo</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Try the Media Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the power of automated multi-platform asset generation. Upload an image or video and watch it transform into production-ready formats.
          </p>
        </div>

        <AssetFormatterDemo />
      </div>
    </div>
  );
}