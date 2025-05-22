import { Map, MapMarker } from "react-kakao-maps-sdk";
import Marker from "./MapMarker";
import type { ShelterItemType } from "../types/shelterType";

interface ShelterMapProps {
    locationData: ShelterItemType[];
    favorites: number[];
    onMarkerClick: (item: ShelterItemType) => void;
    onMapClick: () => void;
}

export default function ShelterMap({
    locationData,
    favorites,
    onMarkerClick,
    onMapClick,
    selectedMarker,
}: ShelterMapProps & { selectedMarker: ShelterItemType | null }) {
    const defaultPosition = { lat: 37.37452095059928, lng: 126.6337694513664 }; // incheon Univ.
    return (
        <Map className="w-full h-lvh" center={defaultPosition} level={6} onClick={onMapClick}>
            {locationData.map((item, idx) => (
                <Marker
                    item={item}
                    key={idx}
                    onClick={() => onMarkerClick(item)}
                    isFavorite={favorites.includes(item.RSTR_FCLTY_NO)}
                    isSelected={selectedMarker?.RSTR_FCLTY_NO === item.RSTR_FCLTY_NO} // 추가!
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
