import { memo, useMemo } from 'react';
import { useUnits } from '../../context/UnitsContext';
import { toTemp, tempSymbol, fmtTemp } from '../../utils/converters';
import WeatherIcon from '../UI/WeatherIcon';
import { getWeatherInfo } from '../../utils/weatherIcons';

const CurrentWeather = memo(function CurrentWeather({ current, meta }) {
  const { units } = useUnits();

  
  const temp = useMemo(
    () => fmtTemp(toTemp(current.temperature_2m, units.temperature)),
    [current.temperature_2m, units.temperature]
  );

  const symbol = useMemo(() => tempSymbol(units.temperature), [units.temperature]);

  const formattedDate = useMemo(
    () =>
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    []
  );

  const { label } = getWeatherInfo(current.weather_code);

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up"
      style={{
        background: 'linear-gradient(135deg, hsl(243,35%,22%) 0%, hsl(258,40%,26%) 60%, hsl(270,35%,20%) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
     
      <div
        className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(248,80%,65%), transparent 70%)' }}
      />

      {/* City info */}
      <div className="z-10">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
          {meta.name}
          {meta.admin1 ? <span className="text-muted font-sans font-normal text-lg">, {meta.admin1}</span> : null}
        </h2>
        <p className="text-muted text-sm mt-1 font-medium">{meta.country}</p>
        <p className="text-white/40 text-xs mt-2 tracking-wide">{formattedDate}</p>
        <p className="text-accent-400 text-sm mt-2 font-medium">{label}</p>
      </div>

      {/* Temperature */}
      <div className="flex items-center gap-4 z-10">
        <WeatherIcon code={current.weather_code} size="lg" />
        <div className="text-right">
          <p className="font-display font-extrabold text-6xl text-white leading-none">
            {temp}
            <span className="text-accent-400 text-4xl">{symbol}</span>
          </p>
        </div>
      </div>
    </div>
  );
});

export default CurrentWeather;
