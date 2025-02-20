import { axios } from "./client"
import { toQueryString } from "../utils"
import type {
  AnprQueryParams,
  AnprEvent,
  EventCountRequestPayload,
  EventCountResponsePayload,
  EventsExportRequestParameters,
  EventsRequestPayload,
  EventsResponsePayload,
  GateReportROI,
  PaginatedItems,
  GateReportVerifiedDay,
  ProjectExid,
  CameraExid,
  AnprCountsQueryParams,
  AnprCount,
  AnprBasedGateReportExportRequestParams,
  GateReportResponsePayload,
  GatReportRequestPayload,
  AnalyticsParameters,
  VerifiedDaysQueryParams,
  EventUpdateRequestPayload,
  VerifyDayUpdateRequestPayload,
  ProcessedDaysQueryParams,
  GateReportEventType,
  DateTime,
  RoisQueryParams,
  GateReportROICreateRequestPayload,
} from "@evercam/api/types"
import type { AxiosPromise, AxiosRequestConfig } from "axios"
import { VEHICLE_TYPE_IDS } from "@evercam/api/types"

export const getAiApiUrl = () => {
  if (axios.env.isStaging) {
    return axios.env.stagingAiApiUrl
  }

  return axios.env.aiApiUrl
}

export const AiApi = {
  analyticsParameters: {
    getParameters(
      cameraId: CameraExid,
      params: Record<string, unknown> = {}
    ): Promise<AnalyticsParameters> {
      return axios.get(
        `${getAiApiUrl()}/cameras/${cameraId}/analytics-parameters`,
        {
          params,
        }
      )
    },
    createParameters(
      params: Omit<AnalyticsParameters, "id">
    ): Promise<AnalyticsParameters> {
      return axios.post(`${getAiApiUrl()}/cameras/analytics-parameters`, params)
    },
    updateParameters({
      updatedBy,
      id,
      ...payload
    }: Partial<AnalyticsParameters> & {
      updatedBy: string
    }): Promise<AnalyticsParameters> {
      return axios.patch(
        `${getAiApiUrl()}/cameras/analytics-parameters/${id}?${toQueryString({
          updatedBy,
        })}`,
        payload
      )
    },
  },
  anpr: {
    exportAnprLegacyEvents(projectExid: ProjectExid, params: AnprQueryParams) {
      return axios({
        url: `${getAiApiUrl()}/projects/${projectExid}/anpr/export?${toQueryString(
          params
        )}`,
        method: "GET",
        responseType: "blob",
      })
    },
    getAnprEvents(
      projectExid: ProjectExid,
      params: AnprQueryParams
    ): Promise<PaginatedItems<AnprEvent>> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/anpr?${toQueryString(params)}`
      )
    },
    getAnprCounts(
      projectExid: ProjectExid,
      payload: AnprCountsQueryParams
    ): Promise<AnprCount[]> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/anpr/counts?${toQueryString(
          payload
        )}`
      )
    },
    updateAnprEvent(anprEventId: string, eventBody: Record<string, unknown>) {
      return axios.patch(`${getAiApiUrl()}/projects/anpr/${anprEventId}`, {
        ...eventBody,
      })
    },
    bulkUpdateAnprRecords(
      anprEventsIds: number[],
      action: "is_plate" | "not_plate" | "is_duplicate" | "not_duplicate"
    ) {
      return axios.patch(
        `${getAiApiUrl()}/projects/anpr/update/status?${toQueryString({
          anprEventsIds,
          action,
        })}`
      )
    },
    exportAnprEvents(
      projectExid: string,
      params: AnprBasedGateReportExportRequestParams
    ): AxiosPromise<string> {
      return axios({
        url: `${getAiApiUrl()}/projects/${projectExid}/anpr/events/export?${toQueryString<AnprBasedGateReportExportRequestParams>(
          params
        )}`,
        method: "GET",
        responseType: "blob",
      })
    },
  },
  gateReport: {
    getGateReportProjects(params: Record<string, unknown>) {
      return axios.get(
        `${getAiApiUrl()}/projects/gate-report/get-projects-data`,
        params
      )
    },
    getLastVerified(params: Record<string, unknown>) {
      return axios.get(
        `${getAiApiUrl()}/projects/gate-report/last-verified`,
        params
      )
    },
    deleteEvent(id: number, params: Record<string, unknown>) {
      return axios.delete(
        `${getAiApiUrl()}/projects/events/${id}?${toQueryString(params)}`
      )
    },
    dismissEvents(params: Record<string, unknown>) {
      return axios.delete(
        `${getAiApiUrl()}/projects/events?${toQueryString(params)}`
      )
    },
    exportEvents(projectExid: string, params: EventsExportRequestParameters) {
      return axios({
        url: `${getAiApiUrl()}/projects/${projectExid}/gate-report/events/export?${toQueryString<EventsExportRequestParameters>(
          params
        )}`,
        method: "GET",
        responseType: "blob",
      })
    },
    exportEventsProgress(projectExid: string, params: { exportDate: string }) {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/gate-report/events/export/progress?${toQueryString(
          params
        )}`
      )
    },
    getAllEvents(
      projectExid: ProjectExid,
      params: EventsRequestPayload,
      extraParams?: AxiosRequestConfig
    ): Promise<EventsResponsePayload> {
      if (!params.vehicleTypes) {
        params.vehicleTypes = VEHICLE_TYPE_IDS
      }
      if (!params.truckTypes) {
        params.vehicleTypes = VEHICLE_TYPE_IDS
      }
      if (!params.camerasExid) {
        params.camerasExid = params.cameras
      }

      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/events?${toQueryString(
          params
        )}`,
        extraParams
      )
    },
    getEventCounts(
      projectExid: string,
      payload: EventCountRequestPayload = {},
      extraParams?: AxiosRequestConfig
    ): Promise<EventCountResponsePayload> {
      if (!payload.vehicleTypes) {
        payload.vehicleTypes = VEHICLE_TYPE_IDS
      }

      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/project-stats?${toQueryString(
          payload
        )}`,
        {
          ...(extraParams || {}),
        }
      )
    },
    getVerifiedDays(
      projectExid: ProjectExid,
      params: Partial<VerifiedDaysQueryParams>,
      extraParams = {}
    ): Promise<PaginatedItems<GateReportVerifiedDay>> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/gate-report/verified-days?${toQueryString(
          params
        )}`,
        extraParams
      )
    },
    updateEventById(
      eventId: number,
      {
        updatedBy,
        payload,
      }: {
        updatedBy: string
        payload: Partial<EventUpdateRequestPayload>
      }
    ) {
      return axios.patch(
        `${getAiApiUrl()}/projects/events/${eventId}?${toQueryString({
          updatedBy,
        })}`,
        payload
      )
    },
    verifyDay(params: VerifyDayUpdateRequestPayload) {
      return axios.post(
        `${getAiApiUrl()}/projects/gate-report/verified-days`,
        params
      )
    },
    regenerateThumbnail(id: number, params: { cameraExid: string }) {
      return axios.put(
        `${getAiApiUrl()}/projects/gate-report/event-thumbnail/render/${id}?${toQueryString(
          params
        )}`,
        {
          method: "PUT",
        }
      )
    },
    getDailyStatus(
      projectExid: string,
      params: Partial<ProcessedDaysQueryParams> = {}
    ) {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/processed-days`,
        { params }
      )
    },
    getEventThumbnail({
      cameraExid,
      eventType,
      eventTime,
      token,
    }: {
      cameraExid: string
      eventType: GateReportEventType
      eventTime: DateTime
      token: string
    }) {
      return `${getAiApiUrl()}/cameras/${cameraExid}/gate-report/${eventType}/${eventTime}/thumbnail?authorization=${token}`
    },
    getEventSnapshot({
      cameraExid,
      eventType,
      eventTime,
      token,
    }: {
      cameraExid: string
      eventType: GateReportEventType
      eventTime: DateTime
      token: string
    }) {
      return `${getAiApiUrl()}/cameras/${cameraExid}/gate-report/${eventType}/${eventTime}/snapshot?authorization=${token}`
    },
    getEvents(
      projectExid: ProjectExid,
      params: GatReportRequestPayload,
      extraParams: AxiosRequestConfig = {}
    ): Promise<GateReportResponsePayload> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/gate-report/events?${toQueryString(
          params
        )}`,
        extraParams
      )
    },
    getCounts(
      projectExid: string,
      payload: EventCountRequestPayload = {},
      extraParams: AxiosRequestConfig = {}
    ): Promise<EventCountResponsePayload> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/gate-report/counts?${toQueryString(
          payload
        )}`,
        extraParams
      )
    },
  },
  brainTool: {
    getObjectDetectionsResults(payload = {}) {
      return axios.post(`${getAiApiUrl()}/ai-models/object-detection`, payload)
    },
    getSegments(payload = {}) {
      return axios.post(`${getAiApiUrl()}/ai-models/segment`, payload)
    },
    async getDepth(cameraExid: string, timestamp: string) {
      return axios.post(`${getAiApiUrl()}/depth-estimation`, {
        cameraex: cameraExid,
        timestamp,
      })
    },
  },
  roi: {
    getROIs(
      projectExid: string,
      params: Partial<RoisQueryParams> = {}
    ): Promise<GateReportROI[]> {
      return axios.get(
        `${getAiApiUrl()}/projects/${projectExid}/rois?${toQueryString(params)}`
      )
    },
    createROI(params: GateReportROICreateRequestPayload) {
      return axios.post(`${getAiApiUrl()}/projects/rois`, params)
    },
    updateROI({
      updatedBy,
      roi,
    }: {
      updatedBy: string
      roi: GateReportROICreateRequestPayload
    }) {
      return axios.patch(
        `${getAiApiUrl()}/projects/rois/${roi.id}?${toQueryString({
          updatedBy,
        })}`,
        roi
      )
    },
    deleteROI({ id, updatedBy }: { id: number; updatedBy: string }) {
      return axios.patch(
        `${getAiApiUrl()}/projects/rois/${id}?${toQueryString({
          updatedBy,
        })}`,
        { isactive: false, note: "delete roi" }
      )
    },
  },
}
