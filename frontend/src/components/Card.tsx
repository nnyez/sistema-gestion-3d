import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className = '', hover = false, glass = false }: CardProps) {
  return (
    <div className={`rounded-2xl border transition-all duration-200 ${
      glass
        ? 'glass shadow-lg'
        : 'bg-white shadow-sm border-gray-100'
    } ${hover ? 'card-lift' : ''} ${className}`}>
      {children}
    </div>
  );
}
