import { memo } from 'react';
import { getWeatherInfo } from '../../utils/weatherIcons';

const WeatherIcon = memo(function WeatherIcon({ code, size = 'md' }) {
  const { emoji, label } = getWeatherInfo(code);

  const sizeClass = {
    sm:  'text-xl',
    md:  'text-4xl',
    lg:  'text-7xl',
    xl:  'text-8xl',
  }[size] ?? 'text-4xl';

  return (
    <span
      className={`${sizeClass} leading-none select-none`}
      role="img"
      aria-label={label}
      title={label}
    >
      {emoji}
    </span>
  );
});

export default WeatherIcon;
