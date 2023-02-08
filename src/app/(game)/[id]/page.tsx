import { Canvas } from "@/game/components/canvas";
import { Chat } from "@/game/components/chat";

export default function Game() {
  return (
    <div className="container flex h-screen gap-3 py-12 mx-auto">
      <div className=" grow">
        <Canvas />
      </div>
      <div className="basis-[30%]">
        <Chat />
      </div>
    </div>
  );
}
