import { CameraExid, DateType, PaginationParams, Schedule } from "@/types"

export type SnapshotExtractionQyeryParams = PaginationParams & {
  camera: string // search by camera name
  cameraExid: CameraExid
  status: SnapshotExtractionStatus
}

export enum SnapshotExtractionStatus {
  Completed = "completed",
  Failed = "failed",
  Processing = "processing",
}

export enum SnapshotExtractionType {
  Cloud = "cloud",
  Local = "local",
  Timelapse = "timelapse",
}

export type SnapshotExtraction = {
  id: number
  cameraId: number
  cameraExid: CameraExid
  cameraName: string
  fromDate: DateType
  toDate: DateType
  type: SnapshotExtractionType
  notes: string
  status: SnapshotExtractionStatus
  interval: number
  requestor: string
  jpegsToDropbox: boolean
  injectTo_cr: Boolean
  schedule: Schedule
  created_at: DateType
}

export type SnapshotTestPayload = {
  cameraExid?: CameraExid
  camUsername: string
  camPassword: string
  externalUrl: string
  jpgUrl: string
}

export type SnapshotTestResponse = {
  status: string
  data: string
}

export type DeleteSnapshotQueryParams = {
  fromDate: DateType
  toDate: DateType
  adminEmail: string
  adminFullname: string
}
