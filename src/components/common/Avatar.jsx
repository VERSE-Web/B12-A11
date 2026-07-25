import React from 'react';

export const Avatar = ({ src, alt = 'User avatar', size = 'md', className = '' }) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl'
  };

  return (
    <div
      className={`relative inline-block rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm flex-shrink-0 ${sizeStyles[size]} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40">
          {alt ? alt.substring(0, 2).toUpperCase() : 'SD'}
        </div>
      )}
    </div>
  );
};
