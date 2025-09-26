// app/components/WeatherCard.tsx
import Image from "next/image";
import { CurrentWeather } from "@/lib/types";
import { formatDate, pickIconUrl } from "@/lib/format";

export default function WeatherCard({
  data,
  units,
}: {
  data: CurrentWeather;
  units: "metric" | "imperial";
}) {
  const icon = data.weather[0]?.icon;
  const city = `${data.name}, ${data.sys.country}`;
  const temp = Math.round(data.main.temp);

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl p-5 md:p-6
        text-white shadow-lg
        bg-gradient-to-br from-[#3b82f6] via-[#4f46e5] to-[#a855f7]
      "
    >
      {/* header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg md:text-xl font-semibold leading-tight">
            {city}
          </h2>
          <p className="text-xs md:text-sm text-white/80">
            {formatDate(data.dt)}
          </p>
        </div>

        {/* tiny pin (decorative, like the mock) */}
        <span
          aria-hidden
          className="select-none text-base md:text-lg opacity-90"
          title="Location"
        >
          📍
        </span>
      </div>

      {/* body */}
      <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-4 md:gap-6 min-h-[120px] md:min-h-[140px]">
        {/* left column: small weather glyph */}
        <div className="flex items-start gap-2">
          {icon && (
            <Image
              unoptimized
              src={pickIconUrl(icon)}
              alt=""
              width={28}
              height={28}
              className="drop-shadow"
              priority
            />
          )}
        </div>

        {/* right column: big temperature */}
        <div className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-none">
          {temp}°
        </div>
      </div>
    </section>
  );
}
