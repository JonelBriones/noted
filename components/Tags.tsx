"use client";
import React from "react";
import Dashboard from "./Dashboard";
import { useParams } from "next/navigation";

const Tags = () => {
  const { tag } = useParams();
  return <Dashboard tag={tag} />;
};

export default Tags;
