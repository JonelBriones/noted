"use server";
import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import React from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import User from "@/models/User";

const page = async () => {
  await connectDB();
  const session = await auth();
  const userApi = await User.findOne({ _id: session?.user?.id });
  const { notes } = userApi;
  let notesApi = JSON.parse(JSON.stringify(userApi?.notes || []));
  let newToOldestNotes = notesApi.reverse();
  return <Dashboard notesApi={newToOldestNotes} />;
};

export default page;
