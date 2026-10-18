import React from 'react';

export interface LogoProps {
  className?: string;
  variant?: 'auto' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  onClick?: () => void;
}

export default function Logo({
  className = '',
  variant = 'auto',
  size = 'md',
  onClick,
}: LogoProps) {
  // Proportions matching Next.js specifications with responsive scaling
  const sizeClasses = {
    sm: 'h-10 w-44 sm:h-11 sm:w-48',
    md: 'h-12 w-52 sm:h-14 sm:w-64',
    lg: 'h-16 w-64 sm:h-20 sm:w-80',
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center group transition-transform hover:scale-[1.02] select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      aria-label="Accueil Five Ventures Group"
    >
      <div className={`relative ${sizeClasses} flex items-center`}>
        {/* Logo pour fond clair (Mode Jour) */}
        {(variant === 'auto' || variant === 'dark') && (
          <img
            src="/images/logo-dark.png"
            alt="Five Ventures Group - Votre partenaire pour un avenir durable"
            className={`w-full h-full object-contain ${
              variant === 'auto' ? 'dark:hidden' : ''
            }`}
            loading="eager"
            decoding="async"
          />
        )}

        {/* Logo pour fond sombre (Navbar foncée / Footer / Hero) */}
        {(variant === 'auto' || variant === 'light') && (
          <img
            src="/images/logo-light.png"
            alt="Five Ventures Group - Votre partenaire pour un avenir durable"
            className={`w-full h-full object-contain ${
              variant === 'auto' ? 'hidden dark:block' : ''
            }`}
            loading="eager"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}

// Named export for backward compatibility
export { Logo as FiveVenturesLogo };
