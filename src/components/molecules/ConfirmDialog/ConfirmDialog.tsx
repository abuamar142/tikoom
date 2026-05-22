"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Modal } from "@/components/atoms/Modal/Modal";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Hapus",
  cancelLabel = "Batal",
  isLoading = false,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center py-2">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-danger-50 mb-4">
          <AlertTriangle className="h-7 w-7 text-danger-600" />
        </div>
        <h3 className="text-lg font-semibold text-surface-900">{title}</h3>
        <p className="mt-2 text-sm text-surface-500 max-w-sm">{description}</p>

        <div className="flex items-center gap-3 mt-6 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
