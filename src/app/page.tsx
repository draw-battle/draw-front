"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Card } from "@/components/card";

export default function Home() {
  const [username, setUsername] = useLocalStorage("username", "Stranger");

  return (
    <main className="container flex flex-col gap-2 mx-auto mt-5">
      <div>
        <h1 className="text-2xl">Welcome, {username}</h1>
      </div>

      <div className="overflow-hidden border rounded border-primary">
        <Card title="game 1" />
        <Card title="game 1" />
        <Card title="game 1" />
      </div>
    </main>
  );
}
