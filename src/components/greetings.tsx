"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Status } from "@/shared/ui/status";

export const Greetings = () => {
  const [username, setUsername] = useLocalStorage("username", "Stranger");

  return (
    <div className="flex justify-between gap-2">
      <div>
        <h1 className="text-2xl">Welcome, {username}</h1>
      </div>

      <div className="flex items-center gap-2 divide-x-2 divide-solid">
        <div className="flex items-center gap-2">
          <Status type="warning" />
          <p className="align-bottom">
            At least set your name in order to play!
          </p>
        </div>
      </div>
    </div>
  );
};
