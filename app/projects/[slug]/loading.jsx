import React from "react";
import LoadingScreen from "../../components/common/LoadingScreen";

export default function ProjectDetailLoading() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <LoadingScreen variant="project-detail" />
    </main>
  );
}
