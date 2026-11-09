import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendText?: string;
  statusBadge?: {
    label: string;
    variant: 'good' | 'warning' | 'danger' | 'neutral';
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subValue,
  icon: Icon,
  trend,
  trendText,
  statusBadge
}) => {
  return (
    <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:border-stone-700 transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs sm:text-sm font-medium text-stone-400">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-amber-400 shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="mt-1">
        <div className="text-xl sm:text-2xl font-bold font-mono tabular-nums text-stone-100 tracking-tight">
          {value}
        </div>
        {subValue && (
          <div className="text-xs text-stone-400 mt-0.5 font-mono tabular-nums">
            {subValue}
          </div>
        )}
      </div>

      {(trendText || statusBadge) && (
        <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-xs">
          {trendText && (
            <span
              className={`font-mono tabular-nums ${
                trend === 'up'
                  ? 'text-emerald-400'
                  : trend === 'down'
                  ? 'text-rose-400'
                  : 'text-stone-400'
              }`}
            >
              {trendText}
            </span>
          )}

          {statusBadge && (
            <span
              className={`text-[11px] font-medium ${
                statusBadge.variant === 'good'
                  ? 'text-emerald-400'
                  : statusBadge.variant === 'warning'
                  ? 'text-amber-400'
                  : statusBadge.variant === 'danger'
                  ? 'text-rose-400'
                  : 'text-stone-400'
              }`}
            >
              {statusBadge.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
