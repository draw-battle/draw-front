import { Input } from "@/shared/ui/input";

export const Chat = () => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div>
        <h1 className="text-xl">Chat</h1>
      </div>
      <div className="flex flex-col h-full gap-2">
        <div className="border border-primary grow"></div>
        <Input placeholder="type here" className="self-end" />
      </div>
    </div>
  );
};
