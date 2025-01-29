"use server";

import Signup from "@/components/forms/Signup";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import User from "@/models/User";

const page = async () => {
  const session = await auth();
  if (session) {
    console.log("User is authenticated, redirecting to home page");
    redirect("/");
  }
  const userApi = await User.find({}).lean();
  let user = JSON.parse(JSON.stringify(userApi));
  return <Signup user={user} />;
};

export default page;
