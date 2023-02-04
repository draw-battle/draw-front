"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { Button } from "@/shared/ui/button";
import { Status } from "@/shared/ui/status";
import dynamic from "next/dynamic";
import { useState } from "react";

const Modal = dynamic(() =>
  import("@/shared/ui/modal").then(({ Modal }) => Modal)
);

export const Greetings = () => {
  const [username, setUsername] = useLocalStorage("username", "Stranger");
  const [openUsernameModal, setUsernameModal] = useState(true);

  return (
    <div className="flex justify-between gap-2">
      <div>
        <h1 className="text-2xl">Welcome, {username}</h1>
      </div>

      <div className="flex items-center gap-2 divide-x-2 divide-solid">
        <div className="flex items-center gap-2">
          <Status type="warning" />
          <p>At least</p>
          <Button variant="link" onClick={() => setUsernameModal(true)}>
            set your name
          </Button>
          <p>in order to play!</p>
        </div>
      </div>

      <Modal open={openUsernameModal} setOpen={setUsernameModal} withControls>
        Hello
      </Modal>
    </div>
  );
};
