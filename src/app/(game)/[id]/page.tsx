"use client";

import { Canvas } from "@/game/components/canvas";
import { Chat } from "@/game/components/chat";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Game() {
  const pathname = usePathname();

  // TODO: Find better solution to get id query. (useRouter is throwing error in this version of next.)
  const id = pathname?.replace("/", "");

  useConnectToRoom({
    roomId: id as string,
    onUserLeave: (username) => {
      console.log(`${username} left the room`);
    },
    onUserNew: (username) => {
      console.log("NEW USER CAME ON ME!!! PLEASE WELCOME " + username);
    },
  });

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

interface IUseConnectToRoom {
  roomId: string;
  onUserNew: (username: string) => void;
  onUserLeave: (username: string) => void;
}

const useConnectToRoom = ({
  roomId,
  onUserLeave,
  onUserNew,
}: IUseConnectToRoom) => {
  useEffect(() => {
    const socket = io("ws://localhost:5000", {
      autoConnect: false,
    });

    socket.connect();

    socket.on("connect", () => {
      socket.emit("join", roomId, "Jamal" + Math.floor(Math.random() * 99));
    });

    socket.on("user new", (username) => {
      onUserNew(username);
    });

    socket.on("user left", (username) => {
      onUserLeave(username);
    });

    return () => {
      socket.disconnect();
    };
  }, [onUserLeave, onUserNew, roomId]);
};
