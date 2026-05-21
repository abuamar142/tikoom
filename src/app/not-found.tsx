import Link from "next/link";
import { Button } from "@/components/atoms/Button/Button";
import { Card } from "@/components/atoms/Card/Card";
import { Home, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-4">
      <Card className="p-8 sm:p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-surface-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-surface-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-surface-500 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Link href="/login">
          <Button size="lg" className="w-full" leftIcon={<Home size={18} />}>
            Back to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
