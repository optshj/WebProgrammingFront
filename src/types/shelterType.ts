export interface ShelterType {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: ShelterItemType[];
}
export interface ShelterItemType {
    DTL_ADRES: string;
    XCORD: number;
    LO: number;
    CHCK_MATTER_WKEND_HDAY_OPN_AT: "Y" | "N";
    WKEND_HDAY_OPER_BEGIN_TIME: string;
    MODF_TIME: string;
    ARCD: string;
    WKDAY_OPER_BEGIN_TIME: string;
    YEAR: string;
    USE_PSBL_NMPR: number;
    CHCK_MATTER_NIGHT_OPN_AT: "Y" | "N";
    RSTR_NM: string;
    WKEND_HDAY_OPER_END_TIME: string;
    CHCK_MATTER_STAYNG_PSBL_AT: "Y" | "N";
    MNGDPT_CD: string;
    COLR_HOLD_ARCNDTN: number;
    OPER_END_DE: string;
    RN_DTL_ADRES: string;
    OPER_BEGIN_DE: string;
    FCLTY_OPRN_AT: "Y" | "N";
    INPT_TIME: string;
    DTL_POSITION: string;
    WKDAY_OPER_END_TIME: string;
    FCLTY_SCLAS: string;
    COLR_HOLD_ELEFN: number;
    AR: number;
    YCORD: string;
    USE_AT: "Y" | "N";
    LA: number;
    RSTR_FCLTY_NO: number;
    RM: null;
    FCLTY_TY: string;
}
