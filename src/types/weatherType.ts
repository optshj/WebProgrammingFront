export interface WeatherType {
    weather: {
        coord: {
            lon: number;
            lat: number;
        };
        weather: [
            {
                id: number;
                main: string; // Clouds
                description: string; // overcast clouds;
                icon: string;
            }
        ];
        base: "stations";
        main: {
            temp: number;
            feels_like: number;
            temp_min: number;
            temp_max: number;
            pressure: number;
            humidity: number;
            sea_level: number;
            grnd_level: number;
        };
        visibility: number;
        wind: {
            speed: number;
            deg: number;
            gust: number;
        };
        clouds: {
            all: number;
        };
        dt: number;
        sys: {
            country: string;
            sunrise: number;
            sunset: number;
        };
        timezone: number;
        id: number;
        name: string;
        cod: number;
        UV: string;
    };
    airPollution: {
        cityName: string;
        cityNameEng: string;
        coValue: string;
        dataTime: string;
        districtCode: string;
        districtNumSeq: string;
        khaiValue: string;
        no2Value: string;
        numOfRows: string;
        o3Value: string;
        pageNo: string;
        pm10Value: string;
        pm25Value: string;
        returnType: string;
        serviceKey: string;
        sidoName: string;
        so2Value: string;
    };
    message: string;
}
