import { Toolbar } from "./toolbar";

export const Canvas = () => {
  return (
    <div className="w-[1170px] h-[860px] relative">
      <div className="absolute z-50 w-full h-full">
        <div className="flex border-b border-primary">
          <Toolbar />
        </div>
      </div>
      <canvas
        width={1170}
        height={860}
        className="w-[1170px] h-[860px] absolute border border-primary"
      />
    </div>
  );
};
