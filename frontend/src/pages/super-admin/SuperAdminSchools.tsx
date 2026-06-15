import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { useEffect, useState } from "react";
import {
    ChevronsLeft,
  ChevronsRight,
  CirclePlus,
  Edit,
  Lightbulb,
  School,
  X,
} from "lucide-react";
import { MoveUp } from "lucide-react";
import { Zap } from "lucide-react";
import { Hourglass } from "lucide-react";
import { ChevronsDown } from "lucide-react";
import { ArrowDownWideNarrow } from "lucide-react";
import { MapPin } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import api from "../../../utils/api";
import EmptyState from "@/components/ui/layout/EmptyState";

interface School {
  id: string;
  name: string;
  location: string;
  contactEmail: string;
  contactPhone: string;
  principalId?: string;
  principal?: {
    id: string;
    name: string;
  };
}

const SuperAdminSchools = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    location: "",
    contactPhone: "",
    principalId: "",
  });
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [schoolAdmins, setSchoolAdmins] = useState<{ id: string; name: string }[]>(
    [],
  );
  const stats = [
    {
      label: "Total Schools",
      value: schools.length,
      meta: (
        <span className="text-xs font-bold text-primary flex items-center">
          +4% <MoveUp className="w-3 h-3" strokeWidth={2} />
        </span>
      ),
    },
    {
      label: "Active Plans",
      value: "-",
      meta: (
        <span className="text-xs font-bold text-on-surface-variant/40">
          Premium
        </span>
      ),
    },
    {
      label: "Pending Setup",
      value: "-",
      meta: <Hourglass />,
    },
    {
      label: "Avg. Engagement",
      value: "94%",
      meta: <Zap />,
    },
  ];


  useEffect(() => {
    const fetchSchools = async () => {
      setLoading(true);
      try {
        const response = await api.get("/schools");
        setSchools(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            toast.error("Invalid token. Please login");
          } else {
            toast.error(
              error?.response?.data.message || "Failed to fetch schools",
            );
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const openCreateModal = () => {
    setFormData({
      name: "",
      contactEmail: "",
      location: "",
      contactPhone: "",
      principalId: "",
    });
    setMode("create");
  };
  const openEditModal = async (school: School) => {
    setFormData({
      name: school.name,
      location: school.location,
      contactEmail: school.contactEmail,
      contactPhone: school.contactPhone,
      principalId: school.principalId || "",
    });
    setEditingFieldId(school.id);
    setMode("edit");

    // Fetch potential principals (SCHOOL_ADMINs for this school)
    try {
      const response = await api.get(`/users?schoolId=${school.id}&role=SCHOOL_ADMIN`);
      setSchoolAdmins(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Invalid token. Please login");
        } else {
          console.error("Failed to fetch school admins", error);
        }
      }
    }
  };

  const closeModal = () => {
    setMode(null);
    setEditingFieldId(null);

    setFormData({
      name: "",
      contactEmail: "",
      location: "",
      contactPhone: "",
      principalId: "",
    });
    setSchoolAdmins([]);
  };

  const handleCreateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        principalId: formData.principalId || null,
      };
      const response = await api.post("/schools", dataToSubmit);
      setSchools((prev) => [response.data.newSchool, ...prev]);
      toast.success("School created successfully");
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Invalid token. Please login");
        } else {
          toast.error(error.response?.data?.message || "Failed to create school");
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToSubmit = {
        ...formData,
        principalId: formData.principalId || null,
      };
      const response = await api.put(`/schools/${editingFieldId}`, dataToSubmit);
      setSchools((prevSchools) =>
        prevSchools.map((prevSchool) =>
          prevSchool.id === editingFieldId
            ? { ...prevSchool, ...response.data.updatedSchool }
            : prevSchool,
        ),
      );

      toast.success("School updated successfully");
      closeModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast.error("Invalid token. Please login");
        } else {
          toast.error(error.response?.data?.message || "");
        }
      }
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
        <Sidebar role="super-admin" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col  gap-3 w-full md:flex-row md:justify-between md:items-end">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Management Portal
                </p>
                <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">
                  Educational Institutions
                </h1>
              </div>
              <button
                onClick={openCreateModal}
                className="primary-gradient text-[15px] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
              >
                <CirclePlus className="" />
                Register New School
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-card p-6 rounded-lg shadow-[0_20px_40px_rgba(42,53,50,0.04)] border border-outline-variant/5"
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
                  <select className="appearance-none bg-card border-none rounded-lg py-2.5 pl-4 pr-10 text-sm font-semibold text-on-surface focus:ring-2 ring-primary/20 cursor-pointer">
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
                  <select className="appearance-none bg-card border-none rounded-lg py-2.5 pl-4 pr-10 text-sm font-semibold text-on-surface focus:ring-2 ring-primary/20 cursor-pointer">
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
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1 text-right">Actions</div>
              </div>
              {loading && schools.length === 0 ? (
                <div className="p-12 text-sm font-medium text-on-surface-variant">
                  Loading schools...
                </div>
              ) : schools.length === 0 ? (
                <div className="p-12">
                  <EmptyState
                    title="No Schools registered"
                    description="There are currently no schools in the system. Start by adding a new field to begin monitoring."
                    icon={School}
                    actionLabel="Add New School"
                    // onAction={openCreateModal}
                  />
                </div>
              ) : (
                schools.map((school) => (
                  <div
                    key={school.id}
                    className="relative flex flex-col gap-3 px-4 py-4 pr-12 sm:px-6 sm:py-5 bg-surface-container-lowest rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:shadow-primary/5 transition-all group bg-card lg:grid lg:grid-cols-12 lg:items-center lg:pr-6"
                  >
                    <button onClick={() => openEditModal(school)} className="absolute right-3 top-3 w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all lg:hidden">
                      <Edit className="material-symbols-outlined" />
                    </button>
                    <div className="lg:col-span-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center">
                        <School />
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
                        {school.principal?.name || "No Principal"}
                      </p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                        {school.principal ? "Principal" : "Unassigned"}
                      </p>
                    </div>
                    <div className="lg:col-span-2 hidden lg:flex items-center gap-1.5 text-on-surface-variant text-sm">
                      <MapPin className="material-symbols-outlined text-base" />
                      <span>{school.location}</span>
                    </div>
                    <div className="lg:col-span-2 hidden lg:flex lg:justify-center">
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Active
                      </div>
                    </div>
                    <div className="lg:hidden flex flex-col gap-2 text-xs text-on-surface-variant">
                      <span className="w-fit px-3 py-1 bg-primary/10 text-primary rounded-full text-[11px] font-bold">
                        Active
                      </span>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{school.location}</span>
                      </div>
                      
                    </div>
                    <div className="lg:col-span-1 hidden lg:flex justify-end">
                      <button onClick={() => openEditModal(school)} className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all">
                        <Edit className="material-symbols-outlined" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
              <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-widest">
                Showing 1-10 of {schools.length} schools
              </p>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsLeft className="material-symbols-outlined" />
                </button>
                <button className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors border border-outline-variant/10">
                  3
                </button>
                <div className="w-10 h-10 flex items-center justify-center text-on-surface-variant">
                  ...
                </div>
                <button className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors">
                  <ChevronsRight className="material-symbols-outlined" />
                </button>
              </div>
            </div>
          </div>

          <div className="fixed bottom-8 right-8 w-72 glass-panel bg-card/90 backdrop-blur p-6 rounded-lg shadow-[0_28px_60px_rgba(42,53,50,0.18)] border border-border/40 z-50">
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

        {mode && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
            <form
              onSubmit={
                mode === "edit" ? handleUpdateSchool : handleCreateSchool
              }
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500"
            >
              <div className="px-8 py-6 border-b border-zinc-100 flex items-center justify-between bg-emerald-50/10">
                <div>
                  <h3 className="text-2xl font-bold text-primary">
                    {mode === "edit" ? "Update School" : "Add New School"}
                  </h3>
                  <p className="text-sm text-zinc-500 mt-1">
                    Enter school details
                  </p>
                </div>
                <button
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                  onClick={closeModal}
                  type="button"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="font-bold text-on-surface-variant text-sm">
                    School Name
                  </label>
                  <input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                    placeholder="e.g. West Coast Hill School"
                    type="text"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant text-sm">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Nairobi"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant text-sm">
                      Contact Email
                    </label>
                    <input
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      type="email"
                      placeholder=""
                      value={formData.contactEmail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactEmail: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="font-bold text-on-surface-variant text-sm">
                      Contact Phone
                    </label>
                    <input
                      value={formData.contactPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactPhone: e.target.value,
                        })
                      }
                      className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                      placeholder=""
                      type="number"
                      required
                    />
                  </div>

                  {mode === "edit" && (
                    <div className="space-y-2">
                      <label className="font-bold text-on-surface-variant text-sm">
                        Designated Principal
                      </label>
                      <select
                        value={formData.principalId}
                        onChange={(e) =>
                          setFormData({ ...formData, principalId: e.target.value })
                        }
                        className="w-full bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                      >
                        <option value="">Select a Principal</option>
                        {schoolAdmins.map((admin) => (
                          <option key={admin.id} value={admin.id}>
                            {admin.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-zinc-500">
                        Only users with the "School Admin" role are listed here.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 text-zinc-600 font-bold hover:bg-zinc-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-emerald-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
                >
                  {mode === "edit" ? "Update School" : "Save School"}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuperAdminSchools;
