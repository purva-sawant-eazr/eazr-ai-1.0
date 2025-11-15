"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/Searchbox";
import Footer from "@/components/Footer";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const stored = localStorage.getItem("session_data");

    if (stored) {
      try {
        const session = JSON.parse(stored);

        // If user has valid session data, redirect to chat page
        if (session.session_id && session.access_token) {
          const chatSessionId = session.chat_session_id || session.session_id;
          router.push(`/write-copy/${encodeURIComponent(chatSessionId)}`);
        }
      } catch (error) {
        console.error("Error parsing session data:", error);
        // If session data is corrupted, remove it
        localStorage.removeItem("session_data");
      }
    }
  }, [router]);

  return (
    <>
      <Navbar />
      <SearchBox />
      <div className="max-sm:hidden">
        <Footer />
      </div>
    </>
  );
}
