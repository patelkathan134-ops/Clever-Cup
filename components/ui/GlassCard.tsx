import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  // Styles:
  // - bg-black/5: Very subtle dark tint (since text is dark) or white/10 if text was light. 
  //   Given the text is dark brown (#2d2420), a light/white glass might be better for contrast, 
  //   OR a very subtle dark glass if the background is very light.
  //   Let's go with a classic "frosted glass" look: slightly white, blurred.
  // - backdrop-blur-md: The key "glass" effect.
  // - border-white/20: Subtle highlight border.
  // - rounded-2xl: Soft corners.
  // - shadow-lg: Depth.
  return (
    <div 
      className={`
        backdrop-blur-md 
        bg-white/30 
        border border-white/20 
        shadow-xl 
        rounded-2xl 
        p-8 
        md:p-12 
        transition-all 
        duration-500
        hover:bg-white/40
        ${className}
      `}
    >
      {children}
    </div>
  );
}
