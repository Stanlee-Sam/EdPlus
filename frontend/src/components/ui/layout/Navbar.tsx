import { Menu } from "lucide-react";
import { Bell } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

type NavbarProps = {
  onMenuClick?: () => void;
};

const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <div className="flex h-16 items-center justify-between px-6 bg-background border-b border-border border-2">
      <div className="flex items-center gap-3">
        {onMenuClick ? (
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5 font-bold" />
          </button>
        ) : null}
        <div className="text-sm font-semibold">
          <input
            type="text"
            className=" border-border border-2 rounded-md p-2"
            placeholder="Search "
          />
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <ThemeToggle />
        <a href="/notifications">
          <Bell className="h-5 w-5 font-bold" />
        </a>
        <span className="h-10 w-px bg-border" aria-hidden="true" />{" "}
        <div className="flex flex-row gap-3 items-center">
          <div>
            <h3 className="font-bold text-foreground">Name</h3>
            <p className="font-light text-foreground text-sm">Role</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
