import { ReactNode } from "react";
import { AuthBranding } from "@/components/molecules/AuthBranding";
import { AuthFormContainer } from "@/components/molecules/AuthFormContainer";

interface AuthLayoutBrandingProps {
  tagline?: string;
  headline: string;
  description: string;
  showStats?: boolean;
}

interface AuthLayoutFormProps {
  title: string;
  subtitle: string;
}

interface AuthLayoutProps {
  branding: AuthLayoutBrandingProps;
  form: AuthLayoutFormProps;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthLayout({
  branding,
  form,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-50 flex">
      <AuthBranding
        tagline={branding.tagline}
        headline={branding.headline}
        description={branding.description}
        showStats={branding.showStats}
      />
      <AuthFormContainer
        title={form.title}
        subtitle={form.subtitle}
        footer={footer}
      >
        {children}
      </AuthFormContainer>
    </div>
  );
}
