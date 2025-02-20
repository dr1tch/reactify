export type HistoryWeatherRequestPayload = {
  day: string
}

export type WeatherResponsePayload = Array<{
  hour?: number
  temp?: number
  clouds?: number
  feelsLike?: number
  pressure?: number
  humidity?: number
  windSpeed?: number
  windDegree?: number
  weather?: [WeatherSummary]
  rain?: HourlyReading
  snow?: HourlyReading
}>

export type WeatherSummary = {
  id?: number
  main?: string
  description?: string
  icon?: string
}

export type HourlyReading = {
  "1h"?: number
  "3h"?: number
}

export enum WeatherProvider {
  WeatherStack = "WeatherStack",
  AerisWeather = "AerisWeather",
}
