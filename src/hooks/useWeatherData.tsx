import { useEffect, useState } from "react";
import axios from "axios";
import type { WeatherType } from "../types/weatherType";

export function useWeatherData() {
    const [data, setData] = useState<WeatherType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/weather/data`);
                setData(response.data as WeatherType);
            } catch (error) {
                console.error("Weather fetching failed:", error);
            }
            setLoading(false);
        };
        fetchWeather();
    }, []);

    return { data, loading };
}
