import { redirect } from "next/navigation";
import React from "react";

const NotFound = () => {
  return redirect("/");
  return <div>NotFound</div>;
};

export default NotFound;
