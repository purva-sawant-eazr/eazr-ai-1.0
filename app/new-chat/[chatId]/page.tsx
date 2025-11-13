"use client";

import WriteCopyPage from "@/templates/WriteCopyPage";
import { use } from "react";

export default function NewChatPage({ params }: { params: Promise<{ chatId: string }> }) {
  const { chatId } = use(params);
  console.log("Chat session:", chatId);
  return <WriteCopyPage />;
}
