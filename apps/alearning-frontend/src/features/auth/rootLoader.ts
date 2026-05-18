import { redirect } from "react-router-dom";

import { useAuthStore } from "../../../store/auth/authStore";

export const rootLoader = async () => {
  const user =
    useAuthStore.getState().user;

  if (!user) {
    throw redirect("/login");
  }

  return { user };
};