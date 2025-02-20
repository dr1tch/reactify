import { axios } from "./client"
import type {
  _360AssetsQueryParams,
  _360AssetsRequestPayload,
  _360AssetsUploadPayload,
  BimUploadPayload,
  BimUploadsQueryParams,
  CalculateMeasuringOperationRequestPayload,
  DronesQueryParams,
  DroneUploadUpdateRequestPayload,
  FlightImagesQueryParams,
  Generate360MapRequestPayload,
  InspectionToolRequestPayload,
  MobileCaptureSnapshot,
} from "@evercam/api/types"

export const IngestApi = {
  drone: {
    createUpload(projectId: string, params: { uploadedBy: string }) {
      return axios.post(
        `${axios.env.ingestApiUrl}/drone/${projectId}/upload`,
        null,
        { params }
      )
    },
    reprocessDrone(id: number, params: Record<string, unknown>) {
      return axios.post(
        `${axios.env.ingestApiUrl}/drone/${id}/reprocess`,
        null,
        { params }
      )
    },
    getDrones(params: { params: Partial<DronesQueryParams> }) {
      return axios.get(`${axios.env.ingestApiUrl}/drone/uploads/`, params)
    },
    getArchive(id: number, params: { dataType: string }) {
      return axios.get(
        `${axios.env.ingestApiUrl}/drone/uploads/archive/${id}`,
        {
          params,
        }
      )
    },
    deleteUpload(id: number) {
      return axios.delete(`${axios.env.ingestApiUrl}/drone/uploads/${id}`)
    },
    prepareForUpload(
      projectId: string,
      params: {
        uploadedBy: string
        token: string
      }
    ) {
      return axios.put(
        `${axios.env.ingestApiUrl}/drone/${projectId}/prepare-upload`,
        null,
        { params }
      )
    },
    upload(
      projectId: string,
      params: {
        uploadedBy: string
        token: string
      },
      payload: DroneUploadUpdateRequestPayload
    ) {
      return axios.put(
        `${axios.env.ingestApiUrl}/drone/${projectId}/upload`,
        payload,
        { params }
      )
    },
    verifyToken(projectId: string, params: { token: string }) {
      return axios.get(
        `${axios.env.ingestApiUrl}/drone/uploads/${projectId}/verify`,
        {
          params: { token: params.token },
        }
      )
    },
    calculateMeasuringOperation(
      projectId: string,
      params: CalculateMeasuringOperationRequestPayload
    ) {
      return axios.post(
        `${axios.env.ingestApiUrl}/drone/api/${projectId}/calculate-measuring-operation`,
        params
      )
    },
    inspectionTool(projectId: string, params: InspectionToolRequestPayload) {
      return axios.post(
        `${axios.env.ingestApiUrl}/drone/api/${projectId}/inspection-tool`,
        params
      )
    },
    isInspectionEnabled(projectId: string, params: Record<string, unknown>) {
      return axios.post(
        `${axios.env.ingestApiUrl}/drone/api/${projectId}/inspection-enabled`,
        null,
        { params }
      )
    },
    getDroneQueueSize() {
      return axios.get(`${axios.env.ingestApiUrl}/drone/queue`)
    },
    getFlightImages(projectId: string, params: FlightImagesQueryParams) {
      return axios.get(
        `${axios.env.ingestApiUrl}/drone/api/${projectId}/flight-images`,
        {
          params,
        }
      )
    },
  },
  assets360: {
    get360Assets(params: { params: Partial<_360AssetsQueryParams> }) {
      return axios.get(`${axios.env.ingestApiUrl}/360/assets/`, params)
    },
    deleteUpload(id: number) {
      return axios.delete(`${axios.env.ingestApiUrl}/360/assets/${id}`)
    },
    getArchive(id: number, params: { dateType: string }) {
      return axios.get(`${axios.env.ingestApiUrl}/360/assets/archive/${id}`, {
        params,
      })
    },
    createUpload(projectId: string, params: _360AssetsRequestPayload) {
      return axios.post(
        `${axios.env.ingestApiUrl}/360/${projectId}/upload`,
        null,
        { params }
      )
    },
    upload(
      id: number,
      params: Record<string, unknown>,
      payload: _360AssetsUploadPayload
    ) {
      return axios.put(`${axios.env.ingestApiUrl}/360/${id}/upload`, payload, {
        params,
      })
    },
    generate360map(projectId: string, params: Generate360MapRequestPayload) {
      return axios.post(
        `${axios.env.ingestApiUrl}/360/api/${projectId}/generate-360-map`,
        params
      )
    },
    get360QueueSize() {
      return axios.get(`${axios.env.ingestApiUrl}/360/queue`)
    },
  },
  bim: {
    createUpload(projectId: string, params: { uploadedBy: string }) {
      return axios.post(
        `${axios.env.ingestApiUrl}/bim/${projectId}/upload`,
        null,
        { params }
      )
    },
    getBIMs(params: { params: Partial<BimUploadsQueryParams> }) {
      return axios.get(`${axios.env.ingestApiUrl}/bim/uploads/`, params)
    },
    getArchive(id: number) {
      return axios.get(`${axios.env.ingestApiUrl}/bim/uploads/archive/${id}`)
    },
    deleteUpload(id: number) {
      return axios.delete(`${axios.env.ingestApiUrl}/bim/uploads/${id}`)
    },
    upload(
      projectId: string,
      params: {
        id: string
        name: string
      },
      payload: BimUploadPayload
    ) {
      return axios.put(
        `${axios.env.ingestApiUrl}/bim/${projectId}/upload`,
        payload,
        { params }
      )
    },
  },
  mobileCapture: {
    getProjectMobileAssets(
      params: Record<string, unknown>
    ): Promise<MobileCaptureSnapshot[]> {
      return axios.get(`${axios.env.ingestApiUrl}/mobile/assets/`, {
        params,
      })
    },
    getMobileAssetPhoto(
      assetId: string | number,
      params: Record<string, unknown>
    ) {
      return axios.get(`${axios.env.ingestApiUrl}/mobile/assets/${assetId}`, {
        params,
      })
    },
  },
  getTotalQueueSize() {
    return axios.get(`${axios.env.ingestApiUrl}/queue`)
  },
  checkFlightAvailableFeatures(
    projectId: string,
    params: Record<string, unknown>
  ) {
    return axios.get(
      `${axios.env.ingestApiUrl}/drone/api/${projectId}/flight-available-features`,
      {
        params,
      }
    )
  },
}
