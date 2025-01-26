import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { auth } from "./api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  await connectDB();
  const session = await auth();
  const userApi = await User.findOne({ _id: session?.user?.id });
  console.log("checking auth...");
  if (!session || !session?.user?.id) {
    console.log("not authenticated, redirecting to login.");
    redirect("/login");
  }
  let notesApi = JSON.parse(JSON.stringify(userApi?.notes || []));
  let user = JSON.parse(JSON.stringify(userApi));
  return <Dashboard notesApi={notesApi} settings={user.settings} />;
}
