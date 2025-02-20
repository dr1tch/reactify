import {
  CountryCode,
  CountryId,
  DateType,
  Nvr,
  PaginationParams,
  PowerType,
  Project,
  Region,
  Router,
  Schedule,
} from "@/types"

export type Kit = {
  countryCode: CountryCode
  countryId: CountryId
  countryName: string
  countryRegion: Region
  id?: number
  jobId: number
  locationId: KitLocationId
  name: string
  nvr: Nvr
  powerType: PowerType
  project: Project
  projectId: number
  router: Partial<Router>
  serial: string
  status: KitStatus
}

export enum KitLocationId {
  IeWarehouse = 1,
  Deployed = 2,
  CustomerStorage = 3,
  UsWarehouse = 4,
  AuWarehouse = 5,
  UkWarehouse = 6,
}

export enum KitStatus {
  New = "new",
  Active = "active",
  OfflineScheduled = "offline_scheduled",
  Decommissioned = "decommissioned",
}

export enum GrafanaMetricId {
  SbcCpuLoad = "SbcCpuLoad",
  SbcSystemLoad5MnAvg = "SbcSystemLoad5MnAvg",
  SbcSystemLoad15MnAvg = "SbcSystemLoad15MnAvg",
  SbcRamUsed = "SbcRamUsed",
  SbcSwapUsed = "SbcSwapUsed",
  SbcRootFsUsed = "SbcRootFsUsed",
  SbcCpuCoresTotal = "SbcCpuCoresTotal",
  SbcRamTotal = "SbcRamTotal",
  SbcSwapTotal = "SbcSwapTotal",
  SbcRootFsTotal = "SbcRootFsTotal",
  SbcUptime = "SbcUptime",
  SbcCpuStats = "SbcCpuStats",
  SbcRamStats = "SbcRamStats",
  SbcNetworkStats = "SbcNetworkStats",
  SbcTimeSyncStats = "SbcTimeSyncStats",
  SbcTemperatureStats = "SbcTemperatureStats",
  SbcTimeSyncDriftStats = "SbcTimeSyncDriftStats",
  CameraInfo = "CameraInfo",
  CameraRecordingStateTimeline = "CameraRecordingStateTimeline",
  CameraStreamInfo = "CameraStreamInfo",
  HddInfo = "HddInfo",
  HddStats = "HddStats",
  RouterTemperature = "RouterTemperature",
  RouterCpuLoad = "RouterCpuLoad",
  RouterRamUsed = "RouterRamUsed",
  RouterSystemLoad5MnAvg = "RouterSystemLoad5MnAvg",
  RouterSwapTotal = "RouterSwapTotal",
  RouterRamTotal = "RouterRamTotal",
  RouterUptime = "RouterUptime",
  RouterCpuCoresTotal = "RouterCpuCoresTotal",
  RouterSignalReliability = "RouterSignalReliability",
  RouterSINR = "RouterSINR",
  RouterRSRP = "RouterRSRP",
  RouterRSRQ = "RouterRSRQ",
  RouterRSSI = "RouterRSSI",
  RouterSignalStrengthStats = "RouterSignalStrengthStats",
  RouterSignalQualityStats = "RouterSignalQualityStats",
  RouterDataConsumptionStats = "RouterDataConsumptionStats",
  BatteryVoltageAndCurrentStats = "BatteryVoltageAndCurrentStats",
  PanelVoltageAndPowerStats = "PanelVoltageAndPowerStats",
  ExNvrStatus = "ExNvrStatus",
  ExNvrVersion = "ExNvrVersion",
  ExNvrMemoryUsage = "ExNvrMemoryUsage",
  ExNvrLogs = "ExNvrLogs",
}

export enum GrafanaChartType {
  Stat = "stat",
  Gauge = "gauge",
  Graph = "graph",
  Table = "table",
  StateTimeline = "state-timeline",
  Logs = "logs",
  TimeSeries = "timeseries",
  BarChart = "barchart",
}

export type GrafanaDataSource = {
  type: string
  uid: string
}

export type GrafanaTarget = {
  expr: string
  refId: string
  datasourceId?: string
  intervalMs?: number
  maxDataPoints?: number
}

export type GrafanaPanel = {
  [key: string]: unknown
  id: GrafanaMetricId
  name: keyof GrafanaMetricId
  title: string
  description: string
  type: GrafanaChartType
  datasource: GrafanaDataSource
  targets: GrafanaTarget[]
  maxDataPoints?: number
  interval?: string
  timeFrom?: string
  timeShift?: string
  options?: {
    maxDataPoints?: number
    interval?: string
  }
}

export type GrafanaDashboard = {
  [key: string]: unknown
  panels: GrafanaPanel[]
  time?: {
    from: string
    to: string
  }
  timepicker?: {
    refresh_intervals: string[]
    time_options: string[]
  }
}

export type GrafanaQueryOptions = {
  metricId: GrafanaMetricId
  host: string
  job?: string
  from?: string
  to?: string
  variables?: Record<string, string>
}

export type GrafanaTimeSeriesValue = number | string | null
export type GrafanaTimeSeriesValues = GrafanaTimeSeriesValue[][]

export type GrafanaFieldConfig = {
  displayNameFromDS?: string
  links?: string[]
  color?: string
  custom?: {
    lineInterpolation?: string
    fillOpacity?: number
    gradientMode?: string
    lineWidth?: number
    spanNulls?: boolean
    resultType?: string
  }
  thresholds?: {
    mode: string
    steps: Array<{
      color: string
      value: number | null
    }>
  }
  unit?: string
  decimals?: number
  interval?: number
}

export type GrafanaField = {
  name: string
  type: string
  typeInfo: {
    frame: string
    nullable?: boolean
  }
  config: GrafanaFieldConfig
  labels?: {
    [key: string]: string
  }
  values?: GrafanaTimeSeriesValues
}

export type GrafanaSchemaMeta = {
  type?: string
  typeVersion?: number[]
  custom?: {
    resultType?: string
    frameType?: string
  }
  stats?: Array<{
    displayName: string
    value: number
    unit?: string
  }>
  executedQueryString?: string
}

export type GrafanaSchema = {
  name?: string
  refId: string
  meta: GrafanaSchemaMeta
  fields: GrafanaField[]
}

export type GrafanaFrame = {
  schema: GrafanaSchema
  data: {
    values: GrafanaTimeSeriesValues
    nanos?: Array<number[] | null>
  }
}

export type GrafanaQueryResult = {
  status: number
  frames: GrafanaFrame[]
}

export type GrafanaMetricResponse = {
  results: {
    [key: string]: GrafanaQueryResult
  }
  type: GrafanaChartType
}

export type GrafanaKitMetrics = Record<
  keyof typeof GrafanaMetricId,
  GrafanaMetricResponse
>

export type KitQueryParams = PaginationParams & {
  name: string
  serial: string
  status: KitStatus
}

export type AdminKit = {
  id: number
  name: string
  serial: string
  status: string
  powerType: PowerType
  locationId: number
  location: string
  countryId: number
  countryName: string
  countryRegion: string
  nvr: Nvr
  router: {
    id: number
    serialNumber: number
    vpnUserId: string
    vpnPassword: string
    routerType: string
    routerUserId: string
    routerPassword: string
    routerHttpPort: number
    powerType: PowerType
    powerSchedule: Schedule
    vpnServer: string
    netbirdUrl: string
    sims: {
      id: number
      number: string
    }[]
  }
  project: {
    id: number
    exid: string
    name: string
    timezone: string
    status: string
    zohoId: string
    insertedAt: DateType
  }
}

export type KitCreatePayload = {
  projectId?: number
  locationId?: number
  countryCode?: string
  name: string
  status: KitStatus
  powerType: PowerType
  config: {
    region: Region
  }
}

export type KitUpdatePayload = {
  locationId: number
  countryId: number
  name: string
  kitSerial: string
  kitStatus: KitStatus
  type: string
}
