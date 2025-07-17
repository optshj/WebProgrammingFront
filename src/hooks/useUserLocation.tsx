import { useEffect, useState } from "react";

export function useUserLocation() {
    const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            setIsLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setIsLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setIsLoading(false);
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setCurrentPosition({ lat: 37.5665, lng: 126.9780 });
            setIsLoading(false);
        }
    }, []);

    return { currentPosition, isLoading };
}