import { redirect } from "react-router-dom";

import { useAuthStore } from "../../../store/auth/authStore";

export const adminLoader = async () => {
  const user =
    useAuthStore.getState().user;

  if (!user) {
    throw redirect("/login");
  }

  if (user.role !== "admin") {
    throw redirect("/notes");
  }

  return null;
};