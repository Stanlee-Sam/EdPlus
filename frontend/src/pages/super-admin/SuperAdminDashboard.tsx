import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          aria-label="Close sidebar"
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-border/40 bg-card transition-transform duration-200 ease-out md:static md:translate-x-0 ${
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
          <div className="dashboard flex flex-col gap-7 space-y-4 w-full">
            <div>
              <h3 className="text-primary font-semibold text-[10px] md:text-[12px] tracking-widest">
                PLATFORM OVERVIEW
              </h3>
              <h1 className="text-foreground text-[32px] md:text-[40px] font-bold">
                Dashboard
              </h1>
              <p className="text-muted-foreground text-[15px]">
                Centralized intelligence for the Edplus ecosystem. Monitoring
                health, growth, and infrastructure across all partnered
                institutions.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="bg-card p-5 flex flex-col gap-3 rounded-md ">
                <div>
                  <GraduationCap />
                </div>
                <p>Total Schools</p>
                <h3>42</h3>
                <span>+2 from last month</span>
              </div>
              <div className="bg-card p-5 flex flex-col gap-3 rounded-md ">
                <div>
                  <Users />
                </div>
                <p>Active Users</p>
                <h3>12, 840</h3>
                <span>Steady traffic management</span>
              </div>
              <div className=" p-5 flex flex-col gap-3 rounded-md ">
                <div>
                  <p>Revenue Growth</p>
                  <h3>12, 840</h3>
                  <span>Final Year Comparison</span>
                  <button>View Statement</button>
                </div>
                <div>
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;
