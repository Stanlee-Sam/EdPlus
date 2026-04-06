import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { Forward, Reply, SquarePen, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useParams } from "react-router";

type Notification = {
  id: string;
  tag: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  status: "unread" | "read";
};

const notifications: Notification[] = [
  {
    id: "1",
    tag: "Teacher",
    sender: "Sarah Jenkins",
    subject: "Updated Curriculum for Grade 10",
    preview:
      "Hi Team, I've just uploaded the revised science curriculum for the next semester. Please review the lab safety section...",
    time: "2m ago",
    status: "unread",
  },
  {
    id: "2",
    tag: "Admin",
    sender: "Marcus Thorne",
    subject: "Quarterly Budget Review",
    preview:
      "The financial reports for Q3 are now available in the portal. We need to finalize the equipment request by Friday...",
    time: "1h ago",
    status: "read",
  },
  {
    id: "3",
    tag: "Support",
    sender: "EdPlus Support",
    subject: "System Maintenance Notice",
    preview:
      "Please be advised that the student portal will undergo scheduled maintenance this Sunday from 2:00 AM to 4:00 AM EST...",
    time: "4h ago",
    status: "read",
  },
  {
    id: "4",
    tag: "Teacher",
    sender: "Elena Rodriguez",
    subject: "Field Trip Permission Slips",
    preview:
      "All permission slips for the museum trip have been collected. We have 45 students attending and 3 chaperones...",
    time: "Yesterday",
    status: "read",
  },
];

const NotificationsList = () => {
  return (
    <div className="w-full flex flex-col space-y-6">
      <button className="w-full py-4 px-6 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]">
        <SquarePen className="material-symbols-outlined" />
        Compose Notification
      </button>
      <div className="bg-sidebar/50 rounded-xl p-1 flex items-center">
        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider bg-surface-container-lowest text-primary rounded-lg shadow-sm">
          All
        </button>
        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
          Unread
        </button>
        <button className="flex-1 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant hover:text-primary transition-colors">
          Sent
        </button>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-3">
        {notifications.map((item) => (
          <Link
            key={item.id}
            to={`/notifications/${item.id}`}
            className={`block p-4 rounded-xl cursor-pointer transition-colors relative group ${
              item.status === "unread"
                ? "bg-card border border-primary/10 hover:bg-surface-container-high"
                : "bg-card/70 hover:bg-sidebar/50"
            }`}
          >
            {item.status === "unread" ? (
              <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
            ) : null}
            <div className="flex justify-between items-start mb-2">
              <span className="font-manrope text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-container/30 px-2 py-0.5 rounded-full">
                {item.tag}
              </span>
              <span className="text-[10px] text-on-surface-variant font-medium">
                {item.time}
              </span>
            </div>
            <h4 className="font-bold text-on-surface mb-1 truncate">
              {item.sender}
            </h4>
            <p className="text-xs font-semibold text-on-surface/90 mb-1">
              {item.subject}
            </p>
            <p className="text-[11px] text-on-surface-variant line-clamp-2">
              {item.preview}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NotificationDetail = () => {
  const { id } = useParams();
  const message =
    notifications.find((item) => item.id === id) ?? notifications[0];

  if (!message) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-on-surface-variant h-screen">
        Select a notification to view details.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-card rounded-xl shadow-[0_20px_40px_rgba(42,53,50,0.04)] overflow-hidden">
      <div className="p-8 border-b border-surface-container">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-extrabold text-on-surface leading-tight max-w-2xl">
            {message.subject}
          </h3>
          <div className="flex gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg">
              <Star className="material-symbols-outlined" />
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg">
              <Trash2 className="material-symbols-outlined" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container bg-surface-container-high" />
          <div>
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-on-surface">{message.sender}</h5>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary px-2 py-0.5 bg-primary-container/20 rounded-full">
                {message.tag}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              To: Admin Group • {message.time}
            </p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl space-y-6 text-on-surface leading-relaxed text-sm">
          <p>Hi Team,</p>
          <p>{message.preview}</p>
          <p>
            This message is a placeholder. You can replace this content with
            your real notification body or render rich text later.
          </p>
          <p>
            Best regards,
            <br />
            <span className="font-bold text-primary">{message.sender}</span>
          </p>
        </div>
      </div>
      <div className="p-6 bg-surface-container-low flex items-center justify-between">
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-surface-container-lowest border border-outline-variant/30 text-on-surface-variant font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-surface-container transition-all flex items-center gap-2">
            <Forward className="material-symbols-outlined text-sm" />
            Forward
          </button>
        </div>
        <button className="px-8 py-2.5 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:opacity-90 transition-all flex items-center gap-2">
          <Reply className="material-symbols-outlined text-sm" />
          Reply Message
        </button>
      </div>
    </div>
  );
};

const NotificationsLayout = () => {
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
            <div className="flex flex-col gap-3 w-full md:flex-row md:justify-between md:items-end">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Messages
                </p>
                <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">
                  Notifications
                </h1>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 min-h-[560px]">
              <div className="hidden md:block md:w-1/3">
                <NotificationsList />
              </div>
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const NotificationsIndex = () => {
  return (
    <div className="space-y-6">
      <div className="md:hidden">
        <NotificationsList />
      </div>
      <div className="hidden md:flex h-full items-center justify-center text-sm text-on-surface-variant bg-card rounded-xl border border-outline-variant/10">
        Select a notification to view details.
      </div>
    </div>
  );
};

export { NotificationsIndex, NotificationDetail };
export default NotificationsLayout;
