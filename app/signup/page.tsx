"use server";

import Signup from "@/components/forms/Signup";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session) {
    console.log("User is authenticated, redirecting to home page");
    redirect("/");
  }
  return <Signup />;
};

export default page;
