import { useEffect } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  BriefcaseMedical,
  Calendar,
  ChartColumn,
  CheckCircle,
  ChevronsLeft,
  ChevronsRight,
  CircleX,
  Info,
  TextAlignStart,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "../../../utils/api";
import axios from "axios";

type AttendanceStats = {
  presentStudents: number;
  absentStudents: number;
  totalRecords: number;
  attendancePercentage: number;
};
const SchoolAdminAttendance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [attendanceStats, setAttendanceStats] =
    useState<AttendanceStats | null>(null);

  const stats = [
    {
      label: "Total Present",
      value: attendanceStats ? attendanceStats.presentStudents : "--",
      valueClassName: "text-primary",
      icon: CheckCircle,
      iconWrapperClassName: "bg-primary/10 text-primary",
      footer: (
        <div className="mt-4 flex items-center gap-2 text-xs text-foreground font-medium">
          <TrendingUp className="material-symbols-outlined text-sm" />
          <span>4% increase from yesterday</span>
        </div>
      ),
    },
    {
      label: "Total Absent",
      value: attendanceStats ? attendanceStats.absentStudents : "--",
      valueClassName: "text-error",
      icon: CircleX,
      iconWrapperClassName: "bg-error/10 text-error",
      footer: (
        <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant font-medium">
          <Info className="material-symbols-outlined text-sm" />
          <span>Requires follow-up calls</span>
        </div>
      ),
    },
    {
      label: "Average Rate",
      value: attendanceStats ? `${attendanceStats.attendancePercentage}%` : "--",
      valueClassName: "text-on-surface",
      icon: ChartColumn,
      iconWrapperClassName: "bg-accent text-on-surface-variant",
      footer: (
        <div className="mt-4 h-2 w-full bg-accent rounded-full overflow-hidden">
          <div className="h-full primary-gradient w-[92%]"></div>
        </div>
      ),
    },
  ];

  const students = [
    {
      id: "101",
      name: "Aditi Sharma",
      parent: "Rajesh Sharma",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCmFa5LSCnJ-eC-uUxzldve7oXcWrImu3jFnBwdKXKnFew0UpltDnGUfg3aBbIydc55U6liuGNG_NkBmcJPWZeF1NC90pTi-esERN4-t_vhyCEYT7Q98yHF6YgnHPv0D4P40KjefhFU_ZXWZHBQ9h6arsGF9-XC8b73Ub7nRlAIpR7Gq8uySZ7E44Vz3qwyl1oZonQVO5p25Cuinl8sqWezeAxn1OO03VP8BcgHIK2w06T3OOBQX_B2pl1axYoxLXXgbAx0yzAjUoVw",
      status: "present",
      remarkType: "note",
    },
    {
      id: "102",
      name: "Benjamin Foster",
      parent: "Sarah Foster",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAJaDvtYT7RsllC5cpLrkHEAR048gSx0knGlRmSb6eRlnRQLPHSJ9M0tMJG_9MpiVixMJRAgUz407rTOfEkxMdtH3qSj-MgiPlqo7PSoU4UJjSTrgTisQyYO659w5CD5yxskeWiu_CpuxOIcRwE4aDAfpHiP55T1JzxzY4k4NxIHA7r5KTPCCOnr-5LB4FflhPA6BqKNjZR-tmDTScneMDmW_InRmaTrIMIELW74JiWnh-kg5unYKeszqFr8fXNXIli1F0GDoAKh_KE",
      status: "late",
      remarkType: "late",
      remarkText: "15m Delayed",
    },
    {
      id: "103",
      name: "Chloe Chen",
      parent: "Kevin Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfdoyxOIgS6SflydI3nxi2QYhmIMB9j5O-yRhyEH7o0hzNLDTG31LzQb6if_EHMzaMLnvLwver0hebpOZhSgBp9V-7TpxzaGnoXYj1DgJw_zPrNOIrLr3GppfzGRZAWeKcsqB3sEGsSd2ArgtTxIiMg7huEHYdV2qz8ziNpkMN54zuLfAeY1IAKEaNDhxoapwp-mBLoxK1eua8psA5aY_VYMCLzb4tJGKqgUmnO0MuAueavO-KgyDk51IT0a1I9M3rSlgDSXu_3jw3",
      status: "absent",
      remarkType: "medical",
    },
    {
      id: "104",
      name: "Daniel Brooks",
      parent: "Mary Brooks",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC1Q7XxMTGWrcIVpkt5a7JWrV6b8VE4WR-UMyXV0c6vkxfvi5jGxM5-f3iD6HWThGIiOxHkBLnbRxb9HX65bJ9HY5aLQi35REeOS1DBzbe0hflscJCZgENG18MSchwBgWUxAWxbagYkuirNThSsvGEHKvkEOwFJvaEbSaYFpUtSF6RaN3Jw9XlSX7satiVmI_nhYhErIl8g99TFmp0W75TX0pePk9w74LvY4giGgnumoSmCpVYU2UChADFRBvH71IeEbmbT9frl_a9v",
      status: "present",
      remarkType: "note",
    },
  ];

  useEffect(() => {
    const fetchAttendanceStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get<AttendanceStats>(`/attendance/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendanceStats(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch attendance stats",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceStats();
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
        <Sidebar role="school-admin" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-12">
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-on-surface tracking-tight">
                  Attendance Hub
                </h2>
                <p className="text-on-surface-variant mt-2 text-lg">
                  Track and manage daily student presence.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="bg-sidebar px-4 py-2 rounded-lg flex items-center gap-3">
                  <Calendar className="material-symbols-outlined text-primary" />

                  <input
                    className=" bg-sidebar text-foreground  border-none p-0 text-sm font-semibold focus:ring-0"
                    type="date"
                    value="2023-10-24"
                  />
                </div>
                <div className="bg-sidebar px-4 py-2 rounded-lg flex items-center gap-3">
                  <Users className="material-symbols-outlined text-primary" />

                  <select className="bg-sidebar text-foreground border-none p-0 text-sm font-semibold focus:ring-0 appearance-none pr-6">
                    <option>Grade 10-A</option>
                    <option>Grade 10-B</option>
                    <option>Grade 9-C</option>
                  </select>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="bg-card p-5 sm:p-8 rounded-lg cloud-shadow border border-outline-variant/5"
                  >
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                      {stat.label}
                    </p>
                    <div className="flex items-end justify-between">
                      <h3
                        className={`text-4xl sm:text-5xl font-black ${stat.valueClassName}`}
                      >
                        {stat.value}
                      </h3>
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${stat.iconWrapperClassName}`}
                      >
                        <Icon className="material-symbols-outlined" />
                      </div>
                    </div>
                    {stat.footer}
                  </div>
                );
              })}
            </section>
            <section className="flex flex-col md:flex-row justify-between items-center gap-4 bg-sidebar/50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-on-surface-variant ml-2">
                  Viewing:{" "}
                  <span className="text-on-surface">
                    October 24, 2023 • Section A
                  </span>
                </span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                  Draft Saved
                </span>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-primary/20 text-primary font-bold text-sm hover:bg-primary/25 transition-colors">
                  Mark All Present
                </button>
                <button className="flex-1 sm:flex-none px-8 py-2.5 rounded-lg primary-gradient text-on-primary font-bold text-sm shadow-md shadow-primary/20 transition-all active:scale-95">
                  Submit Attendance
                </button>
              </div>
            </section>
            <section className="space-y-3">
              <div className="hidden md:flex items-center px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                <div className="w-12">Roll</div>
                <div className="flex-1">Student Name</div>
                <div className="w-64 text-center">Status</div>
                <div className="w-32 text-right">Remarks</div>
              </div>
              {students.map((student) => (
                <div
                  key={student.id}
                  className="group relative flex flex-col md:flex-row md:items-center gap-4 bg-card p-4 rounded-lg hover:bg-surface-container-low transition-all duration-300 border border-transparent hover:border-primary/10"
                >
                  <div className="absolute right-3 top-3 md:hidden">
                    {student.remarkType === "note" ? (
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <TextAlignStart className="material-symbols-outlined" />
                      </button>
                    ) : null}
                    {student.remarkType === "late" ? (
                      <span className="text-[10px] font-bold bg-secondary px-2 py-1 rounded text-on-secondary">
                        {student.remarkText}
                      </span>
                    ) : null}
                    {student.remarkType === "medical" ? (
                      <BriefcaseMedical className="material-symbols-outlined text-error text-sm" />
                    ) : null}
                  </div>
                  <div className="w-12 font-black text-on-surface-variant opacity-50">
                    #{student.id}
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <img
                      className="w-12 h-12 rounded-xl object-cover ring-4 ring-background"
                      alt={`${student.name} avatar`}
                      src={student.avatar}
                    />
                    <div>
                      <p className="font-bold text-on-surface">
                        {student.name}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Parent: {student.parent}
                      </p>
                    </div>
                  </div>
                  <div className="w-full md:w-64 flex justify-center gap-2 mt-4 md:mt-0">
                    <button
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        student.status === "present"
                          ? "bg-primary text-on-primary"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        student.status === "absent"
                          ? "bg-error text-on-error"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-error/10 hover:text-error"
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                        student.status === "late"
                          ? "bg-secondary text-on-secondary"
                          : "bg-surface-container-high text-on-surface-variant hover:bg-secondary/10 hover:text-secondary"
                      }`}
                    >
                      Late
                    </button>
                  </div>
                  <div className="w-full md:w-32 md:text-right text-left mt-3 md:mt-0 hidden md:block">
                    {student.remarkType === "note" ? (
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <TextAlignStart className="material-symbols-outlined" />
                      </button>
                    ) : null}
                    {student.remarkType === "late" ? (
                      <span className="text-[10px] font-bold bg-secondary px-2 py-1 rounded text-on-secondary">
                        {student.remarkText}
                      </span>
                    ) : null}
                    {student.remarkType === "medical" ? (
                      <BriefcaseMedical className="material-symbols-outlined text-error-container text-sm" />
                    ) : null}
                  </div>
                </div>
              ))}
            </section>
            <footer className="flex justify-between items-center pt-8 border-t border-outline-variant/10">
              <p className="text-xs text-on-surface-variant">
                Showing{" "}
                <span className="font-bold text-on-surface">4 of 36</span>{" "}
                students
              </p>
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant disabled:opacity-30"
                  disabled
                >
                  <ChevronsLeft className="material-symbols-outlined" />
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
                  3
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all">
                  <ChevronsRight className="material-symbols-outlined" />
                </button>
              </div>
            </footer>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default SchoolAdminAttendance;
