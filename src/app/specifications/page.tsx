"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, Zap, Shield, Globe, Cpu, BarChart, CheckCircle2 } from "lucide-react";

export default function SpecificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Product Specifications</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Multi-Platform Media Formatter
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive web-based application that automatically generates production-ready visual and textual assets for websites, social media, and digital platforms.
          </p>
        </div>

        {/* Core Features */}
        <Tabs defaultValue="features" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="features">Core Features</TabsTrigger>
            <TabsTrigger value="technical">Technical Requirements</TabsTrigger>
            <TabsTrigger value="audience">Target Audience</TabsTrigger>
            <TabsTrigger value="competitive">Competitive Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Intelligent Format Detection</h3>
                    <p className="text-muted-foreground mb-4">
                      Automatically identifies optimal output formats based on content type and target platform requirements.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        AI-powered content analysis
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Platform-specific optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Automatic dimension detection
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Multi-Platform Export</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate assets optimized for Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, and web platforms.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        15+ platform presets
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Responsive sizing rules
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Custom format creation
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Cpu className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Batch Processing Engine</h3>
                    <p className="text-muted-foreground mb-4">
                      Process multiple assets simultaneously with advanced queuing and priority management.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Parallel processing up to 50 assets
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Priority queue system
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Progress tracking & notifications
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Brand Consistency Manager</h3>
                    <p className="text-muted-foreground mb-4">
                      Maintain brand guidelines across all generated assets with customizable templates and style guides.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Brand kit management
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Color palette enforcement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Typography presets
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Track asset performance, usage statistics, and optimization metrics in real-time.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Real-time usage metrics
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Format popularity insights
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Export history tracking
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI-Powered Optimization</h3>
                    <p className="text-muted-foreground mb-4">
                      Leverage machine learning to automatically enhance images, suggest improvements, and optimize file sizes.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Smart cropping & framing
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Compression optimization
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        Quality enhancement
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technical" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  System Architecture
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Frontend Technology</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Next.js 15 (App Router)</li>
                      <li>• React 19 with TypeScript</li>
                      <li>• Tailwind CSS v4 + Shadcn/UI</li>
                      <li>• Framer Motion for animations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Backend Services</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Next.js API Routes (Serverless)</li>
                      <li>• Node.js 20+ runtime</li>
                      <li>• Redis for caching & queues</li>
                      <li>• WebSocket for real-time updates</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Media Processing
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Image Processing</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Sharp.js for image manipulation</li>
                      <li>• Canvas API for complex operations</li>
                      <li>• WebP, AVIF, JPEG, PNG support</li>
                      <li>• Max file size: 50MB per asset</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Video Processing</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• FFmpeg for video conversion</li>
                      <li>• MP4, WebM, MOV support</li>
                      <li>• Thumbnail extraction</li>
                      <li>• Max duration: 10 minutes</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Storage & CDN
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Cloud Storage</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AWS S3 or Cloudflare R2</li>
                      <li>• Automatic backup & versioning</li>
                      <li>• 30-day retention policy</li>
                      <li>• Encrypted storage at rest</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Content Delivery</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Global CDN (Cloudflare/CloudFront)</li>
                      <li>• Edge caching for fast delivery</li>
                      <li>• Automatic image optimization</li>
                      <li>• 99.9% uptime SLA</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Performance Requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Processing Speed</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Image: &lt;3 seconds per format</li>
                      <li>• Video: &lt;30 seconds per minute</li>
                      <li>• Batch: 50 concurrent jobs</li>
                      <li>• API response: &lt;200ms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Scalability</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 10,000+ concurrent users</li>
                      <li>• 1M+ assets processed/month</li>
                      <li>• Auto-scaling infrastructure</li>
                      <li>• Load balancing across regions</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audience" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Users className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">Marketing Teams</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Digital marketers managing multi-platform campaigns requiring consistent brand assets across channels.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Quick asset generation</li>
                    <li>• Brand consistency</li>
                    <li>• Multiple format exports</li>
                    <li>• Team collaboration</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Target className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">Content Creators</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Influencers, YouTubers, and social media professionals creating content for multiple platforms.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Platform-specific sizing</li>
                    <li>• Batch processing</li>
                    <li>• Quick turnaround</li>
                    <li>• Quality preservation</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">E-commerce Businesses</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Online retailers needing product images optimized for various marketplace platforms and websites.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Marketplace compliance</li>
                    <li>• Bulk processing</li>
                    <li>• Variant generation</li>
                    <li>• API integration</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Globe className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">Agencies</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Digital and creative agencies managing multiple client accounts with diverse brand requirements.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multi-client management</li>
                    <li>• White-label options</li>
                    <li>• Team permissions</li>
                    <li>• Usage reporting</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Cpu className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">Developers</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Software engineers integrating automated media processing into applications and workflows.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• RESTful API access</li>
                    <li>• Webhook notifications</li>
                    <li>• SDK availability</li>
                    <li>• Documentation</li>
                  </ul>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-4">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="text-xl font-semibold">Publishers</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Media companies and publishers distributing content across multiple platforms and formats.
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Needs:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Editorial workflows</li>
                    <li>• Copyright protection</li>
                    <li>• Metadata management</li>
                    <li>• Archive integration</li>
                  </ul>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="competitive" className="space-y-6">
            <Card className="p-6 mb-6">
              <h3 className="text-2xl font-semibold mb-4">Market Position</h3>
              <p className="text-muted-foreground mb-4">
                The Multi-Platform Media Formatter occupies a unique position in the market by combining intelligent automation, 
                multi-platform optimization, and enterprise-grade features in a single, user-friendly interface.
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Market Size</h4>
                  <p className="text-2xl font-bold text-primary">$2.4B</p>
                  <p className="text-sm text-muted-foreground">Digital Asset Management</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Growth Rate</h4>
                  <p className="text-2xl font-bold text-primary">18.5%</p>
                  <p className="text-sm text-muted-foreground">Annual CAGR 2024-2028</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold mb-2">Target Users</h4>
                  <p className="text-2xl font-bold text-primary">500K+</p>
                  <p className="text-sm text-muted-foreground">Potential Customers</p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Direct Competitors</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">Canva</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Design platform with social media templates
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">Strong: Templates</Badge>
                      <Badge variant="outline">Weak: Automation</Badge>
                    </div>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">Adobe Express</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Cloud-based creative tool for quick edits
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">Strong: Quality</Badge>
                      <Badge variant="outline">Weak: Batch Processing</Badge>
                    </div>
                  </div>
                  <div className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold mb-1">Cloudinary</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Media optimization and delivery platform
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">Strong: API</Badge>
                      <Badge variant="outline">Weak: UI/UX</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Competitive Advantages</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">AI-First Approach</h4>
                      <p className="text-sm text-muted-foreground">
                        Intelligent automation reduces manual work by 80%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Platform-Native Optimization</h4>
                      <p className="text-sm text-muted-foreground">
                        15+ platform presets with automatic compliance
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Enterprise-Ready Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Team collaboration, brand management, and API access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Developer-Friendly</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive API, webhooks, and SDK support
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm">Transparent Pricing</h4>
                      <p className="text-sm text-muted-foreground">
                        Simple, predictable pricing without hidden fees
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Platform Support Table */}
        <Card className="p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Supported Platforms & Formats</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-semibold">Platform</th>
                  <th className="text-left p-3 font-semibold">Format Types</th>
                  <th className="text-left p-3 font-semibold">Dimensions</th>
                  <th className="text-left p-3 font-semibold">File Types</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">Instagram</td>
                  <td className="p-3">Feed, Story, Reel, IGTV</td>
                  <td className="p-3">1080x1080, 1080x1920, 1080x1350</td>
                  <td className="p-3">JPG, PNG, GIF, MP4</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">Facebook</td>
                  <td className="p-3">Post, Story, Cover, Ad</td>
                  <td className="p-3">1200x630, 1080x1920, 820x312</td>
                  <td className="p-3">JPG, PNG, GIF, MP4</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">Twitter/X</td>
                  <td className="p-3">Post, Header, Card</td>
                  <td className="p-3">1200x675, 1500x500, 800x418</td>
                  <td className="p-3">JPG, PNG, GIF, MP4</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">LinkedIn</td>
                  <td className="p-3">Post, Article, Banner</td>
                  <td className="p-3">1200x627, 1584x396, 1128x376</td>
                  <td className="p-3">JPG, PNG</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">YouTube</td>
                  <td className="p-3">Thumbnail, Banner, Short</td>
                  <td className="p-3">1280x720, 2560x1440, 1080x1920</td>
                  <td className="p-3">JPG, PNG, MP4</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">TikTok</td>
                  <td className="p-3">Video, Profile</td>
                  <td className="p-3">1080x1920, 200x200</td>
                  <td className="p-3">MP4, PNG</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">Pinterest</td>
                  <td className="p-3">Pin, Board Cover</td>
                  <td className="p-3">1000x1500, 600x600</td>
                  <td className="p-3">JPG, PNG</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="p-3 font-medium">Web/Blog</td>
                  <td className="p-3">Hero, Thumbnail, OG Image</td>
                  <td className="p-3">1920x1080, 1200x630, custom</td>
                  <td className="p-3">JPG, PNG, WebP, AVIF, SVG</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="p-3 font-medium">Favicon</td>
                  <td className="p-3">Standard, Apple Touch, Android</td>
                  <td className="p-3">16x16, 32x32, 38x38, 180x180, 192x192</td>
                  <td className="p-3">ICO, PNG, SVG</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}