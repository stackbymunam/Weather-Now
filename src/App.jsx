import { useState, useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/Search/SearchBar';
import CurrentWeather from './components/Weather/CurrentWeather';
import WeatherStats from './components/Weather/WeatherStats';
import DailyForecast from './components/Weather/DailyForecast';
import HourlyForecast from './components/Weather/HourlyForecast';
import { WeatherSkeleton } from './components/UI/LoadingState';
import ErrorState from './components/UI/ErrorState';

function Hero() {
  return (
    <div className="text-center py-16 animate-fade-in">
      <p className="text-7xl mb-6">🌤️</p>
      <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white leading-tight mb-3">
        How&apos;s the sky<br />
        <span className="text-accent-400">looking today?</span>
      </h1>
      <p className="text-muted text-base max-w-sm mx-auto">
        Search any city to get real-time weather, hourly forecasts, and 7-day outlooks.
      </p>
    </div>
  );
}

export default function App() {
  const [city, setCity] = useState('');
  const { data, isPending, isError, error, refetch } = useWeather(city);
  const handleSearch = useCallback((term) => { setCity(term); }, []);
  const errorMessage = error?.message ?? 'Unknown error';

  return (
    <div className="min-h-screen bg-night-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isPending && Boolean(city)} />
        </div>

        {!city && <Hero />}
        {city && isPending && <WeatherSkeleton />}
        {city && isError && (
          <ErrorState message={errorMessage} onRetry={() => refetch()} />
        )}

        {data && (
          <div className="animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-5">
              <div className="flex-1 flex flex-col gap-5 min-w-0">
                <CurrentWeather current={data.weather.current} meta={data.meta} />
                <WeatherStats current={data.weather.current} />
                <DailyForecast daily={data.weather.daily} />
              </div>
              <div className="w-full lg:w-72 flex-shrink-0">
                <HourlyForecast
                  hourly={data.weather.hourly}
                  daily={data.weather.daily}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
