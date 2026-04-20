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
      className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10"
    >
      <div className="mb-5 space-y-2">
        <h2 className="font-raleway text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="max-w-3xl text-muted-foreground">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
