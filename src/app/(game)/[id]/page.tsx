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
  const [timeLeft, setTimeLeft] = useState<number | null>();

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

    updateTimer(timeLeft) {
      console.log(timeLeft);
      setTimeLeft(timeLeft);
    },
  });

  return (
    <div className="relative flex w-full h-screen gap-3 py-12 mx-auto">
      {Number(timeLeft) > 0 && (
        <Toast status="info" text={`Timer: ${timeLeft}`} />
      )}
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
  updateTimer: (timeLeft: number) => void;
}

const useConnectToRoom = ({
  roomId,
  onUserLeave,
  onUserNew,
  onDrawPhaseEnd,
  updateTimer,
}: IUseConnectToRoom) => {
  useEffect(() => {
    // connection
    const socket = io("ws://localhost:5000");

    if (socket) {
      socket.on("connect", () => {
        socket.emit("join", roomId, "Jamal" + Math.floor(Math.random() * 99));

        socket.on(
          "draw phase",
          ({ ended, timeLeft }: { ended: boolean; timeLeft?: number }) => {
            if (ended) {
              onDrawPhaseEnd();
            }

            if (Number.isInteger(timeLeft)) {
              updateTimer(timeLeft!);
            }
          }
        );

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
