import type { ShelterItemType } from "../types/shelterType";

interface ShelterInfoProps {
    item: ShelterItemType;
    onClose: () => void;
    isFavorite: boolean;
    onToggleFavorite: () => void;
}
export default function ShelterInfo({ item, onClose, isFavorite, onToggleFavorite }: ShelterInfoProps) {
    if (!item) return null;

    return (
        <div className="absolute top-0 left-0 z-50 flex flex-col justify-center gap-4 px-10 font-semibold bg-white h-lvh w-96">
            <div className="flex items-center justify-end gap-2">
                <button
                    className="absolute text-4xl text-gray-400 transition-colors top-8 right-8 hover:text-red-500"
                    onClick={onClose}
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{item.RSTR_NM}</h3>
                <button
                    className={`text-3xl ${isFavorite ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500 `}
                    onClick={onToggleFavorite}
                    title={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                >
                    {isFavorite ? "★" : "☆"}
                </button>
            </div>
            {item.RN_DTL_ADRES && <div className="text-sm text-gray-600">{item.RN_DTL_ADRES}</div>}
            <div className="flex items-center gap-1">
                {item.FCLTY_OPRN_AT === "Y" ? (
                    <span className="font-bold text-green-500">● 운영 중</span>
                ) : (
                    <span className="font-bold text-red-500">● 운영 안함</span>
                )}
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
                <h4 className="mb-2 font-semibold">⏰ 운영 시간</h4>
                <div className="flex flex-col gap-2">
                    {item.WKDAY_OPER_BEGIN_TIME || item.WKDAY_OPER_END_TIME ? (
                        <div>
                            평일 : {item.WKDAY_OPER_BEGIN_TIME || "-"} ~ {item.WKDAY_OPER_END_TIME || "-"}
                        </div>
                    ) : (
                        <div>평일 : 운영안함</div>
                    )}
                    {item.WKEND_HDAY_OPER_BEGIN_TIME || item.WKEND_HDAY_OPER_END_TIME ? (
                        <div>
                            주말/휴일 : {item.WKEND_HDAY_OPER_BEGIN_TIME || "-"} ~{" "}
                            {item.WKEND_HDAY_OPER_END_TIME || "-"}
                        </div>
                    ) : (
                        <div>주말/휴일 : 운영안함</div>
                    )}
                </div>
            </div>

            <div className="p-3 rounded-lg bg-lime-50">
                <h4 className="mb-2 font-semibold">🏢 시설 이용 가능 여부</h4>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1">
                        🌙 야간 운영
                        {item.CHCK_MATTER_NIGHT_OPN_AT === "Y" ? "✅" : "❌"}
                    </div>
                    <div className="flex items-center gap-1">
                        🛌 숙박 여부
                        {item.CHCK_MATTER_STAYNG_PSBL_AT === "Y" ? "✅" : "❌"}
                    </div>
                </div>
            </div>

            <div className="p-3 rounded-lg bg-yellow-50">
                <h4 className="mb-2 font-semibold">⚡ 전력 정보</h4>
                <div className="flex flex-col gap-1">
                    <p>
                        예비전력 :{" "}
                        {item.COLR_HOLD_ARCNDTN && item.COLR_HOLD_ARCNDTN > 0 ? `${item.COLR_HOLD_ARCNDTN}kVA` : "없음"}
                    </p>
                    <p>비상발전기 : {item.COLR_HOLD_ELEFN && item.COLR_HOLD_ELEFN > 0 ? "있음" : "없음"}</p>
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
            ${item.USE_PSBL_NMPR <= 30 ? "bg-red-500" : item.USE_PSBL_NMPR <= 70 ? "bg-yellow-400" : "bg-green-500"}`}
                />
                이용가능 인원: {item.USE_PSBL_NMPR}명
            </div>

            <div className="flex items-center gap-2">
                <div
                    className={`w-3 h-3 rounded-full ${
                        item.AR <= 50 ? "bg-red-500" : item.AR <= 150 ? "bg-yellow-400" : "bg-green-500"
                    }`}
                />
                면적: {item.AR ? item.AR : 0}㎡ ({item.AR ? (item.AR / 3.3058).toFixed(2) : "0"}평)
            </div>
        </div>
    );
}
