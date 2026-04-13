# 🌤️ WeatherNow

A real-time weather app built with **React**, **TanStack Query**, and **Tailwind CSS** — migrated and architected from scratch by **Abdul Munam**.

> Search any city and get current conditions, a 7-day forecast, and hourly breakdowns — with fully switchable units.

---

## ✨ Features

- 🔍 City search powered by the [Open-Meteo Geocoding API](https://open-meteo.com/)
- 🌡️ Current temperature, feels like, humidity, wind, and precipitation
- 📅 7-day daily forecast
- ⏱️ 24-hour hourly breakdown with per-day selector
- ⚙️ Switch between °C / °F, km/h / mph, and mm / in on the fly
- 💀 Skeleton loading states and graceful error handling
- 📱 Fully responsive — mobile and desktop

---

## 🛠️ Tech Stack

| Purpose | Library |
|---|---|
| UI Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Server State | TanStack Query v5 |
| Weather Data | Open-Meteo (free, no API key) |

---

## 📁 Project Structure

```
src/
├── api/              # Raw fetch functions (geocoding + weather)
├── context/          # UnitsContext — global °C/°F, km/h/mph, mm/in state
├── hooks/            # useWeather — TanStack Query data fetching hook
├── utils/            # Pure conversion functions + WMO weather code map
└── components/
    ├── Navbar/       # Header + units dropdown
    ├── Search/       # Search input (city state colocated here)
    ├── Weather/      # CurrentWeather, WeatherStats, DailyForecast, HourlyForecast
    └── UI/           # WeatherIcon, LoadingState, ErrorState
```

---

## ⚙️ Architecture Notes

- **State colocation** — each piece of state lives as close to where it's used as possible
- **Derived state** — all unit conversions use `useMemo`; no duplicate state ever stored
- **Zero wasted renders** — every component wrapped in `React.memo`; handlers stabilized with `useCallback`
- **Smart caching** — TanStack Query caches results for 5 minutes; switching units never triggers a refetch

---

## 🚀 Getting Started

---

## 👤 Author

**Abdul Munam** — designed the architecture, component structure, and full React migration of this project.

---

## 📄 License

MIT
