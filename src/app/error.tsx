"use client";

import { useEffect } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({
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
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="p-8 sm:p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-surface-900 mb-2">
          Terjadi Kesalahan
        </h1>
        <p className="text-surface-500 mb-6">
          Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
        </p>
        {error.digest && (
          <p className="text-xs text-surface-400 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        <Button
          onClick={reset}
          className="w-full"
          leftIcon={<RefreshCw size={18} />}
        >
          Coba Lagi
        </Button>
      </Card>
    </div>
  );
}
