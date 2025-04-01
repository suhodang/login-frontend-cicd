import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    username: string;
    email: string;
    password: string;
};

interface AuthState {
    user: User | null;
    isLoggedIn: boolean;
    login: (user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>() (
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            login: (user) => set({ user, isLoggedIn: true }),
            logout: () => {
                localStorage.removeItem("token");
                set({ user: null, isLoggedIn: false })
            },
        }),
        {
            name: "auth-storage"
        }
    )
);