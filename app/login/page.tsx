"use server";
import Login from "@/components/forms/Login";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import User from "@/models/User";
import { ReactLoader } from "@/components/ReactLoader";
const page = async () => {
  const session = await auth();
  if (session) {
    console.log("User is authenticated, redirecting to home page");
    redirect("/");
  }

  let user = null;

  try {
    const userApi = await User.find({}).lean();
    user = JSON.parse(JSON.stringify(userApi));
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return <Login user={user} />;
};

export default page;
