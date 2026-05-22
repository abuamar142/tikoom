"use client";

import { Card } from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { Mail, ArrowLeft, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary-500/15 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full p-12 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Tikoom</span>
          </div>

          <div className="space-y-8 max-w-md">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span className="text-sm font-medium text-primary-100">Secure Authentication</span>
              </div>
              <h2 className="text-4xl font-bold leading-tight">
                Almost there
              </h2>
              <p className="text-lg text-surface-300">
                Just one more step to complete your registration and secure your account.
              </p>
            </div>
          </div>

          <p className="text-sm text-surface-400">© 2024 Tikoom. All rights reserved.</p>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900">Tikoom</span>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-bold text-surface-900">
              Check your email
            </h1>
            <p className="text-surface-500">
              We sent a verification link to your email address
            </p>
          </div>

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
                  Click the link in the email we sent you to activate your account. If you don&apos;t see it, check your spam folder.
                </p>
              </div>

              <div className="w-full pt-4 border-t border-surface-100">
                <p className="text-sm text-surface-500 mb-4">
                  Already verified?
                </p>
                <Link href="/login">
                  <Button variant="outline" className="w-full" leftIcon={<ArrowLeft size={16} />}>
                    Back to Login
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
