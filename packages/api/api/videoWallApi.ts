import { axios } from "./client"
import { VideoWallPreset } from "@evercam/api/types"

export const VideoWallApi = {
  presets: {
    getProjectPresets(email: string, projectId: number) {
      const encodedEmail = btoa(email)

      return axios.get(
        `${axios.env.firebaseVideowallUrl}/${encodedEmail}/presets/${projectId}.json`,
        {
          transformRequest: (data, headers) => {
            delete headers.common["Authorization"]

            return data
          },
        }
      )
    },
    saveProjectPreset(
      email: string,
      projectId: string,
      payload: Record<string, unknown>
    ) {
      const preset = JSON.stringify({ configuration: payload.configuration })
      const presetName = payload.name
      const encodedEmail = btoa(email)

      return axios.patch(
        `${axios.env.firebaseVideowallUrl}/${encodedEmail}/presets/${projectId}/${presetName}.json`,
        preset,
        {
          transformRequest: (data, headers) => {
            delete headers.common["Authorization"]

            return data
          },
        }
      )
    },
    getGlobalPreset(email: string): Promise<VideoWallPreset> {
      const encodedEmail = btoa(email)

      return axios.get(
        `${axios.env.firebaseVideowallUrl}/${encodedEmail}/presets/global.json`,
        {
          transformRequest: (data, headers) => {
            delete headers.common["Authorization"]

            return data
          },
        }
      )
    },
    saveGlobalPreset(email: string, payload: VideoWallPreset): Promise<void> {
      const preset = JSON.stringify({ configuration: payload.configuration })
      const encodedEmail = btoa(email)

      return axios.patch(
        `${axios.env.firebaseVideowallUrl}/${encodedEmail}/presets/global.json`,
        preset,
        {
          transformRequest: (data, headers) => {
            delete headers.common["Authorization"]

            return data
          },
        }
      )
    },
  },
}
