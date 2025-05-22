import { useState } from "react";
import { useShelterData } from "../hooks/useShelterData";
import { useWeatherData } from "../hooks/useWeatherData";

import type { ShelterItemType } from "../types/shelterType";

import Loading from "../components/Loading";
import WeatherInfo from "../components/WeatherInfo";
import ShelterInfo from "../components/ShelterInfo";
import ShelterMap from "../components/ShelterMap";

export default function Page() {
    const { data: locationData, loading: shelterLoading } = useShelterData();
    const { data: weatherData, loading: weatherLoading } = useWeatherData();

    const [selectedMarker, setSelectedMarker] = useState<ShelterItemType | null>(null);

    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem("shelterFavorites");
        return saved ? JSON.parse(saved) : [];
    });
    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            const next = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
            localStorage.setItem("shelterFavorites", JSON.stringify(next));
            return next;
        });
    };

    if (shelterLoading || weatherLoading) return <Loading />;

    return (
        <div className="flex flex-row">
            <div className="relative">
                <WeatherInfo data={weatherData} />
                {selectedMarker && (
                    <ShelterInfo
                        item={selectedMarker}
                        onClose={() => setSelectedMarker(null)}
                        isFavorite={favorites.includes(selectedMarker.RSTR_FCLTY_NO)}
                        onToggleFavorite={() => toggleFavorite(selectedMarker.RSTR_FCLTY_NO)}
                    />
                )}
            </div>
            <ShelterMap
                locationData={locationData.data}
                favorites={favorites}
                onMarkerClick={setSelectedMarker}
                onMapClick={() => setSelectedMarker(null)}
                selectedMarker={selectedMarker}
            />
        </div>
    );
}
