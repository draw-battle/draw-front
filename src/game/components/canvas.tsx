"use client";

import { useRef, useState } from "react";
import { Brush } from "../logic/brush";
import { Rect } from "../logic/rect";
import { Tool } from "../logic/tool";
import { Toolbar } from "./toolbar";
import Image from "next/image";

type OnSetTool = {
  toolName: "brush" | "rectangle";
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

  return (
    <div className="relative flex">
      <div className="absolute top-0 flex w-full">
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
      </div>

      <div className="absolute w-full top-14">
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
