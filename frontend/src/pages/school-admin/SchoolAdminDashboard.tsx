import { useEffect, useState, type FormEvent } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import DoughnutChart from "@/components/Charts/DoughnutChart";
import {
  Calendar,
  Megaphone,
  SquareUserRound,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import api from "../../../utils/api";
import axios from "axios";
import { toast } from "sonner";


const SchoolAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [createRole, setCreateRole] = useState<"teacher" | "parent">("teacher");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const today = new Date();

  // Format as "Monday, April 13, 2026"
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error.response?.data.message || "Failed to fetch students")
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  },[]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/users/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachers(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  },[]);

  const openCreateUserModal = (role: "teacher" | "parent") => {
    setCreateRole(role);
    setFormData({ name: "", email: "", phone: "", password: "" });
    setIsUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setIsUserModalOpen(false);
    setFormData({ name: "", email: "", phone: "", password: "" });
  };

  const handleCreateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    const { name, email, phone, password } = formData;
    if (!name || !email || !phone || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const endpoint = createRole === "teacher" ? "/users/register-teacher" : "/users/register-parent";
      await api.post(
        endpoint,
        { name, email, phone, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(`${createRole === "teacher" ? "Teacher" : "Parent"} added successfully`);
      closeCreateUserModal();

      if (createRole === "teacher") {
        const teacherResponse = await api.get(`/users/teachers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeachers(teacherResponse.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to create user");
      }
    } finally {
      setLoading(false);
    }
  };

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
        <Sidebar role="school-admin" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="">
            <section className="mb-12">
              <h3 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
                Good morning, Principal.
              </h3>
              <p className="text-on-surface-variant font-medium">
                Your academic overview for {formattedDate}.
              </p>
            </section>
            <section className="mb-8 bg-card border border-border/40 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-on-surface">User Management</h4>
                <p className="text-sm text-on-surface-variant">
                  Add teachers and parents directly under your school.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openCreateUserModal("teacher")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  Add Teacher
                </button>
                <button
                  type="button"
                  onClick={() => openCreateUserModal("parent")}
                  className="bg-sidebar text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Add Parent
                </button>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                    Total Students
                  </span>
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <Users
                      className="material-symbols-outlined"
                      data-icon="group"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-on-surface">
                    {students.length}
                  </span>
                  <p className="text-[12px] text-primary font-bold mt-1 flex items-center gap-1">
                    <TrendingUp
                      className="material-symbols-outlined text-[14px]"
                      data-icon="trending_up"
                    />
                    +12% this term
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                    Faculty
                  </span>
                  <div className="w-10 h-10 rounded-full bg-sidebar flex items-center justify-center">
                    <SquareUserRound
                      className="material-symbols-outlined"
                      data-icon="co_present"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-on-surface">
                    {teachers.length}
                  </span>
                  <p className="text-[12px] text-on-surface-variant font-medium mt-1">
                    Active Staff
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-label font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                    Attendance Rate
                  </span>
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center text-tertiary">
                    <Calendar
                      className="material-symbols-outlined"
                      data-icon="calendar_today"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-on-surface">
                    94.2%
                  </span>
                  <p className="text-[12px] text-on-surface-variant font-medium mt-1">
                    Overall percentage
                  </p>
                </div>
              </div>
              <div className="primary-gradient rounded-lg p-6 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-label font-bold text-on-primary uppercase tracking-[0.1em] opacity-80">
                    Fee Collection
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-on-primary">
                    <Wallet
                      className="material-symbols-outlined"
                      data-icon="account_balance_wallet"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-on-primary">
                    Ksh 142.5k
                  </span>
                  <p className="text-[12px] text-on-primary font-medium mt-1 opacity-90">
                    82% of target reached
                  </p>
                </div>
              </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <section className="lg:col-span-4 bg-card p-8 rounded-lg">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-xl font-bold text-on-surface">
                    Today's Attendance
                  </h4>
                  <span className="text-[10px] bg-secondary px-3 py-1 rounded-full font-bold uppercase tracking-wider text-on-surface-variant">
                    Live
                  </span>
                </div>
                <div className="relative flex justify-center items-center py-6">
                  <DoughnutChart />
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-on-surface">
                      91%
                    </span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      Present
                    </span>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-primary"></span>
                      <span className="font-medium text-on-secondary-container">
                        Present Students
                      </span>
                    </div>
                    <span className="font-bold text-on-surface">1,168</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-on-tertiary-container"></span>
                      <span className="font-medium text-on-secondary-container">
                        Absent/Late
                      </span>
                    </div>
                    <span className="font-bold text-on-surface">116</span>
                  </div>
                </div>
                <button className="w-full mt-8 py-3 bg-primary hover:bg-primary/70 font-bold text-sm rounded-xl transition-all">
                  View Detailed Log
                </button>
              </section>
              <section className="lg:col-span-8">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-on-surface">
                    Upcoming Homework Deadlines
                  </h4>
                  <button className="text-primary font-bold text-sm hover:underline">
                    View Calendar
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="bg-card p-5 rounded-lg flex items-center gap-6 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-14 h-14 rounded-lg bg-tertiary-container/20 flex flex-col items-center justify-center text-tertiary">
                      <span className="text-xs font-black">24</span>
                      <span className="text-[10px] font-bold uppercase">
                        Oct
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold uppercase text-on-tertiary-container">
                          Physics
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Grade 11-A
                        </span>
                      </div>
                      <p className="text-on-surface font-bold text-sm tracking-tight">
                        Quantum Mechanics: Introduction Paper
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-error">Critical</p>
                      <p className="text-[10px] text-on-surface-variant">
                        42 Pending
                      </p>
                    </div>
                  </div>
                  <div className="bg-card p-5 rounded-lg flex items-center gap-6 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-14 h-14 rounded-lg bg-primary-container/20 flex flex-col items-center justify-center text-primary">
                      <span className="text-xs font-black">25</span>
                      <span className="text-[10px] font-bold uppercase">
                        Oct
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold uppercase text-on-primary-container">
                          Math
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Grade 9-C
                        </span>
                      </div>
                      <p className="text-on-surface font-bold text-sm tracking-tight">
                        Advanced Trigonometry Exercises
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-on-surface">
                        Upcoming
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        85 Pending
                      </p>
                    </div>
                  </div>
                  <div className="bg-card p-5 rounded-lg flex items-center gap-6 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-14 h-14 rounded-lg bg-tertiary-container/20 flex flex-col items-center justify-center text-tertiary">
                      <span className="text-xs font-black">27</span>
                      <span className="text-[10px] font-bold uppercase">
                        Oct
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold uppercase text-on-secondary-container">
                          Literature
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Grade 12-B
                        </span>
                      </div>
                      <p className="text-on-surface font-bold text-sm tracking-tight">
                        Modernism in Poetry Analysis
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-on-surface">
                        Standard
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        12 Pending
                      </p>
                    </div>
                  </div>
                  <div className="bg-card p-5 rounded-lg flex items-center gap-6 hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-14 h-14 rounded-lg bg-tertiary-container/20 flex flex-col items-center justify-center text-tertiary">
                      <span className="text-xs font-black">28</span>
                      <span className="text-[10px] font-bold uppercase">
                        Oct
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-accent text-[10px] font-bold uppercase text-on-tertiary-container">
                          History
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium">
                          Grade 10-A
                        </span>
                      </div>
                      <p className="text-on-surface font-bold text-sm tracking-tight">
                        The Industrial Revolution Impact Map
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-on-surface">
                        Standard
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        64 Pending
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <section className="mt-12">
              <h4 className="text-xl font-bold text-on-surface mb-6">
                Recent Announcements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-card rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col md:flex-row">
                  <div className="md:w-1/3">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="Wide shot of a clean modern high school library with natural light streaming through large windows and organized shelves"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzytxKrOZjyKiIoFMuqPWCPxuj-dwVM5IyzJQuygeK_LVv0oCdA2CcOy8_cOdakmK-KFPolJlr4XgS0KmuM_uHoUTK9GhLxot500QCjQtPG1jfCTv-yU-yT05OxOfM9gwg-wpBDxIe3mPXswrVBICXWyTlsL9nB8GQqJf4nZuvV5RR5L8rxtShh2CUEGlCDna2OOpIpcXnWZnEdLMK7RJKwrgU-rQDPk35ESgalcgPuGuIQv-_MQWKI4ftRLA86eD4iQqHPhb4x3YO"
                    />
                  </div>
                  <div className="p-8 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                      Event
                    </span>
                    <h5 className="text-2xl font-bold text-on-surface leading-tight mb-4">
                      Annual Science Fair 2024: Theme "Eco-Innovations"
                    </h5>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                      Join us for our biggest event of the year. Student
                      registrations are now open for all grades from primary to
                      secondary levels.
                    </p>
                    <button className="bg-primary hover:bg-primary-dim text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-sm">
                      Review Logistics
                    </button>
                  </div>
                </div>
                <div className="bg-primary p-8 rounded-lg flex flex-col justify-between">
                  <div>
                    <Megaphone
                      className="material-symbols-outlined text-on-primary-container text-4xl"
                      data-icon="campaign"
                    />

                    <h5 className="text-xl font-bold text-on-primary-container mt-4 leading-tight">
                      Staff Meeting: Curriculum Update
                    </h5>
                  </div>
                  <div className="mt-8">
                    <p className="text-sm text-on-primary-container font-medium opacity-80 mb-1">
                      Today @ 4:00 PM
                    </p>
                    <p className="text-xs text-on-primary-container font-medium opacity-60">
                      Boardroom B
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
      {isUserModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.16)]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-2xl font-bold text-on-surface">
                  Add {createRole === "teacher" ? "Teacher" : "Parent"}
                </h4>
                <p className="text-sm text-on-surface-variant mt-1">
                  This user will be linked to your school automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCreateUserModal}
                className="text-on-surface-variant hover:text-on-surface text-sm font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="name@school.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="0712345678"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Temporary Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="At least 6 characters"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeCreateUserModal}
                  className="px-4 py-2 rounded-md bg-sidebar text-on-surface font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  {loading ? "Saving..." : `Create ${createRole === "teacher" ? "Teacher" : "Parent"}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SchoolAdminDashboard;
