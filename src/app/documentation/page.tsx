"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Book, Terminal, Workflow, Webhook, Key } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Documentation</Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Developer Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Complete API reference, integration guides, and workflow documentation for the Multi-Platform Media Formatter.
          </p>
        </div>

        <Tabs defaultValue="api" className="mb-12">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Code className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">RESTful API</h3>
                  <p className="text-muted-foreground">
                    Base URL: <code className="px-2 py-1 bg-muted rounded">https://api.mediaformatter.io/v1</code>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                Authentication
              </h3>
              <p className="text-muted-foreground mb-4">
                All API requests require an API key in the Authorization header:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-muted-foreground">// Example request header</div>
                <div className="text-foreground">
                  Authorization: Bearer YOUR_API_KEY
                </div>
              </div>
            </Card>

            {/* Upload Endpoint */}
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge>POST</Badge>
                  <code className="text-sm">/upload</code>
                </div>
                <p className="text-muted-foreground text-sm">Upload a media file for processing</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Request Body (multipart/form-data)</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "file": <binary>,
  "filename": "example.jpg",
  "optimize": true
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Response (200 OK)</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "success": true,
  "data": {
    "asset_id": "ast_abc123",
    "filename": "example.jpg",
    "size": 2048576,
    "mime_type": "image/jpeg",
    "dimensions": {
      "width": 1920,
      "height": 1080
    },
    "url": "https://cdn.mediaformatter.io/uploads/ast_abc123.jpg",
    "created_at": "2024-01-15T10:30:00Z"
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Process Endpoint */}
            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="secondary">POST</Badge>
                  <code className="text-sm">/process</code>
                </div>
                <p className="text-muted-foreground text-sm">Generate formatted versions of uploaded asset</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Request Body</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "asset_id": "ast_abc123",
  "formats": [
    {
      "platform": "instagram",
      "type": "feed",
      "dimensions": "1080x1080"
    },
    {
      "platform": "facebook",
      "type": "post",
      "dimensions": "1200x630"
    }
  ],
  "options": {
    "quality": 90,
    "format": "webp",
    "optimize": true
  }
}`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Response (202 Accepted)</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "success": true,
  "data": {
    "job_id": "job_xyz789",
    "status": "processing",
    "estimated_time": 15,
    "formats_requested": 2
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Endpoint */}
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">GET</Badge>
                  <code className="text-sm">/status/:job_id</code>
                </div>
                <p className="text-muted-foreground text-sm">Check processing status</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Response (200 OK)</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "success": true,
  "data": {
    "job_id": "job_xyz789",
    "status": "completed",
    "progress": 100,
    "results": [
      {
        "format": "instagram_feed",
        "url": "https://cdn.mediaformatter.io/output/ig_feed_abc.webp",
        "size": 512000,
        "dimensions": "1080x1080"
      },
      {
        "format": "facebook_post",
        "url": "https://cdn.mediaformatter.io/output/fb_post_abc.webp",
        "size": 480000,
        "dimensions": "1200x630"
      }
    ],
    "completed_at": "2024-01-15T10:30:15Z"
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </Card>

            {/* Download Endpoint */}
            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">GET</Badge>
                  <code className="text-sm">/download/:asset_id</code>
                </div>
                <p className="text-muted-foreground text-sm">Download processed assets as ZIP archive</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Query Parameters</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`format=zip
include_original=true`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2">Response</h4>
                  <p className="text-sm text-muted-foreground">Binary ZIP file with Content-Type: application/zip</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Terminal className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Quick Start Integration</h3>
                  <p className="text-muted-foreground">
                    Get up and running in minutes with our official SDKs and code examples.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">JavaScript/TypeScript</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Installation</h4>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      npm install @mediaformatter/sdk
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Usage Example</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import { MediaFormatter } from '@mediaformatter/sdk';

const formatter = new MediaFormatter({
  apiKey: process.env.MF_API_KEY
});

// Upload file
const asset = await formatter.upload({
  file: fileBuffer,
  filename: 'image.jpg'
});

// Process formats
const job = await formatter.process({
  assetId: asset.id,
  formats: [
    { platform: 'instagram', type: 'feed' },
    { platform: 'facebook', type: 'post' }
  ]
});

// Wait for completion
const results = await formatter.waitForCompletion(job.id);
console.log(results);`}</pre>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Python</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Installation</h4>
                    <div className="bg-muted p-3 rounded-lg font-mono text-sm">
                      pip install mediaformatter
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Usage Example</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`from mediaformatter import Client

client = Client(api_key=os.getenv('MF_API_KEY'))

# Upload file
with open('image.jpg', 'rb') as f:
    asset = client.upload(f, filename='image.jpg')

# Process formats
job = client.process(
    asset_id=asset['id'],
    formats=[
        {'platform': 'instagram', 'type': 'feed'},
        {'platform': 'facebook', 'type': 'post'}
    ]
)

# Wait for completion
results = client.wait_for_completion(job['job_id'])
print(results)`}</pre>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">cURL Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Upload File</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X POST https://api.mediaformatter.io/v1/upload \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/image.jpg" \\
  -F "optimize=true"`}</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Process Formats</h4>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X POST https://api.mediaformatter.io/v1/process \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "asset_id": "ast_abc123",
    "formats": [
      {"platform": "instagram", "type": "feed"},
      {"platform": "facebook", "type": "post"}
    ]
  }'`}</pre>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Workflow className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Common Workflows</h3>
                  <p className="text-muted-foreground">
                    Step-by-step guides for typical use cases and integration patterns.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-4">Workflow 1: Single Asset Processing</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upload Asset</h4>
                    <p className="text-sm text-muted-foreground">Upload your source image or video file via the /upload endpoint.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Select Formats</h4>
                    <p className="text-sm text-muted-foreground">Choose target platforms and format types for conversion.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Process</h4>
                    <p className="text-sm text-muted-foreground">Submit processing job via /process endpoint and receive job_id.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Monitor Status</h4>
                    <p className="text-sm text-muted-foreground">Poll /status/:job_id endpoint or listen for webhook events.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Download Results</h4>
                    <p className="text-sm text-muted-foreground">Retrieve processed assets from CDN URLs or via /download endpoint.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-500">
              <h3 className="text-xl font-semibold mb-4">Workflow 2: Batch Processing</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upload Multiple Assets</h4>
                    <p className="text-sm text-muted-foreground">Use parallel uploads or the /batch-upload endpoint for multiple files.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Batch Job</h4>
                    <p className="text-sm text-muted-foreground">Submit all asset_ids with desired formats via /batch-process.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Track Progress</h4>
                    <p className="text-sm text-muted-foreground">Monitor batch job progress with aggregated status updates.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Bulk Download</h4>
                    <p className="text-sm text-muted-foreground">Download all results as organized ZIP archive with folder structure.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-500">
              <h3 className="text-xl font-semibold mb-4">Workflow 3: Brand Template Application</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Create Brand Kit</h4>
                    <p className="text-sm text-muted-foreground">Define brand colors, fonts, logos via /brand-kits endpoint.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Upload Assets</h4>
                    <p className="text-sm text-muted-foreground">Upload source images/videos as usual.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Apply Brand Kit</h4>
                    <p className="text-sm text-muted-foreground">Include brand_kit_id in process request to apply styling.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Review & Download</h4>
                    <p className="text-sm text-muted-foreground">All outputs automatically include brand-consistent styling.</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <Webhook className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Webhook Events</h3>
                  <p className="text-muted-foreground">
                    Receive real-time notifications about job completion, errors, and other events.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Setup Webhooks</h3>
              <p className="text-muted-foreground mb-4">
                Configure webhook endpoints in your dashboard or via API:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <pre>{`curl -X POST https://api.mediaformatter.io/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourdomain.com/webhooks/mediaformatter",
    "events": ["job.completed", "job.failed", "asset.processed"]
  }'`}</pre>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-semibold mb-4">Event: job.completed</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Triggered when a processing job finishes successfully.
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "event": "job.completed",
  "timestamp": "2024-01-15T10:30:15Z",
  "data": {
    "job_id": "job_xyz789",
    "asset_id": "ast_abc123",
    "status": "completed",
    "results": [
      {
        "format": "instagram_feed",
        "url": "https://cdn.mediaformatter.io/output/ig_feed_abc.webp"
      }
    ]
  }
}`}</pre>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-red-500">
              <h3 className="text-lg font-semibold mb-4">Event: job.failed</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Triggered when a processing job encounters an error.
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`{
  "event": "job.failed",
  "timestamp": "2024-01-15T10:30:15Z",
  "data": {
    "job_id": "job_xyz789",
    "asset_id": "ast_abc123",
    "status": "failed",
    "error": {
      "code": "INVALID_FORMAT",
      "message": "Unsupported file format"
    }
  }
}`}</pre>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Webhook Security</h3>
              <p className="text-muted-foreground mb-4">
                All webhook requests include a signature header for verification:
              </p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto mb-4">
                <pre>{`X-MF-Signature: sha256=a3b4c5d6e7f8...`}</pre>
              </div>
              <p className="text-sm text-muted-foreground">
                Verify the signature using your webhook secret to ensure requests are authentic.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Book className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Visit our support portal for additional guides, video tutorials, and community forums.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">support@mediaformatter.io</Badge>
                <Badge variant="outline">docs.mediaformatter.io</Badge>
                <Badge variant="outline">community.mediaformatter.io</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}