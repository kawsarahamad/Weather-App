// app/components/ForecastHourly.tsx
import Image from "next/image";
import { ForecastResponse } from "@/lib/types";
import { formatHour, pickIconUrl } from "@/lib/format";

export default function ForecastHourly({ data }: { data: ForecastResponse }) {
  const next8 = data.list.slice(0, 8);
  const dayLabel =
    next8.length > 0
      ? new Date(next8[0].dt * 1000).toLocaleDateString(undefined, {
          weekday: "long",
        })
      : "";

  return (
    <section className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h3 className="text-white/85 font-medium">Hourly forecast</h3>
        {dayLabel && (
          <span className="px-3 py-1 rounded-md bg-white/10 text-xs">
            {dayLabel}
          </span>
        )}
      </div>

      {/* Rows */}
      <ul className="divide-y divide-white/10">
        {next8.map((h) => (
          <li
            key={h.dt}
            className="grid grid-cols-[24px_1fr_auto] items-center gap-3 px-4 py-2.5"
          >
            {/* icon */}
            <Image
              unoptimized
              src={pickIconUrl(h.weather[0].icon)}
              alt=""
              width={20}
              height={20}
              className="opacity-90"
            />

            {/* time */}
            <div className="text-xs md:text-sm text-white/75">
              {formatHour(h.dt)}
            </div>

            {/* temp */}
            <div className="justify-self-end text-sm md:text-base font-medium">
              {Math.round(h.main.temp)}°
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
