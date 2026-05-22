import { Card } from "@/components/atoms/Card/Card";
import { User, Mail, Calendar } from "lucide-react";

interface ProfileCardProps {
  email: string | undefined;
  createdAt: string;
}

export function ProfileCard({ email, createdAt }: ProfileCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
          <User className="w-7 h-7 text-primary-600" />
        </div>
        <div>
          <h3 className="font-semibold text-surface-900">Account</h3>
          <p className="text-sm text-surface-500">Your profile info</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
          <Mail className="w-5 h-5 text-surface-400 shrink-0" />
          <div>
            <p className="text-xs font-medium text-surface-400">Email</p>
            <p className="text-sm font-medium text-surface-900">{email || "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50">
          <Calendar className="w-5 h-5 text-surface-400 shrink-0" />
          <div>
            <p className="text-xs font-medium text-surface-400">Joined</p>
            <p className="text-sm font-medium text-surface-900">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
