import React from 'react';
import { Check, Clock, Truck, Hammer, Sparkles, UserCheck } from 'lucide-react';

const STEPS = [
  { status: 'Assigned', label: 'Assigned', icon: UserCheck, desc: 'Decorator assigned to project' },
  { status: 'Planning Phase', label: 'Planning', icon: Clock, desc: '3D layout & floral order' },
  { status: 'Materials Prepared', label: 'Materials Ready', icon: Sparkles, desc: 'Equipment & drapes packed' },
  { status: 'On the Way', label: 'En Route', icon: Truck, desc: 'Team travelling to venue' },
  { status: 'Setup in Progress', label: 'Setup Active', icon: Hammer, desc: 'Rigging & stage erection' },
  { status: 'Completed', label: 'Completed', icon: Check, desc: 'Final review & handover' }
];

export const Timeline = ({ currentStatus, statusHistory = [] }) => {
  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className="w-full py-4">
      {/* Desktop Horizontal View */}
      <div className="hidden md:block">
        <div className="relative flex items-center justify-between">
          {/* Progress Bar Background */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 dark:bg-slate-800 -z-0" />
          
          {/* Active Progress Line */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-amber-500 transition-all duration-500 -z-0"
            style={{
              width: `${(Math.max(0, currentIndex) / (STEPS.length - 1)) * 100}%`
            }}
          />

          {STEPS.map((step, idx) => {
            const isCompleted = idx <= currentIndex;
            const isCurrent = idx === currentIndex;
            const Icon = step.icon;

            const logEntry = statusHistory.find((h) => h.status === step.status);

            return (
              <div key={step.status} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30 ring-4 ring-white dark:ring-slate-900'
                      : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                  } ${isCurrent ? 'scale-110 ring-violet-300 dark:ring-violet-900 animate-bounce' : ''}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="mt-3 text-center">
                  <p className={`text-xs font-semibold ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                    {step.label}
                  </p>
                  {logEntry && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                      {new Date(logEntry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical View */}
      <div className="block md:hidden space-y-6 relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 ml-3">
        {STEPS.map((step, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = step.icon;
          const logEntry = statusHistory.find((h) => h.status === step.status);

          return (
            <div key={step.status} className="relative flex items-start gap-4">
              <div
                className={`absolute -left-[31px] top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 text-slate-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div>
                <p className={`text-sm font-semibold ${isCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                  {step.label} {isCurrent && <span className="text-xs text-violet-500 font-normal ml-1">(Current)</span>}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                {logEntry && (
                  <p className="text-xs text-violet-600 dark:text-violet-400 mt-1 italic font-mono">
                    "{logEntry.note || 'Logged'}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
