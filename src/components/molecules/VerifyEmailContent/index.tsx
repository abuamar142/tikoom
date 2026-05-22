import { Card } from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function VerifyEmailContent() {
  return (
    <Card className="p-6 sm:p-8 shadow-xl shadow-surface-900/5">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary-600" />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-surface-900">
            Verify your email address
          </h3>
          <p className="text-sm text-surface-500 leading-relaxed">
            Click the link in the email we sent you to activate your account. If
            you don&apos;t see it, check your spam folder.
          </p>
        </div>

        <div className="w-full pt-4 border-t border-surface-100">
          <p className="text-sm text-surface-500 mb-4">Already verified?</p>
          <Link href="/login">
            <Button
              variant="outline"
              className="w-full"
              leftIcon={<ArrowLeft size={16} />}
            >
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
