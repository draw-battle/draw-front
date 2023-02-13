"use client";

import { useEffect, useRef, useState } from "react";
import { Brush } from "../logic/brush";
import { Rect } from "../logic/rect";
import { Tool } from "../logic/tool";
import { Eraser } from "../logic/eraser";
import { Toolbar } from "./toolbar";
import Image from "next/image";

type OnSetTool = {
  toolName: "brush" | "rectangle" | "eraser";
  Tool: Tool;
};

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<OnSetTool | null>(null);

  const onSetTool = ({ Tool, toolName }: OnSetTool) => {
    setTool({
      Tool,
      toolName,
    });
  };

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, []);

  return (
    <div>
      <div className="absolute top-0 z-20 flex">
        <Toolbar
          title={
            <Image
              src="assets/svgs/brush.svg"
              width={30}
              height={30}
              alt="brush"
            />
          }
          onSelect={() =>
            onSetTool({
              Tool: new Brush(canvasRef.current!),
              toolName: "brush",
            })
          }
          active={tool?.toolName === "brush"}
        />

        <Toolbar
          title="rect"
          onSelect={() =>
            onSetTool({
              Tool: new Rect(canvasRef.current!),
              toolName: "rectangle",
            })
          }
          active={tool?.toolName === "rectangle"}
        />

        <Toolbar
          title="Eraser"
          onSelect={() =>
            onSetTool({
              Tool: new Eraser(canvasRef.current!),
              toolName: "eraser",
            })
          }
          active={tool?.toolName === "eraser"}
        />
      </div>

      <div className="absolute inset-0">
        <canvas className="block w-full h-full" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};
