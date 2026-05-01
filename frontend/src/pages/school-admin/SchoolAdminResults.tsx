import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  CircleCheckBig,
  EllipsisVertical,
  Files,
  ListFilter,
  Plus,
  Search,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";

const SchoolAdminResults = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const results = [
    {
      id: "1",
      date: "Oct 24, 2023",
      student: "Elena Rodriguez",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAa8AA-rTHErHDh6018ndr7iDwyDY5uLvV3kAKcjXXV2arpHsQuiQ-mWszS27lhCBcYhHuJ5hBanM25iqUdg55BoDJvwEiVxk87nx1CxmQwRHv-3U7BfxlB3j9_TCxNKXjHtA21O3E8BfFAHqZnZqivs1oUdTzggSILVFCXax39BzoBWVoePk-ID0rwbDgTH9Gk-sZjnOhgUXyiAp-ZAyFD5sCtf4GCiHlGxCBsrxb1DW6BBciUKwwjdp6F-hv4v2n-vSlO0_p3yqHY",
      subject: "Mathematics",
      term: "Term 1",
      score: "88/100",
      grade: "A",
      gradeClassName: "bg-primary/10 text-primary",
      teacher: "Dr. Aris Thorne",
    },
    {
      id: "2",
      date: "Oct 24, 2023",
      student: "Marcus Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAjdDRayPK2EC_UnZStt-TEuGzJX7sn_pfU6E3vfdTh9ikCIjKvDc6w7ahwnQ_aCKUDVw0EM8Nl5WTXaCUpBmWc9u0jM_bvRbSEYjzy-eknGY_tyRANbapymYrv_v8saZuk4_kTZTs5YhYf37p1VNKVt16K2U1uNLLgiGGsUbUhOfDXUekoTZVqTIQMuZ3YRIRtbDyKcSOnwb18HTg4hyUDl11I4fYfomPXXuIJwWDP_IILMiOQyOl3Nnvmu7o7LvaKvtm1gqREM-UG",
      subject: "Mathematics",
      term: "Term 1",
      score: "94/100",
      grade: "A+",
      gradeClassName: "bg-primary/10 text-primary",
      teacher: "Dr. Aris Thorne",
    },
    {
      id: "3",
      date: "Oct 23, 2023",
      student: "Zahara Williams",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7bfeDGrhTsFXKcdk15Z8A3G02fwOn6GJjf_RRYEUHR2yXwFwpskXt-lL_QCiZ36nIEAwxBpI2vPEUpWvv5ZH_9_rsFOJTk1Zx-ZTjkaeNa2oGsdN7979yvMukg2PzI2rHiGWzSg-xOJjApiJCx26h6_XPYIJGoxDI5Uouhyvt8a_JnBzFnANPrgUnHzqChUFacOb4xPOP3naVazcZUjjumdDnwhnGjUSvX29ke5lWO7c9f_TJKQBYNPaRyb90Dmyyj-PcI4wp_tDj",
      subject: "Mathematics",
      term: "Term 1",
      score: "76/100",
      grade: "B",
      gradeClassName: "bg-tertiary-container text-on-tertiary-container",
      teacher: "Dr. Aris Thorne",
    },
    {
      id: "4",
      date: "Oct 23, 2023",
      student: "Tobias Lind",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAhf4sWXANtjV2x3w8bx0sK3fdVMRBOfE09b5GrJTVyymyCtVKLfGTW6rvHKP-EYCSF7oag-p6JeE3riFOWUZDDVnC67ralBvNGCCWk8Mmi7zpx2Ouqwqr7dD3fMEprSWK7OVOywW68F3HDkiizILW5qNTj3EkQTbi7i4FtyYnWhmHhxc1CegSxnUYp0R0GOKx6jS6sVyJYfGKsvjOEJINCiyElHZSzjW6pfwbw757RoUMVnzcS8dz_QvAPIEnQc98XyohSE2KkYheK",
      subject: "Mathematics",
      term: "Term 1",
      score: "82/100",
      grade: "A-",
      gradeClassName: "bg-primary/10 text-primary",
      teacher: "Dr. Aris Thorne",
    },
    {
      id: "5",
      date: "Oct 22, 2023",
      student: "Liam Foster",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAdWK8mE1le4Z-AthK1_aGm-Yp-aCWby2VP7KxStLmMlOwj3tJ7THXvKaZuWoyz893JheqQQLSS5FQEp2JF1Zzgv0YpPGoTdhtE_z3grdk_4J3MgWiZqhj2PhFRVVLOe6JCKRpWg4x0KX2FrZ78vGsbfh52yNZtYt--bG__JM3KGvB7TAIxIYTBF6pPv9MN4eCeYz6MCV2PhKoW74MWl4tP3ae3DxWVmJis5sRn-XlaSAr3bL7OaPVPqPoiXiCRUsXWIyVzrpcU3E6p",
      subject: "Mathematics",
      term: "Term 1",
      score: "65/100",
      grade: "C",
      gradeClassName: "bg-secondary-container text-on-secondary-container",
      teacher: "Dr. Aris Thorne",
    },
  ];

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
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col md:flex-row md:justify-between gap-3  mb-12">
              <div>
                <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                  Results Hub
                </h2>
                <p className="text-on-surface-variant font-medium">
                  Manage and review academic performance across all departments.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 rounded-lg bg-sidebar text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-all flex items-center gap-2">
                  <Files className="material-symbols-outlined text-lg" />
                  Export PDF
                </button>
                <button className="px-6 py-3 rounded-lg primary-gradient text-white font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                  <Plus className="material-symbols-outlined text-lg" />
                  Add New Result
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] group hover:shadow-lg transition-shadow">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  ClassName Average
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-extrabold text-on-surface">
                    78.4
                    <span className="text-xl font-medium text-on-surface-variant">
                      %
                    </span>
                  </h3>
                  <div className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full flex items-center gap-1">
                    <TrendingUp className="material-symbols-outlined text-xs" />
                    +2.4%
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] group hover:shadow-lg transition-shadow">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  Highest Score
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-extrabold text-on-surface">
                    99
                    <span className="text-xl font-medium text-on-surface-variant">
                      /100
                    </span>
                  </h3>
                  <Trophy className="material-symbols-outlined text-primary/70 text-3xl" />
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] group hover:shadow-lg transition-shadow">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  Pass Rate
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-extrabold text-on-surface">
                    94.2
                    <span className="text-xl font-medium text-on-surface-variant">
                      %
                    </span>
                  </h3>
                  <div className="w-12 h-1 bg-surface-container rounded-full overflow-hidden mb-3">
                    <div className="bg-primary h-full w-[94.2%]"></div>
                  </div>
                </div>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] group hover:shadow-lg transition-shadow">
                <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-4">
                  Total Processed
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="text-4xl font-extrabold text-on-surface">
                    1,284
                  </h3>
                  <CircleCheckBig className="material-symbols-outlined text-on-surface-variant opacity-30 text-3xl" />
                </div>
              </div>
            </div>
            <div className="bg-sidebar p-3 md:p-2 rounded-lg flex flex-col lg:flex-row lg:items-center gap-2 mb-8">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="relative group bg-card rounded-lg">
                  <select className="appearance-none w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-4 pr-10 text-sm font-semibold text-on-surface cursor-pointer focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                    <option>Grade 10-A</option>
                    <option>Grade 10-B</option>
                    <option>Grade 11-A</option>
                  </select>
                  <ChevronsDown className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
                </div>
                <div className="relative group bg-card rounded-lg">
                  <select className="appearance-none w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-4 pr-10 text-sm font-semibold text-on-surface cursor-pointer focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                    <option>Term 1, 2023-24</option>
                    <option>Term 2, 2023-24</option>
                    <option>Finals, 2023-24</option>
                  </select>
                  <ChevronsDown className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
                </div>
                <div className="relative group bg-card rounded-lg">
                  <select className="appearance-none w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-4 pr-10 text-sm font-semibold text-on-surface cursor-pointer focus:ring-2 focus:ring-primary/10 transition-all outline-none">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Literature</option>
                    <option>History</option>
                  </select>
                  <ChevronsDown className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-on-surface-variant" />
                </div>
                <div className="relative group bg-card rounded-lg">
                  <input
                    className="w-full bg-surface-container-lowest border-none rounded-lg py-3 pl-10 pr-4 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    placeholder="Search Student..."
                    type="text"
                  />
                  <Search className="material-symbols-outlined absolute left-3 top-3 pointer-events-none text-on-surface-variant" />
                </div>
              </div>
              <button className="w-full lg:w-12 h-12 flex items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dim transition-colors">
                <ListFilter className="material-symbols-outlined" />
              </button>
            </div>
            <div className="bg-surface-container-lowest rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] overflow-hidden">
              <div className="lg:hidden space-y-4 p-4">
                {results.map((row) => (
                  <div
                    key={row.id}
                    className="bg-card rounded-lg border border-outline-variant/10 p-4 space-y-3 shadow-[0_4px_20px_rgba(42,53,50,0.04)]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-on-surface-variant font-medium">
                        {row.date}
                      </p>
                      <span
                        className={`inline-flex items-center justify-center h-7 px-3 rounded-full text-[10px] font-bold ${row.gradeClassName}`}
                      >
                        {row.grade}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                        alt={`${row.student} avatar`}
                        src={row.avatar}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-on-surface truncate">
                          {row.student}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {row.subject} • {row.term}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-on-surface-variant">
                      <span className="font-semibold text-on-surface">
                        {row.score}
                      </span>
                      <span>{row.teacher}</span>
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden lg:table w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Date
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Student
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Subject
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Term
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Score
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant text-center">
                      Grade
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                      Assigned Teacher
                    </th>
                    <th className="px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant text-right">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {results.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-surface-container-low/30 transition-colors group"
                    >
                      <td className="px-8 py-5 text-sm font-medium text-on-surface-variant">
                        {row.date}
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <img
                            className="w-9 h-9 rounded-full object-cover shadow-sm"
                            alt={`${row.student} avatar`}
                            src={row.avatar}
                          />
                          <span className="text-sm font-bold text-on-surface">
                            {row.student}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-semibold">
                        {row.subject}
                      </td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">
                        {row.term}
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-bold">{row.score}</span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${row.gradeClassName}`}
                        >
                          {row.grade}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant">
                        {row.teacher}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 rounded-lg hover:bg-surface-container opacity-0 group-hover:opacity-100 transition-all">
                          <EllipsisVertical className="material-symbols-outlined text-on-surface-variant" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="px-8 py-4 bg-surface-container-low/20 flex items-center justify-between border-t border-surface-container">
                <p className="text-xs font-medium text-on-surface-variant">
                  Showing <span className="text-on-surface">5</span> of{" "}
                  <span className="text-on-surface">1,284</span> results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant disabled:opacity-30"
                    disabled
                  >
                    <ChevronsLeft className="material-symbols-outlined text-sm"/>
                   
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold">
                    1
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-xs font-bold">
                    2
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-xs font-bold">
                    3
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant">
                    <ChevronsRight className="material-symbols-outlined text-sm"/>
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default SchoolAdminResults;


