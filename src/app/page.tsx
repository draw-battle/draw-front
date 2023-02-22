"use client";

import { Card } from "@/components/card";
import { Greetings } from "@/components/greetings";

export default function Home() {
  const MOCK_GAMES = [
    { id: "a;lwfekja;lksdf", title: "game 1" },
    { id: "a;lwfekjaasdf", title: "game 2" },
    { id: "a;fsdflksdf", title: "game 3" },
  ];
  return (
    <main className="container flex flex-col gap-2 mx-auto mt-5">
      <Greetings />

      <div className="overflow-hidden border rounded border-primary">
        {MOCK_GAMES.map((g) => (
          <Card key={g.id} id={g.id} title={g.title} />
        ))}
      </div>
    </main>
  );
}
