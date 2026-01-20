"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ZoomIn, ZoomOut, RotateCcw, RotateCw, Move, 
  FlipHorizontal, FlipVertical, Download, ArrowRight, 
  Maximize2, RefreshCw
} from "lucide-react";

interface FreeFocusProps {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  onSave: (blob: Blob, filename: string) => void;
  onContinueToPipeline: (blob: Blob) => void;
  originalFilename: string;
}

interface Transform {
  scale: number;
  rotation: number;
  x: number;
  y: number;
  flipX: boolean;
  flipY: boolean;
}

export default function FreeFocus({ 
  imageUrl, 
  imageWidth, 
  imageHeight, 
  onSave, 
  onContinueToPipeline,
  originalFilename 
}: FreeFocusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [transform, setTransform] = useState<Transform>({
    scale: 1,
    rotation: 0,
    x: 0,
    y: 0,
    flipX: false,
    flipY: false
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [outputSize, setOutputSize] = useState({ width: 1080, height: 1080 });
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImage(img);
  }, [imageUrl]);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !image) return;

    canvas.width = outputSize.width;
    canvas.height = outputSize.height;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2 + transform.x, canvas.height / 2 + transform.y);
    ctx.rotate((transform.rotation * Math.PI) / 180);
    ctx.scale(
      transform.scale * (transform.flipX ? -1 : 1),
      transform.scale * (transform.flipY ? -1 : 1)
    );

    const scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    const drawWidth = image.width * scale;
    const drawHeight = image.height * scale;

    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
    ctx.restore();
  }, [image, transform, outputSize]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.95 : 1.05;
    setTransform(t => ({
      ...t,
      scale: Math.max(0.1, Math.min(5, t.scale * delta))
    }));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    setTransform(t => ({
      ...t,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    }));
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const rotate = (deg: number) => {
    setTransform(t => ({ ...t, rotation: t.rotation + deg }));
  };

  const zoom = (factor: number) => {
    setTransform(t => ({ 
      ...t, 
      scale: Math.max(0.1, Math.min(5, t.scale * factor)) 
    }));
  };

  const flip = (axis: 'x' | 'y') => {
    setTransform(t => ({
      ...t,
      flipX: axis === 'x' ? !t.flipX : t.flipX,
      flipY: axis === 'y' ? !t.flipY : t.flipY
    }));
  };

  const reset = () => {
    setTransform({
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      flipX: false,
      flipY: false
    });
  };

  const getOutputBlob = async (): Promise<Blob> => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error('No canvas');
    
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob as Blob);
      }, 'image/png', 1);
    });
  };

  const handleSave = async () => {
    const blob = await getOutputBlob();
    const baseName = originalFilename.split('.').slice(0, -1).join('.') || 'image';
    onSave(blob, `${baseName}-freefocus-${outputSize.width}x${outputSize.height}.png`);
  };

  const handleContinue = async () => {
    const blob = await getOutputBlob();
    onContinueToPipeline(blob);
  };

  const presetSizes = [
    { label: 'Square', width: 1080, height: 1080 },
    { label: 'Portrait', width: 1080, height: 1920 },
    { label: 'Landscape', width: 1920, height: 1080 },
    { label: 'Profile', width: 400, height: 400 },
  ];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Maximize2 className="w-5 h-5 text-[var(--neon-pink)]" />
          <h2 className="font-medium">Free Focus Mode</h2>
          <span className="text-xs bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] px-2 py-0.5 rounded">NEW</span>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Pan, zoom, rotate, and flip your image freely. Save directly or continue to platform sizing.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {presetSizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setOutputSize({ width: size.width, height: size.height })}
              className={`px-3 py-1.5 text-xs border rounded transition-all ${
                outputSize.width === size.width && outputSize.height === size.height
                  ? 'border-[var(--neon-pink)] bg-[var(--neon-pink)]/10 text-[var(--neon-pink)]'
                  : 'border-border hover:border-[var(--neon-pink)]/50'
              }`}
            >
              {size.label}
              <span className="ml-1 opacity-60">{size.width}×{size.height}</span>
            </button>
          ))}
          <div className="flex items-center gap-1 ml-auto">
            <input
              type="number"
              value={outputSize.width}
              onChange={(e) => setOutputSize(s => ({ ...s, width: Math.max(16, parseInt(e.target.value) || 16) }))}
              className="w-16 px-2 py-1 text-xs bg-background border border-border rounded text-center"
            />
            <span className="text-muted-foreground">×</span>
            <input
              type="number"
              value={outputSize.height}
              onChange={(e) => setOutputSize(s => ({ ...s, height: Math.max(16, parseInt(e.target.value) || 16) }))}
              className="w-16 px-2 py-1 text-xs bg-background border border-border rounded text-center"
            />
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative bg-black/80 rounded-lg overflow-hidden select-none"
          style={{ 
            height: '400px',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
        >
          <canvas
            ref={canvasRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full"
            style={{
              boxShadow: '0 0 20px var(--neon-pink)',
              border: '2px solid var(--neon-pink)'
            }}
          />

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-black/60 p-2 rounded">
            <span className="text-muted-foreground">
              Drag to pan • Scroll to zoom
            </span>
            <span className="text-[var(--neon-pink)]">
              {Math.round(transform.scale * 100)}% • {transform.rotation}°
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-1 border border-border rounded p-1">
            <Button variant="ghost" size="sm" onClick={() => zoom(1.25)} title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => zoom(0.8)} title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border border-border rounded p-1">
            <Button variant="ghost" size="sm" onClick={() => rotate(-15)} title="Rotate Left">
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => rotate(15)} title="Rotate Right">
              <RotateCw className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border border-border rounded p-1">
            <Button variant="ghost" size="sm" onClick={() => flip('x')} title="Flip Horizontal">
              <FlipHorizontal className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => flip('y')} title="Flip Vertical">
              <FlipVertical className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="ghost" size="sm" onClick={reset} title="Reset">
            <RefreshCw className="w-4 h-4 mr-1" />
            Reset
          </Button>

          <div className="flex-1" />

          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSave}
            className="border-[var(--neon-green)] text-[var(--neon-green)] hover:bg-[var(--neon-green)]/10"
          >
            <Download className="w-4 h-4 mr-1" />
            Save Image
          </Button>

          <Button 
            size="sm"
            onClick={handleContinue}
            className="bg-[var(--neon-pink)] text-background hover:bg-[var(--neon-cyan)]"
          >
            Continue to Pipeline
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
