import { DateType } from "@/types"

type sortby = string
type sortDirection = "asc" | "desc"

export type SortingUrlParam = `${sortby}|${sortDirection}`

export type BatteryReading = {
  id: number
  voltage: number
  datetime: DateType
  serialNo: string
  iValue: number
  vpvValue: number
  ppvValue: number
  csValue: number
  errValue: number
  h19Value: number
  h20Value: number
  h21Value: number
  h22Value: number
  h23Value: number
  ilValue: number
  mpptValue: number
  loadValue: number
  pValue: number
  consumedAmphours: number
  socValue: number
  timeToGo: number
  alarm: string
  relay: string
  arValue: number
  bmvValue: number
  h1Value: number
  h2Value: number
  h3Value: number
  h4Value: number
  h5Value: number
  h6Value: number
  h7Value: number
  h8Value: number
  h9Value: number
  h10Value: number
  h11Value: number
}

export interface PaginatedItems<T> {
  from: number
  items: Array<T>
  limit: number
  page: number
  to: number
  total: number
}

export enum UnitSystem {
  Imperial = "imperial",
  Metric = "metric",
}

export type Timestamp = string | number

export type Schedule = {
  Friday: string[]
  Monday: string[]
  Saturday: string[]
  Sunday: string[]
  Thursday: string[]
  Tuesday: string[]
  Wednesday: string[]
}

export type ScheduleLowercase = {
  friday: string[]
  monday: string[]
  saturday: string[]
  sunday: string[]
  thursday: string[]
  tuesday: string[]
  wednesday: string[]
}

export type PaginationParams = {
  sort?: SortingUrlParam
  page?: number
  limit?: number
}

export type LabsPaginationParams = {
  sortBy?: string
  sortDirection?: "asc" | "desc"
  page?: number
  limit?: number
}

export enum MobileDevice {
  Ios = "ios",
  Android = "android",
}

export enum _3dViewer {
  Itwin = "itwin",
  Cesium = "cesium",
}

export enum SsoProvider {
  Microsoft = "microsoft",
  Google = "google",
  Evercam = "evercam",
}

export enum InfoPage {
  ThreeSixtyView = "360",
  BIMView = "bim",
  BimCompare = "bim-compare",
  GateReport = "gate-report",
  DroneView = "drone-view",
}

export enum DownloadTypes {
  Jpeg = "jpeg",
  Pdf = "pdf",
  Csv = "csv",
}

export enum FeedbackContext {
  CopilotMessage = "copilot_message",
}

export type FeedbackPayload<T> = {
  id?: number
  user: string
  text: string
  type: T
  context: FeedbackContext
  messageId?: number
  conversationId?: number
}

export type Stringified<T> = string & {
  [P in keyof T]: { "_ value": T[P] }
}

export interface JSON {
  stringify<T>(
    value: T,
    replacer?: (key: string, value: unknown) => unknown,
    space?: string | number
  ): string & Stringified<T>

  parse<T>(
    text: Stringified<T>,
    reviver?: (key: unknown, value: unknown) => unknown
  ): T
}

export type Exid = string

export type EntityByExid<Entity extends unknown> = Record<Exid, Entity>

export type BatteryVoltage = {
  date: DateType
  max_value: number
  min_value: number
}

export type GlobalSearchQueryParams = PaginationParams & {
  resource: "projects" | "users" | "cameras" | "companies" | "sims" | "routers"
  term: string
  email: string
  featureFlag: string
}

export type TimelineDateInterval = {
  fromDate: string
  toDate: string
}

export enum TimelinePrecision {
  Year = "year",
  Month = "month",
  Week = "week",
  Day = "day",
  Hour = "hour",
  Minute = "minute",
  Events = "events",
}

export type EntityStatsQueryParams = {
  period: "day" | "week" | "month"
  startDate: string
  endDate: string
}

export type EntityStat = {
  period: string
  name: string
  count: number
}

export enum TaskStatus {
  Idle = "idle",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export type PatchPayload<T> = Partial<T> & { [K in keyof T]?: T[K] | undefined }

export enum PtzDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}
export type MoveParams = {
  cameraExid: string
  direction: PtzDirection
  isRecordingFromNvr: boolean
}

export enum ZoomDirection {
  In = "in",
  Out = "out",
}
export type ZoomParams = {
  cameraExid: string
  direction: ZoomDirection
  isRecordingFromNvr: boolean
}
