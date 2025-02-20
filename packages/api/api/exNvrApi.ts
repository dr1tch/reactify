import { axios } from "./client"
import {
  ExNvrDeviceConfig,
  ExNvrLoginResponse,
  ExNvrRecordingInterval,
  ExNvrSystemStatus,
} from "@evercam/api/types/"

export const ExNvrApi = {
  users: {
    login(
      {
        apiUrl,
        username,
        password,
      }: {
        apiUrl: string
        username: string
        password: string
      },
      config: { timing?: boolean } = {}
    ): Promise<ExNvrLoginResponse> {
      return axios.post(
        `${apiUrl}/api/users/login`,
        {
          username,
          password,
        },
        config
      )
    },
  },
  devices: {
    getDevices({
      apiUrl,
      token,
    }: {
      apiUrl: string
      token: string
    }): Promise<ExNvrDeviceConfig> {
      return axios.get(`${apiUrl}/api/devices/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    getSystemStatus(
      { apiUrl, token }: { apiUrl: string; token: string },
      config: Record<string, string> = {}
    ): Promise<ExNvrSystemStatus> {
      return axios.get(`${apiUrl}/api/system/status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...config,
      })
    },
    getDeviceConfig(
      {
        apiUrl,
        deviceId,
        token,
      }: {
        apiUrl: string
        deviceId: string
        token: string
      },
      config: { timing?: boolean } = {}
    ): Promise<ExNvrDeviceConfig> {
      return axios.get(`${apiUrl}/api/devices/${deviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...config,
      })
    },
    getAvailableRecordings(
      {
        apiUrl,
        deviceId,
        token,
      }: {
        apiUrl: string
        deviceId: string
        token: string
      },
      config: { timing?: boolean } = {}
    ): Promise<ExNvrRecordingInterval[]> {
      return axios.get(`${apiUrl}/api/devices/${deviceId}/recordings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        ...config,
      })
    },
    downloadFootage({
      apiUrl,
      deviceId,
      token,
      startDate,
      duration,
    }: {
      apiUrl: string
      deviceId: string
      token: string
      startDate: string
      duration: number
    }): Promise<Blob> {
      return axios.get(`${apiUrl}/api/devices/${deviceId}/footage`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate,
          duration,
        },
        responseType: "blob",
      })
    },
  },
}
