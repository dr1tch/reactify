import { axios } from "./client"
import { toQueryString } from "@evercam/api/utils"
import {
  HistoryWeatherRequestPayload,
  WeatherProvider,
  WeatherResponsePayload,
} from "@evercam/api/types"

export const WeatherApi = {
  current: {
    getCurrentWeather({
      projectExid,
      weatherProvider = WeatherProvider.WeatherStack,
    }: {
      projectExid: string
      weatherProvider: WeatherProvider
    }): Promise<WeatherResponsePayload> | undefined {
      if (weatherProvider === WeatherProvider.WeatherStack) {
        return axios.get(`/projects/${projectExid}/weather/current`)
      } else if (weatherProvider === WeatherProvider.AerisWeather) {
        return axios.get(
          `${axios.env.weatherApiBaseUrl}/weatherApi/getWeatherData?projectExid=${projectExid}`
        )
      }
    },
  },
  historical: {
    getWeatherBeforeDate({
      projectExid,
      weatherProvider = WeatherProvider.WeatherStack,
      payload,
    }: {
      projectExid: string
      weatherProvider: WeatherProvider
      payload: HistoryWeatherRequestPayload
    }): Promise<WeatherResponsePayload> | undefined {
      if (weatherProvider === WeatherProvider.WeatherStack) {
        return axios.get(
          `/projects/${projectExid}/weather?${toQueryString(payload)}`
        )
      } else if (weatherProvider === WeatherProvider.AerisWeather) {
        return axios.get(
          `${axios.env.weatherApiBaseUrl}/weatherApi/getWeatherData?projectExid=${projectExid}&day=${payload.day}`
        )
      }
    },
  },
}
