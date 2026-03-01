"use client";

import { useState, useMemo } from "react";
import { Shield, Flag, BarChart3, Globe, ScrollText, ArrowLeft } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { STATIC_CRIMES } from "@/lib/crime-data";
import type { Crime } from "@/lib/crime-data";
import {
  MOCK_FLAGS,
  MOCK_BLOCKED_IPS,
  MOCK_ACTIVITY,
  type FlaggedIncident,
  type AdminTag,
} from "@/lib/admin-data";

import AdminSidebar, { type AdminView } from "@/components/admin/AdminSidebar";
import ReportList from "@/components/admin/ReportList";
import IncidentList from "@/components/admin/IncidentList";
import IncidentDetailPanel from "@/components/admin/IncidentDetailPanel";
import EditIncidentModal from "@/components/admin/EditIncidentModal";
import DeleteIncidentModal from "@/components/admin/DeleteIncidentModal";
import BlockedIPsPanel from "@/components/admin/BlockedIPsPanel";
import ActivityLog from "@/components/admin/ActivityLog";

export default function AdminPage() {
  const [activeView, setActiveView] = useState<AdminView>("reports");
  const [flags] = useState<FlaggedIncident[]>(MOCK_FLAGS);
  const [crimes] = useState<Crime[]>(STATIC_CRIMES);

  const [selectedCrime, setSelectedCrime] = useState<Crime | null>(null);
  const [selectedFlag, setSelectedFlag] = useState<FlaggedIncident | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const getCrime = (crimeId: string) => crimes.find((c) => c.id === crimeId) || null;

  const stats = useMemo(() => ({
    total: flags.length,
    pending: flags.filter((f) => f.tag === "under_review").length,
    actioned: flags.filter((f) => f.tag === "verified" || f.tag === "fake").length,
    dismissed: flags.filter((f) => f.tag === "duplicate").length,
  }), [flags]);


  const handleSelectFlag = (flag: FlaggedIncident) => {
    const crime = getCrime(flag.crimeId);
    if (crime) {
      setSelectedCrime(crime);
      setSelectedFlag(flag);
    }
  };


  const handleSelectCrime = (crime: Crime) => {
    setSelectedCrime(crime);
    const existingFlag = flags.find((f) => f.crimeId === crime.id) || null;
    setSelectedFlag(existingFlag);
  };


  const handleEditCrime = (crime: Crime) => {
    setSelectedCrime(crime);
    setShowEditModal(true);
  };

  const handleDeleteCrime = (crime: Crime) => {
    setSelectedCrime(crime);
    setShowDeleteModal(true);
  };


  const closePanel = () => {
    setSelectedCrime(null);
    setSelectedFlag(null);
  };

  const closeEdit = () => {
    setShowEditModal(false);
    setSelectedCrime(null);
    setSelectedFlag(null);
  };

  const closeDelete = () => {
    setShowDeleteModal(false);
    setSelectedCrime(null);
    setSelectedFlag(null);
  };

  const handleViewChange = (view: AdminView) => {
    setActiveView(view);
    closePanel();
  };


  const handleTagChange = (_tag: AdminTag) => {
  };

  const handleBlockIP = () => {
  };


  const VIEW_TITLES: Record<AdminView, string> = {
    reports: "Flagged Reports",
    all_data: "All Incidents",
    blocked_ips: "Blocked IPs",
    activity: "Activity Log",
  };

  return (
    <div className="relative flex h-dvh w-full overflow-hidden bg-black text-white">
      {/* Desktop Sidebar */}
      <AdminSidebar activeView={activeView} onViewChange={handleViewChange} stats={stats} />

      {/* Main Content */}
      <main className="relative flex-1 h-full overflow-hidden flex flex-col">
        <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <a href="/" className="text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-xs font-bold uppercase tracking-wider">Admin</span>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-1 px-4 py-2 border-b border-white/10 shrink-0 overflow-x-auto">
          {([
            { key: "reports", icon: Flag, label: "Reports" },
            { key: "all_data", icon: BarChart3, label: "All Data" },
            { key: "blocked_ips", icon: Globe, label: "IPs" },
            { key: "activity", icon: ScrollText, label: "Log" },
          ] as const).map((item) => (
            <button
              key={item.key}
              onClick={() => handleViewChange(item.key)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium uppercase tracking-wider transition-all shrink-0",
                activeView === item.key
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-3 h-3" />
              {item.label}
            </button>
          ))}
        </div>

        {activeView === "reports" && (
          <div className="lg:hidden px-4 py-3 border-b border-white/10 shrink-0">
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Total", value: stats.total, hl: false },
                { label: "Pending", value: stats.pending, hl: stats.pending > 0 },
                { label: "Actioned", value: stats.actioned, hl: false },
                { label: "Dismissed", value: stats.dismissed, hl: false },
              ].map((s) => (
                <div key={s.label} className={cn("rounded-md p-2 border transition-all", s.hl ? "bg-white/5 border-white/20" : "border-white/10")}>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{s.label}</p>
                  <p className={cn("text-lg font-bold font-mono tabular-nums", s.hl ? "text-white" : "text-white/70")}>{s.value.toString().padStart(2, "0")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 pt-4 pb-2 shrink-0">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/60">
            {VIEW_TITLES[activeView]}
          </h2>
        </div>

        <ScrollArea className="flex-1">
          <div className="px-4 pb-4">
            {activeView === "reports" && (
              <ReportList
                flags={flags}
                crimes={crimes}
                onSelect={handleSelectFlag}
                selectedId={selectedFlag?.id || null}
              />
            )}

            {activeView === "all_data" && (
              <IncidentList
                crimes={crimes}
                onSelect={handleSelectCrime}
                onEdit={handleEditCrime}
                onDelete={handleDeleteCrime}
                selectedId={selectedCrime?.id || null}
              />
            )}

            {activeView === "blocked_ips" && (
              <BlockedIPsPanel blockedIPs={MOCK_BLOCKED_IPS} />
            )}

            {activeView === "activity" && (
              <ActivityLog entries={MOCK_ACTIVITY} />
            )}
          </div>
        </ScrollArea>
      </main>

      {selectedCrime && !showEditModal && !showDeleteModal && (
        <IncidentDetailPanel
          crime={selectedCrime}
          flag={selectedFlag}
          onClose={closePanel}
          onEdit={() => setShowEditModal(true)}
          onDelete={() => setShowDeleteModal(true)}
          onTagChange={handleTagChange}
          onBlockIP={handleBlockIP}
        />
      )}

      {showEditModal && selectedCrime && (
        <EditIncidentModal crime={selectedCrime} onClose={closeEdit} />
      )}

      {showDeleteModal && selectedCrime && (
        <DeleteIncidentModal crime={selectedCrime} onClose={closeDelete} />
      )}
    </div>
  );
}
