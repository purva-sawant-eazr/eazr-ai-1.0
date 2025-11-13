import { useState, useEffect } from "react";
// import Button from "@/components/Button";
import ModalPlan from "@/components/ModalPlan";
import Icon from "@/components/Icon";
// import SpecialOffer from "./SpecialOffer";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearAuth } from "@/actions/authActions";
import { useRouter } from "next/navigation";

type Props = {
  onOpenSidebar: () => void;
  onToggleTools: () => void;
};

const Header = ({ onOpenSidebar }: Props) => {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // Check login status from localStorage
  useEffect(() => {
    try {
      const storedSession = localStorage.getItem("session_data");
      if (storedSession) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    } catch (err) {
      console.error("Error reading session data:", err);
      setLoggedIn(false);
    }
  }, []);

  // Logout handler with redirect to main page
  const handleLogout = () => {
    localStorage.removeItem("session_data");
    dispatch(clearAuth());
    setLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-3.5 max-md:gap-2 max-md:mb-3">
        <button
          className="hidden size-10 mr-2 justify-center items-center max-lg:flex max-md:mr-0"
          onClick={onOpenSidebar}
        >
          <Icon className="!size-6 fill-strong-950" name="burger" />
        </button>
        <div className="grow">
          <div className="text-label-xl max-md:text-label-md">
            Chat With Eazr1.0
          </div>
          <div className="mt-1 line-clamp-1 text-label-md text-sub-600 max-lg:hidden">
            Break down lengthy texts into concise summaries to grasp.
          </div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {/* add Profile icon to redirect Profile  */}

          {/* <Link
            href="/profile"
            className="flex items-center justify-center size-10 rounded-full bg-white border border-[#E5E7EB] hover:border-[#00A896] hover:bg-[#00A896]/10 transition-all duration-200 shadow-sm overflow-hidden"
            title="Go to Profile"
          > */}
            {/* <div className="relative w-8 h-8 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-200">
              <Image
                src="/images/logo/eazr_logo.png"
                alt="Profile"
                fill
                className="object-contain"
              />
            </div> */}
            {/* dummy Profile */}
            {/* <Image
              src="/images/logo/eazr_logo.png"
              alt="Profile"
              width={120}
             height={40}
              className="w-8 h-8 rounded-full object-contain transition-transform duration-200 group-hover:scale-110"
            />
          </Link> */}

          {/* Logout Button */}
          {loggedIn && (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-[#028678] text-white font-semibold text-sm hover:bg-[#02695D] active:scale-95 transition-all duration-200 shadow-sm flex items-center gap-2 max-md:px-2 max-md:gap-1.5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="max-md:hidden">Logout</span>
            </button>
          )}
        </div>
      </div>
      <ModalPlan open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
