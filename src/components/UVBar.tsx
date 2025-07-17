function getIndicatorColor(uvIndex: number) {
    if (uvIndex >= 11) return 'bg-red-500'
    if (uvIndex >= 8) return 'bg-pink-500'
    if (uvIndex >= 6) return 'bg-yellow-400'
    if (uvIndex >= 3) return 'bg-green-400'
    return 'bg-lime-400'
}

export default function UVBar({ uvIndex }: { uvIndex: number }) {
    const maxUV = 11
    const positionPercent = Math.min(uvIndex / maxUV, 1)

    // 등급 구간 및 색상
    let label = '낮음'
    let labelColor = 'text-lime-700'
    if (uvIndex >= 3 && uvIndex <= 5) {
        label = '보통'
        labelColor = 'text-green-700'
    } else if (uvIndex >= 6 && uvIndex <= 7) {
        label = '높음'
        labelColor = 'text-yellow-700'
    } else if (uvIndex >= 8 && uvIndex <= 10) {
        label = '매우높음'
        labelColor = 'text-pink-700'
    } else if (uvIndex >= 11) {
        label = '위험'
        labelColor = 'text-red-700'
    }

    const indicatorColor = getIndicatorColor(uvIndex)

    return (
        <div className="w-full">
            <div className="flex flex-col justify-between mb-2 text-xl font-bold">
                자외선 지수
                <span className={labelColor}>{label}</span>
            </div>
            <div className="relative w-full h-4 rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 via-70% to-pink-500">
                <div
                    className={`absolute flex items-center justify-center text-base font-bold text-white border-4 border-white rounded-full shadow-lg w-7 h-7 top-1/2 ${indicatorColor}`}
                    style={{
                        left: `${positionPercent * 100}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {uvIndex}
                </div>
            </div>
        </div>
    )
}
