export const formatDate = (ts: number, locale = 'en-US') => new Date(ts * 1000).toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
export const formatHour = (ts: number, locale = 'en-US') => new Date(ts * 1000).toLocaleTimeString(locale, { hour: 'numeric' })
export const pickIconUrl = (code: string) => `https://openweathermap.org/img/wn/${code}@2x.png`
export const titleCase = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase())
