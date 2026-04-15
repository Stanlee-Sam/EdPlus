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
const TeacherStudents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-border/40 bg-card transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
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
          <div className="flex-1 flex overflow-hidden">
            <section className="flex-1 overflow-y-auto px-8 pb-8">
              <div className="flex justify-between items-end py-8">
                <div>
                  <h2 className="text-3xl font-black text-on-surface tracking-tight mb-1">
                    Students Directory
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-primary"></span>
                    <span className="text-sm font-semibold text-on-surface-variant">
                      Total Students: 142
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-sidebar/50 p-1.5 rounded-xl flex">
                    <button className="px-4 py-2 bg-card text-primary rounded-lg text-sm font-bold shadow-sm">
                      All Students
                    </button>
                    <button className="px-4 py-2 text-on-surface-variant hover:text-on-surface rounded-lg text-sm font-medium transition-colors">
                      At Risk
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-surface-container-low flex items-center gap-2 px-4 py-2 rounded-xl border border-transparent hover:border-outline-variant/20 transition-all cursor-pointer">
                  <ListFilter className="material-symbols-outlined text-on-surface-variant text-sm" />

                  <span className="text-sm font-bold text-on-surface">
                    ClassName: Grade 10-A
                  </span>
                  <ChevronDown className="material-symbols-outlined text-on-surface-variant text-sm" />
                </div>
                <div className="bg-surface-container-low flex items-center gap-2 px-4 py-2 rounded-xl border border-transparent hover:border-outline-variant/20 transition-all cursor-pointer">
                  <Calendar className="material-symbols-outlined text-on-surface-variant text-sm" />

                  <span className="text-sm font-bold text-on-surface">
                    Term: Semester 2
                  </span>
                  <ChevronDown className="material-symbols-outlined text-on-surface-variant text-sm" />
                </div>
                <button className="text-primary text-sm font-bold hover:underline px-2">
                  Clear Filters
                </button>
              </div>
              <div className="bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(42,53,50,0.06)] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                        Student
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                        Student ID
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                        ClassName
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                        Attendance
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant">
                        Latest Result
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface-variant"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    <tr className="bg-card hover:bg-secondary transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            alt="Student Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            data-alt="close up headshot of a teenage girl with glasses smiling warmly in a school setting"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC83nq7oQ5AdGvtKuqfBY8X-s_m2PD18l7YlBbgUcGAB8Otqs3dbwnLJDQUJbV-_gbzCyE4mf8kpSXgC-ZPKx8tVBInxdtqI7NGV6ccmXfaA-Ad9tp8nyJJZKMRicr6co8D-EX6vKJaRUu976JTlPXea0sK2_kjPaersfq4HrVQUT0hlhyWSr4dI5Cvx2qqXwqJPEzeGIvSAYdqrUY_0t87xBn8qwwSlGOP61H-5eoAusLS2AYpgEMY7lf2gl9ueF1tAnVYC-36Nwxk"
                          />
                          <div>
                            <p className="text-sm font-bold text-on-surface">
                              Aditi Sharma
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              aditi.s@edplus.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">
                        ED-2024-089
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-[11px] font-bold">
                          10-A
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full max-w-[60px]">
                            <div className="h-full bg-primary rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold text-on-surface">
                            94%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-on-surface">
                          A+
                        </span>
                        <span className="text-[10px] text-on-surface-variant ml-1">
                          (Math)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Edit className="material-symbols-outlined text-lg" />
                          </button>
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Eye className="material-symbols-outlined text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-card hover:bg-secondary transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            alt="Student Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            data-alt="portrait of a young boy student with messy hair looking curious in a classNameroom background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyIjxRCkY8pEA1RZuHwoFu_AzUtS17wgTNtlygQ6DxVq6izB0dns4Py4o4wSv0uVGW8RNTpmJVaw5kcwjSVafMgk1Tl3W4_5vSZimLADPuA2Q02XmAHBXm5SyyB_pOoUgNDtJq1aGzeCd8RkPWqJ3p2bLT3GUhCCBihHeahxhYKuY7z53vkkK9vDCK0r4efewf0l0DKHroZ88tmSTKvGiil0InrTLbSy3q1OBo6yRZpEyomAhUHAH_whuyGxMuMM5PoaQPSLx6eXRy"
                          />
                          <div>
                            <p className="text-sm font-bold text-on-surface">
                              Marcus Chen
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              m.chen@edplus.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">
                        ED-2024-112
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-[11px] font-bold">
                          10-A
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full max-w-[60px]">
                            <div className="h-full bg-primary rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold text-on-surface">
                            82%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-on-surface">
                          B
                        </span>
                        <span className="text-[10px] text-on-surface-variant ml-1">
                          (Math)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Edit className="material-symbols-outlined text-lg" />
                          </button>
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Eye className="material-symbols-outlined text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr className="bg-card hover:bg-secondary transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            alt="Student Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            data-alt="smiling teenage boy wearing a denim jacket standing against a soft blur green background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7cCpblJ1cAJ_AhYvYRXnRaASAjFOcurDg8XAV3sTgSGeGQneoINpyZNZr_LJeXOpBLqLhHlDEdxX_LZ7wqo6jfBjI3hCbZwzCAvNm1EDfLYteUgToPp8w5_X1XznnsaxGd0us5hfV0yFDo3PgX-xdy-BOiyc5UHmf3NFpoR9lUji8WoxsIFcg-UVuWx71WnnzdBaIKXzjMEmnvYDGdWvRa7nNqYIyeloDSujyqTOYmL8LpHTKtMqXiFnin8fjOmV9ls7Mj4vL_PBJ"
                          />
                          <div>
                            <p className="text-sm font-bold text-on-surface">
                              Leo Thompson
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              leo.t@edplus.com
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-on-surface">
                        ED-2024-045
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-[11px] font-bold">
                          11-B
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-surface-container rounded-full max-w-[60px]">
                            <div className="h-full bg-error-container rounded-full"></div>
                          </div>
                          <span className="text-xs font-bold text-error">
                            68%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-on-surface">
                          C-
                        </span>
                        <span className="text-[10px] text-on-surface-variant ml-1">
                          (History)
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Edit className="material-symbols-outlined text-lg" />
                          </button>
                          <button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
                            <Eye className="material-symbols-outlined text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
            <aside className="w-[420px] bg-sidebar/40 shadow-[-10px_0_30px_rgba(42,53,50,0.04)] h-full overflow-y-auto flex flex-col p-8 border-l border-outline-variant/5">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-on-surface tracking-tight">
                  Quick View
                </h3>
                <button className="p-2 hover:bg-surface-container-lowest rounded-full transition-colors">
                  <X className="material-symbols-outlined text-on-surface-variant" />
                </button>
              </div>
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <img
                    alt="Aditi Sharma Profile"
                    className="w-32 h-32 rounded-3xl object-cover shadow-xl"
                    data-alt="large artistic portrait of a teenage girl with glasses and a bright smile, high quality photography"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5J0CGrKm4NLs_64yArzCO3rhMvuQoUnnJP2nKGDhbMW5kgpPKjk2wrNiEND10FJiCZIeLMdIqPQET7Ir0EWI4WG22IjlmjSkxsT4VSvFW10zHxYD5f3xfkI3uErBmnwdOuyM7rNgtn0IW0IzVD2IEVpNITjq6A6HZl1SzoRF3OGxqqrk5GHtSjtqLuDIX0zsFmIdZG-1FP5Ywdj1y2i_38e8Lb5VbeMjRFdm5IJZbOMsfWnzNNHe-rwUyULWG93NUcwVZRzuyC3vx"
                  />
                  <span className="absolute -bottom-2 -right-2 bg-primary p-2 rounded-xl text-on-primary shadow-lg">
                    <BadgeCheck className="material-symbols-outlined text-base" />
                  </span>
                </div>
                <h4 className="text-2xl font-black text-on-surface">
                  Aditi Sharma
                </h4>
                <p className="text-on-surface-variant font-bold text-sm">
                  Grade 10-A • Honors Track
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-card p-4 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-on-surface-variant mb-1 tracking-widest">
                    Attendance
                  </p>
                  <p className="text-2xl font-extrabold text-primary">94.2%</p>
                  <p className="text-[10px] text-primary/70 font-bold">
                    ↑ 2% this month
                  </p>
                </div>
                <div className="bg-card p-4 rounded-xl">
                  <p className="text-[10px] font-black uppercase text-on-surface-variant mb-1 tracking-widest">
                    GPA Rank
                  </p>
                  <p className="text-2xl font-extrabold text-on-surface">
                    #04/142
                  </p>
                  <p className="text-[10px] text-on-surface-variant font-bold">
                    Top 3% percentile
                  </p>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Contact className="material-symbols-outlined text-primary text-lg" />

                  <h5 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Parent Contact Info
                  </h5>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-black text-on-surface">
                        Priya Sharma
                      </p>
                      <p className="text-[11px] text-on-surface-variant">
                        Mother • Legal Guardian
                      </p>
                    </div>
                    <button className="text-primary text-xs font-bold hover:underline">
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-low px-3 py-2 rounded-lg">
                    <Mail className="material-symbols-outlined text-on-surface-variant text-sm" />

                    <span className="text-xs font-medium text-on-surface">
                      p.sharma@domain.com
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-surface-container-low px-3 py-2 rounded-lg">
                    <Phone className="material-symbols-outlined text-on-surface-variant text-sm" />

                    <span className="text-xs font-medium text-on-surface">
                      +1 (555) 098-4432
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-5 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h5 className="text-xs font-black uppercase tracking-widest text-on-surface-variant">
                    Performance Summary
                  </h5>
                  <button className="p-1 hover:bg-surface-container-low rounded-lg transition-colors">
                    <ExternalLink className="material-symbols-outlined text-sm"/>
                    
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface">
                      Mathematics
                    </span>
                    <span className="text-xs font-black text-primary">A+</span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface">
                      English Literature
                    </span>
                    <span className="text-xs font-black text-on-surface">
                      A
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-on-surface">
                      Advanced Physics
                    </span>
                    <span className="text-xs font-black text-on-surface">
                      A-
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-secondary"></div>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-4 flex gap-3">
                <button className="flex-1 py-3 bg-background text-on-surface font-bold text-sm rounded-xl active:scale-95 transition-transform">
                  Message Parent
                </button>
                <button className="flex-1 py-3 bg-primary text-on-primary font-bold text-sm rounded-xl active:scale-95 transition-transform">
                  Full Record
                </button>
              </div>
            </aside>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherStudents;
