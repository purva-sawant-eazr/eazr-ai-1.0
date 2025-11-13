"use client";

import WriteCopyPage from "@/templates/WriteCopyPage";
import { use } from "react";

interface PageProps {
  params: Promise<{
    chatId: string;
  }>;
}

export default function ChatPage({ params }: PageProps) {
  const { chatId } = use(params);
  return <WriteCopyPage />;
}
