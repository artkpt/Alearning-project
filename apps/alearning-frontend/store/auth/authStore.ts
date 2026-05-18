import { create } from "zustand";

import { persist } from "zustand/middleware";

type User = {
  username: string;
  role: "admin" | "user";
};

type AuthStore = {
  user: User | null;

  login: (
    username: string,
    password: string
  ) => boolean;

  logout: () => void;
};

export const useAuthStore =
  create<AuthStore>()(
    persist(
      (set) => ({
        user: null,

        login: (
          username,
          password
        ) => {
          // admin

          if (
            username == "admin" &&
            password == "admin"
          ) {
            set({
              user: {
                username: "admin",
                role: "admin",
              },
            });

            return true;
          }

          // user

          if (
            username == "user" &&
            password == "user"
          ) {
            set({
              user: {
                username: "user",
                role: "user",
              },
            });

            return true;
          }

          return false;
        },

        logout: () => {
          set({
            user: null,
          });
        },
      }),
      {
        name: "auth-storage",
      }
    )
  );