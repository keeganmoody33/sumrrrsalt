# Multi-Format Export Implementation Plan

## Overview
Extend SUMRRRSALT to support multiple output formats (PNG, JPEG, WebP, ICO, SVG) beyond the current PNG-only export.

---

## When Do You Need Each Format?

| Format | Use Case | When You Discover You Need It |
|--------|----------|-------------------------------|
| **PNG** | Transparency, logos, icons | Default for most social media |
| **JPEG** | Photos, large images | When file size matters, no transparency needed |
| **WebP** | Modern web performance | Website optimization, 30% smaller than PNG |
| **ICO** | Favicons | Building a website, browser tabs |
| **SVG** | Infinite scaling, print | Logo needs to work at any size, print materials |

---

## Implementation Phases

### Phase 1: JPEG & WebP Export (Easy - 2-3 hours)

**Changes Required:**

1. **Add format type to Format interface**
```typescript
interface Format {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: string;
  outputFormat?: 'png' | 'jpeg' | 'webp';  // NEW
}
```

2. **Add quality setting for lossy formats**
```typescript
interface ExportSettings {
  jpegQuality: number;  // 0.7 - 0.95
  webpQuality: number;  // 0.7 - 0.95
}
```

3. **Modify `generateImageForFormat` function**
```typescript
// Current (line ~651-657):
let blob: Blob;
if (currentCanvas instanceof OffscreenCanvas) {
  blob = await currentCanvas.convertToBlob({ type: "image/png" });
}

// New:
const mimeType = format.outputFormat === 'jpeg' ? 'image/jpeg' 
               : format.outputFormat === 'webp' ? 'image/webp' 
               : 'image/png';
const quality = format.outputFormat === 'png' ? undefined : settings.quality;
blob = await currentCanvas.convertToBlob({ type: mimeType, quality });
```

4. **Add UI controls**
   - Format selector per export (PNG/JPEG/WebP)
   - Quality slider (60-100%) for JPEG/WebP
   - "Transparent background" toggle (auto-selects PNG)

**Files to Modify:**
- `src/components/AssetFormatterDemo.tsx` - Add format selection UI, modify blob generation

---

### Phase 2: ICO Bundle Export (Medium - 4-6 hours)

**What makes ICO different:**
- ICO is a container format holding multiple PNG/BMP images
- Browsers read 16x16, 32x32, 48x48 from single .ico file
- Requires binary packing

**Implementation:**

1. **Create ICO encoder utility**
```typescript
// src/lib/ico-encoder.ts
export async function createICO(images: { size: number; blob: Blob }[]): Promise<Blob> {
  // ICO header (6 bytes)
  // Image directory entries (16 bytes each)
  // Image data (PNG blobs concatenated)
}
```

2. **Add "Bundle as ICO" option for favicon exports**
   - When user selects multiple favicon sizes (16, 32, 48, 64)
   - Offer option to bundle into single favicon.ico

3. **ICO Structure:**
```
Header (6 bytes):
  - Reserved: 0
  - Type: 1 (icon)
  - Count: number of images

Directory (16 bytes per image):
  - Width, Height
  - Color count
  - Reserved
  - Planes
  - Bit count
  - Size of image data
  - Offset to image data

Image Data:
  - PNG data for each size
```

**Files to Create:**
- `src/lib/ico-encoder.ts` - ICO file format encoder

**Files to Modify:**
- `src/components/AssetFormatterDemo.tsx` - Add "Download as ICO" button for favicon group

---

### Phase 3: SVG Support (Hard - 8-12 hours)

**The Challenge:**
Raster (PNG/JPEG) → Vector (SVG) requires image tracing. Two approaches:

#### Option A: Accept SVG Input, Preserve Vector (Recommended for MVP)
- If user uploads SVG, keep it as SVG
- Scale SVG to required dimensions
- Only rasterize when necessary (favicon sizes)

```typescript
// Detect SVG input
if (selectedFile.type === 'image/svg+xml') {
  // Parse and resize SVG
  // Output as SVG for large sizes
  // Rasterize only for small sizes (< 64px)
}
```

#### Option B: Raster → Vector Tracing (Advanced)
- Use potrace/imagetracer library
- Convert bitmap to paths
- Best for simple graphics, logos

**Libraries to evaluate:**
- `potrace` - Classic bitmap tracing
- `imagetracer.js` - Browser-compatible tracer
- `svg.js` - SVG manipulation

**Implementation Steps:**

1. **SVG Input Handler**
```typescript
const handleSVGFile = async (file: File) => {
  const svgText = await file.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
  // Extract viewBox, preserve paths
};
```

2. **SVG Output Generator**
```typescript
const generateSVGOutput = (originalSVG: SVGElement, targetWidth: number, targetHeight: number) => {
  // Clone SVG, update viewBox/dimensions
  // Serialize to string
  // Create blob
};
```

3. **Raster → SVG Tracing (Optional)**
```typescript
import ImageTracer from 'imagetracer.js';

const traceImageToSVG = async (imageData: ImageData) => {
  return ImageTracer.imageToSVG(imageData, {
    numberofcolors: 16,
    pathomit: 8,
    // tuning options
  });
};
```

**Files to Create:**
- `src/lib/svg-handler.ts` - SVG parsing, manipulation, output
- `src/lib/image-tracer.ts` - Optional raster-to-vector conversion

---

## UI/UX Changes

### Format Selection Interface

```
┌─────────────────────────────────────────────┐
│ Output Format                               │
├─────────────────────────────────────────────┤
│ ○ PNG (default)  - Lossless, transparency   │
│ ○ JPEG          - Smaller files, photos     │
│ ○ WebP          - Modern, best compression  │
│                                             │
│ Quality: [====●=====] 85%                   │
│ (Only for JPEG/WebP)                        │
└─────────────────────────────────────────────┘
```

### Per-Platform Format Hints

| Platform | Recommended Format | Why |
|----------|-------------------|-----|
| Profile pics | PNG | Transparency for round crops |
| Banners/covers | JPEG/WebP | Photos compress better |
| Favicons | ICO bundle | Browser compatibility |
| Logos | SVG (if vector source) | Scale-independent |

---

## Technical Considerations

### Browser Support
| Format | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| PNG    | ✅     | ✅      | ✅     | ✅   |
| JPEG   | ✅     | ✅      | ✅     | ✅   |
| WebP   | ✅     | ✅      | ✅ 14+ | ✅   |
| ICO    | Manual encode | Manual encode | Manual encode | Manual encode |
| SVG    | ✅     | ✅      | ✅     | ✅   |

### File Size Estimates (1024x1024 image)
| Format | Typical Size | vs PNG |
|--------|-------------|--------|
| PNG    | ~500KB      | -      |
| JPEG 85%| ~150KB     | -70%   |
| WebP 85%| ~100KB     | -80%   |

---

## Recommended Implementation Order

1. **Week 1: Phase 1** - JPEG/WebP with quality slider
   - Immediate value, minimal code changes
   - Users can optimize file sizes

2. **Week 2: Phase 2** - ICO bundling
   - Complete favicon workflow
   - Differentiates from basic tools

3. **Week 3+: Phase 3** - SVG support
   - Start with SVG input preservation
   - Add tracing as stretch goal

---

## Code Architecture

```
src/
├── components/
│   └── AssetFormatterDemo.tsx    # Main component (modify)
├── lib/
│   ├── image-processor.ts        # NEW: Centralized image processing
│   ├── ico-encoder.ts            # NEW: ICO file format
│   └── svg-handler.ts            # NEW: SVG utilities
└── types/
    └── formats.ts                # NEW: Type definitions
```

---

## Success Metrics

- [ ] JPEG/WebP exports work with quality control
- [ ] ICO bundles favicon sizes into single file
- [ ] SVG input files are preserved as vectors when possible
- [ ] File sizes reduced by 50%+ for photo content (JPEG/WebP)
- [ ] No regression in current PNG export quality
