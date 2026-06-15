import { useEffect, useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import EmptyState from "@/components/ui/layout/EmptyState";
import {
  ArrowDownWideNarrow,
  CheckCheck,
  ClipboardClock,
  Edit,
  Eye,
  ListFilter,
  Rocket,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import api from "../../../utils/api";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";

type ClassOption = {
  id: string;
  name: string;
};

type SubjectOption = {
  id: string;
  name: string;
};

type TermOption = {
  id: string;
  name: string;
};

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  classId: string;
  subjectId: string;
  termId: string;
  createdAt?: string;
}

type AssignmentModalMode = "view" | "edit";

const TeacherAssignments = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [gradedAssignments, setGradedAssignments] = useState([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [subjects, setSubjects] = useState<SubjectOption[]>([]);
  const [terms, setTerms] = useState<TermOption[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [assignmentModalMode, setAssignmentModalMode] = useState<AssignmentModalMode>("view");

  const fetchAssignments = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user?.userId) {
      toast.error("Invalid token. Please login");
      return;
    }

    setListLoading(true);
    try {
      const response = await api.get(`/homework`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAssignments(Array.isArray(response.data) ? response.data : response.data?.homework ?? []);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to fetch assignments");
      }
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [user?.userId]);

  useEffect(() => {
    const getGradedAssignments = async () => {
      const token = localStorage.getItem("token");
      if (!token || !user?.userId) {
        toast.error("Invalid token. Please login");
        return;
      }

      try {
        const response = await api.get(`/homework/graded-assignments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGradedAssignments(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data.message || "Failed to fetch assignments",
          );
        }
      }
    };
    getGradedAssignments();
  }, []);

  useEffect(() => {
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
        setClasses(Array.isArray(data) ? data : (data?.classes ?? []));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Failed to fetch classes",
          );
        }
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await api.get("/subjects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setSubjects(Array.isArray(data) ? data : data?.subjects ?? []);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "Failed to fetch subjects");
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

    fetchSubjects();
    fetchTerms();
  }, []);

  const postAssingment = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user?.userId) {
      toast.error("Invalid token. Please login");
      return;
    }

    if (!title || !description || !selectedClass || !selectedSubject || !selectedTerm || !dueDate) {
      toast.error("Please fill in all assignment fields");
      return;
    }

    setSubmitting(true);

    try {
      const response = await api.post<Assignment>(
        `/homework`,
        {
          title,
          description,
          classId: selectedClass,
          subjectId: selectedSubject,
          termId: selectedTerm,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchAssignments();
      setTitle("");
      setDescription("");
      setSelectedClass("");
      setSelectedSubject("");
      setSelectedTerm("");
      setDueDate("");
      toast.success("Assignment posted successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data.message || "Failed to post assignment",
        );
      } else {
        toast.error("Failed to post assignment");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const getClassName = (classId: string) =>
    classes.find((classItem) => classItem.id === classId)?.name ?? "Class";

  const getSubjectName = (subjectId: string) =>
    subjects.find((subject) => subject.id === subjectId)?.name ?? "Subject";

  const getTermName = (termId: string) =>
    terms.find((term) => term.id === termId)?.name ?? "Term";

  const formatDueDate = (dateValue: string) => {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Due date unavailable";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const openAssignmentModal = (assignment: Assignment, mode: AssignmentModalMode) => {
    setSelectedAssignment(assignment);
    setAssignmentModalMode(mode);
    setTitle(assignment.title);
    setDescription(assignment.description);
    setSelectedClass(assignment.classId);
    setSelectedSubject(assignment.subjectId);
    setSelectedTerm(assignment.termId);
    setDueDate(assignment.dueDate.slice(0, 10));
    setIsAssignmentModalOpen(true);
  };

  const closeAssignmentModal = () => {
    setIsAssignmentModalOpen(false);
    setSelectedAssignment(null);
    setAssignmentModalMode("view");
    setTitle("");
    setDescription("");
    setSelectedClass("");
    setSelectedSubject("");
    setSelectedTerm("");
    setDueDate("");
  };

  const handleUpdateAssignment = async () => {
    if (!selectedAssignment) return;
    const token = localStorage.getItem("token");
    if (!token || !user?.userId) {
      toast.error("Invalid token. Please login");
      return;
    }

    if (!title || !description || !selectedClass || !selectedSubject || !selectedTerm || !dueDate) {
      toast.error("Please fill in all assignment fields");
      return;
    }

    setSubmitting(true);
    try {
      await api.put(
        `/homework/${selectedAssignment.id}`,
        {
          title,
          description,
          classId: selectedClass,
          subjectId: selectedSubject,
          termId: selectedTerm,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Assignment updated successfully");
      await fetchAssignments();
      closeAssignmentModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "Failed to update assignment");
      } else {
        toast.error("Failed to update assignment");
      }
    } finally {
      setSubmitting(false);
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
        <Sidebar role="teacher" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6 w-full">
          <div className="min-h-[calc(100vh-5rem)] w-full">
            <div className="mb-12">
              <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-2">
                Assignments
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl">
                Curate, review, and manage student learning progress across your
                active classNamees.
              </p>
            </div>
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 lg:col-span-8 grid grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-primary-container/30 rounded-2xl flex items-center justify-center text-primary mb-4">
                    <ClipboardClock
                      className="material-symbols-outlined"
                      data-icon="pending_actions"
                    />
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Active
                  </p>
                  <p className="text-3xl font-extrabold">
                    {assignments.length}
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-tertiary-container/30 rounded-2xl flex items-center justify-center text-tertiary mb-4">
                    <CheckCheck
                      className="material-symbols-outlined"
                      data-icon="done_all"
                    />
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Completed
                  </p>
                  <p className="text-3xl font-extrabold">
                    {gradedAssignments.length}
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm border border-outline-variant/10">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center text-muted-foreground justify-center mb-4">
                    <Star
                      className="material-symbols-outlined"
                      data-icon="grade"
                    >
                      grade
                    </Star>
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mb-1">
                    Avg Score
                  </p>
                  <p className="text-3xl font-extrabold">88%</p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 bg-card rounded-lg p-8 shadow-sm ring-1 ring-inset ring-outline-variant/10">
                <h3 className="text-xl font-bold mb-6">Quick Assignment</h3>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                      Title
                    </label>
                    <input
                      className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20"
                      placeholder="e.g. Victorian Poetry Analysis"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                      Description
                    </label>
                    <textarea
                      className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="e.g. Victorian Poetry Analysis"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        Class
                      </label>
                      <select
                        className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                      >
                        <option value="">All Classes</option>
                        {classes.map((classItem) => (
                          <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        Subject
                      </label>
                      <select
                        className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                      >
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        Term
                      </label>
                      <select
                        className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20"
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                      >
                        <option value="">Select Term</option>
                        {terms.map((term) => (
                          <option key={term.id} value={term.id}>
                            {term.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-on-surface-variant tracking-wider">
                        Due Date
                      </label>
                      <input
                        className="w-full bg-secondary border-none rounded-md py-3 px-4 focus:ring-2 focus:ring-primary/20"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    onClick={postAssingment}
                    className="w-full py-3 mt-2 primary-gradient text-on-primary rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Rocket
                      className="material-symbols-outlined text-lg"
                      data-icon="rocket_launch"
                    />
                    {submitting ? (
                      <>
                        <ClipLoader color="#fff" size={20} />
                      </>
                    ) : (
                      "Post Assignment"
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl md:text-2xl font-bold">
                Recent Assignments
              </h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">
                  <ListFilter
                    className="material-symbols-outlined text-lg"
                    data-icon="filter_list"
                  />
                  Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">
                  <ArrowDownWideNarrow
                    className="material-symbols-outlined text-lg"
                    data-icon="sort"
                  />
                  Sort
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {listLoading ? (
                <div className="rounded-lg bg-card p-6 text-sm font-medium text-on-surface-variant">
                  Loading assignments...
                </div>
              ) : assignments.length === 0 ? (
                <EmptyState
                  title="No assignments yet"
                  description="You haven't posted any assignments yet. Create one using the form above to get started."
                  icon={ClipboardClock}
                />
              ) : (
                assignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="group flex flex-col gap-4 rounded-lg border border-transparent bg-card p-4 transition-all duration-300 hover:border-primary/10 hover:shadow-xl hover:shadow-teal-900/5 sm:flex-row sm:items-center sm:gap-8 sm:p-6"
                  >
                    <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:justify-center">
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary-container/20 text-primary sm:h-20 sm:w-20 sm:rounded-3xl">
                        <span className="text-lg font-black sm:text-xl">
                          {formatDueDate(assignment.dueDate).split(" ")[1] ?? "--"}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-tighter sm:text-[10px]">
                          {formatDueDate(assignment.dueDate).split(" ")[0] ?? "--"}
                        </span>
                      </div>
                      <div className="sm:hidden">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary">
                          Due {formatDueDate(assignment.dueDate)}
                        </p>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2 sm:mb-1 sm:gap-3">
                        <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-on-secondary-container">
                          {getSubjectName(assignment.subjectId)}
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant sm:text-sm">
                          {getClassName(assignment.classId)}
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant sm:text-sm">
                          {getTermName(assignment.termId)}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-on-surface sm:text-md md:text-xl">
                        {assignment.title}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-sm text-on-surface-variant">
                        {assignment.description}
                      </p>
                      <p className="mt-2 hidden text-sm text-on-surface-variant sm:block">
                        Due {formatDueDate(assignment.dueDate)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:hidden">
                      <button
                        type="button"
                        onClick={() => openAssignmentModal(assignment, "edit")}
                        className="flex-1 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:bg-primary hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openAssignmentModal(assignment, "view")}
                        className="flex-1 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-on-surface-variant transition-all hover:bg-tertiary hover:text-white"
                      >
                        View
                      </button>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <button
                        type="button"
                        onClick={() => openAssignmentModal(assignment, "edit")}
                        className="rounded-2xl bg-secondary p-3 text-on-surface-variant transition-all hover:bg-primary hover:text-white"
                      >
                        <Edit className="material-symbols-outlined" data-icon="edit" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openAssignmentModal(assignment, "view")}
                        className="rounded-2xl bg-secondary p-3 text-on-surface-variant transition-all hover:bg-tertiary hover:text-white"
                      >
                        <Eye className="material-symbols-outlined" data-icon="visibility" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {isAssignmentModalOpen && selectedAssignment ? (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 px-4">
                <div className="w-full max-w-2xl rounded-2xl bg-card p-6 shadow-[0_20px_40px_rgba(42,53,50,0.2)]">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-on-surface">
                        {assignmentModalMode === "edit" ? "Edit Assignment" : "Assignment Details"}
                      </h3>
                      <p className="text-sm text-on-surface-variant">
                        {assignmentModalMode === "edit"
                          ? "Update the homework and save your changes."
                          : "Quick summary of the selected assignment."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeAssignmentModal}
                      className="rounded-full bg-secondary px-3 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Title
                      </label>
                      <input
                        className="w-full rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Description
                      </label>
                      <textarea
                        className="min-h-28 w-full resize-none rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Class
                      </label>
                      <select
                        className="w-full rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      >
                        {classes.map((classItem) => (
                          <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Subject
                      </label>
                      <select
                        className="w-full rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      >
                        {subjects.map((subject) => (
                          <option key={subject.id} value={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Term
                      </label>
                      <select
                        className="w-full rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      >
                        {terms.map((term) => (
                          <option key={term.id} value={term.id}>
                            {term.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                        Due Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-md border-none bg-secondary px-4 py-3 focus:ring-2 focus:ring-primary/20"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        disabled={assignmentModalMode === "view"}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeAssignmentModal}
                      className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-on-surface-variant transition-colors hover:bg-surface-container-highest"
                    >
                      {assignmentModalMode === "view" ? "Done" : "Cancel"}
                    </button>
                    {assignmentModalMode === "edit" ? (
                      <button
                        type="button"
                        onClick={handleUpdateAssignment}
                        className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary/90"
                      >
                        {submitting ? "Saving..." : "Save Changes"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-16 grid grid-cols-12 gap-8 items-start">
              <div className="col-span-12 lg:col-span-5 relative overflow-hidden rounded-[3rem] h-[400px]">
                <img
                  alt="Inspiring academic environment"
                  className="w-full h-full object-cover"
                  data-alt="open library books with reading glasses on a clean white desk in a sun-drenched airy modern workspace"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLjJHPlsr3s4LBj6H3keL1YH3kbeBZ7K5ak70BBU7j5uZRo-8c2KK08B-FzQ_6P9vGzwobeZoerA2gi9IJKXAGt5rTWwL3iXbXyABn0YTGG02ZZI91CzG6_lyrli_6hEFe0iJZ0I3wvdzxU5wrbZDRAeN1z-u60Vuv3Fvcy3U3KNViK5tCwvIKzmraR8kTo3V-VqvOLRpiB_LgdDAbUlTIy2khVLRUhzZHrcdTH9b66crdAr9R6elpsGLiGKxlmHMnYi9DjO2xYqYZ"
                />
                <div className="absolute inset-0 bg-primary-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white border-sidebar border">
                  <h5 className="text-2xl font-bold mb-2">Teacher Tip</h5>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Providing feedback within 24 hours of submission increases
                    student engagement by 40%. Use the Quick Review tool in
                    Assignments.
                  </p>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-7 bg-primary-container/10 rounded-[3rem] p-12 border border-primary-container/20">
                  <h4 className="text-3xl font-extrabold mb-6">
                  Upcoming Class Schedule
                </h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-primary font-black text-2xl w-16">
                      09:00
                    </div>
                    <div className="h-10 w-[2px] bg-primary/20"></div>
                    <div>
                      <p className="font-bold">Creative Writing 101</p>
                      <p className="text-sm text-on-surface-variant">
                        Room 302 • 24 Students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-on-surface-variant/40 font-black text-2xl w-16">
                      11:15
                    </div>
                    <div className="h-10 w-[2px] bg-outline-variant/20"></div>
                    <div>
                      <p className="font-bold">Advanced Shakespeare</p>
                      <p className="text-sm text-on-surface-variant">
                        Seminar Hall B • 18 Students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white/50 transition-all cursor-pointer">
                    <div className="text-on-surface-variant/40 font-black text-2xl w-16">
                      14:00
                    </div>
                    <div className="h-10 w-[2px] bg-outline-variant/20"></div>
                    <div>
                      <p className="font-bold">Literary Criticism</p>
                      <p className="text-sm text-on-surface-variant">
                        Virtual Classroom • 30 Students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherAssignments;
