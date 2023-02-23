import { create } from "zustand";

type State = {
  messages: IMessage[];
};

type Actions = {
  addMessage: (message: IMessage) => void;
};

export interface IMessage {
  body: string;
  author: string;
  status: "default" | "success" | "error";
}

export const useMessagesStore = create<State & Actions>((set) => ({
  messages: [],
  addMessage(message) {
    set((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  },
}));
