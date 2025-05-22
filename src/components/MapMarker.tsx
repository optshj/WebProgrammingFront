import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import type { ShelterItemType } from "../types/shelterType";

interface MarkerProp {
    item: ShelterItemType;
    onClick: () => void;
    isFavorite: boolean;
    isSelected: boolean;
}

export default function Marker({ item, onClick, isFavorite, isSelected }: MarkerProp) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <MapMarker
                image={{
                    src: isFavorite
                        ? "/assets/marker/marker_favorite.png"
                        : `/assets/marker/marker_image_${item.FCLTY_TY}.png`,
                    size: { width: 50, height: 50 },
                }}
                key={item.RSTR_FCLTY_NO}
                position={{
                    lat: item.LA,
                    lng: item.LO,
                }}
                onClick={onClick}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
            />
            {(isSelected || isHovered) && (
                <CustomOverlayMap position={{ lat: item.LA, lng: item.LO }} yAnchor={2.5}>
                    <div className="relative p-1.5 text-zinc-800 whitespace-nowrap cursor-pointer bg-white rounded-md font-semibold shadow-lg">
                        {item.RSTR_NM}
                    </div>
                </CustomOverlayMap>
            )}
        </>
    );
}
