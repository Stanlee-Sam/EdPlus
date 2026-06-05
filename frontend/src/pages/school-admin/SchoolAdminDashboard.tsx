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

type Student = {
  id: string;
  name: string;
  admissionNumber: string;
};

type ParentUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

type SchoolClass = {
  id: string;
  name: string;
};

type Teacher = {
  id: string;
  name: string;
  email: string;
};

type Level = {
  id: string;
  name: string;
  order: number;
};

type StudentsResponse = Student[] | { students: Student[] };
type ParentsResponse = ParentUser[] | { users: ParentUser[] };
type ClassesResponse = SchoolClass[] | { classes: SchoolClass[] };
type LevelsResponse = Level[] | { levels: Level[] };
type TeachersResponse = Teacher[] | { users: Teacher[] };
type AttendanceStats = {
  presentStudents: number;
  absentStudents: number;
  totalRecords: number;
  attendancePercentage: number;
};

const SchoolAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [parents, setParents] = useState<ParentUser[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isSchoolModalOpen, setIsSchoolModalOpen] = useState(false);
  const [schoolModalType, setSchoolModalType] = useState<"level" | "subject" | "class" | "term">("level");
  const [createRole, setCreateRole] = useState<"teacher" | "parent">("teacher");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [linkData, setLinkData] = useState({
    parentId: "",
    studentId: "",
    relationshipType: "",
  });
  const [studentFormData, setStudentFormData] = useState({
    name: "",
    admissionNumber: "",
    classId: "",
  });
  const [schoolFormData, setSchoolFormData] = useState({
    name: "",
    order: "",
    classTeacherId: "",
    levelId: "",
    startDate: "",
    endDate: "",
  });

  const fetchStudents = async (token: string) => {
    const response = await api.get<StudentsResponse>(`/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;
    const normalizedStudents = Array.isArray(payload) ? payload : payload.students ?? [];
    setStudents(normalizedStudents);
  };

  const fetchParents = async (token: string) => {
    const response = await api.get<ParentsResponse>(`/users?role=PARENT`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;
    const normalizedParents = Array.isArray(payload) ? payload : payload.users ?? [];
    setParents(normalizedParents);
  };

  const fetchClasses = async (token: string) => {
    const response = await api.get<ClassesResponse>(`/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;
    const normalizedClasses = Array.isArray(payload) ? payload : payload.classes ?? [];
    setClasses(normalizedClasses);
  };

  const fetchLevels = async (token: string) => {
    const response = await api.get<LevelsResponse>(`/levels`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;
    const normalizedLevels = Array.isArray(payload) ? payload : payload.levels ?? [];
    setLevels(normalizedLevels);
  };

  const fetchTeachers = async (token: string) => {
    const response = await api.get<TeachersResponse>(`/users/teachers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = response.data;
    const normalizedTeachers = Array.isArray(payload) ? payload : payload.users ?? [];
    setTeachers(normalizedTeachers);
  };

  const today = new Date();

  // Format as "Monday, April 13, 2026"
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const loadStudents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        await fetchStudents(token);
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error.response?.data.message || "Failed to fetch students")
        }
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  },[]);

  useEffect(() => {
    const loadParents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      try {
        await fetchParents(token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Failed to fetch parents");
        }
      }
    };

    loadParents();
  }, []);

  useEffect(() => {
    const loadClasses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      try {
        await fetchClasses(token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Failed to fetch classes");
        }
      }
    };

    loadClasses();
  }, []);

  useEffect(() => {
    const loadLevels = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      try {
        await fetchLevels(token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.message || "Failed to fetch levels");
        }
      }
    };

    loadLevels();
  }, []);

  useEffect(() => {
    const loadTeachers = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Invalid token. Please login");
        return;
      }

      setLoading(true);
      try {
        await fetchTeachers(token);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadTeachers();
  },[]);

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
          toast.error(error.response?.data.message || "Failed to fetch attendance stats");
        }
      } finally {
        setLoading(false);
      }

    };
    fetchAttendanceStats();
  }, []);

  const openCreateUserModal = (role: "teacher" | "parent") => {
    setCreateRole(role);
    setFormData({ name: "", email: "", phone: "", password: "" });
    setIsUserModalOpen(true);
  };

  const closeCreateUserModal = () => {
    setIsUserModalOpen(false);
    setFormData({ name: "", email: "", phone: "", password: "" });
  };

  const openLinkModal = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    setLoading(true);
    try {
      await Promise.all([fetchParents(token), fetchStudents(token)]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to load parents/students");
      }
      return;
    } finally {
      setLoading(false);
    }

    setLinkData({
      parentId: "",
      studentId: "",
      relationshipType: "",
    });
    setIsLinkModalOpen(true);
  };

  const closeLinkModal = () => {
    setIsLinkModalOpen(false);
    setLinkData({
      parentId: "",
      studentId: "",
      relationshipType: "",
    });
  };

  const openStudentModal = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    setLoading(true);
    try {
      await fetchClasses(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to load classes");
      }
      return;
    } finally {
      setLoading(false);
    }

    setStudentFormData({
      name: "",
      admissionNumber: "",
      classId: "",
    });
    setIsStudentModalOpen(true);
  };

  const closeStudentModal = () => {
    setIsStudentModalOpen(false);
    setStudentFormData({
      name: "",
      admissionNumber: "",
      classId: "",
    });
  };

  const openSchoolModal = async (type: "level" | "subject" | "class" | "term") => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    setLoading(true);
    try {
      if (type === "class") {
        await Promise.all([fetchLevels(token), fetchTeachers(token)]);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to load school data");
      }
      return;
    } finally {
      setLoading(false);
    }

    setSchoolModalType(type);
    setSchoolFormData({
      name: "",
      order: "",
      classTeacherId: "",
      levelId: "",
      startDate: "",
      endDate: "",
    });
    setIsSchoolModalOpen(true);
  };

  const closeSchoolModal = () => {
    setIsSchoolModalOpen(false);
    setSchoolFormData({
      name: "",
      order: "",
      classTeacherId: "",
      levelId: "",
      startDate: "",
      endDate: "",
    });
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
        await fetchTeachers(token);
      } else {
        await fetchParents(token);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to create user");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLinkParentToStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    if (!linkData.parentId || !linkData.studentId || !linkData.relationshipType) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/student-parents",
        {
          parentId: linkData.parentId,
          studentId: linkData.studentId,
          relationshipType: linkData.relationshipType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Parent linked to student successfully");
      closeLinkModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to link parent to student");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollStudent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    const { name, admissionNumber, classId } = studentFormData;
    if (!name || !admissionNumber || !classId) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await api.post(
        "/students",
        { name, admissionNumber, classId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Student enrolled successfully");
      closeStudentModal();
      await fetchStudents(token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to enroll student");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSchoolData = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Invalid token. Please login");
      return;
    }

    if (!schoolFormData.name) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);
    try {
      if (schoolModalType === "level") {
        if (!schoolFormData.order) {
          toast.error("Level order is required");
          return;
        }
        await api.post(
          "/levels",
          {
            name: schoolFormData.name,
            order: Number(schoolFormData.order),
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        await fetchLevels(token);
        toast.success("Level created successfully");
      }

      if (schoolModalType === "subject") {
        await api.post(
          "/subjects",
          { name: schoolFormData.name },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Subject created successfully");
      }

      if (schoolModalType === "class") {
        if (!schoolFormData.classTeacherId || !schoolFormData.levelId) {
          toast.error("Please select both class teacher and level");
          return;
        }
        await api.post(
          "/classes",
          {
            name: schoolFormData.name,
            classTeacherId: schoolFormData.classTeacherId,
            levelId: schoolFormData.levelId,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        await fetchClasses(token);
        toast.success("Class created successfully");
      }

      if (schoolModalType === "term") {
        if (!schoolFormData.startDate || !schoolFormData.endDate) {
          toast.error("Please select both start and end dates");
          return;
        }
        await api.post(
          "/terms",
          {
            name: schoolFormData.name,
            startDate: schoolFormData.startDate,
            endDate: schoolFormData.endDate,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        toast.success("Term created successfully");
      }

      closeSchoolModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to create school data");
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
                <button
                  type="button"
                  onClick={openLinkModal}
                  className="bg-accent text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Link Parent-Student
                </button>
                <button
                  type="button"
                  onClick={openStudentModal}
                  className="bg-secondary text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Enroll Student
                </button>
              </div>
            </section>
            <section className="mb-8 bg-card border border-border/40 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-lg font-bold text-on-surface">School Management</h4>
                <p className="text-sm text-on-surface-variant">
                  Configure your academic structure: levels, subjects, and classes.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openSchoolModal("level")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  Add Level
                </button>
                <button
                  type="button"
                  onClick={() => openSchoolModal("subject")}
                  className="bg-sidebar text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => openSchoolModal("class")}
                  className="bg-accent text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Add Class
                </button>
                <button
                  type="button"
                  onClick={() => openSchoolModal("term")}
                  className="bg-secondary text-on-surface px-4 py-2 rounded-md font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Add Term
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
                    {attendanceStats ? `${attendanceStats.attendancePercentage}%` : "--"}
                  </span>
                  <p className="text-[12px] text-on-surface-variant font-medium mt-1">
                    Today's percentage
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
                      {attendanceStats ? `${attendanceStats.attendancePercentage}%` : "--"}
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
                    <span className="font-bold text-on-surface">
                      {attendanceStats ? attendanceStats.presentStudents : "--"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full bg-on-tertiary-container"></span>
                      <span className="font-medium text-on-secondary-container">
                        Absent/Late
                      </span>
                    </div>
                    <span className="font-bold text-on-surface">
                      {attendanceStats ? attendanceStats.absentStudents : "--"}
                    </span>
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
      {isLinkModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.16)]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-2xl font-bold text-on-surface">
                  Link Parent To Student
                </h4>
                <p className="text-sm text-on-surface-variant mt-1">
                  Choose an existing parent and student in your school.
                </p>
              </div>
              <button
                type="button"
                onClick={closeLinkModal}
                className="text-on-surface-variant hover:text-on-surface text-sm font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleLinkParentToStudent} className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Parent</label>
                <select
                  value={linkData.parentId}
                  onChange={(event) => setLinkData((prev) => ({ ...prev, parentId: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  <option value="">Select parent</option>
                  {parents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} ({parent.email})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Student</label>
                <select
                  value={linkData.studentId}
                  onChange={(event) => setLinkData((prev) => ({ ...prev, studentId: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  <option value="">Select student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name} ({student.admissionNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Relationship</label>
                <input
                  type="text"
                  value={linkData.relationshipType}
                  onChange={(event) => setLinkData((prev) => ({ ...prev, relationshipType: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="Mother, Father, Guardian"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeLinkModal}
                  className="px-4 py-2 rounded-md bg-sidebar text-on-surface font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  {loading ? "Linking..." : "Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {isStudentModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.16)]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-2xl font-bold text-on-surface">Enroll Student</h4>
                <p className="text-sm text-on-surface-variant mt-1">
                  Add a student and assign them to a class in your school.
                </p>
              </div>
              <button
                type="button"
                onClick={closeStudentModal}
                className="text-on-surface-variant hover:text-on-surface text-sm font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleEnrollStudent} className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Full Name</label>
                <input
                  type="text"
                  value={studentFormData.name}
                  onChange={(event) => setStudentFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="Student full name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Admission Number</label>
                <input
                  type="text"
                  value={studentFormData.admissionNumber}
                  onChange={(event) => setStudentFormData((prev) => ({ ...prev, admissionNumber: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder="ADM00123"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Class</label>
                <select
                  value={studentFormData.classId}
                  onChange={(event) => setStudentFormData((prev) => ({ ...prev, classId: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                >
                  <option value="">Select class</option>
                  {classes.map((schoolClass) => (
                    <option key={schoolClass.id} value={schoolClass.id}>
                      {schoolClass.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeStudentModal}
                  className="px-4 py-2 rounded-md bg-sidebar text-on-surface font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  {loading ? "Enrolling..." : "Enroll Student"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {isSchoolModalOpen ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-lg bg-card rounded-lg p-6 shadow-[0_20px_40px_rgba(42,53,50,0.16)]">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h4 className="text-2xl font-bold text-on-surface">
                  Add {schoolModalType === "level" ? "Level" : schoolModalType === "subject" ? "Subject" : schoolModalType === "class" ? "Class" : "Term"}
                </h4>
                <p className="text-sm text-on-surface-variant mt-1">
                  {schoolModalType === "class"
                    ? "Create a class and assign a class teacher with level."
                    : schoolModalType === "term"
                      ? "Create a new academic term for your school."
                    : `Create a new ${schoolModalType} for your school.`}
                </p>
              </div>
              <button
                type="button"
                onClick={closeSchoolModal}
                className="text-on-surface-variant hover:text-on-surface text-sm font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
            <form onSubmit={handleCreateSchoolData} className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-variant uppercase">Name</label>
                <input
                  type="text"
                  value={schoolFormData.name}
                  onChange={(event) => setSchoolFormData((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                  placeholder={schoolModalType === "level" ? "Grade 7" : schoolModalType === "subject" ? "Mathematics" : schoolModalType === "class" ? "Grade 7 East" : "Semester 1"}
                />
              </div>
              {schoolModalType === "level" ? (
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-variant uppercase">Order</label>
                  <input
                    type="number"
                    value={schoolFormData.order}
                    onChange={(event) => setSchoolFormData((prev) => ({ ...prev, order: event.target.value }))}
                    className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    placeholder="1"
                  />
                </div>
              ) : null}
              {schoolModalType === "term" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Start Date</label>
                    <input
                      type="date"
                      value={schoolFormData.startDate}
                      onChange={(event) => setSchoolFormData((prev) => ({ ...prev, startDate: event.target.value }))}
                      className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">End Date</label>
                    <input
                      type="date"
                      value={schoolFormData.endDate}
                      onChange={(event) => setSchoolFormData((prev) => ({ ...prev, endDate: event.target.value }))}
                      className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    />
                  </div>
                </div>
              ) : null}
              {schoolModalType === "class" ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Class Teacher</label>
                    <select
                      value={schoolFormData.classTeacherId}
                      onChange={(event) => setSchoolFormData((prev) => ({ ...prev, classTeacherId: event.target.value }))}
                      className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    >
                      <option value="">Select teacher</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-on-surface-variant uppercase">Level</label>
                    <select
                      value={schoolFormData.levelId}
                      onChange={(event) => setSchoolFormData((prev) => ({ ...prev, levelId: event.target.value }))}
                      className="w-full p-3 rounded-sm border border-input bg-input outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                    >
                      <option value="">Select level</option>
                      {levels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : null}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeSchoolModal}
                  className="px-4 py-2 rounded-md bg-sidebar text-on-surface font-semibold text-sm hover:opacity-80 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/80 transition-colors cursor-pointer"
                >
                  {loading ? "Saving..." : "Save"}
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
