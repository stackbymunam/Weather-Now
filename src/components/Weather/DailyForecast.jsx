import { memo, useMemo } from 'react';
import { useUnits } from '../../context/UnitsContext';
import { toTemp, tempSymbol, fmtTemp } from '../../utils/converters';
import WeatherIcon from '../UI/WeatherIcon';

const ForecastCard = memo(function ForecastCard({ day, code, max, min, symbol, index }) {
  return (
    <div
      className={`flex-shrink-0 flex flex-col items-center gap-2 bg-night-800 hover:bg-night-700
        border border-white/5 rounded-xl px-3 py-4 transition-all duration-200 hover:-translate-y-1
        cursor-default animate-fade-in stagger-${Math.min(index + 1, 8)}`}
      style={{ minWidth: '64px' }}
    >
      <p className="text-xs font-bold text-muted uppercase tracking-wide">{day}</p>
      <WeatherIcon code={code} size="sm" />
      <div className="text-center">
        <p className="text-white font-bold text-sm leading-tight">{max}{symbol}</p>
        <p className="text-muted text-xs">{min}{symbol}</p>
      </div>
    </div>
  );
});

const DailyForecast = memo(function DailyForecast({ daily }) {
  const { units } = useUnits();

  const cards = useMemo(() => {
    const sym = tempSymbol(units.temperature);
    return daily.time.map((date, i) => ({
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      code: daily.weather_code[i],
      max: fmtTemp(toTemp(daily.temperature_2m_max[i], units.temperature)),
      min: fmtTemp(toTemp(daily.temperature_2m_min[i], units.temperature)),
      symbol: sym,
    }));
  }, [daily, units.temperature]);

  return (
    <div>
      <p className="text-xs font-bold text-muted uppercase tracking-widest mb-3">7-Day Forecast</p>
      <div className="flex gap-2.5 overflow-x-auto pb-1">
        {cards.map((card, i) => (
          <ForecastCard key={card.day + i} {...card} index={i} />
        ))}
      </div>
    </div>
  );
});

export default DailyForecast;
