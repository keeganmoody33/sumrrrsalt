"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Code, Layers, Zap, CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DevelopmentPlanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Development Plan</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Project Roadmap & Timeline
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive development strategy with phased approach, resource allocation, and technology stack recommendations.
          </p>
        </div>

        {/* Project Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">24 Weeks</h3>
            <p className="text-sm text-muted-foreground">Total Duration</p>
          </Card>
          <Card className="p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">8-12</h3>
            <p className="text-sm text-muted-foreground">Team Members</p>
          </Card>
          <Card className="p-6 text-center">
            <Code className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">5 Phases</h3>
            <p className="text-sm text-muted-foreground">Development Stages</p>
          </Card>
          <Card className="p-6 text-center">
            <Zap className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-1">MVP Ready</h3>
            <p className="text-sm text-muted-foreground">in 12 Weeks</p>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="phases" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="phases">Project Phases</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
          </TabsList>

          <TabsContent value="phases" className="space-y-6">
            {/* Phase 1 */}
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2">Phase 1</Badge>
                  <h3 className="text-2xl font-semibold mb-2">Foundation & Planning</h3>
                  <p className="text-muted-foreground">Weeks 1-3 • 3 weeks duration</p>
                </div>
                <Progress value={100} className="w-32" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    Core Objectives
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Complete technical architecture design</li>
                    <li>• Set up development environment</li>
                    <li>• Define API specifications</li>
                    <li>• Create project documentation</li>
                    <li>• Establish CI/CD pipelines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Team Composition
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1 Project Manager</li>
                    <li>• 1 Technical Architect</li>
                    <li>• 2 Full-Stack Developers</li>
                    <li>• 1 UI/UX Designer</li>
                    <li>• 1 DevOps Engineer</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">System Architecture Document</Badge>
                  <Badge variant="outline">API Design Specification</Badge>
                  <Badge variant="outline">Database Schema</Badge>
                  <Badge variant="outline">Project Repository</Badge>
                  <Badge variant="outline">Development Guidelines</Badge>
                </div>
              </div>
            </Card>

            {/* Phase 2 */}
            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2" variant="secondary">Phase 2</Badge>
                  <h3 className="text-2xl font-semibold mb-2">Core Development</h3>
                  <p className="text-muted-foreground">Weeks 4-10 • 7 weeks duration</p>
                </div>
                <Progress value={65} className="w-32" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Core Objectives
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Build file upload & processing system</li>
                    <li>• Implement format conversion engine</li>
                    <li>• Develop user dashboard</li>
                    <li>• Create batch processing queue</li>
                    <li>• Build authentication system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Team Composition
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1 Project Manager (part-time)</li>
                    <li>• 3 Frontend Developers</li>
                    <li>• 3 Backend Developers</li>
                    <li>• 1 UI/UX Designer</li>
                    <li>• 1 QA Engineer</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Upload Interface</Badge>
                  <Badge variant="outline">Processing Engine</Badge>
                  <Badge variant="outline">User Dashboard</Badge>
                  <Badge variant="outline">API Endpoints</Badge>
                  <Badge variant="outline">Authentication Flow</Badge>
                </div>
              </div>
            </Card>

            {/* Phase 3 */}
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2" variant="secondary">Phase 3</Badge>
                  <h3 className="text-2xl font-semibold mb-2">Advanced Features</h3>
                  <p className="text-muted-foreground">Weeks 11-16 • 6 weeks duration</p>
                </div>
                <Progress value={40} className="w-32" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-600" />
                    Core Objectives
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Implement AI optimization features</li>
                    <li>• Build brand management system</li>
                    <li>• Create analytics dashboard</li>
                    <li>• Develop template library</li>
                    <li>• Add team collaboration tools</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Team Composition
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 2 Frontend Developers</li>
                    <li>• 2 Backend Developers</li>
                    <li>• 1 ML Engineer</li>
                    <li>• 1 UI/UX Designer</li>
                    <li>• 1 QA Engineer</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">AI Optimization</Badge>
                  <Badge variant="outline">Brand Kit Manager</Badge>
                  <Badge variant="outline">Analytics Dashboard</Badge>
                  <Badge variant="outline">Template System</Badge>
                  <Badge variant="outline">Collaboration Features</Badge>
                </div>
              </div>
            </Card>

            {/* Phase 4 */}
            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2" variant="secondary">Phase 4</Badge>
                  <h3 className="text-2xl font-semibold mb-2">Testing & Optimization</h3>
                  <p className="text-muted-foreground">Weeks 17-20 • 4 weeks duration</p>
                </div>
                <Progress value={20} className="w-32" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-orange-600" />
                    Core Objectives
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Comprehensive QA testing</li>
                    <li>• Performance optimization</li>
                    <li>• Security audits</li>
                    <li>• Load testing & scaling</li>
                    <li>• Bug fixes & refinements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-600" />
                    Team Composition
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 2 QA Engineers</li>
                    <li>• 2 Backend Developers</li>
                    <li>• 1 Security Specialist</li>
                    <li>• 1 DevOps Engineer</li>
                    <li>• 1 Performance Engineer</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Test Coverage Report</Badge>
                  <Badge variant="outline">Performance Metrics</Badge>
                  <Badge variant="outline">Security Audit</Badge>
                  <Badge variant="outline">Load Test Results</Badge>
                  <Badge variant="outline">Bug Fix Report</Badge>
                </div>
              </div>
            </Card>

            {/* Phase 5 */}
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge className="mb-2" variant="secondary">Phase 5</Badge>
                  <h3 className="text-2xl font-semibold mb-2">Launch & Post-Launch</h3>
                  <p className="text-muted-foreground">Weeks 21-24 • 4 weeks duration</p>
                </div>
                <Progress value={0} className="w-32" />
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Core Objectives
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Beta user onboarding</li>
                    <li>• Production deployment</li>
                    <li>• Marketing materials creation</li>
                    <li>• User documentation</li>
                    <li>• Support system setup</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Team Composition
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 1 Project Manager</li>
                    <li>• 2 Developers (on-call)</li>
                    <li>• 1 Technical Writer</li>
                    <li>• 1 DevOps Engineer</li>
                    <li>• 2 Support Specialists</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Deliverables</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Production Release</Badge>
                  <Badge variant="outline">User Documentation</Badge>
                  <Badge variant="outline">Marketing Site</Badge>
                  <Badge variant="outline">Support Portal</Badge>
                  <Badge variant="outline">Launch Analytics</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Gantt Chart Overview</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Phase 1: Foundation</span>
                    <span className="text-sm text-muted-foreground">Weeks 1-3</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-primary w-[12.5%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Phase 2: Core Development</span>
                    <span className="text-sm text-muted-foreground">Weeks 4-10</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-blue-500 w-[29.17%] ml-[12.5%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Phase 3: Advanced Features</span>
                    <span className="text-sm text-muted-foreground">Weeks 11-16</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-purple-500 w-[25%] ml-[41.67%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Phase 4: Testing</span>
                    <span className="text-sm text-muted-foreground">Weeks 17-20</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-orange-500 w-[16.67%] ml-[66.67%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">Phase 5: Launch</span>
                    <span className="text-sm text-muted-foreground">Weeks 21-24</span>
                  </div>
                  <div className="h-8 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-green-500 w-[16.67%] ml-[83.33%]"></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Key Milestones</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border-l-4 border-l-primary bg-muted/30 rounded">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Week 3: Architecture Approval</h4>
                    <p className="text-sm text-muted-foreground">Complete technical design and get stakeholder sign-off</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border-l-4 border-l-blue-500 bg-muted/30 rounded">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Week 8: Alpha Release</h4>
                    <p className="text-sm text-muted-foreground">Internal testing version with core features functional</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border-l-4 border-l-purple-500 bg-muted/30 rounded">
                  <Clock className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Week 12: MVP Complete</h4>
                    <p className="text-sm text-muted-foreground">Minimum viable product ready for beta testing</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border-l-4 border-l-orange-500 bg-muted/30 rounded">
                  <Clock className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Week 18: Beta Launch</h4>
                    <p className="text-sm text-muted-foreground">Limited public release to gather user feedback</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 border-l-4 border-l-green-500 bg-muted/30 rounded">
                  <Clock className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Week 24: Public Launch</h4>
                    <p className="text-sm text-muted-foreground">Full production release with marketing campaign</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Team Structure
                </h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Frontend Team (4)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1 Lead Frontend Developer (Senior)</li>
                      <li>• 2 Frontend Developers (Mid-level)</li>
                      <li>• 1 UI/UX Designer</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Backend Team (4)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1 Lead Backend Developer (Senior)</li>
                      <li>• 2 Backend Developers (Mid-level)</li>
                      <li>• 1 ML Engineer</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Operations Team (3)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1 DevOps Engineer</li>
                      <li>• 1 QA Engineer</li>
                      <li>• 1 Security Specialist</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Management (2)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 1 Project Manager</li>
                      <li>• 1 Technical Architect</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  Budget Allocation
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">Personnel (60%)</span>
                      <span className="text-sm">$360K</span>
                    </div>
                    <Progress value={60} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">Infrastructure (20%)</span>
                      <span className="text-sm">$120K</span>
                    </div>
                    <Progress value={20} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">Tools & Licenses (10%)</span>
                      <span className="text-sm">$60K</span>
                    </div>
                    <Progress value={10} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">Marketing (5%)</span>
                      <span className="text-sm">$30K</span>
                    </div>
                    <Progress value={5} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-sm">Contingency (5%)</span>
                      <span className="text-sm">$30K</span>
                    </div>
                    <Progress value={5} />
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Budget</span>
                      <span className="font-bold text-lg">$600K</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Required Tools & Services</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Development Tools</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• GitHub Enterprise</li>
                    <li>• Vercel Pro</li>
                    <li>• Figma Professional</li>
                    <li>• Linear/Jira</li>
                    <li>• Postman Team</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Infrastructure</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AWS/Cloudflare</li>
                    <li>• Database (PostgreSQL)</li>
                    <li>• Redis Cloud</li>
                    <li>• CDN Services</li>
                    <li>• Monitoring (Datadog)</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-3">Communication</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Slack Workspace</li>
                    <li>• Zoom Business</li>
                    <li>• Notion/Confluence</li>
                    <li>• Google Workspace</li>
                    <li>• Loom</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="tech-stack" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-6">Recommended Technology Stack</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Frontend Stack
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Next.js 15</div>
                      <p className="text-xs text-muted-foreground">React framework with App Router, RSC, and Server Actions</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">TypeScript 5.3+</div>
                      <p className="text-xs text-muted-foreground">Type-safe development with advanced features</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Tailwind CSS v4</div>
                      <p className="text-xs text-muted-foreground">Utility-first CSS with custom design system</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Shadcn/UI</div>
                      <p className="text-xs text-muted-foreground">Accessible component library with Radix UI</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Framer Motion</div>
                      <p className="text-xs text-muted-foreground">Production-ready animation library</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Zustand/Jotai</div>
                      <p className="text-xs text-muted-foreground">Lightweight state management</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Backend Stack
                  </h4>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Next.js API Routes</div>
                      <p className="text-xs text-muted-foreground">Serverless API with Edge Runtime support</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Prisma ORM</div>
                      <p className="text-xs text-muted-foreground">Type-safe database client with migrations</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">PostgreSQL</div>
                      <p className="text-xs text-muted-foreground">Robust relational database with JSON support</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">Redis</div>
                      <p className="text-xs text-muted-foreground">Caching, queue management, and real-time features</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">BullMQ</div>
                      <p className="text-xs text-muted-foreground">Job queue for batch processing</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="font-semibold text-sm mb-1">tRPC</div>
                      <p className="text-xs text-muted-foreground">End-to-end type-safe API layer</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Media Processing Libraries</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Image Processing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sharp.js - Fast image manipulation</li>
                    <li>• Jimp - Pure JavaScript fallback</li>
                    <li>• Canvas API - Complex operations</li>
                    <li>• ImageMagick - Advanced features</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Video Processing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• FFmpeg - Video conversion</li>
                    <li>• Fluent-ffmpeg - Node.js wrapper</li>
                    <li>• Video.js - Player integration</li>
                    <li>• HLS.js - Streaming support</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">File Handling</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Multer - Upload middleware</li>
                    <li>• File-type - Type detection</li>
                    <li>• Archiver - Compression</li>
                    <li>• Stream processing</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Infrastructure & DevOps</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Hosting & Deployment</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">Vercel</div>
                      <p className="text-xs text-muted-foreground">Primary hosting with automatic deployments</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">Cloudflare</div>
                      <p className="text-xs text-muted-foreground">CDN, DDoS protection, and R2 storage</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">Docker</div>
                      <p className="text-xs text-muted-foreground">Containerization for consistent environments</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Monitoring & Analytics</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">Vercel Analytics</div>
                      <p className="text-xs text-muted-foreground">Web vitals and performance metrics</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">Sentry</div>
                      <p className="text-xs text-muted-foreground">Error tracking and performance monitoring</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <div className="font-semibold text-sm">PostHog</div>
                      <p className="text-xs text-muted-foreground">Product analytics and feature flags</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Risk Management */}
        <Card className="p-6">
          <h3 className="text-2xl font-semibold mb-6">Risk Management & Mitigation</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4 text-destructive">Potential Risks</h4>
              <div className="space-y-3">
                <div className="p-3 border border-destructive/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Technical Complexity</div>
                  <p className="text-xs text-muted-foreground">Media processing at scale is challenging</p>
                </div>
                <div className="p-3 border border-destructive/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Resource Constraints</div>
                  <p className="text-xs text-muted-foreground">Budget and timeline pressures</p>
                </div>
                <div className="p-3 border border-destructive/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Third-Party Dependencies</div>
                  <p className="text-xs text-muted-foreground">Platform API changes and limitations</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-green-600">Mitigation Strategies</h4>
              <div className="space-y-3">
                <div className="p-3 border border-green-600/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Agile Methodology</div>
                  <p className="text-xs text-muted-foreground">2-week sprints with regular reviews</p>
                </div>
                <div className="p-3 border border-green-600/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Modular Architecture</div>
                  <p className="text-xs text-muted-foreground">Isolated components for easier updates</p>
                </div>
                <div className="p-3 border border-green-600/20 rounded-lg">
                  <div className="font-semibold text-sm mb-1">Contingency Buffer</div>
                  <p className="text-xs text-muted-foreground">15% time and budget buffer built-in</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}