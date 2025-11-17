import { useState, useEffect } from "react";
import ModalPlan from "@/components/ModalPlan";
import Icon from "@/components/Icon";
import { LogOut, LogIn } from "lucide-react";
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

  // Login handler with redirect to login page
  const handleLogin = () => {
    router.push("/auth/sign-in");
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

          {/* Login/Logout Button - Conditional */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-dark active:scale-95 transition-all duration-200 shadow-sm flex items-center gap-2 max-md:px-2 max-md:gap-1.5"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="max-md:hidden">Logout</span>
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="px-3 py-1.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-dark active:scale-95 transition-all duration-200 shadow-sm flex items-center gap-2 max-md:px-2 max-md:gap-1.5"
              title="Login"
            >
              <LogIn className="w-4 h-4" />
              <span className="max-md:hidden">Login</span>
            </button>
          )}
        </div>
      </div>
      <ModalPlan open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
