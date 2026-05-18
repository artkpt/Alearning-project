import { redirect } from "react-router";
import { setUser } from "./auth";

export const login = async ({
  request,
}: {
  request: Request;
}) => {
  const formData = await request.formData();

  const username = formData.get("username");
  const password = formData.get("password");

  // mock auth
  if (username === "admin" && password === "1234") {
    setUser({
      username: "admin",
      role: "admin",
    });

    return redirect("/admin");
  }

  if (username === "user" && password === "1234") {
    setUser({
      username: "user",
      role: "user",
    });

    return redirect("/notes");
  }

  return {
    error: "username หรือ password ไม่ถูกต้อง",
  };
};