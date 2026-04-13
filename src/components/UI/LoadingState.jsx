import { memo } from 'react';

export const SkeletonBlock = memo(function SkeletonBlock({ className = '' }) {
  return (
    <div
      className={`animate-pulse-soft bg-night-800 rounded-xl ${className}`}
    />
  );
});

export function WeatherSkeleton() {
  return (
    <div className="animate-fade-in w-full">
      {/* Current weather skeleton */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <SkeletonBlock className="h-48 w-full mb-4" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-20" />
            ))}
          </div>
          <div className="flex gap-3 overflow-hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-24 w-16 flex-shrink-0" />
            ))}
          </div>
        </div>
        <SkeletonBlock className="w-full lg:w-72 h-[420px]" />
      </div>
    </div>
  );
}
