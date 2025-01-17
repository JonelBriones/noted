import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import Note from "@/models/Note";
import React from "react";

const page = async () => {
  await connectDB();
  const notesApi = await Note.find({}).lean();

  return <Dashboard notesApi={JSON.parse(JSON.stringify(notesApi))} />;
};

export default page;
