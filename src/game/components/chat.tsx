import { Input } from "@/shared/ui/input";
import { IMessage, useMessagesStore } from "@/store/messages-state";
import classNames from "classnames";

type ChatProps = {
  pinned?: IMessage[];
};

export const Chat = ({ pinned }: ChatProps) => {
  const messages = useMessagesStore((state) => state.messages);

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div>
        <h1 className="text-xl">Chat</h1>
      </div>
      <div className="flex flex-col h-full gap-2">
        <div className="flex flex-col justify-end p-2 border border-primary grow">
          {pinned && (
            <div className="flex-grow-[inherit]">
              {pinned.map((p, i) => (
                <Message
                  key={i}
                  author={p.author}
                  body={p.body}
                  status={p.status}
                />
              ))}
            </div>
          )}

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
