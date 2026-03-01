"use client";

import { X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Crime } from "@/lib/crime-data";

interface EditIncidentModalProps {
  crime: Crime;
  onClose: () => void;
}

export default function EditIncidentModal({ crime, onClose }: EditIncidentModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[28rem] max-w-[92vw] max-h-[90vh] overflow-hidden bg-black border border-white/15 rounded-lg shadow-2xl shadow-white/5 flex flex-col">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Edit Incident</h2>
            <p className="text-xs text-white/40 mt-0.5">{crime.id}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto px-5 pb-2 min-h-0 space-y-4">
          <Field label="Title" defaultValue={crime.title} />
          <Field label="Description" defaultValue={crime.description} multiline />
          <Field label="Location" defaultValue={crime.location} />

          <div className="grid grid-cols-2 gap-3">
            <SelectField label="Type" defaultValue={crime.type} options={[
              { value: "assault", label: "Assault" }, { value: "robbery", label: "Robbery" },
              { value: "burglary", label: "Burglary" }, { value: "vandalism", label: "Vandalism" },
              { value: "theft", label: "Theft" }, { value: "homicide", label: "Homicide" },
              { value: "drug_offense", label: "Drug Offense" }, { value: "fraud", label: "Fraud" },
              { value: "corruption", label: "Corruption" },
            ]} />
            <SelectField label="Severity" defaultValue={crime.severity} options={[
              { value: "low", label: "Low" }, { value: "medium", label: "Medium" },
              { value: "high", label: "High" }, { value: "critical", label: "Critical" },
            ]} />
          </div>

          <SelectField label="Status" defaultValue={crime.status} options={[
            { value: "active", label: "Active" }, { value: "investigating", label: "Investigating" },
            { value: "resolved", label: "Resolved" },
          ]} />

          <Field label="News Article URL" defaultValue={crime.source?.newsArticleUrl || ""} />
          <Field label="Video Evidence URL" defaultValue={crime.source?.videoEvidenceUrl || ""} />
          <Field label="Audio Evidence URL" defaultValue={crime.source?.audioEvidenceUrl || ""} />
          <Field label="Suspect" defaultValue={crime.peopleInvolved?.suspect || ""} />
          <Field label="Others Involved" defaultValue={crime.peopleInvolved?.others || ""} />

          <Separator />
          <Field label="Admin Note (reason for edit)" defaultValue="" multiline placeholder="Explain why this data is being modified..." />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center justify-end gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-xs text-white/50">Cancel</Button>
          <Button size="sm" className="text-xs font-semibold uppercase tracking-wider gap-1.5">
            <CheckCircle2 className="w-3 h-3" />
            Save Changes
          </Button>
        </div>
      </div>
    </>
  );
}

function Field({ label, defaultValue, multiline, placeholder }: { label: string; defaultValue: string; multiline?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">{label}</label>
      {multiline ? (
        <textarea defaultValue={defaultValue} placeholder={placeholder} rows={3} className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors resize-none" />
      ) : (
        <input type="text" defaultValue={defaultValue} placeholder={placeholder} className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors" />
      )}
    </div>
  );
}

function SelectField({ label, defaultValue, options }: { label: string; defaultValue: string; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">{label}</label>
      <select defaultValue={defaultValue} className="w-full appearance-none bg-white/5 border border-white/20 rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors">
        {options.map((o) => <option key={o.value} value={o.value} className="bg-black">{o.label}</option>)}
      </select>
    </div>
  );
}
