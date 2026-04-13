import { useQuery } from '@tanstack/react-query';
import { geocodeCity, fetchWeatherData } from '../api/weather';


export function useWeather(city) {
  return useQuery({
    queryKey: ['weather', city],
    queryFn: async () => {
      if (!city) return null;
      const geoResults = await geocodeCity(city);
      const { latitude, longitude, name, country, admin1 } = geoResults[0];
      const weather = await fetchWeatherData({ latitude, longitude });
      return {
        weather,
        meta: { name, country, admin1, latitude, longitude },
      };
    },
    enabled: Boolean(city),
    staleTime: 5 * 60 * 1000,       
    gcTime: 10 * 60 * 1000,          
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
