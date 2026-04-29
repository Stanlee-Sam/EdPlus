import Navbar from "@/components/ui/layout/Navbar";
import Sidebar from "@/components/ui/layout/Sidebar";
import { ArrowRight, BookCopy, CreditCard, Download, FlaskConical, GraduationCap, Landmark } from "lucide-react";
import { useState } from "react";
const ParentFinancials = () => {
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
        <Sidebar role="parent" />
      </aside>
      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 border-b border-border/40 bg-card/80 backdrop-blur">
          <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        </header>
        <section className="flex-1 p-6">
          <div className="pb-16 space-y-12 max-w-7xl mx-auto">
            <section className="flex flex-col md:flex-row md:justify-between  gap-8">
              <div className="space-y-4">
                <h3 className="text-display-md font-extrabold text-on-surface tracking-tighter text-4xl leading-tight w-full">
                  Overview for {" "}
                  <span className="text-primary">Elena Jenkins</span>
                </h3>
                <div className="flex gap-2">
                  <button className="px-6 py-2 bg-card cloud-shadow rounded-full text-sm font-bold border-2 border-primary text-primary transition-all">
                    Elena
                  </button>
                  <button className="px-6 py-2 bg-surface-container-low hover:bg-surface-container rounded-full text-sm font-medium text-on-surface-variant transition-all">
                    Marcus
                  </button>
                </div>
              </div>
              <div className="bg-card rounded-lg cloud-shadow p-8 flex flex-row justify-between items-center gap-12 border-l-8 border-primary">
                <div>
                  <p className="text-label-md uppercase tracking-[0.05rem] text-on-surface-variant font-bold text-xs mb-1">
                    Total Outstanding
                  </p>
                  <p className="text-4xl font-extrabold text-on-surface">
                    Ksh 1,240.00
                  </p>
                </div>
                <button className="px-8 py-4 primary-gradient text-white rounded-md font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2 group">
                  Pay Now
                  <ArrowRight className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </ArrowRight>
                </button>
              </div>
            </section>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-on-surface">
                    Term 3 Fee Breakdown
                  </h4>
                  <span className="text-xs font-bold text-on-surface-variant px-3 py-1 bg-surface-container-high rounded-full uppercase tracking-tighter">
                    Due in 14 days
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="bg-card rounded-lg p-6 flex justify-between items-center transition-transform hover:scale-[1.01] duration-200">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary">
                        <GraduationCap className="material-symbols-outlined">
                          school
                        </GraduationCap>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Tuition Fees - Primary 4
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Due: Oct 15, 2023
                        </p>
                      </div>
                    </div>
                    <p className="font-extrabold text-on-surface">Ksh 850.00</p>
                  </div>
                  <div className="bg-card rounded-lg p-6 flex justify-between items-center transition-transform hover:scale-[1.01] duration-200">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary">
                        <FlaskConical className="material-symbols-outlined">
                          science
                        </FlaskConical>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Lab &amp; Material Fees
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Due: Oct 15, 2023
                        </p>
                      </div>
                    </div>
                    <p className="font-extrabold text-on-surface">Ksh 240.00</p>
                  </div>
                  <div className="bg-card rounded-lg p-6 flex justify-between items-center transition-transform hover:scale-[1.01] duration-200">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                        <BookCopy className="material-symbols-outlined">
                          library_books
                        </BookCopy>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">
                          Library Subscription
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Due: Oct 15, 2023
                        </p>
                      </div>
                    </div>
                    <p className="font-extrabold text-on-surface">Ksh 150.00</p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-secondary rounded-lg p-8 space-y-6 border border-white">
                  <h4 className="font-bold text-on-surface">Payment Methods</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border-2 border-primary/10">
                      <CreditCard className="material-symbols-outlined text-primary">
                        credit_card
                      </CreditCard>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-on-surface">
                          Visa ending in 4492
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          Expires 04/26
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <button className="w-full py-4 rounded-lg border-2 border-dashed border-primary/40 text-on-surface-variant text-sm font-medium hover:bg-card hover:border-primary/20 transition-all">
                      + Add New Method
                    </button>
                  </div>
                </div>
                <div className="relative overflow-hidden bg-primary text-on-primary rounded-2xl p-8 aspect-square flex flex-col justify-end">
                  <img
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                    data-alt="vibrant conceptual image of financial growth with overlapping transparent green circles and subtle paper texture background"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA34FJDtQO04VMET-p8dLO3R6U24jmyGETz9ushl17TFsLcsG3RXuXPaye1ra-toFjTWm8WpfN67GwySmjCBDVbq4RLlejGIoHjhwWdA3bGf8tAM__rzdxBhkMWywcnzLjEylWBO9VLCjuwOBxq_EodJMiSz1z-PoSxGkI5aKnOlQBctG3UnVKiqZaZQfyqjlmILtuBnTdgqkzFvdbmuK85-aXUWjxMp3dZQD4CdopdjSeZXei8hAlsIkxq2U_WJOit9klJ6uNjtUzs"
                  />
                  <div className="relative z-10 space-y-2">
                    <h5 className="text-xl font-black italic">Financial Aid</h5>
                    <p className="text-sm opacity-90 leading-relaxed">
                      Applications for the next academic year scholarship
                      program are now open.
                    </p>
                    <a
                      className="inline-block mt-4 text-sm font-bold underline underline-offset-4"
                      href="#"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-on-surface">
                  Payment History
                </h4>
                <button className="text-sm font-bold text-primary flex items-center gap-2">
                  Download All (PDF)
                  <Download className="material-symbols-outlined text-sm">
                    download
                  </Download>
                </button>
              </div>
              <div className="bg-secondary rounded-lg overflow-hidden p-2">
                <div className="grid grid-cols-4 px-6 py-4 text-label-md uppercase tracking-widest text-on-surface-variant font-bold text-[10px]">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Method</div>
                  <div className="text-right">Status</div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-4 items-center px-6 py-5 bg-card rounded-lg shadow-sm border border-transparent hover:border-primary/10 transition-all">
                    <div className="text-[10px] md:text-sm font-medium text-on-surface">
                      Sep 12, 2023
                    </div>
                    <div className="text-[10px] md:text-sm font-extrabold text-on-surface">
                      Ksh 1,450.00
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                      <CreditCard className="material-symbols-outlined text-base">
                        credit_card
                      </CreditCard>
                      Credit Card
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[7px] md:text-[10px] font-bold uppercase tracking-tight">
                        Successful
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center px-6 py-5 bg-card rounded-lg shadow-sm">
                    <div className="text-[10px] md:text-sm font-medium text-on-surface">
                      Aug 15, 2023
                    </div>
                    <div className="text-[10px] md:text-sm font-extrabold text-on-surface">
                      Ksh 320.00
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                      <Landmark className="material-symbols-outlined text-base">
                        account_balance
                      </Landmark>
                      Bank Transfer
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[7px] md:text-[10px] font-bold uppercase tracking-tight">
                        Successful
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center px-6 py-5 bg-card rounded-lg shadow-sm">
                    <div className="text-[10px] md:text-sm font-medium text-on-surface">
                      Jul 20, 2023
                    </div>
                    <div className="text-[10px] md:text-sm font-extrabold text-on-surface">
                      Ksh 1,200.00
                    </div>
                    <div className="flex items-center gap-2 text-[10px] md:text-sm text-on-surface-variant">
                      <CreditCard className="material-symbols-outlined text-base">
                        credit_card
                      </CreditCard>
                      Credit Card
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-[7px] md:text-[10px] font-bold uppercase tracking-tight">
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>{" "}
        </section>
      </main>
    </div>
  );
};

export default ParentFinancials;
