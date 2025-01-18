import { auth } from "@/app/api/auth/[...nextauth]/auth";
import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import User from "@/models/User";
import React from "react";

const page = async () => {
  await connectDB();
  const session = await auth();
  const userApi = await User.findOne({ _id: session?.user?.id });
  const { notes } = userApi;
  return <Dashboard notesApi={JSON.parse(JSON.stringify(notes))} />;
};

export default page;
