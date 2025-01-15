import Login from "@/components/forms/Login";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <Login />;
};

export default page;
