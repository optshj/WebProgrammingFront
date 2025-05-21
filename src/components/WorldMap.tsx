import { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

import type { ShelterType } from "../types/shelterType";
import type { WeatherType } from "../types/weatherType";

import Loading from "./Loading";
import Marker from "./MapMarker";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import ShelterInfo from "./ShelterInfo";

export default function WorldMap() {
    const defaultPosition = { lat: 37.37452095059928, lng: 126.6337694513664 }; // incheon Univ.
    const [loading, setLoading] = useState(true);
    const [locationData, setLocationData] = useState<ShelterType>(
        {} as ShelterType
    );
    const [weatherData, setWeatherData] = useState<WeatherType>(
        {} as WeatherType
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/shelter/data?perPage=1000`
                );
                if (response.data) {
                    setLocationData(response.data as ShelterType);
                }
            } catch (error) {
                console.error("Data fetching failed:", error);
            }
        };
        const fetchWeather = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/weather/data`
                );
                setWeatherData(response.data as WeatherType);
            } catch (error) {
                console.error("Weather fetching failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        fetchWeather();
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="flex flex-row">
            <WeatherInfo data={weatherData} />
            <ShelterInfo />
            <Map center={defaultPosition} level={3} className="w-full h-lvh">
                {locationData.data.map((item, idx) => (
                    <Marker item={item} key={idx} />
                ))}
            </Map>
        </div>
    );
}
