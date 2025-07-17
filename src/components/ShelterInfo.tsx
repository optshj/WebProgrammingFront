import { useRef } from 'react'
import { useShowMessage } from '../hooks/useShowMessage'
import type { ShelterItemType } from '../types/shelterType'

interface ShelterInfoProps {
    item: ShelterItemType | null
    isFavorite: boolean
    onToggleFavorite: () => void
}
export default function ShelterInfo({ item, isFavorite, onToggleFavorite }: ShelterInfoProps) {
    const ref = useRef<HTMLButtonElement>(null)
    const messageElement = useShowMessage(ref, `${isFavorite ? '추가되었습니다!' : '해제되었습니다!'}`)
    if (!item) return <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full">Loading...</div>
    const isOperatingNow = () => {
        const now = new Date()
        const day = now.getDay() // 일:0, 월:1, ... 토:6
        const currentTime = now.getHours() * 60 + now.getMinutes()
        const timeToMinutes = (time: string) => {
            if (!time || time.length !== 4) return null
            const hour = Number(time.slice(0, 2))
            const minute = Number(time.slice(2, 4))
            return hour * 60 + minute
        }

        if (day >= 1 && day <= 5) {
            const begin = timeToMinutes(item.WKDAY_OPER_BEGIN_TIME)
            const end = timeToMinutes(item.WKDAY_OPER_END_TIME)
            if (begin === null || end === null) return false
            return currentTime >= begin && currentTime <= end
        } else {
            const begin = timeToMinutes(item.WKEND_HDAY_OPER_BEGIN_TIME)
            const end = timeToMinutes(item.WKEND_HDAY_OPER_END_TIME)
            if (begin === null || end === null) return false
            return currentTime >= begin && currentTime <= end
        }
    }

    const operatingNow = isOperatingNow()

    return (
        <div className="font-semibold flex gap-4 flex-col">
            {messageElement}
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{item.RSTR_NM}</h3>
                <button
                    className={`text-3xl ${isFavorite ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-500 `}
                    onClick={onToggleFavorite}
                    title={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                    ref={ref}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
            </div>
            {item.RN_DTL_ADRES && <div className="text-sm text-gray-600">{item.RN_DTL_ADRES}</div>}
            <div className="flex items-center gap-1">
                <span className={`font-bold ${operatingNow ? 'text-green-500' : 'text-red-500'}`}>● {operatingNow ? '운영 중' : '운영 안함'}</span>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold">⏰ 운영 시간</h4>
                <div className="flex flex-col gap-2">
                    {item.WKDAY_OPER_BEGIN_TIME || item.WKDAY_OPER_END_TIME ? (
                        <div>
                            평일 : {item.WKDAY_OPER_BEGIN_TIME || '-'} ~ {item.WKDAY_OPER_END_TIME || '-'}
                        </div>
                    ) : (
                        <div>평일 : 운영안함</div>
                    )}
                    {item.WKEND_HDAY_OPER_BEGIN_TIME || item.WKEND_HDAY_OPER_END_TIME ? (
                        <div>
                            주말/휴일 : {item.WKEND_HDAY_OPER_BEGIN_TIME || '-'} ~ {item.WKEND_HDAY_OPER_END_TIME || '-'}
                        </div>
                    ) : (
                        <div>주말/휴일 : 운영안함</div>
                    )}
                </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-50">
                <h4 className="mb-2 font-semibold">❄️ 냉방기 보유 현황</h4>
                <div className="flex flex-col gap-1 text-base">
                    <div className="flex items-center gap-2">
                        🌀 선풍기
                        <span>{item.COLR_HOLD_ELEFN ? item.COLR_HOLD_ELEFN : 0}대</span>
                    </div>
                    <div className="flex items-center gap-2">
                        🧊 에어컨
                        <span>{item.COLR_HOLD_ARCNDTN ? item.COLR_HOLD_ARCNDTN : 0}대</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div
                    className={`w-3 h-3 rounded-full
            ${item.USE_PSBL_NMPR <= 30 ? 'bg-red-500' : item.USE_PSBL_NMPR <= 70 ? 'bg-yellow-400' : 'bg-green-500'}`}
                />
                이용가능 인원: {item.USE_PSBL_NMPR}명
            </div>

            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.AR <= 50 ? 'bg-red-500' : item.AR <= 150 ? 'bg-yellow-400' : 'bg-green-500'}`} />
                면적: {item.AR ? item.AR : 0}㎡ ({item.AR ? (item.AR / 3.3058).toFixed(2) : '0'}평)
            </div>
        </div>
    )
}
