import React from "react";
import LoadingScreen from "../../components/common/LoadingScreen";

export default function BlogDetailLoading() {
  return (
    <main className="bg-white text-zinc-950 min-h-screen">
      <LoadingScreen variant="blog-detail" />
    </main>
  );
}
