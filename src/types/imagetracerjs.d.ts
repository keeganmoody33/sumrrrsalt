declare module 'imagetracerjs' {
  interface ImageTracerOptions {
    ltres?: number;
    qtres?: number;
    pathomit?: number;
    colorsampling?: number;
    numberofcolors?: number;
    mincolorratio?: number;
    colorquantcycles?: number;
    layering?: number;
    strokewidth?: number;
    scale?: number;
    roundcoords?: number;
    desc?: boolean;
    viewbox?: boolean;
    blurradius?: number;
    blurdelta?: number;
  }

  interface ImageTracer {
    imagedataToSVG(imageData: ImageData, options?: ImageTracerOptions | string): string;
    imageToSVG(url: string, callback: (svgstr: string) => void, options?: ImageTracerOptions | string): void;
    appendSVGString(svgstr: string, parentid: string): void;
    getImgdata(canvas: HTMLCanvasElement): ImageData;
  }

  const imageTracer: ImageTracer;
  export default imageTracer;
}
