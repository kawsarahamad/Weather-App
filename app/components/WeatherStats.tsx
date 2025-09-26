import { CurrentWeather } from '@/lib/types'
export default function WeatherStats({ data, precip }: { data: CurrentWeather; precip?: number }) {
  const items = [
    { label: 'Feels Like', value: `${Math.round(data.main.feels_like)}°` },
    { label: 'Humidity', value: `${data.main.humidity}%` },
    { label: 'Wind', value: `${Math.round(data.wind.speed)} km/h` },
    { label: 'Precipitation', value: `${Math.round((precip || 0) * 100)}%` }
  ]
  return (<section className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
    {items.map(it => (<div key={it.label} className="card p-4">
      <div className="text-xs text-white/60">{it.label}</div>
      <div className="text-xl mt-1">{it.value}</div>
    </div>))}
  </section>)
}
