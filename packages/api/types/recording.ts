import { ApiCredentials } from "@/types"
import { CancelToken } from "axios"

export type Snapshot = {
  createdAt: string
  data: string
  status?: string
}

export type NearestSnapshotRequestPayload = {
  apiKey?: string
  apiId?: string
  cancelToken?: object
}

export type AvailableDaysRequestPayload = {
  cameraId: string
  year: string
  month: string
  payload?: ApiCredentials
}
export type AvailableDaysResponsePayload = {
  days: Array<number>
}

export type AvailableHoursRequestPayload = {
  cameraId: string
  year: string
  month: string
  day: string
  payload?: ApiCredentials
  cancelToken?: CancelToken
}
export type AvailableHoursResponsePayload = {
  hours: Array<number>
}

export type NearestSnapshotResponsePayload = {
  snapshots: Array<{
    createdAt: string
    data: string
    notes?: string
  }>
}

export type SnapshotRangeRequestPayload = {
  from: string
  to: string
  limit?: number
  page?: number
  schedule?: boolean
  count?: number
}
export type SnapshotInstance = {
  createdAt: string
  notes?: string
  data?: string
}
export type SnapshotRangeResponsePayload = {
  snapshots: Array<SnapshotInstance>
}

export enum BrainTool {
  Detections = "detections",
  Segmentation = "sam",
  DepthAnalysis = "depthAnalysis",
}

export enum CloudRecordingFrequency {
  EverySecond = 60,
  Every2Seconds = 30,
  Every5Seconds = 12,
  Every10Seconds = 6,
  Every15Seconds = 4,
  Every30Seconds = 2,
  Every60Seconds = 1,
  Every5Minutes = 5,
  Every10Minutes = 10,
}

export enum CloudRecordingDuration {
  Infinity = -1,
  Day = 1,
  Week = 7,
  Month = 30,
  ThreeMonths = 90,
}

export enum CloudRecordingStatus {
  On = "on",
  Off = "off",
  Paused = "paused",
  OnScheduled = "on-scheduled",
}

export enum SnapshotExtractionInterval {
  EverySecond = 1,
  Every5Seconds = 5,
  Every10Seconds = 10,
  Every15Seconds = 15,
  Every20Seconds = 20,
  Every30Second = 30,
  EveryMinute = 60,
  Every5Minutes = 300,
  Every10Minutes = 600,
  Every15Minutes = 900,
  Every20Minutes = 1200,
  Every30Minutes = 1800,
  EveryHour = 3600,
  Every2Hours = 7200,
  Every6Hours = 21600,
  Every12Hours = 43200,
  Every24Hours = 86400,
}

export enum VpnServer {
  None = "None",
  OpenVPN1 = "OpenVPN1",
  OpenVPN2 = "OpenVPN2",
  OpenVPN3 = "OpenVPN3",
  OpenVPN4 = "OpenVPN4",
  OpenVPN5 = "OpenVPN5",
  PPTP1 = "PPTP1",
  PPTP2 = "PPTP2",
  WireGuard1 = "WireGuard1",
  WireGuard2 = "WireGuard2",
  WireGuard3 = "WireGuard3",
  WireGuard4 = "WireGuard4",
  WireGuard5 = "WireGuard5",
  WireGuard6 = "WireGuard6",
  WireGuard7 = "WireGuard7",
  WireGuard8 = "WireGuard8",
  WireGuard9 = "WireGuard9",
  WireGuard10 = "WireGuard10",
}
