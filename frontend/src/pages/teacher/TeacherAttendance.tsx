import { useEffect, useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import EmptyState from "@/components/ui/layout/EmptyState";
import { Calendar, CheckCheck, ListFilter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import axios from "axios";
import api from "../../../utils/api";

interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: string;
  student: {
    id: string;
    name: string;
    admissionNumber: string;
  };
}

const TeacherAttendance = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    if (authLoading) return;

    const fetchClassAttendance = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?.userId) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get<AttendanceRecord[]>(`/attendance/class`, {
          params: {
            date: new Date().toISOString().split("T")[0],
          },
        });
        setStudents(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch class attendance",
          );
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClassAttendance();
  }, [authLoading, user?.userId]);

  const getStatusClass = (status: string, current: string) => 
  status === current 
    ? "bg-primary text-white shadow-sm" 
    : "text-on-surface-variant hover:text-on-surface transition-all";


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
        <Sidebar role="teacher" />
      </aside>
      <main className="flex  flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1">
          <div className="p-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                  Class Roster
                </h2>
                <p className="text-on-surface-variant mt-2 text-md md:text-lg">
                  Mark attendance for{" "}
                  <span className="font-bold text-on-surface">36 Students</span>{" "}
                  in{" "}
                  <span className="font-bold text-on-surface">
                    Modern History
                  </span>
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary-container font-bold  text-[12px] md:text-sm hover:bg-surface-container-highest transition-colors flex items-center">
                  <CheckCheck className="material-symbols-outlined mr-2 text-[20px]" />
                  Mark All Present
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary-container font-bold  text-[12px] md:text-sm hover:bg-surface-container-highest transition-colors flex items-center">
                  <ListFilter className="material-symbols-outlined mr-2 text-[20px]" />
                  Filter
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="rounded-xl bg-card p-6 text-sm font-medium text-on-surface-variant">
                  Loading attendance...
                </div>
              ) : students.length === 0 ? (
                <EmptyState
                  title="No attendance records yet"
                  description="There are no attendance records for today. Students will appear here once attendance is marked."
                  icon={Calendar}
                />
              ) : (
              students.map((student) => (
                <div key={student.id} className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                  <div className="flex items-center space-x-5">
                    <div className="relative">
                      <img
                        alt="Student Avatar"
                        className="w-14 h-14 rounded-2xl object-cover"
                        data-alt="close-up portrait of a young male student with glasses smiling softly against a neutral background"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfLDTBEKACDgswRvzh8H77gIz7UlnQJ6GIvny5bavU4eNHlIbr9Ruen3bpx61gIBRISEiOlXTA2QXU96onhc_UpyfObwwebg0FVqyRQnis6eAadH5Fwxt0ni9nxcTrgRapuqlc7LFSvofXqSHepWCHlCUzyi5rBHVWx9REkEAzyc-BAnh9dxFLqtF3QqFccPxC0S3Hs8JD6fNWSjNwtDaB-ZUWJDyuLQcy-Gf3CQV-HTu6VcDm7idAdQ3Tk5tC66SHbzTrdQFQU0Le"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2DD4BF] border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-lg font-bold text-on-surface">
                        {student.student.name}
                      </h3>
                      <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                        ADM: {student.student.admissionNumber}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  {
                      ["present", "late", "absent"].map((status) => (
                      <button
                      key={status}
                      className={`px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold transition-all ${getStatusClass(status, student.status)}`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                        ))
                  }
                  </div>
                </div>
              )))}

              
            </div>
          </div>
          <footer className="flex flex-col md:flex-row gap-3 fixed bottom-0 z-40 bg-card/70 backdrop-blur-xl border-t border-[#a9b4b1]/15 px-12 py-6  items-center md:justify-evenly w-full">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
                  Attendance Summary
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF]"></span>
                    <span className="text-sm font-bold text-on-surface">
                      32 Present
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-sm font-bold text-on-surface">
                      4 Late
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-sm font-bold text-on-surface">
                      0 Absent
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3 rounded-2xl font-bold text-[12px] md:text-sm bg-secondary hover:bg-secondary/50 transition-all">
                Save as Draft
              </button>
              <button className="px-10 py-3.5 rounded-2xl primary-gradient text-white font-extrabold  text-[12px] md:text-sm shadow-[0_10px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_30px_rgba(45,212,191,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 duration-150">
                Submit Attendance
              </button>
            </div>
          </footer>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherAttendance;
