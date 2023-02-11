"use client";

import { useRef, useState } from "react";
import { Brush } from "../logic/brush";
import { Rect } from "../logic/rect";
import { Tool } from "../logic/tool";
import { Toolbar } from "./toolbar";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tool, setTool] = useState<Tool | null>(null);

  return (
    <div className="relative flex">
      <div className="absolute top-0 flex w-full">
        <Toolbar
          title="brush"
          onSelect={() =>
            setTool(canvasRef.current && new Brush(canvasRef.current))
          }
        />

        <Toolbar
          title="rect"
          onSelect={() =>
            setTool(canvasRef.current && new Rect(canvasRef.current))
          }
        />
      </div>

      <div className="absolute w-full  top-14">
        <canvas
          width={1060}
          height={800}
          className="block border border-primary"
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
};
