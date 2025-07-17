export function Pm10IndexBar({ pmValue }: { pmValue: number }) {
    const maxPM = 150
    const percent = Math.min(pmValue / maxPM, 1) * 100

    let status = '좋음'
    let fillColor = 'bg-blue-400'
    let textColor = 'text-blue-600'

    if (pmValue > 30 && pmValue <= 80) {
        status = '보통'
        fillColor = 'bg-green-400'
        textColor = 'text-green-600'
    } else if (pmValue > 80 && pmValue <= 150) {
        status = '나쁨'
        fillColor = 'bg-yellow-400'
        textColor = 'text-yellow-600'
    } else if (pmValue > 150) {
        status = '매우 나쁨'
        fillColor = 'bg-red-400'
        textColor = 'text-red-600'
    }

    return (
        <div className="relative w-full">
            <div className="mb-1 font-semibold text-xl">
                미세먼지
                <div className={`${textColor} text-lg`}>
                    {status} ({pmValue}㎍/m³)
                </div>
            </div>
            <div className="relative w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                <div className={`h-full ${fillColor} transition-all duration-500 rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}
export function Pm25IndexBar({ pmValue }: { pmValue: number }) {
    const maxPM = 75
    const percent = Math.min(pmValue / maxPM, 1) * 100

    let status = '좋음'
    let fillColor = 'bg-blue-400'
    let textColor = 'text-blue-600'

    if (pmValue > 15 && pmValue <= 35) {
        status = '보통'
        fillColor = 'bg-green-400'
        textColor = 'text-green-600'
    } else if (pmValue > 36 && pmValue <= 75) {
        status = '나쁨'
        fillColor = 'bg-yellow-400'
        textColor = 'text-yellow-600'
    } else if (pmValue > 75) {
        status = '매우 나쁨'
        fillColor = 'bg-red-400'
        textColor = 'text-red-600'
    }

    return (
        <div className="relative w-full">
            <div className="mb-1 font-semibold text-xl">
                초미세먼지
                <div className={` ${textColor} text-lg`}>
                    {status} ({pmValue}㎍/m³)
                </div>
            </div>

            <div className="relative w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                <div className={`h-full ${fillColor} transition-all duration-500 rounded-full`} style={{ width: `${percent}%` }}></div>
            </div>
        </div>
    )
}
