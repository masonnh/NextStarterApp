"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "contained" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "contained",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none";

  const sizeMap: Record<string, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantMap: Record<string, string> = {
    contained: "bg-accent text-white shadow-sm hover:brightness-95",
    outline: "border border-neutral-700 text-text-primary bg-transparent hover:bg-neutral-800",
    ghost: "bg-transparent text-text-primary hover:bg-neutral-900",
    link: "bg-transparent text-accent underline",
  };

  return (
    <button
      className={clsx(base, sizeMap[size], variantMap[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
