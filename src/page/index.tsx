import { useState } from 'react'
import { useShelterData } from '../hooks/useShelterData'
import { useWeatherData } from '../hooks/useWeatherData'

import type { ShelterItemType } from '../types/shelterType'
import { useUserLocation } from '../hooks/useUserLocation'

import Loading from '../components/Loading'
import WeatherInfo from '../components/WeatherInfo'
import ShelterInfo from '../components/ShelterInfo'
import ShelterMap from '../components/ShelterMap'
import BottomSheet from '../components/BottomSheet'
import WeatherInfoSM from '../components/WeatherInfoSM'

interface Message {
    id: number
    text: string
}

export default function Page() {
    const { data: locationData, loading: shelterLoading } = useShelterData()
    const { data: weatherData, loading: weatherLoading } = useWeatherData()
    const { currentPosition: userLocation, isLoading: locationLoading } = useUserLocation()
    const [selectedMarker, setSelectedMarker] = useState<ShelterItemType | null>(null)

    const [favorites, setFavorites] = useState<number[]>(() => {
        const saved = localStorage.getItem('shelterFavorites')
        return saved ? JSON.parse(saved) : []
    })

    const [messages, setMessages] = useState<Message[]>([])

    const showMessage = (text: string) => {
        const id = Date.now()
        setMessages((prev) => [...prev, { id, text }])
        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id))
        }, 2000)
    }

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            const isCurrentlyFavorite = prev.includes(id)
            const next = isCurrentlyFavorite ? prev.filter((favId) => favId !== id) : [...prev, id]
            localStorage.setItem('shelterFavorites', JSON.stringify(next))

            showMessage(isCurrentlyFavorite ? '즐겨찾기에서 해제했어요.' : '즐겨찾기에 추가했어요!')

            return next
        })
    }

    if (shelterLoading || weatherLoading || locationLoading) return <Loading />

    return (
        <div className="flex flex-row relative">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2">
                {messages.map(({ id, text }) => (
                    <div key={id} className="animate-fade-up-down pointer-events-none rounded-lg bg-white px-4 py-2 font-bold text-[#484848] shadow-lg">
                        {text}
                    </div>
                ))}
            </div>

            <div
                className="
                 hidden
                 fixed bottom-0 left-0 right-0 z-50 flex-col gap-4 p-6 bg-white rounded-2xl shadow-2xl
                 h-auto max-h-[80vh] overflow-y-auto justify-start
                 sm:flex
                 sm:absolute sm:top-0 sm:left-0 sm:h-lvh sm:w-96 sm:max-h-full
                 sm:rounded-none sm:shadow-none sm:justify-center sm:overflow-hidden
                 "
            >
                {selectedMarker ? (
                    <ShelterInfo
                        item={selectedMarker}
                        isFavorite={favorites.includes(selectedMarker.RSTR_FCLTY_NO)}
                        onToggleFavorite={() => toggleFavorite(selectedMarker.RSTR_FCLTY_NO)}
                    />
                ) : (
                    <WeatherInfo data={weatherData} />
                )}
            </div>
            <div className="sm:hidden">
                <BottomSheet className="px-8 gap-2 flex  flex-col" open={true} onClose={() => setSelectedMarker(null)} snapPoints={[0.3, 0.9]}>
                    {selectedMarker ? (
                        <ShelterInfo
                            item={selectedMarker}
                            isFavorite={favorites.includes(selectedMarker.RSTR_FCLTY_NO)}
                            onToggleFavorite={() => toggleFavorite(selectedMarker.RSTR_FCLTY_NO)}
                        />
                    ) : (
                        <WeatherInfoSM data={weatherData} />
                    )}
                </BottomSheet>
            </div>
            <ShelterMap
                userLocation={userLocation || { lat: 37.5665, lng: 126.978 }}
                locationData={locationData}
                favorites={favorites}
                onMarkerClick={setSelectedMarker}
                onMapClick={() => setSelectedMarker(null)}
                selectedMarker={selectedMarker}
            />
        </div>
    )
}
