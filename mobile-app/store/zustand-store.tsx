import create from "zustand";
import { User } from "../types";

type UserState = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const useStore = create<UserState>((set) => ({
    user: null,
    setUser: (newUser) => set(() => ({ user: newUser })),
}));
