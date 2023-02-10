"use client";

import { useEffect, useRef } from "react";
import { Tool } from "../logic/tool";
import { Toolbar } from "./toolbar";

export const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Tool(canvasRef.current);
    }
  });

  return (
    <div className="flex relative">
      <div className="absolute top-0 w-full flex">
        <Toolbar />
      </div>

      <div className=" absolute w-full top-14">
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
