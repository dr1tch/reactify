import { axios } from "./client"
import { MoveParams, ZoomParams } from "@/types"

export const PtzApi = {
  presets: {
    index({ cameraExid }: { cameraExid: string }) {
      return axios.get(`/cameras/${cameraExid}/ptz/presets`)
    },
    go({
      cameraExid,
      presetId,
    }: {
      cameraExid: string
      presetId: string | number
    }) {
      return axios.post(`/cameras/${cameraExid}/ptz/presets/go/${presetId}`)
    },
    home({
      cameraExid,
      isRecordingFromNvr,
    }: {
      cameraExid: string
      isRecordingFromNvr: boolean
    }) {
      if (!isRecordingFromNvr) {
        return axios.post(`/cameras/${cameraExid}/ptz/home`)
      }

      return axios.post(`/cameras/${cameraExid}/ptz/relative`)
    },
    create({
      cameraExid,
      presetName,
    }: {
      cameraExid: string
      presetName: string
    }) {
      return axios.post(`/cameras/${cameraExid}/ptz/presets/create`, {
        presetName,
      })
    },
    update({
      cameraExid,
      presetId,
      presetName,
    }: {
      cameraExid: string
      presetId: string | number
      presetName: string
    }) {
      // eslint-disable-next-line
      return axios.post(`/cameras/${cameraExid}/ptz/presets/${presetId}/set`, {
        presetName,
      })
    },
    delete({
      cameraExid,
      presetId,
    }: {
      cameraExid: string
      presetId: string | number
    }) {
      // eslint-disable-next-line
      return axios.delete(
        `/cameras/${cameraExid}/ptz/presets/${presetId}/remove`
      )
    },
  },
  controls: {
    move({ cameraExid, direction, isRecordingFromNvr }: MoveParams) {
      if (!isRecordingFromNvr) {
        return axios.post(`/cameras/${cameraExid}/ptz/relative?${direction}=4`)
      }

      return axios.post(
        `/cameras/${cameraExid}/ptz/continuous/start/${direction}`
      )
    },
    zoom({ cameraExid, direction, isRecordingFromNvr }: ZoomParams) {
      if (!isRecordingFromNvr) {
        const zoomValue = direction === "in" ? 1 : -1

        return axios.post(
          `/cameras/${cameraExid}/ptz/relative?zoom=${zoomValue}`
        )
      }

      return axios.post(
        `/cameras/${cameraExid}/ptz/continuous/zoom/${direction}`,
        {
          direction,
        }
      )
    },
    stop({ cameraExid }: { cameraExid: string }) {
      return axios.post(`/cameras/${cameraExid}/ptz/continuous/stop`)
    },
  },
}
