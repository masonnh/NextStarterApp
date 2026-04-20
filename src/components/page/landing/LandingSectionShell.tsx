import { ReactNode } from 'react';

interface LandingSectionShellProps {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function LandingSectionShell({
  id,
  title,
  subtitle,
  children,
}: LandingSectionShellProps) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12"
    >
      <div className="mb-6 space-y-3">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-[var(--lp-purple)] via-[var(--lp-green)] to-[var(--lp-yellow)]" />
        <h2 className="font-raleway text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-3xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
