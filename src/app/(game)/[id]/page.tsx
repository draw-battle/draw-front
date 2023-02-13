import { Canvas } from "@/game/components/canvas";
import { Chat } from "@/game/components/chat";

export default function Game() {
  return (
    <div className="relative flex w-full h-screen gap-3 py-12 mx-auto">
      <div className="absolute inset-0 flex">
        <Canvas />
      </div>

      <div className="absolute w-96 top-5 right-5 bottom-5">
        <Chat />
      </div>
    </div>
  );
}
