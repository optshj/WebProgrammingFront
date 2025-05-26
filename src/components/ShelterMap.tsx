import { Map, MapMarker } from "react-kakao-maps-sdk";
import Marker from "./MapMarker";
import type { ShelterItemType } from "../types/shelterType";

interface ShelterMapProps {
    locationData: ShelterItemType[] | null;
    favorites: number[];
    onMarkerClick: (item: ShelterItemType) => void;
    onMapClick: () => void;
    selectedMarker: ShelterItemType | null;
}

export default function ShelterMap({
    locationData,
    favorites,
    onMarkerClick,
    onMapClick,
    selectedMarker,
}: ShelterMapProps) {
    const defaultPosition = { lat: 37.37452095059928, lng: 126.6337694513664 }; // incheon Univ.
    if (!locationData) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-lvh bg-pink-50">
                <p className="text-lg font-semibold text-center text-pink-600">
                    앗! 지도를 불러오지 못했어요 😢
                    <br />
                    <span className="text-base font-normal">새로고침하거나 잠시 후 다시 시도해 주세요.</span>
                </p>
            </div>
        );
    }
    return (
        <Map className="w-full h-lvh" center={defaultPosition} level={6} onClick={onMapClick}>
            {locationData.map((item, idx) => (
                <Marker
                    item={item}
                    key={idx}
                    onClick={() => onMarkerClick(item)}
                    isFavorite={favorites.includes(item.RSTR_FCLTY_NO)}
                    isSelected={selectedMarker?.RSTR_FCLTY_NO === item.RSTR_FCLTY_NO}
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
    );
}
