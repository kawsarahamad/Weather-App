export type CurrentWeather = {
  name: string
  sys: { country: string }
  weather: { main: string; description: string; icon: string }[]
  main: { temp: number; feels_like: number; humidity: number; pressure: number }
  wind: { speed: number }
  dt: number
}
export type ForecastResponse = {
  list: Array<{
    dt: number
    main: { temp: number; temp_min: number; temp_max: number }
    weather: { icon: string; main: string }[]
    pop: number
  }>
}
export type Units = 'metric' | 'imperial'
