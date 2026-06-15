import { useEffect, useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import EmptyState from "@/components/ui/layout/EmptyState";
import {
  BadgeCheck,
  Calendar,
  Contact,
  Edit,
  ExternalLink,
  Eye,
  ListFilter,
  Mail,
  Phone,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import api from "../../../utils/api";
import axios from "axios";

type ClassOption = {
  id: string;
  name: string;
};

type TermOption = {
  id: string;
  name: string;
};

type TeacherStudentRow = {
  id: string;
  admissionNumber: string;
  name: string;
  className: string;
  attendancePercentage: string;
  grade: string;
  score: number;
};

const TeacherStudents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students, setStudents] = useState<TeacherStudentRow[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [isMobileQuickViewOpen, setIsMobileQuickViewOpen] = useState(false);
  const [studentsStats, setStudentsStats] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [terms, setTerms] = useState<TermOption[]>([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedTermId, setSelectedTermId] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchStudentsCount = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?.userId) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        const response = await api.get(`/tcs/teacher-students-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudentsStats(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Failed to fetch students count");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchClasses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/classes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setClasses(Array.isArray(data) ? data : data?.classes ?? []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch classes");
        }
      }
    };

    const fetchTerms = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/terms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setTerms(Array.isArray(data) ? data : data?.terms ?? []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch terms");
        }
      }
    };

    const fetchStudentsList = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?.userId) return;

      setListLoading(true);
      try {
        const response = await api.get("/tcs/teacher-students-list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            classId: selectedClassId || undefined,
            termId: selectedTermId || undefined,
          },
        });

        const data = response.data;
        const list = Array.isArray(data) ? data : data?.students ?? [];
        setStudents(list);
        setSelectedStudentId((current) => current || list[0]?.id || "");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch students list");
        }
      } finally {
        setListLoading(false);
      }
    };

    fetchStudentsCount();
    fetchClasses();
    fetchTerms();
    fetchStudentsList();
  }, [user?.userId, selectedClassId, selectedTermId]);

  const selectedClassName = classes.find((item) => item.id === selectedClassId)?.name ?? "";
  const selectedTermName = terms.find((item) => item.id === selectedTermId)?.name ?? "";
  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? students[0] ?? null;

  const selectStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsMobileQuickViewOpen(true);
  };

  const quickViewPanel = (
    <div className="flex h-full flex-col border-l border-outline-variant/5 bg-sidebar/40 p-6 shadow-[-10px_0_30px_rgba(42,53,50,0.04)] lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-black tracking-tight text-on-surface">Quick View</h3>
        <button
          className="rounded-full p-2 transition-colors hover:bg-surface-container-lowest lg:hidden"
          onClick={() => setIsMobileQuickViewOpen(false)}
          type="button"
          aria-label="Close quick view"
        >
          <X className="text-on-surface-variant" />
        </button>
      </div>

      <div className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <img
            alt={selectedStudent?.name ?? "Student"}
            className="h-32 w-32 rounded-3xl object-cover shadow-xl"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop"
          />
          <span className="absolute -bottom-2 -right-2 rounded-xl bg-primary p-2 text-on-primary shadow-lg">
            <BadgeCheck className="text-base" />
          </span>
        </div>
        <h4 className="text-2xl font-black text-on-surface">{selectedStudent?.name ?? "No student selected"}</h4>
        <p className="text-sm font-bold text-on-surface-variant">
          {selectedStudent ? `Class ${selectedStudent.className}` : "Select a student to preview"}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card p-4">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Attendance</p>
          <p className="text-2xl font-extrabold text-primary">{selectedStudent?.attendancePercentage ?? "--"}%</p>
          <p className="text-[10px] font-bold text-primary/70">Today</p>
        </div>
        <div className="rounded-xl bg-card p-4">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">GPA Rank</p>
          <p className="text-2xl font-extrabold text-on-surface">{selectedStudent?.grade ?? "--"}</p>
          <p className="text-[10px] font-bold text-on-surface-variant">Score: {selectedStudent?.score ?? 0}</p>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Contact className="text-lg text-primary" />
          <h5 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Parent Contact Info</h5>
        </div>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-black text-on-surface">Parent data unavailable</p>
              <p className="text-[11px] text-on-surface-variant">Link parent details from the student profile</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">Edit</button>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2">
            <Mail className="text-sm text-on-surface-variant" />
            <span className="text-xs font-medium text-on-surface">No parent email yet</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2">
            <Phone className="text-sm text-on-surface-variant" />
            <span className="text-xs font-medium text-on-surface">No parent phone yet</span>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-card p-5">
        <div className="mb-6 flex items-center justify-between">
          <h5 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Performance Summary</h5>
          <button className="rounded-lg p-1 transition-colors hover:bg-surface-container-low">
            <ExternalLink className="text-sm" />
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-xs text-on-surface-variant">
            {selectedStudent
              ? "Detailed subject performance will appear here once we connect the results endpoint."
              : "Pick a student to see their performance summary."}
          </p>
        </div>
      </div>

      <div className="mt-auto flex gap-3 pt-4">
        <button className="flex-1 rounded-xl bg-background py-3 text-sm font-bold text-on-surface transition-transform active:scale-95">Message Parent</button>
        <button className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-on-primary transition-transform active:scale-95">Full Record</button>
      </div>
    </div>
  );

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
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="flex flex-1 overflow-hidden">
            <section className="flex-1 overflow-y-auto px-2 pb-8 md:px-8">
              <div className="flex flex-col justify-between gap-4 py-8 md:flex-row md:items-end">
                <div>
                  <h2 className="mb-1 text-3xl font-black tracking-tight text-on-surface">Students Directory</h2>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm font-semibold text-on-surface-variant">Total Students: {studentsStats}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex rounded-xl bg-sidebar/50 p-1.5">
                    <button className="rounded-lg bg-card px-4 py-2 text-sm font-bold text-primary shadow-sm">All Students</button>
                    <button className="rounded-lg px-4 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface">At Risk</button>
                  </div>
                </div>
              </div>
              <div className="mb-6 flex flex-wrap gap-4">
                <label className="flex items-center gap-2 rounded-xl border border-tertiary bg-secondary px-4 py-2 transition-all hover:border-outline-variant/20">
                  <ListFilter className="text-sm text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">
                    Class: {selectedClassName || "All Classes"}
                  </span>
                  <select
                    className="bg-transparent text-sm font-bold text-on-surface outline-none"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                  >
                    <option value="">All Classes</option>
                    {classes.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex items-center gap-2 rounded-xl border border-tertiary bg-secondary px-4 py-2 transition-all hover:border-outline-variant/20">
                  <Calendar className="text-sm text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">
                    Term: {selectedTermName || "All Terms"}
                  </span>
                  <select
                    className="bg-transparent text-sm font-bold text-on-surface outline-none"
                    value={selectedTermId}
                    onChange={(e) => setSelectedTermId(e.target.value)}
                  >
                    <option value="">All Terms</option>
                    {terms.map((term) => (
                      <option key={term.id} value={term.id}>
                        {term.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  className="px-2 text-sm font-bold text-primary hover:underline"
                  type="button"
                  onClick={() => {
                    setSelectedClassId("");
                    setSelectedTermId("");
                  }}
                >
                  Clear Filters
                </button>
              </div>

              <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_20px_40px_rgba(42,53,50,0.06)]">
                {listLoading ? (
                  <div className="p-6 text-sm font-medium text-on-surface-variant">
                    Loading student data...
                  </div>
                ) : students.length === 0 ? (
                  <div className="p-6">
                    <EmptyState
                      title="No students found"
                      description="No students match the selected filters. Try clearing filters or check back once students are assigned to your classes."
                      icon={Users}
                    />
                  </div>
                ) : (
                <>
                <table className="hidden w-full border-collapse text-left lg:table">
                  <thead>
                    <tr className="bg-surface-container-low">
                      {[
                        "Student",
                        "Student ID",
                        "Class",
                        "Attendance",
                        "Latest Result",
                        "",
                      ].map((heading) => (
                        <th key={heading} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                      {students.map((student) => {
                        const isSelected = student.id === selectedStudent?.id;
                        return (
                          <tr
                            key={student.id}
                            className={`group cursor-pointer transition-colors ${isSelected ? "bg-secondary" : "bg-card hover:bg-secondary"}`}
                            onClick={() => selectStudent(student.id)}
                          >
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-sm font-bold text-on-surface">{student.name}</p>
                                  <p className="text-xs text-on-surface-variant">{student.admissionNumber}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-on-surface">{student.id}</td>
                            <td className="px-6 py-4">
                              <span className="rounded-full bg-surface-container-high px-3 py-1 text-[11px] font-bold text-on-surface">{student.className}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 max-w-[60px] flex-1 rounded-full bg-surface-container">
                                  <div
                                    className={`h-full rounded-full ${Number(student.attendancePercentage) < 75 ? "bg-error-container" : "bg-primary"}`}
                                    style={{ width: `${student.attendancePercentage}%` }}
                                  />
                                </div>
                                <span className={`text-xs font-bold ${Number(student.attendancePercentage) < 75 ? "text-error" : "text-on-surface"}`}>
                                  {student.attendancePercentage}%
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm font-bold text-on-surface">{student.grade}</span>
                              <span className="ml-1 text-[10px] text-on-surface-variant">(Score {student.score})</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <button className="rounded-lg p-1.5 transition-colors hover:bg-surface-container-highest"><Edit className="text-lg" /></button>
                                <button className="rounded-lg p-1.5 transition-colors hover:bg-surface-container-highest"><Eye className="text-lg" /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div className="space-y-3 p-3 lg:hidden">
                    {students.map((student) => (
                      <button
                        key={student.id}
                        type="button"
                        className="w-full rounded-xl border border-outline-variant/10 bg-card p-4 text-left"
                        onClick={() => selectStudent(student.id)}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="text-sm font-bold text-on-surface">{student.name}</p>
                              <p className="text-xs text-on-surface-variant">{student.admissionNumber}</p>
                            </div>
                          </div>
                          <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-bold text-primary">{student.grade}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
                          <span>Attendance: {student.attendancePercentage}%</span>
                          <span>Class {student.className}</span>
                        </div>
                      </button>
                    ))}
                </div>
                </>
                )}
              </div>

              {isMobileQuickViewOpen ? <div className="mt-6 overflow-hidden rounded-xl lg:hidden">{quickViewPanel}</div> : null}
            </section>

            <aside className="hidden h-full w-[420px] overflow-y-auto lg:block">{quickViewPanel}</aside>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherStudents;
