import { useState } from "react";
import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  Calendar,
  CalendarClock,
  ChartColumn,
  ClipboardClock,
  Clock,
  Ellipsis,
  FileUp,
  Lightbulb,
  MessageSquareText,
  Timer,
  Users,
} from "lucide-react";
import DoughnutChartTeacher from "@/components/Charts/DoughnutChartTeacher";

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const statCards = [
    {
      label: "Students Today",
      value: "142",
      icon: Users,
      iconClassName: "text-primary",
    },
    {
      label: "Classes Active",
      value: "6",
      icon: Calendar,
      iconClassName: "text-tertiary",
    },
    {
      label: "Assignments to Grade",
      value: "24",
      icon: ClipboardClock,
      iconClassName: "text-error",
    },
    {
      label: "Overall Attendance",
      value: "94.2%",
      icon: ChartColumn,
      iconClassName: "text-on-primary-container",
    },
  ];

  const classCards = [
    {
      title: "Grade 10-A Mathematics",
      subtitle: "Calculus & Trigonometry",
      badge: "Active Now",
      badgeClassName:
        "bg-primary-container text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCTR6lXpm-_bLOQCQwiXhcNJV_qVW7dGVMNl0s-d_SMLV9Jk28qhXXA7tlodwf6nO2TVUFHxlMFthip3VZ-og08SkN2mkKZo9aSy5u6G4j-FkM1BEuB7b88m0U-wyrHGrweSPofpIjmt9uaHvCsSuggcFGD8eziOUlClUPffMXdbhq45e8VEsydtcG4nTprbDXFsbaJSgTluT9eqjz7feojed8ztAtPB9_Gt6UkN6ZXRnQgk68B89zfb0atpBk5IJELOtdZ0xxUTQqP",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuASFFHIgfwIauqPTzOWE1fq_RDr1vUI0BVVTMNgHrlTtX9f0EF2h12vyxY05I5kkqzM-fLg3Zp41DVx9cRLtDaj39V4z0S4tNArwEfGqWKjtftPZl8HEsCTOukyfRAFxqzcqMusMzDPuS9Yhxu8oigJcsCB6jsdJHQy4taXcVC4CwfMCPliuA5FaXT7yF01kEpIOe8Gk7JVSHfg_VgPxF2UJYB92RfMekA3PhlITOay_d21ZA8Bq6uCwsbhV21a4zP7rxhgXxPx2fhD",
      ],
      extraCount: "+22",
      timeIcon: Clock,
      timeText: "08:00 - 09:30",
      timeClassName: "text-on-surface-variant",
    },
    {
      title: "Grade 11-C Physics",
      subtitle: "Quantum Mechanics Intro",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBOPfc8WWu-mMb-4qc6EjD9EI01uCsjIaHiA03_fr77yiOXtBUqgCjxUYEfY5AaDziNEkXf8doJgR_E9YK6hLbN75UY5JBOaJyJVa1-eXXLNojeUX3mazhMFLuYecRkBrDuhBVkrk27MkzEYFMuPS_uznVBJ0_Q53L0g6mTcJy_ipsGP7idEwQI6N8KqDeEEjeEcYHZIdnc-AjH_kOxLtBqlxssPL-jvKrMK_--wlmh8pp9B1juykxPRq7Bv_KghH8RYsHN2tXXZMkC",
      ],
      extraCount: "+18",
      timeIcon: Timer,
      timeText: "Next: 10:45",
      timeClassName: "text-tertiary",
    },
    {
      title: "Grade 9-B Geometry",
      subtitle: "Area & Perimeter Models",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCmGN5o3Vbe7MEiTI2Vy-kIIePcGCjfiZRtncf1MPG-uD47max3E-KYfx5fCoKq1PuW_agApHphutydxgFZ4AkbgcSIh8E20KZ0mj2f92rdiAJRikAQJuxBM47f5XnYX7YDbRdNakELtSSMINk6ZlNiuI5mjULtFI5w3qXsrPK9h6mkUGhnAg1ZS1U_rHGRkGMgatMn4v1CEFDArhVZJnDGSBEuAV5geYWLnLo7pRGdrCGWir2tFT455JzRVYou702a9sN7w1yGH08c",
      ],
      extraCount: "+28",
      timeIcon: CalendarClock,
      timeText: "Tomorrow",
      timeClassName: "text-on-surface-variant",
    },
    {
      title: "Advanced Statistics",
      subtitle: "Elective - Room 402",
      avatars: [],
      extraCount: "+12",
      timeIcon: Timer,
      timeText: "Next: 13:00",
      timeClassName: "text-tertiary",
    },
  ];

  const activities = [
    {
      title: 'New submission for "Algebra Quiz 2"',
      description:
        "James Wilson from Grade 10-A uploaded a file • 12 mins ago",
      icon: FileUp,
    },
    {
      title: "Message from Principal Marcus",
      description: "Regarding the upcoming science fair logistics • 2 hours ago",
      icon: MessageSquareText,
    },
  ];

  const tasks = [
    {
      title: "Calculus Mid-Term Prep",
      meta: "Grade 10-A • Tomorrow",
      priority: "High",
      dotClassName: "bg-error",
      badgeClassName:
        "bg-error-container/20 text-error px-2 py-0.5 rounded-full uppercase",
    },
    {
      title: "Force & Motion Lab Report",
      meta: "Grade 11-C • Oct 24",
      priority: "Medium",
      dotClassName: "bg-tertiary",
      badgeClassName:
        "bg-secondary text-on-secondary-container px-2 py-0.5 rounded-full uppercase",
    },
    {
      title: "Pythagorean Theorem Quiz",
      meta: "Grade 9-B • Oct 26",
      priority: "Normal",
      dotClassName: "bg-primary",
      badgeClassName:
        "bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full uppercase",
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
          <div className="min-h-screen">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-extrabold text-on-surface tracking-tight">
                  Good Morning, Prof. Sarah
                </h2>
                <p className="text-on-surface-variant mt-1">
                  Here is what's happening in your classrooms today.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="bg-card p-6 rounded-lg cloud-shadow flex flex-col gap-3"
                  >
                    <Icon
                      className={`material-symbols-outlined ${card.iconClassName}`}
                    />
                    <span className="text-3xl font-black text-on-surface">
                      {card.value}
                    </span>
                    <span className="font-label uppercase tracking-widest text-[10px] font-bold text-on-surface-variant">
                      {card.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-on-surface">
                    My Classes
                  </h3>
                  <button className="text-primary font-bold text-sm hover:underline">
                    View All Schedule
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classCards.map((card) => {
                    const TimeIcon = card.timeIcon;
                    return (
                      <div
                        key={card.title}
                        className="bg-card p-6 rounded-lg cloud-shadow relative overflow-hidden group"
                      >
                        {card.badge ? (
                          <div className="absolute top-0 right-0 p-4">
                            <span className={card.badgeClassName}>
                              {card.badge}
                            </span>
                          </div>
                        ) : null}
                        <div className="mb-6">
                          <h4 className="text-lg font-extrabold text-on-surface">
                            {card.title}
                          </h4>
                          <p className="text-on-surface-variant text-sm mt-1">
                            {card.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex -space-x-2">
                            {card.avatars.map((src) => (
                              <div
                                key={src}
                                className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-background"
                              >
                                <img className="w-full h-full object-cover" src={src} alt="" />
                              </div>
                            ))}
                            <div className="w-8 h-8 rounded-full border-2 border-background overflow-hidden bg-background flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
                              {card.extraCount}
                            </div>
                          </div>
                          <span className="text-on-surface-variant text-xs font-bold flex items-center gap-1">
                            <TimeIcon className={`material-symbols-outlined text-sm ${card.timeClassName}`} />
                            {card.timeText}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="space-y-6 pt-4">
                  <h3 className="text-xl font-bold text-on-surface">
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    {activities.map((activity) => {
                      const ActivityIcon = activity.icon;
                      return (
                        <div
                          key={activity.title}
                          className="flex gap-4 p-5 bg-sidebar rounded-lg border-l-4 border-primary"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <ActivityIcon className="material-symbols-outlined text-primary text-xl" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">
                              {activity.title}
                            </p>
                            <p className="text-xs text-on-surface-variant mt-1">
                              {activity.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-8">
                <div className="bg-card p-8 rounded-lg cloud-shadow">
                  <h3 className="text-lg font-bold text-on-surface mb-6 text-center">
                    Daily Attendance
                  </h3>
                  <div className="relative w-40 h-40 mx-auto mb-8">
                    <DoughnutChartTeacher />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-on-surface">
                        91%
                      </span>
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                        Present
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-on-surface-variant">Present</span>
                      </div>
                      <span className="font-bold">129</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-on-tertiary-container"></div>
                        <span className="text-on-surface-variant">Absent</span>
                      </div>
                      <span className="font-bold">13</span>
                    </div>
                  </div>
                </div>
                <div className="bg-card p-8 rounded-lg cloud-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-on-surface">
                      Upcoming Tasks
                    </h3>
                    <Ellipsis className="material-symbols-outlined text-on-surface-variant cursor-pointer"/>
                
                  </div>
                  <div className="space-y-6">
                    {tasks.map((task) => (
                      <div key={task.title} className="flex items-start gap-4">
                        <div className="mt-1">
                          <span className={`w-2 h-2 block rounded-full ${task.dotClassName}`}></span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-on-surface">
                            {task.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-on-surface-variant">
                              {task.meta}
                            </p>
                            <span className={`text-[9px] font-black ${task.badgeClassName}`}>
                              {task.priority}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 rounded-2xl border-2 border-secondary text-on-surface-variant text-xs font-bold hover:bg-secondary hover:text-on-secondary-container transition-colors">
                    View Complete Planner
                  </button>
                </div>
                <div className="bg-linear-to-br from-primary to-on-tertiary-fixed-variant p-8 rounded-lg text-on-tertiary cloud-shadow">
                  <Lightbulb className="material-symbols-outlined text-tertiary-fixed mb-4"/>
                   
                  <h4 className="font-bold text-lg mb-2">Need Grading Help?</h4>
                  <p className="text-sm text-tertiary-fixed/80 leading-relaxed mb-6">
                    Try our new AI-assisted feedback tool to speed up your
                    grading process by 40%.
                  </p>
                  <button className="bg-white text-tertiary px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-opacity-90 transition-all">
                    Learn More
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

export default TeacherDashboard;
