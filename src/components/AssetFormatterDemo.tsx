"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Upload, Image as ImageIcon, Download, CheckCircle2, Loader2, Move, Square, Smartphone, Monitor, Crop, FileImage, Settings2, Maximize2, Grid3X3 } from "lucide-react";
import FreeFocus from "./FreeFocus";

type OutputFormat = 'png' | 'jpeg' | 'webp' | 'svg';

interface Format {
  id: string;
  name: string;
  width: number;
  height: number;
  platform: string;
}

interface ExportSettings {
  outputFormat: OutputFormat;
  quality: number;
  svgColors: number;
  svgDetail: number;
}

interface Platform {
  id: string;
  name: string;
  formats: Format[];
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CropPreset {
  id: string;
  name: string;
  icon: React.ReactNode;
  aspectRatio: number | null;
  description: string;
  color: string;
}

const CROP_PRESETS: CropPreset[] = [
  { id: "square", name: "Square", icon: <Square className="w-4 h-4" />, aspectRatio: 1, description: "Profile pics, feed posts", color: "var(--neon-green)" },
  { id: "portrait", name: "Portrait", icon: <Smartphone className="w-4 h-4" />, aspectRatio: 9/16, description: "Stories, Reels, TikTok", color: "var(--neon-pink)" },
  { id: "landscape", name: "Landscape", icon: <Monitor className="w-4 h-4" />, aspectRatio: 16/9, description: "Banners, headers, covers", color: "var(--neon-cyan)" },
  { id: "wide", name: "Ultra Wide", icon: <Monitor className="w-4 h-4" />, aspectRatio: 3, description: "YouTube banners, Twitch", color: "var(--neon-yellow)" },
];

const platforms: Platform[] = [
  {
    id: "twitter",
    name: "X (Twitter)",
    formats: [
      { id: "tw-profile", name: "Profile Picture", width: 400, height: 400, platform: "X (Twitter)" },
      { id: "tw-header", name: "Header / Banner", width: 1500, height: 500, platform: "X (Twitter)" },
      { id: "tw-post", name: "Post Image", width: 1200, height: 675, platform: "X (Twitter)" },
    ],
  },
  {
    id: "instagram",
    name: "Instagram",
    formats: [
      { id: "ig-profile", name: "Profile Picture", width: 320, height: 320, platform: "Instagram" },
      { id: "ig-feed-square", name: "Feed (Square)", width: 1080, height: 1080, platform: "Instagram" },
      { id: "ig-feed-portrait", name: "Feed (Portrait)", width: 1080, height: 1350, platform: "Instagram" },
      { id: "ig-story", name: "Story / Reel", width: 1080, height: 1920, platform: "Instagram" },
    ],
  },
  {
    id: "tiktok",
    name: "TikTok",
    formats: [
      { id: "tt-profile", name: "Profile Picture", width: 200, height: 200, platform: "TikTok" },
      { id: "tt-story", name: "Story / Post", width: 1080, height: 1920, platform: "TikTok" },
    ],
  },
  {
    id: "facebook",
    name: "Facebook",
    formats: [
      { id: "fb-profile", name: "Profile Picture", width: 170, height: 170, platform: "Facebook" },
      { id: "fb-cover", name: "Cover Photo", width: 851, height: 315, platform: "Facebook" },
      { id: "fb-post", name: "Post Image", width: 1200, height: 630, platform: "Facebook" },
    ],
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    formats: [
      { id: "li-profile", name: "Profile Picture", width: 400, height: 400, platform: "LinkedIn" },
      { id: "li-banner", name: "Profile Banner", width: 1584, height: 396, platform: "LinkedIn" },
      { id: "li-post", name: "Post Image", width: 1200, height: 627, platform: "LinkedIn" },
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    formats: [
      { id: "pin-profile", name: "Profile Picture", width: 165, height: 165, platform: "Pinterest" },
      { id: "pin-board", name: "Board Cover", width: 800, height: 450, platform: "Pinterest" },
      { id: "pin-standard", name: "Standard Pin", width: 1000, height: 1500, platform: "Pinterest" },
    ],
  },
  {
    id: "youtube",
    name: "YouTube",
    formats: [
      { id: "yt-profile", name: "Profile Picture", width: 800, height: 800, platform: "YouTube" },
      { id: "yt-banner", name: "Channel Banner", width: 2560, height: 1440, platform: "YouTube" },
      { id: "yt-thumbnail", name: "Video Thumbnail", width: 1280, height: 720, platform: "YouTube" },
    ],
  },
  {
    id: "discord",
    name: "Discord",
    formats: [
      { id: "dc-profile", name: "Profile Picture", width: 400, height: 400, platform: "Discord" },
      { id: "dc-banner", name: "Profile Banner", width: 1500, height: 500, platform: "Discord" },
    ],
  },
  {
    id: "twitch",
    name: "Twitch",
    formats: [
      { id: "tw-avatar", name: "Profile Picture", width: 800, height: 800, platform: "Twitch" },
      { id: "tw-banner", name: "Profile Banner", width: 2560, height: 1440, platform: "Twitch" },
      { id: "tw-panel", name: "Panel", width: 320, height: 600, platform: "Twitch" },
    ],
  },
  {
    id: "reddit",
    name: "Reddit",
    formats: [
      { id: "rd-profile", name: "Profile Picture", width: 256, height: 256, platform: "Reddit" },
      { id: "rd-banner", name: "Banner", width: 1920, height: 384, platform: "Reddit" },
      { id: "rd-post", name: "Post Image", width: 1920, height: 1080, platform: "Reddit" },
    ],
  },
  {
    id: "threads",
    name: "Threads",
    formats: [
      { id: "th-profile", name: "Profile Picture", width: 320, height: 320, platform: "Threads" },
      { id: "th-post", name: "Post Image", width: 1080, height: 1920, platform: "Threads" },
    ],
  },
  {
    id: "bluesky",
    name: "Bluesky",
    formats: [
      { id: "bs-profile", name: "Profile Picture", width: 400, height: 400, platform: "Bluesky" },
      { id: "bs-banner", name: "Banner", width: 1500, height: 500, platform: "Bluesky" },
    ],
  },
  {
    id: "mastodon",
    name: "Mastodon",
    formats: [
      { id: "ms-profile", name: "Profile Picture", width: 400, height: 400, platform: "Mastodon" },
      { id: "ms-header", name: "Header", width: 1500, height: 500, platform: "Mastodon" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile App Icons",
    formats: [
      { id: "ios-icon", name: "iOS App Icon", width: 1024, height: 1024, platform: "Mobile" },
      { id: "android-icon", name: "Android Play Store", width: 512, height: 512, platform: "Mobile" },
    ],
  },
  {
    id: "web",
    name: "Web / Favicon",
    formats: [
      { id: "web-favicon-16", name: "Favicon 16x16", width: 16, height: 16, platform: "Web" },
      { id: "web-favicon-32", name: "Favicon 32x32", width: 32, height: 32, platform: "Web" },
      { id: "web-favicon-48", name: "Favicon 48x48", width: 48, height: 48, platform: "Web" },
      { id: "web-favicon-64", name: "Favicon 64x64", width: 64, height: 64, platform: "Web" },
      { id: "web-favicon-180", name: "Apple Touch Icon", width: 180, height: 180, platform: "Web" },
      { id: "web-favicon-192", name: "Android Icon", width: 192, height: 192, platform: "Web" },
      { id: "web-favicon-512", name: "PWA Icon", width: 512, height: 512, platform: "Web" },
      { id: "web-og", name: "OG Image", width: 1200, height: 630, platform: "Web" },
    ],
  },
];

const allFormats = platforms.flatMap((p) => p.formats);

function getPresetForFormat(format: Format): string {
  const ar = format.width / format.height;
  if (Math.abs(ar - 1) < 0.1) return "square";
  if (ar < 0.8) return "portrait";
  if (ar >= 2.5) return "wide";
  return "landscape";
}

function CropEditor({ 
  imageUrl, 
  imageWidth, 
  imageHeight, 
  crops, 
  onCropsChange,
  activePreset,
  onPresetChange
}: { 
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  crops: Record<string, CropArea>;
  onCropsChange: (crops: Record<string, CropArea>) => void;
  activePreset: string;
  onPresetChange: (preset: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scaleX = rect.width / imageWidth;
      const scaleY = rect.height / imageHeight;
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
      setContainerSize({ width: rect.width, height: rect.height });
    }
  }, [imageWidth, imageHeight]);

  const currentCrop = crops[activePreset];
  const preset = CROP_PRESETS.find(p => p.id === activePreset);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !currentCrop) return;

    const dx = (e.clientX - dragStart.x) / scale;
    const dy = (e.clientY - dragStart.y) / scale;

    const newX = Math.max(0, Math.min(imageWidth - currentCrop.width, currentCrop.x + dx));
    const newY = Math.max(0, Math.min(imageHeight - currentCrop.height, currentCrop.y + dy));

    onCropsChange({
      ...crops,
      [activePreset]: { ...currentCrop, x: newX, y: newY }
    });

    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart, currentCrop, activePreset, crops, onCropsChange, scale, imageWidth, imageHeight]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const scaledImageWidth = imageWidth * scale;
  const scaledImageHeight = imageHeight * scale;
  const offsetX = (containerSize.width - scaledImageWidth) / 2;
  const offsetY = (containerSize.height - scaledImageHeight) / 2;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 justify-center">
        {CROP_PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => onPresetChange(p.id)}
            className={`flex items-center gap-2 px-3 py-2 border-2 rounded transition-all text-sm ${
              activePreset === p.id
                ? "border-[var(--neon-green)] bg-[var(--neon-green)]/10"
                : "border-border hover:border-[var(--neon-green)]/50"
            }`}
            style={{ 
              borderColor: activePreset === p.id ? p.color : undefined,
              backgroundColor: activePreset === p.id ? `${p.color}20` : undefined 
            }}
          >
            {p.icon}
            <div className="text-left">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[400px] bg-black/50 rounded-lg overflow-hidden select-none"
      >
        <div
          className="absolute"
          style={{
            left: offsetX,
            top: offsetY,
            width: scaledImageWidth,
            height: scaledImageHeight,
          }}
        >
          <img
            src={imageUrl}
            alt="Crop preview"
            className="absolute inset-0 w-full h-full object-contain opacity-40"
            draggable={false}
          />
          
          {currentCrop && (
            <>
              <div
                className="absolute border-4 cursor-move transition-colors"
                style={{
                  left: currentCrop.x * scale,
                  top: currentCrop.y * scale,
                  width: currentCrop.width * scale,
                  height: currentCrop.height * scale,
                  borderColor: preset?.color || "var(--neon-green)",
                  boxShadow: `0 0 0 9999px rgba(0,0,0,0.6), 0 0 20px ${preset?.color || "var(--neon-green)"}`,
                }}
                onMouseDown={handleMouseDown}
              >
                <img
                  src={imageUrl}
                  alt="Crop area"
                  className="absolute"
                  style={{
                    left: -currentCrop.x * scale,
                    top: -currentCrop.y * scale,
                    width: scaledImageWidth,
                    height: scaledImageHeight,
                  }}
                  draggable={false}
                />
                
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div 
                    className="p-2 rounded-full bg-black/50"
                    style={{ color: preset?.color }}
                  >
                    <Move className="w-6 h-6" />
                  </div>
                </div>

                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
                  style={{ 
                    top: "33.33%", 
                    background: `linear-gradient(90deg, transparent, ${preset?.color}, transparent)` 
                  }} 
                />
                <div 
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-30"
                  style={{ 
                    top: "66.66%", 
                    background: `linear-gradient(90deg, transparent, ${preset?.color}, transparent)` 
                  }} 
                />
                <div 
                  className="absolute top-0 bottom-0 w-[1px] opacity-30"
                  style={{ 
                    left: "33.33%", 
                    background: `linear-gradient(transparent, ${preset?.color}, transparent)` 
                  }} 
                />
                <div 
                  className="absolute top-0 bottom-0 w-[1px] opacity-30"
                  style={{ 
                    left: "66.66%", 
                    background: `linear-gradient(transparent, ${preset?.color}, transparent)` 
                  }} 
                />
              </div>
            </>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-muted-foreground bg-black/50 p-2 rounded">
          <span>Drag to reposition • {preset?.name} crop</span>
          <span style={{ color: preset?.color }}>
            {currentCrop ? `${Math.round(currentCrop.width)} × ${Math.round(currentCrop.height)}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AssetFormatterDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [assets, setAssets] = useState<Record<string, { url: string; blob: Blob; width: number; height: number; filename: string }>>({});
  const [tab, setTab] = useState<"upload" | "crop" | "format" | "preview">("upload");
  const [crops, setCrops] = useState<Record<string, CropArea>>({});
  const [activePreset, setActivePreset] = useState("square");
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    outputFormat: 'png',
    quality: 0.85,
    svgColors: 16,
    svgDetail: 1
  });
  const [mode, setMode] = useState<"select" | "freefocus" | "pipeline">("select");

  const initializeCrops = useCallback((imgWidth: number, imgHeight: number) => {
    const newCrops: Record<string, CropArea> = {};
    
    for (const preset of CROP_PRESETS) {
      const ar = preset.aspectRatio || imgWidth / imgHeight;
      let cropW: number, cropH: number;

      if (imgWidth / imgHeight > ar) {
        cropH = imgHeight;
        cropW = cropH * ar;
      } else {
        cropW = imgWidth;
        cropH = cropW / ar;
      }

      newCrops[preset.id] = {
        x: (imgWidth - cropW) / 2,
        y: (imgHeight - cropH) / 2,
        width: cropW,
        height: cropH
      };
    }

    setCrops(newCrops);
  }, []);

  const saveBlob = async (blob: Blob, filename: string) => {
    if (!blob || blob.size === 0) {
      console.error('Cannot save empty blob:', filename);
      return;
    }
    
    try {
      // Create a blob URL
      const url = URL.createObjectURL(blob);
      
      // Try multiple methods for maximum compatibility in sandboxed environments
      
      // Method 1: Standard anchor download
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      link.style.visibility = 'hidden';
      link.style.position = 'absolute';
      document.body.appendChild(link);
      link.click();
      
      // Method 2: Orchids-specific external URL opening (might trigger browser download)
      // We do this after a short delay so the standard method has a chance
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        
        // As a fallback, try to open the blob URL via the parent window
        // This is often more reliable in sandboxed iframes
        window.parent.postMessage({ 
          type: "OPEN_EXTERNAL_URL", 
          data: { url } 
        }, "*");
      }, 100);

      // Clean up the URL after some time
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 30000); // 30 seconds should be enough for any download to start
    } catch (e) {
      console.error('Save failed:', e);
      
      // Ultimate fallback: Convert to data URL and try again
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        window.parent.postMessage({ 
          type: "OPEN_EXTERNAL_URL", 
          data: { url: dataUrl } 
        }, "*");
      };
      reader.readAsDataURL(blob);
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Object.values(assets).forEach((a) => URL.revokeObjectURL(a.url));
      setAssets({});
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsComplete(false);

      const img = new Image();
      img.src = url;
      try {
        await img.decode();
        setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
        initializeCrops(img.naturalWidth, img.naturalHeight);
        setMode("select");
      } catch (err) {
        console.error("Initial decode failed:", err);
        if (img.naturalWidth > 0) {
          setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
          initializeCrops(img.naturalWidth, img.naturalHeight);
          setMode("select");
        }
      }
    }
  };

  const handleFreeFocusSave = async (blob: Blob, filename: string) => {
    await saveBlob(blob, filename);
  };

  const handleFreeFocusContinue = async (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);
    
    const img = new Image();
    img.src = url;
    await img.decode();
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    initializeCrops(img.naturalWidth, img.naturalHeight);
    setMode("pipeline");
    setTab("crop");
  };

  const handleFormatToggle = (formatId: string) => {
    setSelectedFormats((prev) =>
      prev.includes(formatId)
        ? prev.filter((id) => id !== formatId)
        : [...prev, formatId]
    );
  };

  const handlePlatformToggle = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform) return;

    const platformFormatIds = platform.formats.map((f) => f.id);
    const allSelected = platformFormatIds.every((id) => selectedFormats.includes(id));

    if (allSelected) {
      setSelectedFormats((prev) => prev.filter((id) => !platformFormatIds.includes(id)));
      setSelectedPlatforms((prev) => prev.filter((id) => id !== platformId));
    } else {
      setSelectedFormats((prev) => [...new Set([...prev, ...platformFormatIds])]);
      setSelectedPlatforms((prev) => [...new Set([...prev, platformId])]);
    }
  };

  const selectAll = () => {
    setSelectedFormats(allFormats.map((f) => f.id));
    setSelectedPlatforms(platforms.map((p) => p.id));
  };

  const clearAll = () => {
    setSelectedFormats([]);
    setSelectedPlatforms([]);
  };

  const generateImageForFormat = async (
    source: ImageBitmap | HTMLImageElement,
    format: Format,
    nameHint: string,
    cropArea: CropArea,
    settings: ExportSettings
  ): Promise<{ url: string; blob: Blob; width: number; height: number; filename: string }> => {
    const { width: targetW, height: targetH } = format;
    const targetAR = targetW / targetH;

    const createCanvas = (w: number, h: number) => {
      if (typeof OffscreenCanvas !== "undefined") {
        return new OffscreenCanvas(w, h);
      }
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      return c;
    };

    // Calculate the best source area from the cropArea that matches targetAR
    let sourceX = cropArea.x;
    let sourceY = cropArea.y;
    let sourceW = cropArea.width;
    let sourceH = cropArea.height;
    const cropAR = sourceW / sourceH;

    if (Math.abs(cropAR - targetAR) > 0.01) {
      if (cropAR > targetAR) {
        // Source is wider than targetAR, crop the sides
        const newW = sourceH * targetAR;
        sourceX += (sourceW - newW) / 2;
        sourceW = newW;
      } else {
        // Source is taller than targetAR, crop the top/bottom
        const newH = sourceW / targetAR;
        sourceY += (sourceH - newH) / 2;
        sourceH = newH;
      }
    }

    let currentCanvas = createCanvas(Math.round(sourceW), Math.round(sourceH));
    let currentCtx = currentCanvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    
    if (!currentCtx) {
      // Fallback if canvas creation fails
      return { url: "", blob: new Blob(), width: 0, height: 0, filename: "" };
    }

    currentCtx.imageSmoothingEnabled = true;
    currentCtx.imageSmoothingQuality = "high";
    currentCtx.drawImage(
      source, 
      sourceX, sourceY, sourceW, sourceH, 
      0, 0, currentCanvas.width, currentCanvas.height
    );

    let currentW = currentCanvas.width;
    let currentH = currentCanvas.height;

    // Multi-step downscaling for better quality
    while (currentW > targetW * 1.5 || currentH > targetH * 1.5) {
      const nextW = Math.max(targetW, Math.round(currentW * 0.75));
      const nextH = Math.max(targetH, Math.round(currentH * 0.75));

      const nextCanvas = createCanvas(nextW, nextH);
      const nextCtx = nextCanvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
      
      if (!nextCtx) break;

      nextCtx.imageSmoothingEnabled = true;
      nextCtx.imageSmoothingQuality = "high";
      nextCtx.drawImage(currentCanvas, 0, 0, currentW, currentH, 0, 0, nextW, nextH);

      currentCanvas = nextCanvas;
      currentCtx = nextCtx;
      currentW = nextW;
      currentH = nextH;
    }

    const applySharpen = (ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, w: number, h: number, amount: number = 0.5) => {
      try {
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        const copy = new Uint8ClampedArray(data);
        
        // Unsharp mask style kernel (stronger)
        const a = amount;
        const kernel = [
          0, -a, 0,
          -a, 1 + 4 * a, -a,
          0, -a, 0
        ];

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const idx = (y * w + x) * 4;
            for (let c = 0; c < 3; c++) {
              const i = idx + c;
              let val = copy[i] * kernel[4]; // center
              val += copy[i - 4] * kernel[3]; // left
              val += copy[i + 4] * kernel[5]; // right
              val += copy[i - w * 4] * kernel[1]; // top
              val += copy[i + w * 4] * kernel[7]; // bottom
              data[i] = Math.min(255, Math.max(0, val));
            }
          }
        }
        ctx.putImageData(imageData, 0, 0);
      } catch (e) {
        console.warn("Sharpening failed:", e);
      }
    };

    if (currentW !== targetW || currentH !== targetH) {
      const finalCanvas = createCanvas(targetW, targetH);
      const finalCtx = finalCanvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
      
      if (finalCtx) {
        finalCtx.imageSmoothingEnabled = true;
        finalCtx.imageSmoothingQuality = "high";
        finalCtx.drawImage(currentCanvas, 0, 0, currentW, currentH, 0, 0, targetW, targetH);
        
        if (targetW <= 128 || targetH <= 128) {
          applySharpen(finalCtx, targetW, targetH, 0.35);
        } else if (targetW <= 512 || targetH <= 512) {
          applySharpen(finalCtx, targetW, targetH, 0.15);
        }
        
        currentCanvas = finalCanvas;
      }
    } else if (targetW <= 128 || targetH <= 128) {
      applySharpen(currentCtx, targetW, targetH, 0.35);
    } else if (targetW <= 512 || targetH <= 512) {
      applySharpen(currentCtx, targetW, targetH, 0.15);
    }

    let blob: Blob;
    const extension = settings.outputFormat === 'jpeg' ? 'jpg' : settings.outputFormat;

    if (settings.outputFormat === 'svg') {
      try {
        // SVG tracing - need a regular canvas for getImageData
        const svgCanvas = document.createElement('canvas');
        svgCanvas.width = targetW;
        svgCanvas.height = targetH;
        const svgCtx = svgCanvas.getContext('2d', { willReadFrequently: true })!;
        
        // Get image data from source canvas
        let sourceCtx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
        if (currentCanvas instanceof OffscreenCanvas) {
          sourceCtx = currentCanvas.getContext('2d') as OffscreenCanvasRenderingContext2D;
        } else {
          sourceCtx = (currentCanvas as HTMLCanvasElement).getContext('2d')!;
        }
        const imgData = sourceCtx.getImageData(0, 0, targetW, targetH);
        svgCtx.putImageData(imgData, 0, 0);
        
        const imageData = svgCtx.getImageData(0, 0, targetW, targetH);
        
        // Dynamic import for imagetracerjs
        const ImageTracer = await import('imagetracerjs').then(m => m.default || m);
        
        const svgString = ImageTracer.imagedataToSVG(imageData, {
          ltres: settings.svgDetail,
          qtres: settings.svgDetail,
          pathomit: 4,
          colorsampling: 2,
          numberofcolors: settings.svgColors,
          mincolorratio: 0,
          colorquantcycles: 3,
          layering: 0,
          strokewidth: 0,
          scale: 1,
          roundcoords: 1,
          desc: false,
          viewbox: true,
          blurradius: 0,
          blurdelta: 20
        });
        
        if (!svgString || typeof svgString !== 'string') {
          console.error('SVG tracing failed - empty result');
          blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], { type: 'image/svg+xml' });
        } else {
          blob = new Blob([svgString], { type: 'image/svg+xml' });
        }
      } catch (err) {
        console.error('SVG tracing error:', err);
        blob = new Blob(['<svg xmlns="http://www.w3.org/2000/svg"></svg>'], { type: 'image/svg+xml' });
      }
    } else {
      const mimeType = settings.outputFormat === 'jpeg' ? 'image/jpeg' 
                     : settings.outputFormat === 'webp' ? 'image/webp' 
                     : 'image/png';
      const quality = settings.outputFormat === 'png' ? undefined : settings.quality;
      
      if (currentCanvas instanceof OffscreenCanvas) {
        blob = await currentCanvas.convertToBlob({ type: mimeType, quality });
      } else {
        blob = await new Promise<Blob>((resolve) =>
          (currentCanvas as HTMLCanvasElement).toBlob((b) => resolve(b as Blob), mimeType, quality)
        );
      }
    }

    const url = URL.createObjectURL(blob);
    return { url, blob, width: targetW, height: targetH, filename: `${nameHint}-${targetW}x${targetH}.${extension}` };
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    setProgress(0);

    const total = selectedFormats.length;
    let completed = 0;

    if (!selectedFile) return;

    // Clear old assets
    Object.values(assets).forEach((a) => URL.revokeObjectURL(a.url));
    const newAssets: Record<string, { url: string; blob: Blob; width: number; height: number; filename: string }> = {};
    const baseName = (selectedFile.name?.split(".").slice(0, -1).join(".") || "asset").replace(/\s+/g, "-");

    try {
      // Load source image once
      let source: ImageBitmap | HTMLImageElement;
      if (typeof createImageBitmap !== "undefined") {
        source = await createImageBitmap(selectedFile);
      } else {
        source = await new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error("Failed to load source image."));
          img.src = previewUrl; // Reuse existing preview URL
        });
      }

      for (const fid of selectedFormats) {
        const format = allFormats.find((f) => f.id === fid);
        if (!format) continue;

        const presetId = getPresetForFormat(format);
        const cropArea = crops[presetId];

        if (cropArea) {
          const asset = await generateImageForFormat(
            source,
            format,
            `${baseName}-${format.platform.toLowerCase().replace(/[^a-z0-9]/g, "")}-${format.name.toLowerCase().replace(/\s+/g, "-")}`,
            cropArea,
            exportSettings
          );
          if (asset.url) {
            newAssets[fid] = asset;
          }
        }
        completed++;
        setProgress(Math.round((completed / total) * 100));
      }

      // Cleanup ImageBitmap
      if (source instanceof ImageBitmap) {
        source.close();
      }

      setAssets(newAssets);
      setIsComplete(true);
      setTab("preview");
    } catch (err) {
      console.error("Processing error:", err);
      // Fallback or alert user
    } finally {
      setIsProcessing(false);
    }
  };

  const isPlatformFullySelected = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform) return false;
    return platform.formats.every((f) => selectedFormats.includes(f.id));
  };

  const isPlatformPartiallySelected = (platformId: string) => {
    const platform = platforms.find((p) => p.id === platformId);
    if (!platform) return false;
    const selected = platform.formats.filter((f) => selectedFormats.includes(f.id));
    return selected.length > 0 && selected.length < platform.formats.length;
  };

    return (
      <div className="space-y-4">
        {mode === "select" && selectedFile && previewUrl && (


        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="font-pixel text-sm text-[var(--neon-green)] mb-2">CHOOSE YOUR PATH</h2>
            <p className="text-sm text-muted-foreground">How would you like to work with your image?</p>
          </div>
          
          <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden mb-6">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setMode("freefocus")}
              className="p-6 border-2 border-[var(--neon-pink)]/30 rounded-lg text-left hover:border-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[var(--neon-pink)]/10 text-[var(--neon-pink)] group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium text-[var(--neon-pink)]">Free Focus</h3>
                  <span className="text-xs bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] px-1.5 py-0.5 rounded">NEW</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Freely zoom, rotate, pan, and flip. Save a single custom image or continue to platform sizing.
              </p>
            </button>
            
            <button
              onClick={() => { setMode("pipeline"); setTab("crop"); }}
              className="p-6 border-2 border-[var(--neon-green)]/30 rounded-lg text-left hover:border-[var(--neon-green)] hover:bg-[var(--neon-green)]/5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[var(--neon-green)]/10 text-[var(--neon-green)] group-hover:scale-110 transition-transform">
                  <Grid3X3 className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-[var(--neon-green)]">Platform Pipeline</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Set crop areas and batch export to 15+ platforms. Profile pics, banners, stories, and more.
              </p>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl("");
                setMode("select");
              }}
              className="text-muted-foreground"
            >
              Upload different image
            </Button>
          </div>
        </Card>
      )}

      {mode === "freefocus" && selectedFile && previewUrl && (
        <>
          <button 
            onClick={() => setMode("select")}
            className="text-[var(--neon-green)] font-pixel text-xs hover:text-[var(--neon-cyan)] transition-colors"
          >
            ← BACK TO MODE SELECT
          </button>
          <FreeFocus
            imageUrl={previewUrl}
            imageWidth={imageDimensions.width}
            imageHeight={imageDimensions.height}
            originalFilename={selectedFile.name}
            onSave={handleFreeFocusSave}
            onContinueToPipeline={handleFreeFocusContinue}
          />
        </>
      )}

      {(mode === "pipeline" || !selectedFile) && (
      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upload">1. Upload</TabsTrigger>
          <TabsTrigger value="crop" disabled={!selectedFile || mode !== "pipeline"}>2. Crop</TabsTrigger>
          <TabsTrigger value="format" disabled={!selectedFile || mode !== "pipeline"}>3. Sizes</TabsTrigger>
          <TabsTrigger value="preview" disabled={!isComplete}>4. Download</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-6">
            <div className="mx-auto w-full max-w-lg">
              {!selectedFile ? (
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[var(--neon-green)]/30 rounded-lg cursor-pointer hover:bg-[var(--neon-green)]/5 hover:border-[var(--neon-green)] transition-all"
                >
                  <Upload className="h-10 w-10 text-[var(--neon-green)] mb-2" />
                  <p className="text-sm font-medium">Drop image here or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF, WebP</p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </label>
              ) : (
                <div className="space-y-3">
                  <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-[var(--neon-green)]" />
                      <div className="text-left">
                        <p className="font-medium text-sm truncate max-w-[200px]">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {imageDimensions.width} × {imageDimensions.height} • {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setSelectedFormats([]);
                        setSelectedPlatforms([]);
                        setIsComplete(false);
                        setTab("upload");
                        setMode("select");
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="crop" className="space-y-4">
          <button 
            onClick={() => setMode("select")}
            className="text-[var(--neon-green)] font-pixel text-xs hover:text-[var(--neon-cyan)] transition-colors"
          >
            ← BACK TO MODE SELECT
          </button>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Crop className="w-5 h-5 text-[var(--neon-green)]" />
              <h2 className="font-medium">Set Focus Areas</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Position each crop type to focus on what matters. Square for profiles, Portrait for stories, Landscape for banners.
            </p>
            
            {previewUrl && imageDimensions.width > 0 && (
              <CropEditor
                imageUrl={previewUrl}
                imageWidth={imageDimensions.width}
                imageHeight={imageDimensions.height}
                crops={crops}
                onCropsChange={setCrops}
                activePreset={activePreset}
                onPresetChange={setActivePreset}
              />
            )}

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setTab("format")} className="bg-[var(--neon-green)] text-background hover:bg-[var(--neon-cyan)]">
                Continue to Sizes
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="format" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="w-10 h-10 rounded object-cover" />
                )}
                <span className="text-sm font-medium">Select formats to generate</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={clearAll}>
                  Clear
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {platforms.map((platform) => (
                <div key={platform.id} className="border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => handlePlatformToggle(platform.id)}
                    className={`w-full p-3 flex items-center justify-between text-left transition-colors ${
                      isPlatformFullySelected(platform.id)
                        ? "bg-[var(--neon-green)]/10"
                        : isPlatformPartiallySelected(platform.id)
                        ? "bg-[var(--neon-green)]/5"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <span className="font-medium text-sm">{platform.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {platform.formats.filter((f) => selectedFormats.includes(f.id)).length}/{platform.formats.length}
                      </span>
                      {isPlatformFullySelected(platform.id) && (
                        <CheckCircle2 className="h-4 w-4 text-[var(--neon-green)]" />
                      )}
                    </div>
                  </button>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 p-2 bg-muted/30">
                    {platform.formats.map((format) => {
                      const presetId = getPresetForFormat(format);
                      const preset = CROP_PRESETS.find(p => p.id === presetId);
                      return (
                        <button
                          key={format.id}
                          onClick={() => handleFormatToggle(format.id)}
                          className={`p-2 border rounded text-left text-xs transition-all ${
                            selectedFormats.includes(format.id)
                              ? "border-[var(--neon-green)] bg-[var(--neon-green)]/10"
                              : "border-transparent hover:border-[var(--neon-green)]/30 bg-background"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">{format.name}</span>
                            {selectedFormats.includes(format.id) && (
                              <CheckCircle2 className="h-3 w-3 text-[var(--neon-green)] flex-shrink-0 ml-1" />
                            )}
                          </div>
                          <div className="text-muted-foreground mt-0.5 flex items-center gap-1">
                            <span>{format.width}×{format.height}</span>
                            <span 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: preset?.color }}
                              title={preset?.name}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
</Card>

            {selectedFormats.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings2 className="w-4 h-4 text-[var(--neon-cyan)]" />
                  <span className="text-sm font-medium">Export Settings</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Output Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      {([
                        { id: 'png', label: 'PNG', desc: 'Lossless, transparency' },
                        { id: 'jpeg', label: 'JPEG', desc: 'Smaller files, photos' },
                        { id: 'webp', label: 'WebP', desc: 'Modern, best compression' },
                        { id: 'svg', label: 'SVG', desc: 'Vector, infinite scaling' },
                      ] as const).map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => setExportSettings(s => ({ ...s, outputFormat: fmt.id }))}
                          className={`p-3 border-2 rounded-lg text-left transition-all ${
                            exportSettings.outputFormat === fmt.id
                              ? fmt.id === 'svg' 
                                ? 'border-[var(--neon-pink)] bg-[var(--neon-pink)]/10'
                                : 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/10'
                              : 'border-border hover:border-[var(--neon-cyan)]/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <FileImage className="w-4 h-4" />
                            <span className="font-medium text-sm">{fmt.label}</span>
                            {fmt.id === 'svg' && <span className="text-[10px] bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] px-1.5 py-0.5 rounded">NEW</span>}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{fmt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {(exportSettings.outputFormat === 'jpeg' || exportSettings.outputFormat === 'webp') && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-muted-foreground">Quality</label>
                        <span className="text-xs font-mono text-[var(--neon-cyan)]">{Math.round(exportSettings.quality * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.6"
                        max="1"
                        step="0.05"
                        value={exportSettings.quality}
                        onChange={(e) => setExportSettings(s => ({ ...s, quality: parseFloat(e.target.value) }))}
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[var(--neon-cyan)]"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>
                  )}

                  {exportSettings.outputFormat === 'svg' && (
                    <div className="space-y-4 p-3 bg-[var(--neon-pink)]/5 rounded-lg border border-[var(--neon-pink)]/20">
                      <div className="text-xs text-[var(--neon-pink)] font-medium">SVG Tracing Settings</div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs text-muted-foreground">Colors</label>
                          <span className="text-xs font-mono text-[var(--neon-pink)]">{exportSettings.svgColors}</span>
                        </div>
                        <input
                          type="range"
                          min="2"
                          max="64"
                          step="2"
                          value={exportSettings.svgColors}
                          onChange={(e) => setExportSettings(s => ({ ...s, svgColors: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[var(--neon-pink)]"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Simpler (logo)</span>
                          <span>More detail</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs text-muted-foreground">Detail Level</label>
                          <span className="text-xs font-mono text-[var(--neon-pink)]">{exportSettings.svgDetail === 0 ? 'Max' : exportSettings.svgDetail <= 1 ? 'High' : exportSettings.svgDetail <= 3 ? 'Medium' : 'Low'}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="1"
                          value={exportSettings.svgDetail}
                          onChange={(e) => setExportSettings(s => ({ ...s, svgDetail: parseInt(e.target.value) }))}
                          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-[var(--neon-pink)]"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>More detail</span>
                          <span>Smoother</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {exportSettings.outputFormat === 'jpeg' && (
                    <div className="text-xs text-amber-500/80 flex items-center gap-1">
                      <span>⚠</span>
                      <span>JPEG does not support transparency</span>
                    </div>
                  )}

                  {exportSettings.outputFormat === 'svg' && (
                    <div className="text-xs text-[var(--neon-pink)]/80 flex items-center gap-1">
                      <span>✨</span>
                      <span>Best for logos, icons, and simple graphics. Complex photos may produce large files.</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {selectedFormats.length > 0 && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-muted-foreground">
                      {selectedFormats.length} format{selectedFormats.length !== 1 ? "s" : ""} selected
                    </span>
                    <div className="flex gap-2 mt-1">
                      {CROP_PRESETS.map(p => {
                        const count = selectedFormats.filter(fid => {
                          const f = allFormats.find(fmt => fmt.id === fid);
                          return f && getPresetForFormat(f) === p.id;
                        }).length;
                        if (count === 0) return null;
                        return (
                          <span key={p.id} className="text-xs flex items-center gap-1" style={{ color: p.color }}>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                            {count} {p.name.toLowerCase()}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <Button onClick={handleProcess} disabled={isProcessing} className="bg-[var(--neon-green)] text-background hover:bg-[var(--neon-cyan)]">
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      "Generate Assets"
                    )}
                  </Button>
                </div>
                {isProcessing && (
                  <div className="mt-3">
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </Card>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-medium">
                    {selectedFormats.length} asset{selectedFormats.length !== 1 ? "s" : ""} ready
                  </span>
<div className="text-xs text-muted-foreground mt-1">
                      Format: <span className={`font-mono ${exportSettings.outputFormat === 'svg' ? 'text-[var(--neon-pink)]' : 'text-[var(--neon-cyan)]'}`}>{exportSettings.outputFormat.toUpperCase()}</span>
                      {(exportSettings.outputFormat === 'jpeg' || exportSettings.outputFormat === 'webp') && (
                        <span> • Quality: {Math.round(exportSettings.quality * 100)}%</span>
                      )}
                      {exportSettings.outputFormat === 'svg' && (
                        <span> • {exportSettings.svgColors} colors • {exportSettings.svgDetail === 0 ? 'Max' : exportSettings.svgDetail <= 1 ? 'High' : exportSettings.svgDetail <= 3 ? 'Medium' : 'Low'} detail</span>
                      )}
                    </div>
                </div>
                <Button
                  className="bg-[var(--neon-green)] text-background hover:bg-[var(--neon-cyan)]"
                  onClick={async () => {
                    for (const fid of selectedFormats) {
                      const a = assets[fid];
                      if (a?.blob) await saveBlob(a.blob, a.filename);
                    }
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              </div>

              <div className="space-y-4">
              {platforms.map((platform) => {
                const platformFormats = platform.formats.filter((f) => selectedFormats.includes(f.id));
                if (platformFormats.length === 0) return null;

                return (
                  <div key={platform.id}>
                    <h3 className="text-sm font-medium mb-2">{platform.name}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {platformFormats.map((format) => {
                        const asset = assets[format.id];
                        const presetId = getPresetForFormat(format);
                        const preset = CROP_PRESETS.find(p => p.id === presetId);
                        return (
                          <div 
                            key={format.id} 
                            className="border rounded-lg p-2 hover:border-[var(--neon-green)] transition-colors"
                            style={{ borderColor: `${preset?.color}40` }}
                          >
                            <div className="aspect-square bg-muted rounded overflow-hidden mb-2 flex items-center justify-center">
                              {asset?.url && (
                                <img
                                  src={asset.url}
                                  alt={format.name}
                                  className="max-w-full max-h-full object-contain"
                                  style={{ imageRendering: format.width <= 64 ? "pixelated" : "auto" }}
                                />
                              )}
                            </div>
                            <div className="text-xs font-medium truncate">{format.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              {format.width}×{format.height}
                              <span 
                                className="w-2 h-2 rounded-full" 
                                style={{ backgroundColor: preset?.color }}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full mt-1 h-7 text-xs hover:bg-[var(--neon-green)]/10 hover:text-[var(--neon-green)]"
                              onClick={async () => {
                                if (asset?.blob) await saveBlob(asset.blob, asset.filename);
                              }}
                            >
                              Download
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                Object.values(assets).forEach((a) => URL.revokeObjectURL(a.url));
                setAssets({});
                if (previewUrl) URL.revokeObjectURL(previewUrl);
                setPreviewUrl("");
                setSelectedFile(null);
                setSelectedFormats([]);
                setSelectedPlatforms([]);
                setIsComplete(false);
                setProgress(0);
                setTab("upload");
                setMode("select");
              }}
            >
              Process Another Image
            </Button>
          </div>
        </TabsContent>
      </Tabs>
        )}
      </div>
    );
  }

