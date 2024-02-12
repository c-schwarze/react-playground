export interface CityResponse {
    country?: string;
    lat?: number;
    local_names?: object; // todo - clarify this object
    lon?: number;
    name?: string;
    state?: string;
}

export interface WeatherResponse {
    current: WeatherCurrent;
    daily: WeatherDaily[];
    hourly: WeatherHourly[];
    lat: number;
    lon: number;
    alerts: {
        sender_name: string;
        event:  string;
        start: Date;
        end: Date;
        description: string;
        tags: string;
    }[];
}

interface WeatherCurrent extends WeatherShared{
    temp: number;
    sunrise: Date;
    sunset: Date;
    feels_like: number;
}

interface WeatherHourly extends WeatherShared {
    temp: number;
    feels_like: number;
    moonrise: Date;
    pop: number;
}

interface WeatherDaily extends WeatherShared {
    sunrise: Date;
    sunset: Date;
    moonrise: Date;
    moonset: Date;
    moon_phase: number;
    summary: string;
    temp: {
        morn: number;
        day: number;
        eve: number;
        night: number;
        min: number;
        max: number;
    };
    feels_like: {
        morn: number;
        day: number;
        eve: number;
        night: number;
    };
    pop: number;
}

interface WeatherShared {
    dt: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    clouds: number;
    uvi: number;
    visibility: number;
    wind_speed: number;
    wind_gust?: number;
    wind_deg: number;
    rain: {
        "1h"?: number;
    };
    snow: {
        "1h"?: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }
}