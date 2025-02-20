import { DateTime, DateType, PaginationParams } from "@/types"
export type ProgressPhoto = {
  cameraIds: string
  cameraNames: number
  createdAt: string
  id: number
  provider: string
  config: Partial<{
    recipients: string
    projectId: number
    companyId: number
  }>
  isPaused: boolean
  notifyDays: string
  notifyTime: string
  requesterEmail: string
  requesterName: string
  timezone: string
  title: string
}

export type ProgressPhotosCreateUpdateRequestPayload = {
  cameraExids?: string
  notifyDays?: string
  notifyTime?: string
  provider?: string
  config?: {
    recipients?: string
    projectId?: number
    companyId?: number
    catergoryId?: string
  }
  subject?: string
  isPaused?: boolean
  timezone?: string
}

export type ProgressPhotosUnSubscribeParams = {
  email: string
  token?: string
}

export type ProgressPhotosResponsePayload = {
  progressPhotos: ProgressPhoto[]
}

export enum ProgressPhotoDialogType {
  Create = "create",
  Edit = "edit",
  Pause = "pause",
}

export type CameraOption = {
  exid: string
  name: string
}

export interface ProgressPhotoItem {
  id: number
  cameras: CameraOption[] | string[] | string
  insertedAt: string
  provider: string
  config: {
    recipients: string | string[]
    sendSnapshotAs: string
  }
  isPaused: boolean
  notifyDays: string | string[]
  notifyTime: string
  api_id: string
  api_key: string
  timezone: string
  exid: string
  fullname: string
}

export type ProgressPhotosQueryParams = PaginationParams & {
  fullname: string
  recipients: string
  notifyTime: string
  timezone: string
  cameras: string
}

export type progressPhotosHistoryQueryParams = {
  insertedAt: DateType[]
  recipients: string
  subject: string
  cameraId: string
  failedCameraId: string
}

export type ProgressPhotosHistory = {
  id: number
  cameraIds: string
  failedCameraIds: string
  subject: string
  recipients: DateTime
}
