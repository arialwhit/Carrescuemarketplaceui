import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
