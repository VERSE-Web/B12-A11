import React from 'react';

export const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
  return (
    <div
      className={`bg-white dark:bg-[#1E293B] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm ${
        hoverEffect
          ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-violet-200 dark:hover:border-violet-900/50'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
