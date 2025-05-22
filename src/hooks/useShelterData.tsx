import { useEffect, useState } from "react";
import axios from "axios";
import type { ShelterType } from "../types/shelterType";

export function useShelterData() {
    const [data, setData] = useState<ShelterType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/shelter/data?perPage=1000`
                );
                setData(response.data as ShelterType);
            } catch (error) {
                console.error("Data fetching failed:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { data, loading };
}
