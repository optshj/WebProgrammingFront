import type { WeatherType } from "../types/weatherType";

import { Pm10IndexBar, Pm25IndexBar } from "./PmIndexBar";
import UVBar from "./UVBar";

export default function WeatherInfo({ data }: { data: WeatherType }) {
    return (
        <div className="flex flex-col justify-center gap-4 px-10 font-semibold h-lvh w-96">
            <img className="w-36" src={`./assets/weather/${data.weather.weather[0].icon}.png`} />
            <div className="text-6xl">{data.weather.main.temp}°</div>
            <div className="text-xl">{data.message}</div>
            <div className="text-3xl">
                {data.weather.main.temp_max}°/
                {data.weather.main.temp_min}°
            </div>
            <div className="text-xl">체감온도 {data.weather.main.feels_like}°</div>
            <Pm10IndexBar pmValue={parseInt(data.airPollution.pm10Value)} />
            <Pm25IndexBar pmValue={parseInt(data.airPollution.pm25Value)} />
            <UVBar uvIndex={parseInt(data.weather.UV)} />
        </div>
    );
}
