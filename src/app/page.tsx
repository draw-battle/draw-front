"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Card } from "@/components/card";
import { Status } from "@/shared/ui/status";

export default function Home() {
  const [username, setUsername] = useLocalStorage("username", "Stranger");

  return (
    <main className="container flex flex-col gap-2 mx-auto mt-5">
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

      <div className="overflow-hidden border rounded border-primary">
        <Card title="game 1" />
        <Card title="game 1" />
        <Card title="game 1" />
      </div>
    </main>
  );
}
