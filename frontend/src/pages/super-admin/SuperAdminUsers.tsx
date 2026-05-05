import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import axios from "axios";
import {
  ArrowDownWideNarrow,
  ChevronsLeft,
  ChevronsRight,
  Edit,
  EllipsisVertical,
  Mail,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../../../utils/api";
import EmptyState from "@/components/ui/layout/EmptyState";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const SuperAdminUsers = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);

  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      iconClassName: "bg-primary text-foreground",
      span: "All registered users",
    },
    {
      label: "Active Sessions",
      value: "—",
      icon: Zap,
      iconClassName: "bg-primary text-foreground",
      span: "Coming soon",
    },
    {
      label: "Pending Invitations",
      value: "—",
      icon: Mail,
      iconClassName: "bg-primary text-foreground",
      span: "Coming soon",
    },
  ];
  // const users = [
  //   {
  //     id: 1,
  //     name: "Sarah Jenkins",
  //     email: "sarah.jenkins@example.com",
  //     role: "Admin",
  //     status: "Active",
  //     last_login: "2024-06-15 10:45 AM",
  //     logoUrl:
  //       "https://lh3.googleusercontent.com/aida-public/AB6AXuCNnDMtygmComHmFwemwvF63F56iWMLhxg9mHdrKGOh6C42pAR5bpx_xAZUUX8K3Rh1IeIyVamhI53Vz0buPGLkjRPFhW_706Xqrdg7kIiDgQm2Ffq27F_h8z5zI_nl9UeQ5yLq2SBrHwNxw3iXtXE7ydCZNtO5N_a_PIerpIHSIvmwBqpjcSmwVklk5MOOHuy4KcPWQgq-EVhZbMhC21t2Pu0UUzbNeeHvCJ-vcRBNJvM-HZ1xuZ4kuvj-uOs9OVGGfqBdayXbsiuU",
  //   },
  // ];

  const openEditModal = (user: User) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      
    });
    setEditingFieldId(user.id);
    setMode("edit");
  };

  const closeModal = () => {
    setMode(null);
    setEditingFieldId(null);

    setFormData({
      name: "",
      email: "",
      role: "",
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error?.response?.data.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          aria-label="Close sidebar"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-border/40 bg-card transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar role="super-admin" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col  gap-3 w-full md:flex-row md:justify-between md:items-end">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Management Portal
                </p>
                <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">
                  User Management
                </h1>
              </div>
              <button className="primary-gradient text-[15px] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                <UserPlus className="" />
                Invite New User
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-2 bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] border border-outline-variant/5"
                >
                  <div className="flex flex-row justify-between items-center">
                    <div
                      className={`h-10 w-10 rounded-sm flex items-center justify-center ${stat.iconClassName}`}
                    >
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant/40 bg-muted px-2 py-1 rounded-full">
                      {stat.span}
                    </span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-on-surface">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                <ArrowDownWideNarrow
                  className="material-symbols-outlined text-2xl"
                  data-icon="sort"
                />

                <span className="">Sorted by: Recently Added</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="hidden lg:grid grid-cols-12 px-6 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50">
                <div className="col-span-3">User Name</div>
                <div className="col-span-3">Email</div>
                <div className="col-span-2">Role</div>
                <div className="col-span-2">Created Date</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {users.length === 0 ? (
                <div className="p-12">
                  <EmptyState
                    title="No Users registered"
                    description="There are currently no users in the system. Start by adding a new user to begin monitoring."
                    icon={Users}
                    actionLabel="Add New User"
                    // onAction={openCreateModal}
                  />
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="relative flex flex-col gap-3 px-4 py-4 pr-12 sm:px-6 sm:py-5 bg-surface-container-lowest rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:shadow-primary/5 transition-all group bg-card lg:grid lg:grid-cols-12 lg:items-center lg:pr-6"
                  >
                    <button className="absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all lg:hidden">
                      <Edit className="w-4 h-4" />
                    </button>
                    <div className="lg:col-span-3 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-background overflow-hidden shrink-0">
                        <img
                          alt={`${user.name} logo`}
                          className="w-full h-full object-cover"
                          src={`https://ui-avatars.com/api/?name=${user.name}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                          {user.name}
                        </h4>
                      </div>
                    </div>
                    <div className="lg:col-span-3 hidden lg:block text-sm text-on-surface-variant truncate">
                      {user.email}
                    </div>
                    <div className="lg:col-span-2 hidden lg:block">
                      <p className="text-sm font-semibold text-on-surface">
                        {user.role}
                      </p>
                    </div>
                    <div className="lg:col-span-2 hidden lg:block">
                      <p className="text-sm font-semibold text-on-surface">
                        {new Date(user.createdAt).toLocaleDateString()}{" "}
                      </p>
                    </div>

                    <div className="lg:col-span-1 hidden lg:flex lg:justify-center">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        {/* Temporary solution */}
                        {/* Temporary solution */}
                        Active
                      </div>
                    </div>
                    <div className="lg:hidden flex flex-col gap-2 text-xs text-on-surface-variant">
                      <span className="w-fit px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        {/* Temporary solution */}
                        Active
                      </span>
                    </div>
                    <div className="lg:col-span-1 hidden lg:flex justify-end">
                      <button onClick={() => openEditModal(user)} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
              <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
                Showing 1-10 of {users.length} users
              </p>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsLeft className="material-symbols-outlined" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  3
                </button>
                <div className="w-10 h-10 flex items-center justify-center text-on-surface-variant">
                  ...
                </div>
                <button className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsRight className="material-symbols-outlined" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminUsers;
