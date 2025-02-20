import { axios } from "./client"
import type {
  MilesightCameraVideoConfig,
  MilesightRequestParams,
  MilesightCameraNetworkConfiguration,
  MilesightCameraSystemSettings,
  MilesightCameraOsdConfiguration,
  MilesightCameraSdCardInfo,
  CopilotConversation,
  CopilotMessage,
  PaginatedItems,
  CopilotMessageStep,
  DetectionsFilters,
  TrackingsByLabel,
  CameraExid,
  CountsParams,
  CountByPeriod,
  DetectionsPresenceByLabel,
  FeedbackPayload,
  LabsPaginationParams,
  SegmentsPresenceByLabel,
  SegmentsByLabel,
  SegmentsSimilaritySearchParams,
  LuminanceReading,
  GrafanaKitMetrics,
  GrafanaMetricId,
} from "@evercam/api/types"

export function getLabsBaseUrl() {
  const labsPrNumber = /labs-(\d+)/g.exec(window.location.href)?.[1]

  return labsPrNumber
    ? `https://${labsPrNumber}.labs.evercam.io`
    : axios.env.evercamLabsUrl
}

export const EvercamLabsApi = {
  milesight: {
    getVideoConfig(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraVideoConfig> {
      return axios.get(`${getLabsBaseUrl()}/milesight/video`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
    getNetworkConfiguration(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraNetworkConfiguration> {
      return axios.get(`${getLabsBaseUrl()}/milesight/network`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
    getSystemSettings(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraSystemSettings> {
      return axios.get(`${getLabsBaseUrl()}/milesight/system`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
    getTimeSettings(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraSystemSettings> {
      return axios.get(`${getLabsBaseUrl()}/milesight/time`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
    getOsdConfiguration(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraOsdConfiguration> {
      return axios.get(`${getLabsBaseUrl()}/milesight/osd`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
    getSdCardInfo(
      { host, httpPort, username, password }: MilesightRequestParams,
      config = {}
    ): Promise<MilesightCameraSdCardInfo> {
      return axios.get(`${getLabsBaseUrl()}/milesight/storage`, {
        params: {
          host,
          port: httpPort,
          username,
          password,
        },
        ...config,
      })
    },
  },
  copilot: {
    async getAllConversations(
      params: LabsPaginationParams & {
        cameraExid?: string
        projectExid?: string
        user?: string
      }
    ): Promise<PaginatedItems<CopilotConversation>> {
      return axios.get(`${getLabsBaseUrl()}/copilot/conversations`, {
        params,
        preserveCasing: true,
      })
    },
    async getConversationMessages(
      conversationId: number,
      params: LabsPaginationParams
    ): Promise<PaginatedItems<CopilotMessage>> {
      return axios.get(
        `${getLabsBaseUrl()}/copilot/conversations/${conversationId}/messages`,
        { params, preserveCasing: true }
      )
    },
    async getMessageSteps(
      message: CopilotMessage
    ): Promise<CopilotMessageStep[]> {
      return axios.get(
        `${getLabsBaseUrl()}/copilot/conversations/${
          message.conversationId
        }/messages/${message.id}/steps`
      )
    },
    async submitMessageFeedback<T>({
      conversationId,
      messageId,
      ...params
    }: FeedbackPayload<T>) {
      return axios.post(
        `${getLabsBaseUrl()}/copilot/conversations/${conversationId}/messages/${messageId}/feedback`,
        params,
        {
          preserveCasing: true,
        }
      )
    },
  },
  detections: {
    async getDetectionsTracking(
      cameraExid: CameraExid,
      params: DetectionsFilters
    ): Promise<TrackingsByLabel> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/detections/tracking`,
        {
          params,
          preserveCasing: true,
        }
      )
    },
    async getSegmentsMasks(
      cameraExid: CameraExid,
      params: DetectionsFilters
    ): Promise<SegmentsByLabel> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/segments/masks`,
        {
          params,
          preserveCasing: true,
        }
      )
    },
    async getDetectionsPresenceDateIntervals({
      cameraExid,
      fromDate,
      toDate,
      precision,
    }: CountsParams): Promise<DetectionsPresenceByLabel> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/detections/presence-intervals`,
        {
          params: { fromDate, toDate, precision },
          preserveCasing: true,
        }
      )
    },
    async getSegmentsDateIntervals({
      cameraExid,
      fromDate,
      toDate,
      precision,
    }: CountsParams): Promise<SegmentsPresenceByLabel> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/segments/presence-intervals`,
        {
          params: { fromDate, toDate, precision },
          preserveCasing: true,
        }
      )
    },
    async getCranesMovement({
      cameraExid,
      fromDate,
      toDate,
      precision,
    }: CountsParams): Promise<CountByPeriod[]> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/detections/movement`,
        {
          params: { fromDate, toDate, precision },
          preserveCasing: true,
        }
      )
    },
    async getSimilarSegmentsInTimeIntervals({
      cameraExid,
      segmentId,
      ...params
    }: SegmentsSimilaritySearchParams) {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${cameraExid}/segments/${segmentId}/by-time-intervals`,
        {
          params,
          preserveCasing: true,
        }
      )
    },
  },
  googleCloudStorage: {
    listFiles(
      prefix: string = ""
    ): Promise<{ files: string[]; folders: string[] }> {
      return axios.get(
        `${getLabsBaseUrl()}/gc-storage/buckets/evercam-labs/files`,
        {
          params: {
            prefix,
          },
          preserveCasing: true,
        }
      )
    },
    getSignedUrl(fileName: string): Promise<{ url: string }> {
      return axios.get(
        `${getLabsBaseUrl()}/gc-storage/buckets/evercam-labs/files/signed-url`,
        {
          params: {
            fileName,
          },
          preserveCasing: true,
        }
      )
    },
  },
  luminance: {
    getReadings(params: {
      cameraExid: CameraExid
      fromDate: string
      toDate: string
    }): Promise<LuminanceReading[]> {
      return axios.get(
        `${getLabsBaseUrl()}/cameras/${
          params.cameraExid || "echel-mdqur"
        }/luminance/readings`,
        {
          params: {
            fromDate: params.fromDate,
            toDate: params.toDate,
          },
          preserveCasing: true,
        }
      )
    },
  },
  kits: {
    getMetrics(
      kitId: string,
      metrics: GrafanaMetricId[]
    ): Promise<GrafanaKitMetrics> {
      return axios.get(`${getLabsBaseUrl()}/kits/${kitId}/metrics`, {
        params: {
          metrics,
        },
        preserveCasing: true,
      })
    },
  },
}
