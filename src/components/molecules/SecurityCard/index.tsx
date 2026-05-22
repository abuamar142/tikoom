import { Card } from "@/components/atoms/Card/Card";
import { Shield } from "lucide-react";

interface SecurityCardProps {
  userId: string;
}

export function SecurityCard({ userId }: SecurityCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <Shield className="w-7 h-7 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-surface-900">Security</h3>
          <p className="text-sm text-surface-500">Account status</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
          <span className="text-sm font-medium text-surface-700">Status</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Active
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
          <span className="text-sm font-medium text-surface-700">Auth Provider</span>
          <span className="text-sm font-medium text-surface-900">Email / Password</span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-50">
          <span className="text-sm font-medium text-surface-700">User ID</span>
          <span className="text-xs font-mono text-surface-500 truncate max-w-[120px]">
            {userId}
          </span>
        </div>
      </div>
    </Card>
  );
}
