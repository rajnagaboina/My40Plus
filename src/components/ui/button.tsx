import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

const styles = {
  primary: "bg-gold text-ink shadow-[0_10px_35px_rgba(201,126,22,.28)] hover:bg-[#dd9530]",
  secondary: "border border-royal/25 bg-white/70 text-ink hover:bg-royal/10"
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: keyof typeof styles;
};

export function Button({ children, className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

export function ButtonLink({ children, href, variant = "primary", className = "" }: { children: ReactNode; href: string; variant?: keyof typeof styles; className?: string }) {
  return <Link href={href} className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}>{children}</Link>;
}
