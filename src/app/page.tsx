"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Card } from "@/components/card";

export default function Home() {
  const [username, setUsername] = useLocalStorage("username", "Stranger");

  return (
    <main className="container mx-auto mt-5 flex flex-col gap-2">
      <div>
        <h1 className="text-2xl">Welcome, {username}</h1>
      </div>

      <div className="rounded border border-primary py-2">
        <Card title="game 1" />
        <Card title="game 1" />
        <Card title="game 1" />
      </div>
    </main>
  );
}
