import {
  MilesightCameraNetworkConfiguration,
  MilesightCameraOsdConfiguration,
  MilesightCameraSdCardInfo,
  MilesightCameraSystemSettings,
  MilesightCameraTimeInfo,
  MilesightCameraVideoConfig,
  TaskStatus,
  DateTime_Z_micros,
  GrafanaChartType,
} from "@/types"

export enum ExNvrHealthCheckTaskId {
  ExNvrLogin = "exNvrLogin",
  ExNvrConfigCheck = "exNvrGetDeviceInfo",
  ExNvrSystemStatus = "exNvrSystemStatus",
  ExNvrRecordings = "exNvrGetRecordings",
  CameraSystemConfigCheck = "getCameraSystemInfo",
  CameraTimeConfigCheck = "getCameraTimeInfo",
  CameraStreamsConfigCheck = "getCameraStreamsInfo",
  CameraNetworkConfigCheck = "getCameraNetworkInfo",
  CameraOsdConfigCheck = "getCameraOsdInfo",
  CameraStorageConfigCheck = "getCameraStorageInfo",
}

export type ExNvrHealthCheckTaskResult<T extends ExNvrHealthCheckTaskId> =
  T extends ExNvrHealthCheckTaskId.ExNvrLogin
    ? ExNvrLoginResponse
    : T extends ExNvrHealthCheckTaskId.ExNvrConfigCheck
    ? ExNvrDeviceConfig
    : T extends ExNvrHealthCheckTaskId.ExNvrSystemStatus
    ? ExNvrSystemStatus
    : T extends ExNvrHealthCheckTaskId.ExNvrRecordings
    ? ExNvrRecordingInterval[]
    : T extends ExNvrHealthCheckTaskId.CameraStreamsConfigCheck
    ? MilesightCameraVideoConfig
    : T extends ExNvrHealthCheckTaskId.CameraSystemConfigCheck
    ? MilesightCameraSystemSettings
    : T extends ExNvrHealthCheckTaskId.CameraTimeConfigCheck
    ? MilesightCameraTimeInfo
    : T extends ExNvrHealthCheckTaskId.CameraNetworkConfigCheck
    ? MilesightCameraNetworkConfiguration
    : T extends ExNvrHealthCheckTaskId.CameraOsdConfigCheck
    ? MilesightCameraOsdConfiguration
    : T extends ExNvrHealthCheckTaskId.CameraStorageConfigCheck
    ? MilesightCameraSdCardInfo
    : never

export type ExNvrHealthCheckTask<T extends ExNvrHealthCheckTaskId> = {
  id: T
  status: TaskStatus
  duration?: number
  result?: ExNvrHealthCheckTaskResult<T>
  error?: Error
}

export type ExNvrLoginResponse = { accessToken: string }

export type ExNvrRecordingInterval = {
  active: boolean
  startDate: DateTime_Z_micros
  endDate: DateTime_Z_micros
}

export type ExNvrDeviceConfig = {
  id: string
  name: string
  type: string
  state: ExNvrDeviceState
  credentials: {
    password: string
    username: string
  }
  mac: string
  url: string
  insertedAt: string
  updatedAt: string
  settings: {
    storageAddress: string
    overrideOnFullDisk: boolean
    overrideOnFullDiskThreshold: number
    generateBif: boolean
  }
  vendor: string
  model: string
  streamConfig: {
    filename: string | null
    duration: string | null
    temporaryPath: string | null
    snapshotUri: string
    streamUri: string
    subStreamUri: string
  }
  timezone: string
}

export enum ExNvrFootageAvailableStatus {
  Active = "Active",
  NotActive = "Not Active",
  NotAvailable = "Not Available",
}

export enum ExNvrDeviceState {
  Recording = "recording",
  Failed = "failed",
  Stopped = "stopped",
}

export type ExNvrCpuStatus = {
  load: number[]
  numCores: number
}

export type ExNvrMemoryStatus = {
  systemTotalMemory: number
  freeMemory: number
  totalMemory: number
  bufferedMemory: number
  cachedMemory: number
  totalSwap: number
  freeSwap: number
  availableMemory: number
}

export type ExNvrSolarChargerStatus = {
  v: number
  vpv: number
  ppv: number
  i: number
  il: number
  load: string
  relayState: string
  offReason: number
  h19: number
  h20: number
  h21: number
  h22: number
  h23: number
  err: number
  cs: string
  fw: string
  pid: string
  serialNumber: string
}

export type ExNvrSystemStatus = {
  version: string
  cpu: ExNvrCpuStatus
  memory: ExNvrMemoryStatus
  solarCharger: ExNvrSolarChargerStatus
}

export enum ExNvrMetricId {
  CpuUsage = "cpu_usage",
  RamUsage = "ram_usage",
  SwapUsage = "swap_usage",
}

export type ExNvrMetric = {
  metricId: ExNvrMetricId
  type: GrafanaChartType
  value: number
}
