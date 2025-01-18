import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import User from "@/models/User";
import { auth } from "./api/auth/[...nextauth]/auth";
export default async function Home() {
  await connectDB();
  const session = await auth();
  const userApi = await User.findOne({ _id: session?.user?.id });
  const { notes } = userApi;

  return <Dashboard notesApi={JSON.parse(JSON.stringify(notes))} />;
}
