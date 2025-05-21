import { useState } from "react";
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import type { ShelterItemType } from "../types/shelterType";

export default function Marker({ item }: { item: ShelterItemType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

    const showOverlay = isOpen || isFixed;

    const handleOverlayClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFixed(false);
    };

    return (
        <>
            <MapMarker
                image={{
                    src: `/assets/marker/marker_image_${item.FCLTY_TY}.png`,
                    size: { width: 50, height: 50 },
                }}
                key={item.RSTR_FCLTY_NO}
                position={{
                    lat: item.LA,
                    lng: item.LO,
                }}
                onMouseOver={() => setIsOpen(true)}
                onMouseOut={() => setIsOpen(false)}
                onClick={() => {
                    setIsFixed((prev) => !prev);
                }}
            />
            {showOverlay && (
                <CustomOverlayMap
                    position={{ lat: item.LA, lng: item.LO }}
                    yAnchor={2.5}
                >
                    <div
                        className="relative p-1.5 pr-4 text-zinc-800 whitespace-nowrap cursor-pointer bg-white rounded-md font-semibold shadow-lg"
                        onClick={handleOverlayClose}
                    >
                        {item.RSTR_NM}
                        <button
                            className="absolute text-xs text-gray-400 top-1 right-1 hover:text-red-400"
                            aria-label="닫기"
                            onClick={handleOverlayClose}
                        >
                            ✕
                        </button>
                    </div>
                </CustomOverlayMap>
            )}
        </>
    );
}
