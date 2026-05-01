import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Banknote, ChevronDown, ChevronsLeft, ChevronsRight, CirclePlus, ClipboardClock, Share, TrendingUp, Wallet, X } from "lucide-react";
import { useState } from "react";

const SchoolAdminFinancials = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const payments = [
    {
      id: "1",
      date: "Oct 24, 2023",
      student: "Ethan Caldwell",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcZLMWxXmbpgWKQtPIzaPThgK8LUsWREXdw9xgV-dwpYQh8wZNsd6fRgTKWwJ9P27dTuZv60syWyS6DBAuvMKBrpDJWxzzc_Fswx8qJObUDpyG1w86iVFXX9t6cLpV0Rga0V9SHlJXCbAFOYG_O9S-UKrCwWtcHfLurPdBpZdF2VsWv8HXQZhHHE6nVVTVStHCrSc19Hq0PIkGkh999REaWSqFifXuJTJtYRty9ZILyfAz-bXpvUkvAU0OpHca4eG4MC4BSCHJYlBj",
      level: "Grade 10-A",
      feeItem: "Tuition (Term 2)",
      amount: "Ksh 2,450.00",
      status: "Success",
      statusClassName: "bg-primary/10 text-primary",
      dotClassName: "bg-primary",
    },
    {
      id: "2",
      date: "Oct 24, 2023",
      student: "Sienna Rivera",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC8jb8LZEzsAN4Z1Ciuuwc09tlThk6218eA2ig8FSJDD5t7gAVtlYJPTh5IxHPIAc6reEglGHbMiPhhepU4ZnUg-Y4WuaRYqITKgu2mkrhAypg6pHy71crN1uyEgkaBVSdUTYb7yybCvl3rypPbwdq0DaV2IhxDMz-SHSDjT2SLbcnV1AGytxlggRUVB8Wv3bcrNXZL8TCAj3hsvRepl5PO4r8s06ec-UxWuvOGpxxOfwxFpvLDDgfV7Jw1vkJJqu39wY3sVUXFmnfF",
      level: "Grade 12-C",
      feeItem: "Exam Registration",
      amount: "Ksh 150.00",
      status: "Success",
      statusClassName: "bg-primary/10 text-primary",
      dotClassName: "bg-primary",
    },
    {
      id: "3",
      date: "Oct 23, 2023",
      student: "Marcus Thorne",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBbjwLhQiHTwKZjmb12umdBqcvxE7FOZHAOOJ6vUXA7PHAaniM4aXZFST_tbM0MLz3438UTeCf5gMeYEYbLnVC652vuIv1GEaDFnfIX2T35AGAEOuMcgDEhZijUnS25W-K-i8MpyojbS4LjCZLXOsb6JJ2IqT5ofp9imXtDcqrQuNaI3p_KReahCEx6xNQgInRgGTKK0UQRYP-SMxVF8RiHq79EpxY5jANkjDFX6EQj0L481DkGeoMD6vU0L7wwZSRSC7B9gnTkAGHA",
      level: "Grade 8-B",
      feeItem: "Lab Fees",
      amount: "Ksh 45.00",
      status: "Pending",
      statusClassName: "bg-amber-500/10 text-amber-700",
      dotClassName: "bg-amber-500",
    },
    {
      id: "4",
      date: "Oct 23, 2023",
      student: "Luna Wright",
      initials: "LW",
      level: "Grade 9-A",
      feeItem: "Bus Service",
      amount: "Ksh 120.00",
      status: "Success",
      statusClassName: "bg-primary/10 text-primary",
      dotClassName: "bg-primary",
    },
    {
      id: "5",
      date: "Oct 22, 2023",
      student: "Zoe Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMoAooL2usE1UKMqfbZi_3uoUk_U5ee54zsV1vfNUYqy5pXRWn8oFxPZCXbE03mjnuPQdIVi-C220uws6wnjSQ1tAcHnUxPQlBCdk7m8Q2EpaxM_tMWUPbS9WGNli940qAKBRvtm0q8wwHt4iNimHyuzh2hi6xUPBbNErClfzwM8bxAFoBWxqJ5PqElmOCQU1DnEkrCHGkthPvHPcUKVYE9l2RmKjdJQjCv7TCbCru3swdUxmIhZF4ZExI9DUpuJzVCvuZasVkS-wj",
      level: "Grade 11-D",
      feeItem: "Tuition (Term 2)",
      amount: "Ksh 2,450.00",
      status: "Success",
      statusClassName: "bg-primary/10 text-primary",
      dotClassName: "bg-primary",
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
          <div className="min-h-screen">
            <div className="mb-12 flex flex-col gap-3 md:flex-row  md:justify-between">
              <div>
                <h2 className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                  Financials Hub
                </h2>
                <p className="text-on-surface-variant max-w-xl text-lg font-light leading-relaxed">
                  Centralized management for school fees, payroll integration,
                  and payment reconciliations.
                </p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <button className="px-6 py-3 bg-sidebar font-semibold rounded-lg flex items-center gap-2 hover:bg-sidebar/40 transition-colors">
                  <Share className="material-symbols-outlined text-xl" />
                  Export
                </button>
                <button className="px-8 py-3 primary-gradient  text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-[#2DD4BF]/20 transform hover:-translate-y-0.5 transition-all active:scale-95">
                  <CirclePlus className="material-symbols-outlined text-xl"/>
                  
                  Record Payment
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-card p-8 rounded-lg flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Total Expected
                  </span>
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                    <Banknote  className="material-symbols-outlined text-sm"/>
                     
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-on-surface">
                    Ksh 1,420,000
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    Current Academic Session
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Total Collected
                  </span>
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center ">
                    <Wallet className="material-symbols-outlined text-sm"/>
                     
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-primary">
                    Ksh 1,180,500
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-1">
                    83% of total revenue
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Outstanding Balance
                  </span>
                  <div className="w-8 h-8 rounded-full bg-error-container/40 flex items-center justify-center text-error">
                    <ClipboardClock  className="material-symbols-outlined text-sm"/>
                   
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-on-surface">
                    Ksh 239,500
                  </h3>
                  <p className="text-xs text-error mt-1 font-medium">
                    Attention required (142 students)
                  </p>
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg flex flex-col justify-between h-40 border-2 border-[#2DD4BF]/10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Collection Rate %
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center text-[#2DD4BF]">
                    <TrendingUp className="material-symbols-outlined text-sm"/>
                    
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold text-on-surface">
                    83.2%
                  </h3>
                  <div className="w-full bg-accent h-1.5 rounded-full mt-3 overflow-hidden">
                    <div className="bg-primary h-full w-[83%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <nav className="flex flex-row items-center justify-center gap-10 border-none mb-8">
              <button className="pb-4 text-on-surface-variant hover:text-on-surface transition-all text-sm font-semibold tracking-tight relative group">
                Fee Structure
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </button>
              <button className="pb-4 text-on-surface-variant hover:text-on-surface transition-all text-sm font-semibold tracking-tight relative group">
                Fee Items
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </button>
              <button className="pb-4 text-primary font-extrabold text-sm tracking-tight relative">
                Payments
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></span>
              </button>
            </nav>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-5 items-center mb-6">
                <div className="flex gap-3">
                  <span className="px-4 py-2 bg-sidebar rounded-full text-xs font-bold text-on-secondary-container flex items-center gap-2">
                    All Payments{" "}
                    <X className="material-symbols-outlined text-sm"/>
                    
                  </span>
                  <span className="px-4 py-2 bg-sidebar/40 rounded-full text-xs font-bold text-on-surface-variant flex items-center gap-2 border border-outline-variant/10">
                    Level: Grade 10{" "}
                    <ChevronDown  className="material-symbols-outlined text-sm"/>
                     
                  </span>
                </div>
                <div className="text-sm font-medium text-on-surface-variant">
                  Showing 24 of 1,240 entries
                </div>
              </div>
              <div className="px-8 py-3 bg-surface-container rounded-lg hidden md:grid md:grid-cols-6 gap-4 text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                <div>Date</div>
                <div>Student Name</div>
                <div>Level</div>
                <div>Fee Item</div>
                <div>Amount</div>
                <div className="text-right">Status</div>
              </div>
              <div className="space-y-3">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="px-5 sm:px-8 py-5 bg-card rounded-lg hover:shadow-xl hover:shadow-[#2a3532]/05 transition-all border border-transparent hover:border-[#2DD4BF]/20 group"
                  >
                    <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4 lg:items-center">
                      <div className="text-sm text-on-surface-variant">
                        {payment.date}
                      </div>
                      <div className="flex items-center gap-3">
                        {payment.avatar ? (
                          <img
                            alt={`${payment.student} avatar`}
                            className="w-8 h-8 rounded-full object-cover"
                            src={payment.avatar}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#e1eae7] flex items-center justify-center text-on-surface-variant text-[10px] font-bold">
                            {payment.initials}
                          </div>
                        )}
                        <span className="text-sm font-bold text-on-surface">
                          {payment.student}
                        </span>
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        {payment.level}
                      </div>
                      <div className="text-sm text-on-surface-variant">
                        {payment.feeItem}
                      </div>
                      <div className="text-sm font-bold text-on-surface">
                        {payment.amount}
                      </div>
                      <div className="text-left lg:text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full uppercase ${payment.statusClassName}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${payment.dotClassName}`}
                          ></span>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                    <div className="lg:hidden space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {payment.avatar ? (
                            <img
                              alt={`${payment.student} avatar`}
                              className="w-9 h-9 rounded-full object-cover"
                              src={payment.avatar}
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#e1eae7] flex items-center justify-center text-on-surface-variant text-[10px] font-bold">
                              {payment.initials}
                            </div>
                          )}
                          <span className="text-sm font-bold text-on-surface">
                            {payment.student}
                          </span>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold rounded-full uppercase ${payment.statusClassName}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${payment.dotClassName}`}
                          ></span>
                          {payment.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-on-surface-variant">
                        <span className="font-bold text-on-surface">
                          {payment.amount}
                        </span>
                        <span>{payment.level}</span>
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                        {payment.feeItem} • {payment.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center pt-8">
                <nav className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">
                    <ChevronsLeft className="material-symbols-outlined"/>
                    
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-primary text-on-primary font-bold flex items-center justify-center">
                    1
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface-variant font-bold flex items-center justify-center hover:bg-surface-container-high transition-all">
                    2
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface-variant font-bold flex items-center justify-center hover:bg-surface-container-high transition-all">
                    3
                  </button>
                  <span className="mx-2 text-on-surface-variant">...</span>
                  <button className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface-variant font-bold flex items-center justify-center hover:bg-surface-container-high transition-all">
                    52
                  </button>
                  <button className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all">
                    <ChevronsRight className="material-symbols-outlined"/>
                  </button>
                </nav>
              </div>
            </div>
            <aside className="fixed right-10 bottom-10 w-64 bg-[#2a3532] text-[#e3fff8] p-6 rounded-3xl shadow-2xl shadow-[#2a3532]/20">
              <h4 className="text-xs uppercase tracking-widest font-extrabold mb-4 opacity-70">
                Month Snapshot
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Deposits</span>
                  <span className="text-sm font-bold text-[#2DD4BF]">
                    +Ksh 182k
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Expenses</span>
                  <span className="text-sm font-bold text-error-container">
                    -Ksh 24k
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10 mt-2 flex justify-between items-center">
                  <span className="text-xs font-bold">Net Change</span>
                  <span className="text-lg font-extrabold">+Ksh 158k</span>
                </div>
              </div>
              <button className="w-full mt-6 py-2 bg-white/10 rounded-xl text-[10px] uppercase font-bold tracking-widest hover:bg-white/20 transition-all">
                View Full Report
              </button>
            </aside>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default SchoolAdminFinancials;


