import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Modal } from "@/shared/ui/modal";
import { ModalsContext } from "@/store/modals-state";
import { FC, useContext, useState } from "react";

type UsernameModalProps = {
  onUsernameSet: (username: string) => void;
};

export const UsernameModal: FC<UsernameModalProps> = ({ onUsernameSet }) => {
  const { modals, setModals } = useContext(ModalsContext);

  const setUsernameModal = (open: boolean) => {
    setModals((modals) => ({ ...modals, username: open }));
  };

  // Form
  const [username, setUsername] = useState("");

  const onSubmit = () => {
    setUsernameModal(false);
    onUsernameSet(username);
  };

  return (
    <Modal
      open={modals.username}
      setOpen={setUsernameModal}
      title="Set your username"
      withControls
    >
      <div className="flex">
        <Input
          placeholder="my name is"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={onSubmit}>set</Button>
      </div>
    </Modal>
  );
};
