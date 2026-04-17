import {
  Banknote,
  Calendar,
  FileText,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";
import { ChartColumn } from "lucide-react";
import { Settings } from "lucide-react";
import logo from "../../../assets/EdPlus_Logo.png";
import { useLocation } from "react-router";

type SidebarRole = "super-admin" | "school-admin" | "teacher" | "parent";

type SidebarProps = {
  role: SidebarRole;
};

const SIDEBAR_ITEMS: Record<
  SidebarRole,
  { label: string; href: string; icon: any }[]
> = {
  "super-admin": [
    {
      label: "Dashboard",
      href: "/superadmin-dashboard",
      icon: LayoutDashboard,
    },
    { label: "Schools", href: "/superadmin-schools", icon: GraduationCap },
    { label: "Users", href: "/superadmin-users", icon: Users },
    {
      label: "Reports",
      href: "/dashboard/superadmin-reports",
      icon: ChartColumn,
    },
    {
      label: "Settings",
      href: "/dashboard/superadmin-settings",
      icon: Settings,
    },
  ],
  "school-admin": [
    {
      label: "Overview",
      href: "/schooladmin-dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Academics",
      href: "/schooladmin-academics",
      icon: GraduationCap,
    },
    {
      label: "Financials",
      href: "/schooladmin-financials",
      icon: Banknote,
    },
    {
      label: "Results",
      href: "/schooladmin-results",
      icon: ChartColumn,
    },
    {
      label: "Attendance",
      href: "/schooladmin-attendance",
      icon: Calendar,
    },
    {
      label: "Homework",
      href: "/schooladmin-homework",
      icon: FileText,
    },
    {
      label: "Announcements",
      href: "/schooladmin-announcements",
      icon: Megaphone,
    },
  ],
  teacher: [
    { label: "Dashboard", href: "/teacher-dashboard", icon: LayoutDashboard },
    { label: "My Classes", href: "/teacher-myclasses", icon: GraduationCap },
    { label: "Students", href: "/teacher-students", icon: Users },
    { label: "Assignments", href: "/teacher-assignments", icon: FileText },
    { label: "Attendance", href: "/teacher-attendance", icon: Calendar },
    { label: "Grades", href: "/teacher-results", icon: ChartColumn },
    { label: "Messages", href: "/teacher-messages", icon: Megaphone },
  ],
  parent: [
    { label: "Dashboard", href: "/parent-dashboard", icon: LayoutDashboard },
    { label: "My Students", href: "/parent-students", icon: Users },
    { label: "Attendance", href: "/parent-attendance", icon: Calendar },
    { label: "Financials", href: "/parent-financials", icon: Banknote },
    { label: "Results", href: "/parent-results", icon: ChartColumn },
    { label: "Homework", href: "/parent-homework", icon: FileText },
    {
      label: "Term Summary",
      href: "/parent-term-summary",
      icon: GraduationCap,
    },
  ],
};

const Sidebar = ({ role }: SidebarProps) => {
  const { pathname } = useLocation();
  const items = SIDEBAR_ITEMS[role];
  return (
    <div className="flex h-full flex-col gap-15 p-6 bg-sidebar">
      <div className="flex flex-row gap-2 items-center justify-center">
        <img src={logo} alt="" className="w-10 h-10 rounded-sm" />
        <div>
          <h3 className="text-foreground font-bold text-2xl">EdPlus</h3>
          <p className="text-muted-foreground text-sm">ACADEMIC ATELIER</p>
        </div>
      </div>
      <nav className="flex flex-col gap-3 text-md font-semibold text-muted-foreground">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.href}
              className={`flex flex-row items-center gap-2 rounded-sm py-2 px-4 ${
                isActive
                  ? "bg-popover text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              href={item.href}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <p className=""> {item.label}</p>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
