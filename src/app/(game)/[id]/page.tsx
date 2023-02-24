"use client";

import { Canvas } from "@/game/components/canvas";
import { Chat } from "@/game/components/chat";
import { Toast } from "@/shared/ui/toast";
import { useMessagesStore } from "@/store/messages-state";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function Game() {
  const pathname = usePathname();
  const [blocked, setBlocked] = useState(false);

  // TODO: Find better solution to get id query. (useRouter is throwing error in this version of next.)
  const id = pathname?.replace("/", "");

  const addMessage = useMessagesStore((state) => state.addMessage);
  useConnectToRoom({
    roomId: id as string,
    onUserLeave(username) {
      addMessage({
        author: "system",
        body: `${username} has left.`,
        status: "error",
      });
    },
    onUserNew(username) {
      addMessage({
        author: "system",
        body: `User ${username} has entered the room.`,
        status: "success",
      });
    },
    onDrawPhaseEnd() {
      addMessage({
        author: "system",
        body: "Time is over",
        status: "default",
      });

      setBlocked(true);
    },
  });

  return (
    <div className="relative flex w-full h-screen gap-3 py-12 mx-auto">
      <Toast status="success" text="hello" />
      <div className="absolute inset-0 flex">
        <Canvas blocked={blocked} />
      </div>

      <div className="absolute w-96 top-5 right-5 bottom-5">
        <Chat />
      </div>
    </div>
  );
}

interface IUseConnectToRoom {
  roomId: string;
  onUserNew: (username: string) => void;
  onUserLeave: (username: string) => void;
  onDrawPhaseEnd: () => void;
}

const useConnectToRoom = ({
  roomId,
  onUserLeave,
  onUserNew,
  onDrawPhaseEnd,
}: IUseConnectToRoom) => {
  useEffect(() => {
    // connection
    const socket = io("ws://localhost:5000");

    if (socket) {
      socket.on("connect", () => {
        socket.emit("join", roomId, "Jamal" + Math.floor(Math.random() * 99));

        socket.on("ended", (ended) => {
          if (ended) {
            onDrawPhaseEnd();
          }
        });

        socket.on("user new", (username) => {
          onUserNew(username);
        });

        socket.on("user left", (username) => {
          onUserLeave(username);
        });
      });
      return () => {
        socket.disconnect();
      };
    }
  }, []);
};
