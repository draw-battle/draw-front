"use client";

import { Canvas } from "@/game/components/canvas";
import { Chat } from "@/game/components/chat";
import { Toast } from "@/shared/ui/toast";
import { useMessagesStore } from "@/store/messages-state";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Game() {
  const router = useRouter();
  // TODO: Find better solution to get id query. (useRouter is throwing error in this version of next.)
  const pathname = usePathname();
  const id = pathname?.replace("/", "");

  const [blocked, setBlocked] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>();

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

    onDrawPhaseStart() {
      addMessage({
        author: "system",
        body: "Start drawing!",
        status: "default",
      });

      setBlocked(false);
    },

    updateTimer(timeLeft) {
      setTimeLeft(timeLeft);
    },
  });

  return (
    <div className="relative flex w-full h-screen gap-3 py-12 mx-auto">
      <Toast status="info" text="Draw a leopard" />
      <div className="absolute inset-0 flex">
        <Canvas blocked={blocked} />
      </div>

      <div className="absolute w-96 top-5 right-5 bottom-5">
        <Chat
          pinned={
            Number.isInteger(timeLeft)
              ? [
                  {
                    author: "remaining time",
                    body: `${timeLeft} sec.`,
                    status: "default",
                  },
                ]
              : []
          }
        />
      </div>
    </div>
  );
}

interface IUseConnectToRoom {
  roomId: string;
  onUserNew: (username: string) => void;
  onUserLeave: (username: string) => void;
  onDrawPhaseEnd: () => void;
  onDrawPhaseStart: () => void;
  updateTimer: (timeLeft: number) => void;
}

const useConnectToRoom = ({
  roomId,
  onUserLeave,
  onUserNew,
  onDrawPhaseEnd,
  onDrawPhaseStart,
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
          ({
            ended,
            timeLeft,
            started = false,
          }: {
            ended: boolean;
            timeLeft?: number;
            started?: boolean;
          }) => {
            if (ended) {
              onDrawPhaseEnd();
            }

            if (started) {
              onDrawPhaseStart();
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
