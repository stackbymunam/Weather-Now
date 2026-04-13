import { createContext, useContext, useState, useCallback } from 'react';

const UnitsContext = createContext(null);

const DEFAULT_UNITS = {
  temperature: 'metric',   // 'metric' | 'imperial'
  wind: 'kmh',             // 'kmh' | 'mph'
  precipitation: 'mm',     // 'mm' | 'in'
};

export function UnitsProvider({ children }) {
  const [units, setUnits] = useState(DEFAULT_UNITS);

  const setTemperature = useCallback((val) =>
    setUnits((prev) => ({ ...prev, temperature: val })), []);

  const setWind = useCallback((val) =>
    setUnits((prev) => ({ ...prev, wind: val })), []);

  const setPrecipitation = useCallback((val) =>
    setUnits((prev) => ({ ...prev, precipitation: val })), []);

  return (
    <UnitsContext.Provider value={{ units, setTemperature, setWind, setPrecipitation }}>
      {children}
    </UnitsContext.Provider>
  );
}

export function useUnits() {
  const ctx = useContext(UnitsContext);
  if (!ctx) throw new Error('useUnits must be used within UnitsProvider');
  return ctx;
}
