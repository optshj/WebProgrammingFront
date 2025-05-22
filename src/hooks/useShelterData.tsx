import { useEffect, useState } from "react";
import axios from "axios";
import type { ShelterItemType, ShelterType } from "../types/shelterType";

export function useShelterData() {
    const [data, setData] = useState<ShelterItemType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<ShelterType>(
                    `${import.meta.env.VITE_API_URL}/api/shelter/data?perPage=1000`
                );
                setData(response.data.data);
            } catch (error) {
                console.error("Data fetching failed:", error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return { data, loading };
}
