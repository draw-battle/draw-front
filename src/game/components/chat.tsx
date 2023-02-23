import { Input } from "@/shared/ui/input";
import { IMessage, useMessagesStore } from "@/store/messages-state";
import classNames from "classnames";
import { Socket } from "socket.io-client";

export const Chat = () => {
  const messages = useMessagesStore((state) => state.messages);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div>
        <h1 className="text-xl">Chat</h1>
      </div>
      <div className="flex flex-col h-full gap-2">
        <div className="flex flex-col justify-end p-2 border border-primary grow">
          {messages.map((m, i) => (
            <Message
              key={i}
              author={m.author}
              body={m.body}
              status={m.status}
            />
          ))}
        </div>
        <Input placeholder="type here" className="self-end" />
      </div>
    </div>
  );
};

const Message = ({ author, body, status }: IMessage) => {
  return (
    <div
      className={classNames("flex justify-between p-1", {
        "bg-green-900": status === "success",
        "bg-red-700": status === "error",
      })}
    >
      <p>{body}</p>
      <p className="text-sm text-gray-500">{author}</p>
    </div>
  );
};
