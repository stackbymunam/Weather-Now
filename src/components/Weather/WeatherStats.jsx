import { memo, useMemo } from 'react';
import { useUnits } from '../../context/UnitsContext';
import {
  toTemp, toWind, toPrecip,
  tempSymbol, windSymbol, precipSymbol,
  fmtTemp, fmtWind, fmtPrecip,
} from '../../utils/converters';

const StatCard = memo(function StatCard({ icon, label, value, className = '' }) {
  return (
    <div
      className={`flex flex-col gap-1.5 bg-night-800 hover:bg-night-700 transition-colors rounded-xl p-4 border border-white/5 ${className}`}
    >
      <div className="flex items-center gap-1.5 text-muted">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-white font-bold text-lg leading-none">{value}</p>
    </div>
  );
});

const WeatherStats = memo(function WeatherStats({ current }) {
  const { units } = useUnits();

  
  const stats = useMemo(() => {
    const tSym = tempSymbol(units.temperature);
    const wSym = windSymbol(units.wind);
    const pSym = precipSymbol(units.precipitation);

    return [
      {
        icon: '🌡️',
        label: 'Feels Like',
        value: `${fmtTemp(toTemp(current.apparent_temperature, units.temperature))}${tSym}`,
      },
      {
        icon: '💧',
        label: 'Humidity',
        value: `${current.relative_humidity_2m}%`,
      },
      {
        icon: '💨',
        label: 'Wind',
        value: `${fmtWind(toWind(current.wind_speed_10m, units.wind))} ${wSym}`,
      },
      {
        icon: '🌧️',
        label: 'Precipitation',
        value: `${fmtPrecip(toPrecip(current.precipitation, units.precipitation))} ${pSym}`,
      },
    ];
  }, [current, units]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <StatCard
          key={stat.label}
          {...stat}
          className={`animate-fade-in stagger-${i + 1}`}
        />
      ))}
    </div>
  );
});

export default WeatherStats;
