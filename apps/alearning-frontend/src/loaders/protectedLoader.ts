import { redirect } from "react-router";
import { isAuthenticated } from "../utils/auth";

export const protectedLoader = async () => {
  const isLogin = isAuthenticated();

  if (!isLogin) {
    throw redirect("/login");
  }

  return null;
};