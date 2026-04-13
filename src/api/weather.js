const GEO_BASE = 'https://geocoding-api.open-meteo.com/v1';
const WEATHER_BASE = 'https://api.open-meteo.com/v1';

/**
 * Fetch geo coordinates + name from a city string.
 * Returns the top result or throws if none found.
 */
export async function geocodeCity(city) {
  const res = await fetch(`${GEO_BASE}/search?name=${encodeURIComponent(city)}&count=5`);
  if (!res.ok) throw new Error('Geocoding request failed');
  const data = await res.json();
  if (!data.results?.length) throw new Error('CITY_NOT_FOUND');
  return data.results; // return all for autocomplete
}

/**
 * Fetch full weather data for a lat/lon.
 * Always fetches in metric / kmh / mm — unit conversion is done client-side.
 */
export async function fetchWeatherData({ latitude, longitude }) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    daily: 'temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,weather_code,precipitation_sum',
    hourly: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    temperature_unit: 'celsius',
    windspeed_unit: 'kmh',
    precipitation_unit: 'mm',
    timezone: 'auto',
    forecast_days: '7',
  });

  const res = await fetch(`${WEATHER_BASE}/forecast?${params}`);
  if (!res.ok) throw new Error('Weather request failed');
  return res.json();
}
