import { useEffect, useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";
import { CirclePlus } from 'lucide-react';
import api from "../../../utils/api";
import axios from "axios";
import { toast } from "sonner";

interface School {
  id : number;
  name : string;
  location : string;
}

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
  const fetchSchools = async () => {

    setLoading(true);
      try {
      const response = await api.get('/schools')
      setSchools(response.data);
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || 'Failed to load schools data');
      }
    } finally {
      setLoading(false);
    }
  }

  fetchSchools();
    
  }, [])

  useEffect(() => {
     const fetchUsers = async () => {
      try {
      const response = await api.get('/users')
      setUsers(response.data);
      
    } catch (error) {
      if(axios.isAxiosError(error)){
        toast.error(error.response?.data?.message || 'Failed to load schools data');
      }
    }
  }

  fetchUsers();
    
  }, [])

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
      <main className="flex flex-1 flex-col">
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
            <div className="flex flex-col justify-around md:flex-row gap-3 w-full">
              <div className="bg-card p-6 flex flex-col gap-3 rounded-lg  items-start justify-center w-full md:w-[25%]">
                <div className="bg-primary p-2 rounded-sm ">
                  <GraduationCap />
                </div>
                <p className="font-semibold text-muted-foreground text-md">
                  Total Schools
                </p>
                <h3 className="text-[40px] text-foreground font-extrabold">
                  {schools.length}
                </h3>
                <span className="text-primary font-bold text-sm">
                  +2 from last month
                </span>
              </div>
              <div className="bg-card p-6 flex flex-col gap-3 rounded-lg items-start justify-center w-full md:w-[25%]">
                <div className="bg-primary p-2 rounded-sm ">
                  <Users />
                </div>
                <p className="font-semibold text-muted-foreground text-md">
                  Active Users
                </p>
                <h3 className="text-[40px] text-foreground font-extrabold">
                  {users.length}
                </h3>
                <span>Steady traffic management</span>
              </div>
              <div className="md:col-span-2 bg-chart-6 text-on-primary p-8 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] relative overflow-hidden flex items-center justify-between min-h-[200px] w-full md:w-[50%]">
                <div className="relative z-10">
                  <p className="text-xs font-bold text-primary tracking-wider uppercase mb-2">
                    Revenue Growth
                  </p>
                  <h3 className="text-5xl font-black text-white">+24.8%</h3>
                  <p className="text-sm text-primary opacity-60 mt-2">
                    Fiscal Year Comparison
                  </p>
                  <button className="mt-6 px-6 py-2 bg-primary text-on-primary-container rounded-full text-xs font-bold hover:scale-95 transition-transform duration-150">
                    View Statement
                  </button>
                </div>
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-primary rounded-full opacity-10 blur-3xl"></div>
                <div className="relative z-10 h-24 w-32 flex items-end gap-1">
                  <div className="w-2 bg-primary/40 rounded-t-full h-1/4"></div>
                  <div className="w-2 bg-primary/60 rounded-t-full h-2/4"></div>
                  <div className="w-2 bg-primary/80 rounded-t-full h-3/4"></div>
                  <div className="w-2 bg-primary rounded-t-full h-full"></div>
                  <div className="w-2 bg-primary/90 rounded-t-full h-4/5"></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 md:flex-row w-full">
              <div className="bg-sidebar lg:col-span-2 bg-surface-container-low p-8 rounded-lg w-full md:w-3/4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h4 className="text-xl font-black text-on-surface">
                      Platform Health &amp; Enrollment
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      System-wide data ingestion and uptime metrics
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-surface-container-highest text-[10px] font-bold rounded-full">
                      30 DAYS
                    </span>
                    <span className="px-3 py-1 bg-surface-container-lowest text-[10px] font-bold rounded-full text-primary shadow-sm">
                      YEARLY
                    </span>
                  </div>
                </div>
                <div className="h-64 flex items-end justify-between gap-4 px-4">
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[40%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      JAN
                    </span>
                  </div>
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[55%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      FEB
                    </span>
                  </div>
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[45%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      MAR
                    </span>
                  </div>
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[70%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      APR
                    </span>
                  </div>
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[65%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      MAY
                    </span>
                  </div>
                  <div className="flex-1 bg-primary/20 rounded-t-xl hover:bg-primary transition-colors duration-300 relative group h-[85%]">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      JUN
                    </span>
                  </div>
                  <div className="flex-1 bg-primary rounded-t-xl relative group h-full">
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold">
                      JUL
                    </span>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase">
                      Uptime Avg
                    </p>
                    <p className="text-xl font-bold text-on-surface">99.98%</p>
                  </div>
                  <div className="p-4 bg-card rounded-lg">
                    <p className="text-[10px] font-bold text-on-surface-variant uppercase">
                      Server Latency
                    </p>
                    <p className="text-xl font-bold text-on-surface">14ms</p>
                  </div>
                </div>
              </div>
              <div className="bg-card p-8 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.06)] w-full md:w-1/4">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h4 className="text-xl font-black text-on-surface">
                      New Schools
                    </h4>
                    <p className="text-xs text-primary font-bold">
                      7 in last 30 days
                    </p>
                  </div>
                  <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors">
                    View All
                  </button>
                </div>
                <div className="space-y-6">
                  {
                  schools.length === 0 ? (
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        No schools found
                      </p>
                    </div>
                  ) :
                  schools.map((school) => (
                     <div key={school.id} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-sidebar flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">
                        {school.name}
                      </p>
                      <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                        {school.location}
                      </p>
                    </div>
                    <span className="text-[10px] text-outline-variant font-medium">
                      2d ago
                    </span>
                  </div>
                  ))}
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-sidebar flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">
                        St. Mary's Academy
                      </p>
                      <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                        Enterprise Plan
                      </p>
                    </div>
                    <span className="text-[10px] text-outline-variant font-medium">
                      2d ago
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-sidebar flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">
                        Riverbend High
                      </p>
                      <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                        Standard Plan
                      </p>
                    </div>
                    <span className="text-[10px] text-outline-variant font-medium">
                      5d ago
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-sidebar flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">
                        Oakwood STEM Institute
                      </p>
                      <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                        Enterprise Plan
                      </p>
                    </div>
                    <span className="text-[10px] text-outline-variant font-medium">
                      1w ago
                    </span>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-sidebar flex items-center justify-center text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-on-surface">
                        The Arts Collegiate
                      </p>
                      <p className="text-[10px] font-medium text-on-surface-variant uppercase tracking-wider">
                        Standard Plan
                      </p>
                    </div>
                    <span className="text-[10px] text-outline-variant font-medium">
                      1w ago
                    </span>
                  </div>
                </div>
                <div className="mt-8 p-6 bg-sidebar rounded-lg border-dashed border-2 border-outline-variant/20 flex flex-col items-center text-center">
                  <span
                    className="material-symbols-outlined text-outline-variant mb-2"
                  >
                    <CirclePlus />
                  </span>
                  <p className="text-xs font-bold text-on-surface mb-4">
                    Onboard New School
                  </p>
                  <button className="w-full cursor-pointer py-3 primary-gradient text-on-primary rounded-lg text-xs font-bold shadow-lg shadow-primary/20">
                    Launch Setup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;


