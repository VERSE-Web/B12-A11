import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const sizeStyle = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs font-medium';

  const variantStyles = {
    primary: 'bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200 border border-violet-200 dark:border-violet-700/50',
    secondary: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-700/50',
    accent: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border border-amber-200 dark:border-amber-700/50',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-700/50',
    warning: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200 border border-orange-200 dark:border-orange-700/50',
    info: 'bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-200 border border-sky-200 dark:border-sky-700/50',
    neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full whitespace-nowrap ${sizeStyle} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, className = '' }) => {
  const getStatusConfig = (st) => {
    switch (st) {
      case 'Assigned':
        return { label: 'Assigned', variant: 'info', dotColor: 'bg-sky-500' };
      case 'Planning Phase':
        return { label: 'Planning', variant: 'primary', dotColor: 'bg-violet-500' };
      case 'Materials Prepared':
        return { label: 'Materials Ready', variant: 'secondary', dotColor: 'bg-cyan-500' };
      case 'On the Way':
        return { label: 'En Route', variant: 'warning', dotColor: 'bg-amber-500' };
      case 'Setup in Progress':
        return { label: 'Setup in Progress', variant: 'accent', dotColor: 'bg-orange-500 animate-pulse' };
      case 'Completed':
        return { label: 'Completed', variant: 'success', dotColor: 'bg-emerald-500' };
      default:
        return { label: st, variant: 'neutral', dotColor: 'bg-slate-400' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge variant={config.variant} className={className}>
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      <span>{config.label}</span>
    </Badge>
  );
};
