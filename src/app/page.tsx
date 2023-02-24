import { Card } from "@/components/card";
import { Greetings } from "@/components/greetings";

async function getRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_ENDPOINT}/rooms`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const rooms: {
    id: string;
    created_at: string;
    username: string;
  }[] = await getRooms();
  console.log(rooms);
  return (
    <main className="container flex flex-col gap-2 mx-auto mt-5">
      <Greetings />

      <div className="overflow-hidden border rounded border-primary">
        {rooms.map((r) => (
          <Card key={r.id} id={r.id} title={r.username} />
        ))}
      </div>
    </main>
  );
}
