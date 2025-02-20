import { DateType, Schedule } from "@/types"

export enum TimelapseStatus {
  Pending = 11,
  Completed = 5,
  Failed = 7,
}

export enum TimelapseDuration {
  ThirtySeconds = 30,
  SixtySeconds = 60,
  NintySeconds = 90,
}

export type TimelapseVideoOptions = {
  width?: number
  height?: number
  removeTimestamp: boolean
  smoothTransition: boolean
  evercamWatermark: boolean
}

export type TimelapseLogoOptions = {
  id: number
  x: number
  y: number
  width: number
  height: number
}

export type TimelapseSchedules = string | Schedule

export enum TimelapseScheduleType {
  Continuous = "continuous",
  WorkingHours = "workingHours",
  Custom = "custom",
}

export enum TimelapsePeriod {
  Day = 1,
  Week = 7,
  Month = 30,
  WholeProject = "whole_project",
  Custom = "custom",
}

export type TimelapseFilterQueryParams = {
  from?: DateType
  to?: DateType
  period?: TimelapsePeriod
  duration?: number
  schedule?: TimelapseSchedules
}

export type TimelapseCreationRequestPayload = {
  title: string
  duration: number
  fromDatetime: string
  toDatetime: string
  cameraExid: string
  schedule: Schedule
  videoOptions: TimelapseVideoOptions
  logo?: TimelapseLogoOptions
}

export type TimelapseCreationResponsePayload = {
  Timelapse: {
    camera: string
    createdAt: string
    fromDate: string
    id: number
    duration: number
    requestor: string
    schedule: Schedule
    status: number
    toDate: string
    updatedAt: string
  }
}

export type TimelapseSnapshotRequestPayload = {
  from: string
  to: string
  schedule: string
  count: number
}

export type TimelapseSnapshotResponsePayload = {
  snapshots: string[]
}

export enum TimelapseExportStep {
  Format = 1,
  Effects = 2,
  Confirm = 3,
  Finish = 4,
}
