import { memo, useState, useRef, useEffect, useCallback } from 'react';
import { useUnits } from '../../context/UnitsContext';

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UnitOption = memo(function UnitOption({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left
        ${active
          ? 'bg-accent-600/20 text-accent-400'
          : 'text-muted hover:bg-night-700 hover:text-white'
        }`}
    >
      {label}
      {active && <CheckIcon />}
    </button>
  );
});

const UnitsDropdown = memo(function UnitsDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { units, setTemperature, setWind, setPrecipitation } = useUnits();

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggle = useCallback(() => setOpen((v) => !v), []);

  const handleTemp = useCallback((val) => { setTemperature(val); setOpen(false); }, [setTemperature]);
  const handleWind = useCallback((val) => { setWind(val); setOpen(false); }, [setWind]);
  const handlePrecip = useCallback((val) => { setPrecipitation(val); setOpen(false); }, [setPrecipitation]);

  // Derived: label for the toggle button
  const unitLabel = units.temperature === 'imperial' ? '°F · mph' : '°C · km/h';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-2 bg-night-800 hover:bg-night-700 text-white text-sm rounded-lg transition-colors border border-white/5"
        aria-expanded={open}
      >
        <span className="text-xs">⚙</span>
        <span className="font-medium hidden sm:inline">Units</span>
        <span className="text-muted text-xs">{unitLabel}</span>
        <svg
          className={`w-3 h-3 text-muted transition-transform ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-night-800 border border-white/8 rounded-xl shadow-2xl p-3 z-50 animate-fade-in">
          <p className="text-xs text-muted uppercase tracking-widest px-1 mb-2 font-semibold">Temperature</p>
          <UnitOption label="Celsius (°C)" active={units.temperature === 'metric'} onClick={() => handleTemp('metric')} />
          <UnitOption label="Fahrenheit (°F)" active={units.temperature === 'imperial'} onClick={() => handleTemp('imperial')} />

          <div className="my-2 h-px bg-white/5" />

          <p className="text-xs text-muted uppercase tracking-widest px-1 mb-2 font-semibold">Wind Speed</p>
          <UnitOption label="km/h" active={units.wind === 'kmh'} onClick={() => handleWind('kmh')} />
          <UnitOption label="mph" active={units.wind === 'mph'} onClick={() => handleWind('mph')} />

          <div className="my-2 h-px bg-white/5" />

          <p className="text-xs text-muted uppercase tracking-widest px-1 mb-2 font-semibold">Precipitation</p>
          <UnitOption label="Millimeters (mm)" active={units.precipitation === 'mm'} onClick={() => handlePrecip('mm')} />
          <UnitOption label="Inches (in)" active={units.precipitation === 'in'} onClick={() => handlePrecip('in')} />
        </div>
      )}
    </div>
  );
});

export default UnitsDropdown;
