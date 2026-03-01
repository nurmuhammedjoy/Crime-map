"use client";

import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Crime } from "@/lib/crime-data";

interface DeleteIncidentModalProps {
  crime: Crime;
  onClose: () => void;
}

export default function DeleteIncidentModal({ crime, onClose }: DeleteIncidentModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[22rem] max-w-[92vw] bg-black border border-white/15 rounded-lg shadow-2xl shadow-white/5 overflow-hidden">
        <div className="p-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-white" />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider">Remove Incident</h3>
            <p className="text-xs text-white/40 mt-1">
              Are you sure you want to remove <strong className="text-white/70">&quot;{crime.title}&quot;</strong> at{" "}
              <strong className="text-white/70">{crime.location}</strong>?
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-md p-3">
            <p className="text-[10px] text-white/50 leading-relaxed">
              <AlertTriangle className="w-3 h-3 inline mr-1 -mt-0.5" />
              This action will permanently remove this incident. This cannot be undone.
            </p>
          </div>

          <div className="text-left">
            <label className="text-xs text-white/50 uppercase tracking-wider block mb-1.5">Reason for removal</label>
            <textarea
              placeholder="e.g. Confirmed as fake news, no credible sources..."
              rows={2}
              className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-white/50 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={onClose} className="flex-1 text-xs">Cancel</Button>
            <Button variant="destructive" size="sm" className="flex-1 text-xs">Confirm Remove</Button>
          </div>
        </div>
      </div>
    </>
  );
}
