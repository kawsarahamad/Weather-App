import { CurrentWeather, ForecastResponse, Units } from './types'

const BASE = 'https://api.openweathermap.org/data/2.5'
const KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY

export async function getCurrent(city: string, units: Units): Promise<CurrentWeather> {
  const res = await fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('City not found')
  return res.json()
}
export async function getForecast(city: string, units: Units): Promise<ForecastResponse> {
  const res = await fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&units=${units}&appid=${KEY}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch forecast')
  return res.json()
}
export function compressToDaily(resp: ForecastResponse) {
  const map: Record<string, { dt: number; min: number; max: number; icons: string[] }> = {}
  for (const item of resp.list) {
    const d = new Date(item.dt * 1000)
    const key = d.toISOString().slice(0, 10)
    const min = Math.round(item.main.temp_min)
    const max = Math.round(item.main.temp_max)
    if (!map[key]) map[key] = { dt: item.dt, min, max, icons: [item.weather[0].icon] }
    else {
      map[key].dt = Math.max(map[key].dt, item.dt)
      map[key].min = Math.min(map[key].min, min)
      map[key].max = Math.max(map[key].max, max)
      map[key].icons.push(item.weather[0].icon)
    }
  }
  return Object.values(map).sort((a,b)=>a.dt-b.dt).slice(0,6).map(d=>({ dt: d.dt, min: d.min, max: d.max, icon: Object.entries(d.icons.reduce((acc:Record<string,number>,ic)=> (acc[ic]=(acc[ic]||0)+1,acc),{})).sort((a,b)=>b[1]-a[1])[0][0] }))
}
