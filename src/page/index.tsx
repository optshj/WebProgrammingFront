import { useState } from "react";
import { useShelterData } from "../hooks/useShelterData";
import { useWeatherData } from "../hooks/useWeatherData";

import type { ShelterItemType } from "../types/shelterType";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import Loading from "../components/Loading";
import WeatherInfo from "../components/WeatherInfo";
import ShelterInfo from "../components/ShelterInfo";
import Marker from "../components/MapMarker";

export default function Page() {
    const { data: locationData, loading: shelterLoading } = useShelterData();
    const { data: weatherData, loading: weatherLoading } = useWeatherData();
    const defaultPosition = { lat: 37.37452095059928, lng: 126.6337694513664 }; // incheon Univ.

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

    if (shelterLoading || weatherLoading || !locationData || !weatherData) return <Loading />;

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
            <Map className="w-full h-lvh" center={defaultPosition} level={6} onClick={() => setSelectedMarker(null)}>
                {locationData.data.map((item, idx) => (
                    <Marker
                        item={item}
                        key={idx}
                        onClick={() => setSelectedMarker(item)}
                        isFavorite={favorites.includes(item.RSTR_FCLTY_NO)}
                    />
                ))}
                <MapMarker
                    image={{
                        src: "/assets/marker/marker_user.png",
                        size: { width: 36, height: 36 },
                    }}
                    position={defaultPosition}
                />
            </Map>
        </div>
    );
}
