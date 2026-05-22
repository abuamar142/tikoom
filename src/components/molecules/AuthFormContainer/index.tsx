import { ReactNode } from "react";
import { Shield } from "lucide-react";

interface AuthFormContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthFormContainer({
  title,
  subtitle,
  children,
  footer,
}: AuthFormContainerProps) {
  return (
    <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-surface-900">Tikoom</span>
        </div>

        <div className="space-y-2 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-surface-900">{title}</h1>
          <p className="text-surface-500">{subtitle}</p>
        </div>

        {children}

        {footer && (
          <p className="text-center text-sm text-surface-500">{footer}</p>
        )}
      </div>
    </div>
  );
}
