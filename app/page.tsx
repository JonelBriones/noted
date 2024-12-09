import NoteCard from "@/components/card/NoteCard";
import Menu from "@/components/settings/Menu";
import Navigation from "@/components/sidebar/Navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarRight from "@/components/sidebar/SidebarRight";
import Topbar from "@/components/Topbar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <NoteCard />
    </div>
  );
}
