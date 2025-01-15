import Signup from "@/components/forms/Signup";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  return <Signup />;
};

export default page;
