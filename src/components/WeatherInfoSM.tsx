import type { WeatherType } from '../types/weatherType'
import { Pm10IndexBar, Pm25IndexBar } from './PmIndexBar'
import UVBar from './UVBar'

export default function WeatherInfo({ data }: { data: WeatherType | null }) {
    if (!data)
        return (
            <div className="flex flex-col items-center py-10 gap-4 px-10 font-semibold h-lvh w-96 rounded-xl">
                <div className="text-5xl animate-bounce">🌧️</div>
                <div className="text-xl text-blue-600">앗! 날씨 정보를 못 불러왔어요...</div>
                <div className="text-lg text-blue-400">
                    <span>☁️ 구름이 서버를 가렸나봐요!</span>
                </div>
                <div className="text-base text-gray-500">
                    <span>새로고침으로 다시 시도해 주세요</span>
                </div>
            </div>
        )
    return (
        <>
            <div className="flex flex-col justify-between w-full">
                <div className="flex flex-row items-center justify-between">
                    <div>
                        <div className="text-6xl">{data.weather.main.temp}°</div>
                        <div className="text-xl">
                            {data.weather.main.temp_max}°/
                            {data.weather.main.temp_min}°
                        </div>
                        <div className="text-xl">체감온도 {data.weather.main.feels_like}°</div>
                    </div>
                    <img className="w-36" src={`./assets/weather/${data.weather.weather[0].icon}.png`} />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <div className="text-xl font-semibold">{data.message}</div>
                </div>
            </div>
            <div className="w-full">
                <Pm10IndexBar pmValue={parseInt(data.airPollution.pm10Value)} />
            </div>
            <Pm25IndexBar pmValue={parseInt(data.airPollution.pm25Value)} />
            <UVBar uvIndex={parseInt(data.weather.UV)} />
        </>
    )
}
