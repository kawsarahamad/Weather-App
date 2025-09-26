import Image from 'next/image'
import { pickIconUrl } from '@/lib/format'
export default function ForecastDaily({ items }: { items: { dt: number; min: number; max: number; icon: string }[] }) {
  return (<section>
    <h3 className="text-white/80 font-medium mb-3">Daily forecast</h3>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
      {items.map(d => (<div key={d.dt} className="card p-4 text-center">
        <div className="text-xs text-white/60">{new Date(d.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}</div>
        <Image unoptimized src={pickIconUrl(d.icon)} alt="" width={42} height={42} />
        <div className="text-sm mt-1"><span className="font-semibold">{d.max}°</span><span className="text-white/60"> / {d.min}°</span></div>
      </div>))}
    </div>
  </section>)
}
