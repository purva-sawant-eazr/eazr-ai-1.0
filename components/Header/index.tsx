import { useState } from "react";
import ModalPlan from "@/components/ModalPlan";
import Icon from "@/components/Icon";

type Props = {
  onOpenSidebar: () => void;
  onToggleTools: () => void;
};

const Header = ({ onOpenSidebar }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4 max-md:gap-2">
        <button
          className="hidden size-10 justify-center items-center max-lg:flex"
          onClick={onOpenSidebar}
        >
          <Icon className="!size-6 fill-strong-950" name="burger" />
        </button>
      </div>
      <ModalPlan open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
