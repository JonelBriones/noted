import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";

const page = async () => {
  await connectDB();
  const session = await auth();
  const userApi = await User.findOne({ _id: session?.user?.id });
  console.log("checking auth...");
  if (!session || !session?.user?.id) {
    console.log("not authenticated, redirecting to login.");
  }
  let notesApi = JSON.parse(JSON.stringify(userApi?.notes || []));

  return <Dashboard notesApi={notesApi} />;
};
export default page;
