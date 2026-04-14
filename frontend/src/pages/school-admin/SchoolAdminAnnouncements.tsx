import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import {
  AlertTriangle,
  Calendar,
  CirclePile,
  CirclePlus,
  Clock,
  EllipsisVertical,
  Filter,
  Info,
  Megaphone,
  NotepadText,
} from "lucide-react";
import { useState } from "react";

const SchoolAdminAnnouncements = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const announcements = [
    {
      id: "1",
      tag: "Urgent",
      tagClass:
        "bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded-full",
      date: "Oct 24, 2023 • 09:15 AM",
      title: "Final Examination Schedule Release (Semester 1)",
      excerpt:
        "Please review the updated examination schedules for the upcoming winter session. Hall tickets will be issued next Monday.",
      icon: NotepadText,
      iconClassName:
        "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-background",
      hoverTitleClass: "group-hover:text-primary",
      audienceAvatars: [
        { label: "10A" },
        { label: "10B" },
        { label: "+2" },
      ],
      audienceLabel: "Grade 10, Faculty",
    },
    {
      id: "2",
      tag: "Community",
      tagClass:
        "bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-wider rounded-full",
      date: "Oct 22, 2023 • 02:45 PM",
      title: "Annual Science & Tech Fair 2024 - Call for Projects",
      excerpt:
        "Innovative ideas are welcome! Register your team and project concept by the end of this month for the grand exhibition.",
      icon: CirclePile,
      iconClassName:
        "bg-tertiary/5 text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary",
      hoverTitleClass: "group-hover:text-primary",
      audiencePill: "ALL STUDENTS",
      audienceLabel: "Open Audience",
    },
    {
      id: "3",
      tag: "General",
      tagClass:
        "bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider rounded-full",
      date: "Oct 21, 2023 • 11:00 AM",
      title: "New Library Access Policy and Extended Hours",
      excerpt:
        "The campus library will now be open until 10:00 PM on weekdays for all senior students and researchers.",
      icon: Megaphone,
      iconClassName:
        "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-background",
      hoverTitleClass: "group-hover:text-primary",
      audiencePill: "PARENTS",
      audienceLabel: "External",
    },
    {
      id: "4",
      tag: "Alert",
      tagClass:
        "bg-error-container text-on-error-container text-[10px] font-bold uppercase tracking-wider rounded-full",
      date: "Oct 20, 2023 • 08:30 AM",
      title: "IT System Maintenance - Portal Downtime",
      excerpt:
        "Expect intermittent downtime this Saturday between 1 AM and 4 AM for critical security upgrades.",
      icon: AlertTriangle,
      iconClassName:
        "bg-error/5 text-error group-hover:bg-error group-hover:text-on-error",
      hoverTitleClass: "group-hover:text-error",
      audiencePill: "ALL USERS",
      audienceLabel: "Global Alert",
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
      <main className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="pb-20 px-12 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="space-y-2">
                <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
                  Communication Hub
                </span>
                <h2 className="text-5xl font-extrabold text-on-surface tracking-tight leading-none">
                  Announcements
                </h2>
                <p className="text-on-surface-variant max-w-lg mt-4 text-lg leading-relaxed">
                  Keep the academic community informed with curated updates,
                  scheduled events, and critical alerts.
                </p>
              </div>
              <div>
                <button className="bg-primary from-primary to-primary-dim text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-[0_10px_25px_-5px_rgba(0,107,96,0.3)] hover:shadow-[0_15px_30px_-5px_rgba(0,107,96,0.4)] transition-all transform hover:-translate-y-1">
                  <CirclePlus
                    className="material-symbols-outlined"
                    data-icon="add_circle"
                  />
                  Add New Announcement
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="md:col-span-2 bg-sidebar/80 rounded-lg p-2 flex gap-2">
                <button className="flex-1 bg-card text-primary font-bold py-2 rounded-lg text-sm shadow-sm">
                  All Posts
                </button>
                <button className="flex-1 text-on-surface-variant font-medium py-2 rounded-lg text-sm hover:bg-background transition-colors">
                  Drafts
                </button>
                <button className="flex-1 text-on-surface-variant font-medium py-2 rounded-lg text-sm hover:bg-background transition-colors">
                  Scheduled
                </button>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2 flex items-center px-4">
                <Filter
                  className="material-symbols-outlined text-on-surface-variant mr-3 text-sm"
                  data-icon="filter_list"
                />
                <select className="bg-transparent border-none text-sm font-semibold text-on-surface p-0 focus:ring-0 w-full cursor-pointer">
                  <option>Target: All Audience</option>
                  <option>Target: Grade 10-A</option>
                  <option>Target: Parents</option>
                  <option>Target: Faculty</option>
                </select>
              </div>
              <div className="bg-surface-container-low rounded-lg p-2 flex items-center px-4">
                <Calendar
                  className="material-symbols-outlined text-on-surface-variant mr-3 text-sm"
                  data-icon="calendar_month"
                />
                 
                <span className="text-sm font-semibold text-on-surface">
                  This Month
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement) => {
                const Icon = announcement.icon;
                return (
                  <div
                    key={announcement.id}
                    className="group relative bg-surface-container-lowest hover:bg-card p-4 sm:p-6 rounded-lg border border-transparent hover:border-primary/10 transition-all duration-300 shadow-[0_4px_20px_rgba(42,53,50,0.02)] hover:shadow-[0_20px_40px_rgba(42,53,50,0.06)] flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8"
                  >
                    <div
                      className={`h-16 w-16 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300 ${announcement.iconClassName}`}
                    >
                      <Icon className="text-3xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`px-3 py-1 ${announcement.tagClass}`}>
                          {announcement.tag}
                        </span>
                        <span className="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {announcement.date}
                        </span>
                      </div>
                      <h3
                        className={`text-xl font-bold text-on-surface transition-colors truncate ${announcement.hoverTitleClass}`}
                      >
                        {announcement.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">
                        {announcement.excerpt}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:hidden">
                      {announcement.audiencePill ? (
                        <span className="px-3 py-1 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant uppercase">
                          {announcement.audiencePill}
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant uppercase">
                          {announcement.audienceLabel}
                        </span>
                      )}
                    </div>
                    <div className="hidden sm:flex flex-col sm:items-end gap-2 shrink-0">
                      {announcement.audienceAvatars ? (
                        <div className="flex -space-x-2">
                          {announcement.audienceAvatars.map((audience) => (
                            <div
                              key={audience.label}
                              className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface-container-lowest flex items-center justify-center text-[10px] font-bold text-on-surface-variant"
                            >
                              {audience.label}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-8 px-3 rounded-full bg-surface-container-highest text-[10px] font-bold text-on-surface-variant">
                          {announcement.audiencePill}
                        </div>
                      )}
                      <span className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant">
                        {announcement.audienceLabel}
                      </span>
                    </div>
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors sm:self-auto self-start">
                      <EllipsisVertical className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="mt-16 p-12 rounded-2xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-surface-container-low rounded-full flex items-center justify-center mb-4">
                <Info  className="material-symbols-outlined text-on-surface-variant/50 text-3xl"/>
                 
              </div>
              <h4 className="text-on-surface font-bold">
                End of Recent Announcements
              </h4>
              <p className="text-on-surface-variant text-sm mt-1">
                Older announcements are archived and searchable by date range.
              </p>
              <button className="mt-6 text-primary font-bold text-sm hover:underline decoration-2 underline-offset-4 transition-all">
                View Archive History
              </button>
            </div>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default SchoolAdminAnnouncements;


