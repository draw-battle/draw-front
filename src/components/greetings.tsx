"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Button } from "@/shared/ui/button";
import { Status } from "@/shared/ui/status";
import { ModalsContext } from "@/store/modals-state";
import dynamic from "next/dynamic";
import { useContext } from "react";

const UsernameModal = dynamic(() =>
  import("@/components/modals/username-modal").then(
    ({ UsernameModal }) => UsernameModal
  )
);

export const Greetings = () => {
  const [username, setUsername] = useLocalStorage<string>("username", "");
  const { setModals } = useContext(ModalsContext);

  const onUsernameSet = (username: string) => {
    setUsername(username);
  };

  return (
    <div className="flex justify-between gap-2">
      <div>
        <h1 className="text-2xl">Welcome, {username || "Stranger"}</h1>
      </div>

      {!username && (
        <div className="flex items-center gap-2 divide-x-2 divide-solid">
          <div className="flex items-center gap-2">
            <Status type="warning" />

            <p>At least</p>
            <Button
              variant="link"
              onClick={() =>
                setModals((modals) => ({ ...modals, username: true }))
              }
            >
              set your name
            </Button>
            <p>in order to play!</p>
          </div>
        </div>
      )}

      <UsernameModal onUsernameSet={onUsernameSet} />
    </div>
  );
};
