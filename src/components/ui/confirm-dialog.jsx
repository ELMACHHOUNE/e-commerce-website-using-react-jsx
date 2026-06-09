import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Modal open={open} onClose={onClose} title={title} className="max-w-sm">
      <div className="flex flex-col items-center text-center gap-4 py-2">
        <div className="flex size-12 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="size-6 text-red-500" />
        </div>
        <p className="text-sm text-slate-600">{message}</p>
        <div className="flex gap-3 mt-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => { onConfirm(); onClose(); }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
