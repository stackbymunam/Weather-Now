
export const toTemp = (celsius, unit) =>
  unit === 'imperial' ? (celsius * 9) / 5 + 32 : celsius;


export const toWind = (kmh, unit) =>
  unit === 'mph' ? kmh / 1.609 : kmh;


export const toPrecip = (mm, unit) =>
  unit === 'in' ? mm / 25.4 : mm;

export const tempSymbol = (unit) => (unit === 'imperial' ? '°F' : '°C');
export const windSymbol = (unit) => (unit === 'mph' ? 'mph' : 'km/h');
export const precipSymbol = (unit) => (unit === 'in' ? 'in' : 'mm');

export const fmtTemp = (val) => Math.round(val);
export const fmtWind = (val) => val.toFixed(1);
export const fmtPrecip = (val) => val.toFixed(1);
