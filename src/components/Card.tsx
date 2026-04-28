import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <article className={`sp-card ${className}`.trim()}>
      {children}
    </article>
  );
}

