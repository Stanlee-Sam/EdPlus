import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { useState } from "react";
import { ChevronsLeft, ChevronsRight, CirclePlus, Lightbulb } from "lucide-react";
import { MoveUp } from "lucide-react";
import { Zap } from "lucide-react";
import { Hourglass } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import { ArrowDownWideNarrow } from "lucide-react";
import { MapPin } from "lucide-react";
import { EllipsisVertical } from "lucide-react";

const SuperAdminSchools = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const stats = [
    {
      label: "Total Schools",
      value: "128",
      meta: (
        <span className="text-xs font-bold text-primary flex items-center">
          +4% <MoveUp className="w-3 h-3" strokeWidth={2} />
        </span>
      ),
    },
    {
      label: "Active Plans",
      value: "112",
      meta: (
        <span className="text-xs font-bold text-on-surface-variant/40">
          Premium
        </span>
      ),
    },
    {
      label: "Pending Setup",
      value: "12",
      meta: <Hourglass />,
    },
    {
      label: "Avg. Engagement",
      value: "94%",
      meta: <Zap />,
    },
  ];

  const schools = [
    {
      name: "Northwood Academy",
      id: "ED-2024-001",
      admin: "Dr. Sarah Jenkins",
      role: "Lead Principal",
      location: "Seattle, WA",
      plan: "Enterprise",
      status: "Active",
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNnDMtygmComHmFwemwvF63F56iWMLhxg9mHdrKGOh6C42pAR5bpx_xAZUUX8K3Rh1IeIyVamhI53Vz0buPGLkjRPFhW_706Xqrdg7kIiDgQm2Ffq27F_h8z5zI_nl9UeQ5yLq2SBrHwNxw3iXtXE7ydCZNtO5N_a_PIerpIHSIvmwBqpjcSmwVklk5MOOHuy4KcPWQgq-EVhZbMhC21t2Pu0UUzbNeeHvCJ-vcRBNJvM-HZ1xuZ4kuvj-uOs9OVGGfqBdayXbsiuU",
    },
    {
      name: "Riverbend High",
      id: "ED-2024-014",
      admin: "Mr. Daniel Cho",
      role: "Headmaster",
      location: "Portland, OR",
      plan: "Standard",
      status: "Active",
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNnDMtygmComHmFwemwvF63F56iWMLhxg9mHdrKGOh6C42pAR5bpx_xAZUUX8K3Rh1IeIyVamhI53Vz0buPGLkjRPFhW_706Xqrdg7kIiDgQm2Ffq27F_h8z5zI_nl9UeQ5yLq2SBrHwNxw3iXtXE7ydCZNtO5N_a_PIerpIHSIvmwBqpjcSmwVklk5MOOHuy4KcPWQgq-EVhZbMhC21t2Pu0UUzbNeeHvCJ-vcRBNJvM-HZ1xuZ4kuvj-uOs9OVGGfqBdayXbsiuU",
    },
    {
      name: "Oakwood STEM Institute",
      id: "ED-2024-021",
      admin: "Ms. Priya Menon",
      role: "Principal",
      location: "Austin, TX",
      plan: "Enterprise",
      status: "Active",
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNnDMtygmComHmFwemwvF63F56iWMLhxg9mHdrKGOh6C42pAR5bpx_xAZUUX8K3Rh1IeIyVamhI53Vz0buPGLkjRPFhW_706Xqrdg7kIiDgQm2Ffq27F_h8z5zI_nl9UeQ5yLq2SBrHwNxw3iXtXE7ydCZNtO5N_a_PIerpIHSIvmwBqpjcSmwVklk5MOOHuy4KcPWQgq-EVhZbMhC21t2Pu0UUzbNeeHvCJ-vcRBNJvM-HZ1xuZ4kuvj-uOs9OVGGfqBdayXbsiuU",
    },
    {
      name: "The Arts Collegiate",
      id: "ED-2024-034",
      admin: "Dr. Lila Grant",
      role: "Director",
      location: "Chicago, IL",
      plan: "Standard",
      status: "Active",
      logoUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNnDMtygmComHmFwemwvF63F56iWMLhxg9mHdrKGOh6C42pAR5bpx_xAZUUX8K3Rh1IeIyVamhI53Vz0buPGLkjRPFhW_706Xqrdg7kIiDgQm2Ffq27F_h8z5zI_nl9UeQ5yLq2SBrHwNxw3iXtXE7ydCZNtO5N_a_PIerpIHSIvmwBqpjcSmwVklk5MOOHuy4KcPWQgq-EVhZbMhC21t2Pu0UUzbNeeHvCJ-vcRBNJvM-HZ1xuZ4kuvj-uOs9OVGGfqBdayXbsiuU",
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
        <Sidebar role="super-admin" />
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col  gap-3 w-full md:flex-row md:justify-between md:items-end">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Management Portal
                </p>
                <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">
                  Educational Institutions
                </h1>
              </div>
              <button className="primary-gradient text-[15px] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95">
                <CirclePlus className="" />
                Register New School
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card p-6 rounded-2xl shadow-[0_20px_40px_rgba(42,53,50,0.04)] border border-outline-variant/5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2">
                    {stat.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-on-surface">
                      {stat.value}
                    </span>
                    {stat.meta}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3">
                <div className="relative">
                  <select className="appearance-none bg-card border-none rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-on-surface focus:ring-2 ring-primary/20 cursor-pointer">
                    <option>All Plan Types</option>
                    <option>Basic</option>
                    <option>Professional</option>
                    <option>Enterprise</option>
                  </select>
                  <ChevronsDown
                    className="absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-2xl"
                    data-icon="expand_more"
                  />
                </div>
                <div className="relative">
                  <select className="appearance-none bg-card border-none rounded-xl py-2.5 pl-4 pr-10 text-sm font-semibold text-on-surface focus:ring-2 ring-primary/20 cursor-pointer">
                    <option>Any Status</option>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Suspended</option>
                  </select>
                  <ChevronsDown
                    className="absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-2xl"
                    data-icon="expand_more"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm font-medium">
                <ArrowDownWideNarrow
                  className="material-symbols-outlined text-2xl"
                  data-icon="sort"
                />

                <span className="">Sorted by: Recently Added</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="hidden lg:grid grid-cols-12 px-6 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-on-surface-variant/50">
                <div className="col-span-4">School Name</div>
                <div className="col-span-2">Admin / Principal</div>
                <div className="col-span-2">Location</div>
                <div className="col-span-1">Plan Type</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {schools.map((school) => (
                <div
                  key={school.id}
                  className="relative flex flex-col gap-3 px-4 py-4 pr-12 sm:px-6 sm:py-5 bg-surface-container-lowest rounded-2xl shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:shadow-primary/5 transition-all group bg-card lg:grid lg:grid-cols-12 lg:items-center lg:pr-6"
                >
                  <button className="absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all lg:hidden">
                    <EllipsisVertical className="material-symbols-outlined" />
                  </button>
                  <div className="lg:col-span-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-background overflow-hidden shrink-0">
                      <img
                        alt={`${school.name} logo`}
                        className="w-full h-full object-cover"
                        src={school.logoUrl}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                        {school.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant/70">
                        ID: {school.id}
                      </p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 hidden lg:block">
                    <p className="text-sm font-semibold text-on-surface">
                      {school.admin}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {school.role}
                    </p>
                  </div>
                  <div className="lg:col-span-2 hidden lg:flex items-center gap-1.5 text-on-surface-variant text-sm">
                    <MapPin className="material-symbols-outlined text-base" />
                    <span>{school.location}</span>
                  </div>
                  <div className="lg:col-span-1 hidden lg:block">
                    <span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase rounded-full">
                      {school.plan}
                    </span>
                  </div>
                  <div className="lg:col-span-2 hidden lg:flex lg:justify-center">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      {school.status}
                    </div>
                  </div>
                  <div className="lg:hidden flex flex-col gap-2 text-xs text-on-surface-variant">
                    <span className="w-fit px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                      {school.status}
                    </span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{school.location}</span>
                    </div>
                    <span className="w-fit px-2 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-bold uppercase">
                      {school.plan}
                    </span>
                  </div>
                  <div className="lg:col-span-1 hidden lg:flex justify-end">
                    <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                      <EllipsisVertical className="material-symbols-outlined" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
              <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
                Showing 1-10 of 128 schools
              </p>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsLeft 
                    className="material-symbols-outlined"
                  />
                    
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  2
                </button>
                <button className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  3
                </button>
                <div className="w-10 h-10 flex items-center justify-center text-on-surface-variant">
                  ...
                </div>
                <button className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsRight 
                    className="material-symbols-outlined"
                  />
                    
                </button>
              </div>
            </div>
          </div>

          <div className="fixed bottom-8 right-8 w-72 glass-panel bg-card/90 backdrop-blur p-6 rounded-2xl shadow-[0_28px_60px_rgba(42,53,50,0.18)] border border-border/40 z-50">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Lightbulb className="material-symbols-outlined" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-on-surface">
                  Registration Insight
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Most new schools are opting for the{" "}
                  <span className="font-bold">Enterprise Plan</span> this
                  quarter. Consider updating the onboarding guide.
                </p>
              </div>
            </div>
            <button className="w-full py-2 bg-foreground  text-background text-xs font-bold rounded-xl hover:opacity-90 transition-opacity">
              View Insights
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminSchools;
