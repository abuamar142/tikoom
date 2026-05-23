"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="p-6 flex items-center justify-center min-h-[60vh]">
      <Card className="p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-surface-900 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-surface-500 mb-4">
          Gagal memuat halaman admin. Silakan coba lagi.
        </p>
        <Button onClick={reset} className="w-full" leftIcon={<RefreshCw size={18} />}>
          Coba Lagi
        </Button>
      </Card>
    </div>
  );
}
