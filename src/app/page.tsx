"use client";

import { Card } from "@/components/card";
import { Greetings } from "@/components/greetings";

export default function Home() {
  return (
    <main className="container flex flex-col gap-2 mx-auto mt-5">
      <Greetings />

      <div className="overflow-hidden border rounded border-primary">
        <Card title="game 1" />
        <Card title="game 1" />
        <Card title="game 1" />
      </div>
    </main>
  );
}
