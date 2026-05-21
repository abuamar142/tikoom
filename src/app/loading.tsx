import { Spinner } from "@/components/atoms/Spinner/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" className="text-primary-600" />
        <p className="text-sm font-medium text-surface-500 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
