import { memo, useMemo, useState, useRef, useCallback, useEffect } from 'react';
import { useUnits } from '../../context/UnitsContext';
import { toTemp, tempSymbol, fmtTemp } from '../../utils/converters';
import WeatherIcon from '../UI/WeatherIcon';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const HourCard = memo(function HourCard({ time, code, temp, symbol, index }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 hover:bg-night-700 transition-colors rounded-xl
        cursor-default animate-fade-in stagger-${Math.min(index + 1, 8)}`}
    >
      <span className="text-muted text-xs font-mono w-10 flex-shrink-0">{time}</span>
      <WeatherIcon code={code} size="sm" />
      <span className="text-white font-bold text-sm ml-auto">{temp}{symbol}</span>
    </div>
  );
});

// Day selector dropdown — state colocated here
const DaySelector = memo(function DaySelector({ selectedDay, onSelect, daily }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Derive day names from actual forecast dates
  const dayNames = useMemo(() =>
    daily?.time?.map((d) =>
      new Date(d).toLocaleDateString('en-US', { weekday: 'long' })
    ) ?? DAYS,
    [daily]
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-1.5 bg-night-700 hover:bg-night-600 text-white text-xs
          font-semibold rounded-lg transition-colors border border-white/5"
      >
        {dayNames[selectedDay] ?? 'Today'}
        <svg
          className={`w-3 h-3 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-night-800 border border-white/8
          rounded-xl shadow-2xl py-1.5 z-50 animate-fade-in">
          {dayNames.map((name, i) => (
            <button
              key={name}
              onClick={() => { onSelect(i); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-night-700
                ${selectedDay === i ? 'text-accent-400 font-semibold' : 'text-white/80'}`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

const HourlyForecast = memo(function HourlyForecast({ hourly, daily }) {
  // Selected day index — colocated here since only this component needs it
  const [selectedDay, setSelectedDay] = useState(0);
  const { units } = useUnits();

  const hourCards = useMemo(() => {
    const sym = tempSymbol(units.temperature);
    const start = selectedDay * 24;
    const end = start + 24;

    return hourly.time
      .slice(start, end)
      .map((t, i) => ({
        time: new Date(t).getHours().toString().padStart(2, '0') + ':00',
        code: hourly.weather_code[start + i],
        temp: fmtTemp(toTemp(hourly.temperature_2m[start + i], units.temperature)),
        symbol: sym,
      }));
  }, [hourly, selectedDay, units.temperature]);

  return (
    <div
      className="flex flex-col bg-night-800 border border-white/5 rounded-2xl overflow-hidden"
      style={{ minHeight: '420px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/5">
        <p className="text-xs font-bold text-muted uppercase tracking-widest">Hourly Forecast</p>
        <DaySelector selectedDay={selectedDay} onSelect={setSelectedDay} daily={daily} />
      </div>

      {/* Hour list — scrollable */}
      <div className="flex-1 overflow-y-auto px-1 py-2">
        {hourCards.map((card, i) => (
          <HourCard key={card.time} {...card} index={i} />
        ))}
      </div>
    </div>
  );
});

export default HourlyForecast;
