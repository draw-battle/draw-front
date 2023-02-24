import { create } from "zustand";

type State = {
  username: string;
};

type Actions = {
  updateUsername: (username: string) => void;
};

export const useUserStore = create<State & Actions>((set) => ({
  username: (localStorage.getItem("username") as string) || "",
  updateUsername(username) {
    set((prev) => ({ ...prev, username }));
  },
}));
