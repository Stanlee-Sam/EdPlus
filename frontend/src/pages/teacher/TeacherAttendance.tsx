import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { CheckCheck, ListFilter } from "lucide-react";
const TeacherAttendance = () => {
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
      <main className="flex  flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1">
          <div className="p-6 max-w-6xl mx-auto w-full">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight leading-tight">
                  Class Roster
                </h2>
                <p className="text-on-surface-variant mt-2 text-md md:text-lg">
                  Mark attendance for{" "}
                  <span className="font-bold text-on-surface">36 Students</span>{" "}
                  in{" "}
                  <span className="font-bold text-on-surface">
                    Modern History
                  </span>
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary-container font-bold  text-[12px] md:text-sm hover:bg-surface-container-highest transition-colors flex items-center">
                  <CheckCheck className="material-symbols-outlined mr-2 text-[20px]" />
                  Mark All Present
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary-container font-bold  text-[12px] md:text-sm hover:bg-surface-container-highest transition-colors flex items-center">
                  <ListFilter className="material-symbols-outlined mr-2 text-[20px]" />
                  Filter
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                <div className="flex items-center space-x-5">
                  <div className="relative">
                    <img
                      alt="Student Avatar"
                      className="w-14 h-14 rounded-2xl object-cover"
                      data-alt="close-up portrait of a young male student with glasses smiling softly against a neutral background"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfLDTBEKACDgswRvzh8H77gIz7UlnQJ6GIvny5bavU4eNHlIbr9Ruen3bpx61gIBRISEiOlXTA2QXU96onhc_UpyfObwwebg0FVqyRQnis6eAadH5Fwxt0ni9nxcTrgRapuqlc7LFSvofXqSHepWCHlCUzyi5rBHVWx9REkEAzyc-BAnh9dxFLqtF3QqFccPxC0S3Hs8JD6fNWSjNwtDaB-ZUWJDyuLQcy-Gf3CQV-HTu6VcDm7idAdQ3Tk5tC66SHbzTrdQFQU0Le"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2DD4BF] border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-on-surface">
                      Marcus Chen
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10245
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  <button className="px-6 py-2 rounded-xl  text-[12px] md:text-sm font-bold transition-all bg-primary text-white shadow-sm">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl  text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl  text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Absent
                  </button>
                </div>
              </div>
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                <div className="flex items-center space-x-5">
                  <img
                    alt="Student Avatar"
                    className="w-14 h-14 rounded-2xl object-cover"
                    data-alt="headshot of a young female student with dark hair looking confident in a library setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnMNZiOBkx0F9lvxpXwTCdp5GhbQUeRIPEKYKNzi_P3ThPT7ar9usv2lpha9ejfLCx47g9YpVVo7nFLpMm6sPwuRLJXFuhCqRaJYp-4sArzD6ulFQZJH1zElDMu5gjR9DxBGukRbLWu7EtyIP5-X5xZydYWoVVkEkVMdm98yklJwtmTNHJ-1ANuGJIkSdOXJdt2AohSfN_zJfs2-2QiBsC06AiHVHwGmjOtlIaEwdZT9JWQ3CwJSg6EIVtHzfWnZO8xOyWLmvNnwgb"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-on-surface">
                      Aditi Sharma
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10246
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold transition-all bg-amber-100 text-amber-700 shadow-sm">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Absent
                  </button>
                </div>
              </div>
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                <div className="flex items-center space-x-5">
                  <img
                    alt="Student Avatar"
                    className="w-14 h-14 rounded-2xl object-cover"
                    data-alt="portrait of a teenage boy with a backpack in a brightly lit school hallway"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC986_C1nX11GWhJBMBK44PRaIpOH4C1sZ3fmKl08EgoyouztkWae0jkrZJYyLdTLwBNBXHHAmhN6GyV-0Bj-g-7tjOqR_jfFoP4rGt76ipcpLVTQ_r9xNo2VcqR0VKoFxkwYo8UT69EG7cF999unzoKsbnT6gZpI8gbSvCkLDaNN5G9-NnqZhPMJkKMMPIoZI7-HdXNmffd_NErO5rK61mA48TwdIlaaspEAF92KBrbeb5OysGKheiz_pVAkXmtkMyRruwT-fAXxb"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-on-surface">
                      Leo Thompson
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10247
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold transition-all bg-red-100 text-red-700 shadow-sm">
                    Absent
                  </button>
                </div>
              </div>
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                <div className="flex items-center space-x-5">
                  <img
                    alt="Student Avatar"
                    className="w-14 h-14 rounded-2xl object-cover"
                    data-alt="close up of a young female student with freckles and light brown hair in a natural outdoor setting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmwh_W937XIPPZ6CdmguWvLSSnFoYfmgTLh29euohwXdLTSzCHYWKUAIE20npXk7B0sUcp31XJ3dyVGMFLlJ3lIsENsYPlrfBhh8lKnwBjJvpRUAVXaG-WP-Abjk5FnDRWheEJiA46AqvKAMdjsK3O7NzaX91TY1RkvSHUeseaFgkYBLNJSNgmjZ5XihjwI-sKKGF9hqLn9zaFrEPpaY0bgQ_2xQjrH2jCBihnRMCXMIQRIbQgctuCZowWY-4ZvRAsUPde8Y4xAhdR"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-on-surface">
                      Sarah Miller
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10248
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold transition-all bg-primary text-white shadow-sm">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Absent
                  </button>
                </div>
              </div>
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all">
                <div className="flex items-center space-x-5">
                  <img
                    alt="Student Avatar"
                    className="w-14 h-14 rounded-2xl object-cover"
                    data-alt="young male student with curly hair and a friendly expression in a modern classNameroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBu5raejDY0fcWI1obnIDODTBEmoxPF3PJFmAzTLGGgAlVeWoFbbRzes25vRLXXIF3dxnuU1YCq1XCILZaJooLlkDW58a7RQnDCXuo6ha9OD9ha0Cey30mVZ4154VlhR0xz5JWwC-DZeo_FevNYEM9YEVdWUycyKal8Es_YQR-UMXr7xV-0Cgmjasreyt0ULOXkEQxvjI5-9hvxY8oDUZUDaKgEDO4FodwmqanQE5Fx7UAUtvSL-lbwGTxZQ3e89I9sjuIu9_NzqVhP"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-bold text-on-surface">
                      Benjamin Foster
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10249
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 md:flex-row bg-secondary p-1.5 rounded-lg">
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold transition-all bg-primary text-white shadow-sm">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl text-[12px] md:text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Absent
                  </button>
                </div>
              </div>
              <div className="bg-card p-5 rounded-lg flex items-center justify-between shadow-[0_4px_20px_rgba(42,53,50,0.03)] group hover:shadow-[0_8px_30px_rgba(42,53,50,0.06)] transition-all opacity-80">
                <div className="flex items-center space-x-5">
                  <img
                    alt="Student Avatar"
                    className="w-14 h-14 rounded-2xl object-cover"
                    data-alt="portrait of a young female student with braided hair smiling in a sunlit art studio"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCSUVFOSDiJeYPk8RBMWvP3aFaWqol90A_tTbEtQsRdxSyTH_FSKbLVDkg3qhaHSuTxp-xuwbcf2s06C_Q-TsFfoPlT6agoKCQurk9yx-mcljC78DIlBg9-dLlt5FS__AjoQfd74gxUyEVq8rDALtdgX7-tUpozZPSwX1T03nsobbwr3rCJMWmMFkK6E0Oyx-yB-8ExGxSZNeCerBvTydODhO58PzLJ8zSnsmBVloc_FpdGRhqNiMMS3RjNhCEwRKDVaPibqwucbcC"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-on-surface">
                      Maya Jenkins
                    </h3>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">
                      ID: #ED-10250
                    </p>
                  </div>
                </div>
                <div className="flex bg-secondary p-1.5 rounded-2xl">
                  <button className="px-6 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Present
                  </button>
                  <button className="px-6 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Late
                  </button>
                  <button className="px-6 py-2 rounded-xl text-sm font-bold text-on-surface-variant hover:text-on-surface transition-all">
                    Absent
                  </button>
                </div>
              </div>
            </div>
          </div>
          <footer className="flex flex-col md:flex-row gap-3 fixed bottom-0 z-40 bg-card/70 backdrop-blur-xl border-t border-[#a9b4b1]/15 px-12 py-6  items-center md:justify-evenly w-full">
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">
                  Attendance Summary
                </span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF]"></span>
                    <span className="text-sm font-bold text-on-surface">
                      32 Present
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="text-sm font-bold text-on-surface">
                      4 Late
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-sm font-bold text-on-surface">
                      0 Absent
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-3 rounded-2xl font-bold text-[12px] md:text-sm bg-secondary hover:bg-secondary/50 transition-all">
                Save as Draft
              </button>
              <button className="px-10 py-3.5 rounded-2xl bg-gradient-to-br from-[#2DD4BF] to-[#006b60] text-white font-extrabold  text-[12px] md:text-sm shadow-[0_10px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_15px_30px_rgba(45,212,191,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 duration-150">
                Submit Attendance
              </button>
            </div>
          </footer>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherAttendance;
