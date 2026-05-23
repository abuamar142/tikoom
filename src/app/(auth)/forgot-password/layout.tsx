import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi",
  description: "Reset kata sandi akun Tikoom Anda",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
