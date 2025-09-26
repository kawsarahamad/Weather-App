'use client'
import { useMemo, useState } from 'react'
import SearchBar from './components/SearchBar'
import UnitToggle from './components/UnitToggle'
import WeatherCard from './components/WeatherCard'
import WeatherStats from './components/WeatherStats'
import ForecastHourly from './components/ForecastHourly'
import ForecastDaily from './components/ForecastDaily'
import Loader from './components/Loader'
import { getCurrent, getForecast, compressToDaily } from '@/lib/openweather'
import type { CurrentWeather, ForecastResponse, Units } from '@/lib/types'

export default function Page() {
  const [units, setUnits] = useState<Units>('metric')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [current, setCurrent] = useState<CurrentWeather | null>(null)
  const [forecast, setForecast] = useState<ForecastResponse | null>(null)

  const daily = useMemo(() => (forecast ? compressToDaily(forecast) : []), [forecast])
  const precipProb = forecast?.list?.[0]?.pop ?? 0

  async function runSearch(q: string) {
    try {
      setLoading(true)
      setError(null)
      const [c, f] = await Promise.all([getCurrent(q, units), getForecast(q, units)])
      setCurrent(c)
      setForecast(f)
    } catch (e: any) {
      setError(e.message || 'Something went wrong')
      setCurrent(null)
      setForecast(null)
    } finally {
      setLoading(false)
    }
  }

  return (<main className="container-max py-10 md:py-16">
    <header className="flex items-center justify-between mb-10 md:mb-12">
      <div className="flex items-center gap-2">
        <span className="text-2xl">☀️</span>
        <span className="font-semibold">Weather Today</span>
      </div>
      <UnitToggle value={units} onChange={setUnits} />
    </header>

    <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight mb-6">
        How's the sky looking today?
    </h1>
    <SearchBar onSearch={runSearch} isLoading={loading} />

    {!current && !loading && !error && (
      <div className="mt-16 text-center text-white/70">
        <div className="text-6xl mb-4">🔎</div>
        <p className="text-sm md:text-base">Search for a city to see weather information</p>
      </div>
    )}

   
    {loading && <Loader />}

    {error && (<div className="card p-4 mt-6 text-red-200 border border-red-400/30">
      <div className="font-medium">{error}</div>
      <div className="text-xs opacity-80">Try another city name.</div>
    </div>)}

    {current && (<div className="mt-8 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6">
      <div className="flex flex-col gap-4">
        <WeatherCard data={current} units={units} />
        <WeatherStats data={current} precip={precipProb} />
        {forecast && <ForecastDaily items={daily} />}
      </div>
      {forecast && <ForecastHourly data={forecast} />}
    </div>)}

  </main>)
}
