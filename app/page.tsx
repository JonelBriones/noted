import Dashboard from "@/components/Dashboard";
import connectDB from "@/config/database";
import User from "@/models/User";
import Note from "@/models/Note";
export default async function Home() {
  await connectDB();
  const userAPI = await User.find({}).lean();

  return <Dashboard />;
}
