import { Shield, Sparkles } from "lucide-react";

interface AuthBrandingProps {
  tagline?: string;
  headline: string;
  description: string;
  showStats?: boolean;
}

const AUTH_STATS = [
  { label: "Users", value: "10K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Security", value: "A+" },
];

export function AuthBranding({
  tagline = "Modern Authentication",
  headline,
  description,
  showStats = true,
}: AuthBrandingProps) {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-glow">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">Tikoom</span>
        </div>

        <div className="space-y-8 max-w-md">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-4 h-4 text-primary-300" />
              <span className="text-sm font-medium text-primary-100">
                {tagline}
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">{headline}</h2>
            <p className="text-lg text-surface-300">{description}</p>
          </div>

          {showStats && (
            <div className="grid grid-cols-3 gap-4">
              {AUTH_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-surface-400">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-sm text-surface-400">
          © 2024 Tikoom. All rights reserved.
        </p>
      </div>
    </div>
  );
}
