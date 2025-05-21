export default function UvIndexBar({ uvIndex }: { uvIndex: number }) {
    const maxUV = 11;
    const barWidth = 256; // Tailwind w-64 = 256px
    const positionPercent = Math.min(uvIndex / maxUV, 1); // 0~1 사이
    const indicatorLeft = positionPercent * barWidth;

    let label = "좋음";
    if (uvIndex >= 3 && uvIndex < 6) label = "보통";
    else if (uvIndex >= 6 && uvIndex < 8) label = "나쁨";
    else if (uvIndex >= 8) label = "매우 나쁨";

    return (
        <div className="w-72">
            <div className="flex justify-between mb-2 text-xl font-bold">
                <div>자외선 지수</div> {label}
            </div>
            <div className="relative w-full h-4 rounded-full bg-gradient-to-r from-lime-400 via-yellow-400 to-pink-500">
                <div
                    className="absolute flex items-center justify-center w-6 h-6 text-sm font-bold text-yellow-500 bg-white rounded-full shadow top-1/2"
                    style={{
                        left: `${indicatorLeft}px`,
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {uvIndex}
                </div>
            </div>
        </div>
    );
}
