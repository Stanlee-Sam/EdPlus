import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  BadgeCheck,
  Calendar,
  ChevronDown,
  Contact,
  Edit,
  ExternalLink,
  Eye,
  ListFilter,
  Mail,
  Phone,
  X,
} from "lucide-react";

const students = [
  {
    id: "ED-2024-089",
    name: "Aditi Sharma",
    email: "aditi.s@edplus.com",
    className: "10-A",
    attendance: 94,
    latestResult: "A+",
    resultSubject: "Math",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC83nq7oQ5AdGvtKuqfBY8X-s_m2PD18l7YlBbgUcGAB8Otqs3dbwnLJDQUJbV-_gbzCyE4mf8kpSXgC-ZPKx8tVBInxdtqI7NGV6ccmXfaA-Ad9tp8nyJJZKMRicr6co8D-EX6vKJaRUu976JTlPXea0sK2_kjPaersfq4HrVQUT0hlhyWSr4dI5Cvx2qqXwqJPEzeGIvSAYdqrUY_0t87xBn8qwwSlGOP61H-5eoAusLS2AYpgEMY7lf2gl9ueF1tAnVYC-36Nwxk",
    parent: {
      name: "Priya Sharma",
      relationship: "Mother • Legal Guardian",
      email: "p.sharma@domain.com",
      phone: "+1 (555) 098-4432",
    },
    performance: [
      { subject: "Mathematics", grade: "A+", width: "100%", barClass: "bg-primary" },
      { subject: "English Literature", grade: "A", width: "92%", barClass: "bg-secondary" },
      { subject: "Advanced Physics", grade: "A-", width: "88%", barClass: "bg-secondary" },
    ],
    attendanceSummary: "94.2%",
    attendanceDelta: "↑ 2% this month",
    gpaRank: "#04/142",
    percentile: "Top 3% percentile",
  },
  {
    id: "ED-2024-112",
    name: "Marcus Chen",
    email: "m.chen@edplus.com",
    className: "10-A",
    attendance: 82,
    latestResult: "B",
    resultSubject: "Math",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDyIjxRCkY8pEA1RZuHwoFu_AzUtS17wgTNtlygQ6DxVq6izB0dns4Py4o4wSv0uVGW8RNTpmJVaw5kcwjSVafMgk1Tl3W4_5vSZimLADPuA2Q02XmAHBXm5SyyB_pOoUgNDtJq1aGzeCd8RkPWqJ3p2bLT3GUhCCBihHeahxhYKuY7z53vkkK9vDCK0r4efewf0l0DKHroZ88tmSTKvGiil0InrTLbSy3q1OBo6yRZpEyomAhUHAH_whuyGxMuMM5PoaQPSLx6eXRy",
    parent: {
      name: "Lina Chen",
      relationship: "Mother • Guardian",
      email: "l.chen@domain.com",
      phone: "+1 (555) 675-2231",
    },
    performance: [
      { subject: "Mathematics", grade: "B", width: "78%", barClass: "bg-secondary" },
      { subject: "English Literature", grade: "B+", width: "84%", barClass: "bg-secondary" },
      { subject: "Advanced Physics", grade: "B-", width: "70%", barClass: "bg-error-container" },
    ],
    attendanceSummary: "82.0%",
    attendanceDelta: "↓ 3% this month",
    gpaRank: "#39/142",
    percentile: "Top 28% percentile",
  },
  {
    id: "ED-2024-045",
    name: "Leo Thompson",
    email: "leo.t@edplus.com",
    className: "11-B",
    attendance: 68,
    latestResult: "C-",
    resultSubject: "History",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7cCpblJ1cAJ_AhYvYRXnRaASAjFOcurDg8XAV3sTgSGeGQneoINpyZNZr_LJeXOpBLqLhHlDEdxX_LZ7wqo6jfBjI3hCbZwzCAvNm1EDfLYteUgToPp8w5_X1XznnsaxGd0us5hfV0yFDo3PgX-xdy-BOiyc5UHmf3NFpoR9lUji8WoxsIFcg-UVuWx71WnnzdBaIKXzjMEmnvYDGdWvRa7nNqYIyeloDSujyqTOYmL8LpHTKtMqXiFnin8fjOmV9ls7Mj4vL_PBJ",
    parent: {
      name: "Adam Thompson",
      relationship: "Father • Guardian",
      email: "a.thompson@domain.com",
      phone: "+1 (555) 880-0104",
    },
    performance: [
      { subject: "Mathematics", grade: "C", width: "62%", barClass: "bg-error-container" },
      { subject: "English Literature", grade: "B-", width: "72%", barClass: "bg-secondary" },
      { subject: "Advanced Physics", grade: "C-", width: "58%", barClass: "bg-error-container" },
    ],
    attendanceSummary: "68.0%",
    attendanceDelta: "↓ 8% this month",
    gpaRank: "#117/142",
    percentile: "Needs support",
  },
];

const TeacherStudents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [isMobileQuickViewOpen, setIsMobileQuickViewOpen] = useState(false);

  const selectedStudent =
    students.find((student) => student.id === selectedStudentId) ?? students[0];

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
          <img alt={selectedStudent.name} className="h-32 w-32 rounded-3xl object-cover shadow-xl" src={selectedStudent.image} />
          <span className="absolute -bottom-2 -right-2 rounded-xl bg-primary p-2 text-on-primary shadow-lg">
            <BadgeCheck className="text-base" />
          </span>
        </div>
        <h4 className="text-2xl font-black text-on-surface">{selectedStudent.name}</h4>
        <p className="text-sm font-bold text-on-surface-variant">Grade {selectedStudent.className} • Honors Track</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-card p-4">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Attendance</p>
          <p className="text-2xl font-extrabold text-primary">{selectedStudent.attendanceSummary}</p>
          <p className="text-[10px] font-bold text-primary/70">{selectedStudent.attendanceDelta}</p>
        </div>
        <div className="rounded-xl bg-card p-4">
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">GPA Rank</p>
          <p className="text-2xl font-extrabold text-on-surface">{selectedStudent.gpaRank}</p>
          <p className="text-[10px] font-bold text-on-surface-variant">{selectedStudent.percentile}</p>
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
              <p className="text-xs font-black text-on-surface">{selectedStudent.parent.name}</p>
              <p className="text-[11px] text-on-surface-variant">{selectedStudent.parent.relationship}</p>
            </div>
            <button className="text-xs font-bold text-primary hover:underline">Edit</button>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2">
            <Mail className="text-sm text-on-surface-variant" />
            <span className="text-xs font-medium text-on-surface">{selectedStudent.parent.email}</span>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-3 py-2">
            <Phone className="text-sm text-on-surface-variant" />
            <span className="text-xs font-medium text-on-surface">{selectedStudent.parent.phone}</span>
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
          {selectedStudent.performance.map((item) => (
            <div key={item.subject}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">{item.subject}</span>
                <span className="text-xs font-black text-primary">{item.grade}</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                <div className={`h-full ${item.barClass}`} style={{ width: item.width }} />
              </div>
            </div>
          ))}
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
                    <span className="text-sm font-semibold text-on-surface-variant">Total Students: 142</span>
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
                <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-surface-container-low px-4 py-2 transition-all hover:border-outline-variant/20">
                  <ListFilter className="text-sm text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">Class: Grade 10-A</span>
                  <ChevronDown className="text-sm text-on-surface-variant" />
                </div>
                <div className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent bg-surface-container-low px-4 py-2 transition-all hover:border-outline-variant/20">
                  <Calendar className="text-sm text-on-surface-variant" />
                  <span className="text-sm font-bold text-on-surface">Term: Semester 2</span>
                  <ChevronDown className="text-sm text-on-surface-variant" />
                </div>
                <button className="px-2 text-sm font-bold text-primary hover:underline">Clear Filters</button>
              </div>

              <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_20px_40px_rgba(42,53,50,0.06)]">
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
                      const isSelected = student.id === selectedStudent.id;
                      return (
                        <tr
                          key={student.id}
                          className={`group cursor-pointer transition-colors ${isSelected ? "bg-secondary" : "bg-card hover:bg-secondary"}`}
                          onClick={() => selectStudent(student.id)}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img alt={student.name} className="h-10 w-10 rounded-full object-cover" src={student.image} />
                              <div>
                                <p className="text-sm font-bold text-on-surface">{student.name}</p>
                                <p className="text-xs text-on-surface-variant">{student.email}</p>
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
                                  className={`h-full rounded-full ${student.attendance < 75 ? "bg-error-container" : "bg-primary"}`}
                                  style={{ width: `${student.attendance}%` }}
                                />
                              </div>
                              <span className={`text-xs font-bold ${student.attendance < 75 ? "text-error" : "text-on-surface"}`}>
                                {student.attendance}%
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-on-surface">{student.latestResult}</span>
                            <span className="ml-1 text-[10px] text-on-surface-variant">({student.resultSubject})</span>
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
                          <img alt={student.name} src={student.image} className="h-10 w-10 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-bold text-on-surface">{student.name}</p>
                            <p className="text-xs text-on-surface-variant">{student.id}</p>
                          </div>
                        </div>
                        <span className="rounded-lg bg-primary/10 px-2 py-1 text-xs font-bold text-primary">{student.latestResult}</span>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs text-on-surface-variant">
                        <span>Attendance: {student.attendance}%</span>
                        <span>Class {student.className}</span>
                      </div>
                    </button>
                  ))}
                </div>
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
