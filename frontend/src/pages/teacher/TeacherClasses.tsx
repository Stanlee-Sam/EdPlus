import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { CirclePlay, CirclePlus, ClipboardClock, Clock, Eye, FileText, Filter, Languages, ListFilter, MapPin, Microscope, PartyPopper, Sigma, Sparkle, User, UserCheck, Users } from "lucide-react";
const TeacherClasses = () => {
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
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="flex-1">
            <div className="mb-12 flex flex-col md:justify-between md:flex-row gap-6">
              <div>
                <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">
                  My Classes
                </h2>
                <p className="text-on-surface-variant mt-2 text-lg">
                  You have 6 sessions scheduled for this week.
                </p>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-secondary text-on-secondary-container rounded-2xl font-bold text-sm transition-all hover:bg-surface-container-high active:scale-95">
                  <ListFilter
                    className="material-symbols-outlined text-[20px]"
                    data-icon="filter_list"
                  />
                  
                  Sort by Time
                </button>
                <button className="flex items-center gap-2 px-8 py-3 primary-gradient text-on-primary rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:opacity-95 transition-all active:scale-95">
                  <CirclePlus   
                    className="material-symbols-outlined text-[20px]"
                    data-icon="add_circle"
                  />
                    
                  Add Class
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="group bg-card rounded-lg p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-on-surface/5 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container shadow-inner">
                    <Sigma
                      className="material-symbols-outlined text-3xl"
                      data-icon="functions"
                    />
                   
                  </div>
                  <div className="flex -space-x-3">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="teenage boy student profile photo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx3P6eVwSF88i-WH2KAKMWauwdNQx07npldqRHX2GfFRBsQ4zMvovY10Hr4M10rAogeCfggzcILcfKZiJGRt8Z4NaplU_xCm6kj0iR5KF6mOB3NJhPTFVypoM-fH1sQQZq7LjFjTSg23u08722b3a0af_mkQDqU68tVvUu37QJhKfFeO2W43KvslwENjZZ52D6iXrodUA5Ni6RRMucgZk8WtGIsM4iQpYpzEZWfeiPFV-gxJFZuTBS8OUzFUEGOh-E1gMvnqZI-fBe"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="teenage girl student profile photo"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTQcNy0ndXVGUnT92BRqRD-hLZ9zYLufr7Q2c9nh9V_hAqdl7Z0wOcta1ZvrXhq41U2-f5j4o9uAtcSZiOgkoAwe0QwAqvVwz2Vkfi-SR6Np1DvU5T44qsDmsDGuViDXQPK_hMFlBWvE_Pi0dJWhJkNQ0R-WKcWuzKNIit2wCphAaiUHbOYRLqCclVKQ_rhzxDRreXbL784xwIJRPSNPpwGeGIVAQGORGpPwaNFyL99PAygv69TVC55JoSD-JNs7qSoCTHEJaZ1d7j"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +22
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full tracking-wider uppercase mb-2 inline-block">
                    Mathematics
                  </span>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 leading-tight">
                    Grade 10-A Mathematics
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                      <Users
                        className="material-symbols-outlined text-base"
                        data-icon="group"
                      />
                        
                      <span className="font-medium">24 Students</span>
                    </div>
                    <div className="w-1 h-1 bg-secondary rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className="material-symbols-outlined text-base"
                        data-icon="schedule"
                      />                
                      <span className="font-medium">08:30 AM</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/10 flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-primary text-on-primary rounded-2xl text-xs font-bold transition-all hover:bg-primary-dim active:scale-95 flex items-center justify-center gap-2">
                    <UserCheck 
                      className="material-symbols-outlined text-sm"
                      data-icon="how_to_reg"
                    />
                    
                    Take Attendance
                  </button>
                  <button className="flex-1 py-3 px-4 bg-secondary text-on-surface rounded-2xl text-xs font-bold transition-all hover:bg-surface-container-highest active:scale-95 flex items-center justify-center gap-2">
                    <FileText 
                      className="material-symbols-outlined text-sm"
                      data-icon="description"
                    />
                    
                    Manage Homework
                  </button>
                </div>
              </div>
              <div className="group bg-card rounded-lg p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-on-surface/5 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-tertiary-container rounded-2xl flex items-center justify-center text-on-tertiary-container shadow-inner">
                    <Microscope
                      className="material-symbols-outlined text-3xl"
                      data-icon="biotech"
                    />
                    
                  </div>
                  <div className="flex -space-x-3">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="student profile picture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_xGKUuDK08hB2o_NnxlcdMFJ5gKvqepuHKD--YXobin0VlWr0ifXSPr0vzOZ4Mf8dU1blRSGzsX4nswJrnXJTp6FG_3dwEbiD1RZC4O7ZY0in2PCK-VbqUy4KWA5gX3mpLCV9MZcciM8oHBLaVHNQHn2Yj2KG0XvU7QIZSvXWspeJh4XfyOnw7D2RHAj1ISuozvQ3a5IPKEb_s1AWWmzh1FoV28P3XnSwlU9rQMFtuDGQbuk7MM4b-1zWMNJXvJrfcOJCOszXPrbl"
                    />
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="student profile picture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5jcSFzpPns31d0h55KQFEr1sKJR4A-Ts7a8lguV7pBHjLtCbHkl99XmAk6MtwZj-kt8YuXolMcq7uV8ii3AaInz_gvAgo4_19T-ycA2Iz03WwEr7q30BfQOHhTSG0fmGZ_SKaynccXLE4agpaShdLRYZRvPlolitYeGMRJ5lVQMVNCk3O-XQ5HBKDUp1Kwx94byv-o5pcuUkbHu9lY36bCdjp303rpzpaXzFVNGteSvAeT9DIKqDihA1FtcBpaMXderKTiA_brXNJ"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +16
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-tertiary px-3 py-1 bg-tertiary/10 rounded-full tracking-wider uppercase mb-2 inline-block">
                    Science
                  </span>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 leading-tight">
                    Grade 11-B Physics Lab
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                      <Users
                        className="material-symbols-outlined text-base"
                        data-icon="group"
                      />
                       
                      <span className="font-medium">18 Students</span>
                    </div>
                    <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className="material-symbols-outlined text-base"
                        data-icon="schedule"
                      />
                     
                      <span className="font-medium">10:45 AM</span>
                    </div>
                  </div>
                </div>
                 <div className="mt-8 pt-8 border-t border-outline-variant/10 flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-primary text-on-primary rounded-2xl text-xs font-bold transition-all hover:bg-primary-dim active:scale-95 flex items-center justify-center gap-2">
                    <UserCheck 
                      className="material-symbols-outlined text-sm"
                      data-icon="how_to_reg"
                    />
                    
                    Take Attendance
                  </button>
                  <button className="flex-1 py-3 px-4 bg-secondary text-on-surface rounded-2xl text-xs font-bold transition-all hover:bg-surface-container-highest active:scale-95 flex items-center justify-center gap-2">
                    <FileText 
                      className="material-symbols-outlined text-sm"
                      data-icon="description"
                    />
                    
                    Manage Homework
                  </button>
                </div>
              </div>
              <div className="group bg-card rounded-lg p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-on-surface/5 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center text-on-secondary-container shadow-inner">
                    <Languages
                      className="material-symbols-outlined text-3xl"
                      data-icon="history_edu"
                    
                    />
                    
                  </div>
                  <div className="flex -space-x-3">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="student profile picture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA7qKWmhLM7FEFD9COMq4ZgNasq2CSC7bWjkK3FtQuPE8-SVGzoYYUuSD2fCWMYPp44_0Uz5CTWjLnwKUboSd166OzrJaZQfYDbEEmIo-lINcHqaPhmYMIO_t5WCob_lmdrTO3aDHYx9Ab8dOeTNnsLpoSj1fn1UFJmIm5qP73pGgdT-aETiastBKnqsXeoMLwsdnvNkDEpSQHnsSGbefEocKxNbcGx0Mg_7GpqWrmMQp-L14vyG8N52eF4QndoH0dLS_6OQBmxxQy"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +29
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold px-3 py-1 bg-secondary rounded-full tracking-wider uppercase mb-2 inline-block">
                    History
                  </span>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 leading-tight">
                    Grade 9-C World History
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                      <Users
                        className="material-symbols-outlined text-base"
                        data-icon="group"
                      />
                      
                      <span className="font-medium">30 Students</span>
                    </div>
                    <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className="material-symbols-outlined text-base"
                        data-icon="schedule"
                      />
                       
                      <span className="font-medium">01:30 PM</span>
                    </div>
                  </div>
                </div>
                 <div className="mt-8 pt-8 border-t border-outline-variant/10 flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-primary text-on-primary rounded-2xl text-xs font-bold transition-all hover:bg-primary-dim active:scale-95 flex items-center justify-center gap-2">
                    <UserCheck 
                      className="material-symbols-outlined text-sm"
                      data-icon="how_to_reg"
                    />
                    
                    Take Attendance
                  </button>
                  <button className="flex-1 py-3 px-4 bg-secondary text-on-surface rounded-2xl text-xs font-bold transition-all hover:bg-surface-container-highest active:scale-95 flex items-center justify-center gap-2">
                    <FileText 
                      className="material-symbols-outlined text-sm"
                      data-icon="description"
                    />
                    
                    Manage Homework
                  </button>
                </div>
              </div>
              <div className="group md:col-span-2 primary-gradient rounded-3xl p-10 flex flex-col md:flex-row gap-10 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="mb-auto">
                    <span className="text-[11px] font-bold text-on-primary/80 px-4 py-1.5 bg-white/20 rounded-full tracking-widest uppercase mb-6 inline-block backdrop-blur-md">
                      Upcoming Session
                    </span>
                    <h3 className="text-4xl font-extrabold text-on-primary mb-4 leading-tight">
                      Advanced Calculus <br />
                      &amp; Analytical Geometry
                    </h3>
                    <p className="text-on-primary/80 max-w-md text-lg">
                      Your next className starts in 45 minutes. Preparation
                      materials for Chapter 8 are ready for distribution.
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-8 text-on-primary/90">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                        Location
                      </span>
                      <span className="font-bold flex items-center gap-1.5 mt-1">
                        <MapPin
                          className="material-symbols-outlined text-lg"
                          data-icon="location_on"
                        />
                         
                        Room 402, Block B
                      </span>
                    </div>
                    <div className="w-[1px] h-10 bg-on-primary/20"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                        Students
                      </span>
                      <span className="font-bold flex items-center gap-1.5 mt-1">
                        <User
                          className="material-symbols-outlined text-lg"
                          data-icon="person"
                        />
                         
                        32 Enrolled
                      </span>
                    </div>
                  </div>
                </div>
                <div className="relative z-10 w-full md:w-64 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 flex flex-col justify-center gap-4">
                  <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold shadow-xl transition-all hover:bg-on-primary hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3">
                    <CirclePlay
                      className="material-symbols-outlined font-variation-settings-'FILL'-1"
                      data-icon="play_circle"
                    />
                    
                    Start Session
                  </button>
                  <button className="w-full py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-bold transition-all hover:bg-white/10 active:scale-95 flex items-center justify-center gap-3">
                    <Eye
                      className="material-symbols-outlined"
                      data-icon="visibility"
                    />
                    
                    Lesson Plan
                  </button>
                </div>
              </div>
              <div className="group bg-card rounded-3xl p-8 flex flex-col h-full hover:shadow-2xl hover:shadow-on-surface/5 transition-all duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-primary-container rounded-2xl flex items-center justify-center text-on-primary-container shadow-inner">
                    <Languages
                      className="material-symbols-outlined text-3xl"
                      data-icon="language"
                    />
                  </div>
                  <div className="flex -space-x-3">
                    <img
                      className="w-8 h-8 rounded-full border-2 border-secondary object-cover"
                      data-alt="student profile picture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMljCAOVit8edT6Vs3dpqfFCS6bRCmbj85HQ9GuCfuIItBl06LyutxkUfsI4f0OivkDgnYTpyATC-gLfvuRIhz13CyvZNa-2KRpdyhG2DIZuO5UF7_sicKCYc4qSuI8hOlmuZymJPuoxrjkhQKytS3OetvIDPF9pG7F38pzyiZnAp-utRTOO9yqomsSdgi_tuQXHOVJdwysU6zvTWD_FvfCNetcrMl6MutIkoc8fhRjGrvz_6CfNGlwAlmbMbIfiG34fDkj0iofV__"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-secondary bg-secondary flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                      +20
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full tracking-wider uppercase mb-2 inline-block">
                    Languages
                  </span>
                  <h3 className="text-2xl font-bold text-on-surface mb-2 leading-tight">
                    Grade 12-A English Lit.
                  </h3>
                  <div className="flex items-center gap-4 text-on-surface-variant text-sm mt-4">
                    <div className="flex items-center gap-1.5">
                      <Users
                        className="material-symbols-outlined text-base"
                        data-icon="group"
                      />
                     
                      <span className="font-medium">21 Students</span>
                    </div>
                    <div className="w-1 h-1 bg-outline-variant rounded-full"></div>
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className="material-symbols-outlined text-base"
                        data-icon="schedule"
                      />
                       
                      <span className="font-medium">03:15 PM</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/10 flex gap-3">
                  <button className="flex-1 py-3 px-4 bg-primary text-on-primary rounded-2xl text-xs font-bold transition-all hover:bg-primary-dim active:scale-95 flex items-center justify-center gap-2">
                    <UserCheck 
                      className="material-symbols-outlined text-sm"
                      data-icon="how_to_reg"
                    />
                    
                    Take Attendance
                  </button>
                  <button className="flex-1 py-3 px-4 bg-secondary text-on-surface rounded-2xl text-xs font-bold transition-all hover:bg-surface-container-highest active:scale-95 flex items-center justify-center gap-2">
                    <FileText 
                      className="material-symbols-outlined text-sm"
                      data-icon="description"
                    />
                    
                    Manage Homework
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-sidebar rounded-lg p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Sparkle
                    className="material-symbols-outlined text-3xl text-primary"
                    data-icon="auto_graph"
                  />
                   
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1">
                    Weekly Average
                  </p>
                  <h4 className="text-2xl font-extrabold text-on-surface">
                    94.2%
                  </h4>
                  <p className="text-xs text-primary font-bold mt-1">
                    Attendance Rate
                  </p>
                </div>
              </div>
              <div className="bg-sidebar rounded-lg p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <ClipboardClock
                    className="material-symbols-outlined text-3xl text-primary"
                    data-icon="pending_actions"
                 />
                    
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1">
                    Submissions
                  </p>
                  <h4 className="text-2xl font-extrabold text-on-surface">
                    12
                  </h4>
                  <p className="text-xs text-primary font-bold mt-1">
                    Pending Review
                  </p>
                </div>
              </div>
              <div className="bg-sidebar rounded-lg p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <PartyPopper 
                    className="material-symbols-outlined text-3xl text-primary"
                    data-icon="celebration"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1">
                    Class Mood
                  </p>
                  <h4 className="text-2xl font-extrabold text-on-surface">
                    Excellent
                  </h4>
                  <p className="text-xs text-primary font-bold mt-1">
                    Based on Feedback
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default TeacherClasses;
