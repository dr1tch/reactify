import type { CameraExid, DateTime, DateType } from "@/types"

export type ShareRequest = {
  cameraId: string
  createdAt: DateType | number
  email: string
  id: number
  rights: string
  sharerEmail: string
  sharerName: string
  userId: number
}

export type Share = {
  cameraId: string
  createdAt: DateType | number
  email: string
  fullname: string
  id: number
  lastSeenAt: DateType
  rights: string
  sessionCount: number
  sharerEmail: string
  sharerId: number
  sharerName: string
  userId: number
}

export type ShareRequestsResponsePayload = {
  shareRequests: ShareRequest[]
}

export type ShareOwner = {
  email: string
  fullname: string
  lastSeenAt: DateType
  sessionCount: number
}

export type SharesResponsePayload = {
  owner: ShareOwner
  shares: Share[]
}

export type ShareDeletionRequestPayload = {
  email?: string
  key?: string
  origin?: string
}

export type SharedUsersResponsePayload = Array<{
  email: string
  name: string
}>

export type ShareCreateRequestPayload = {
  email: string[] | string
  message?: string
  permission?: string
  rights: string
  apiId?: string
  apiKey?: string
}

export type ShareProjectCamerasRequestPayload = {
  email: string[]
  cameraExids: CameraExid[]
  message: string
  permission?: string
  rights: string
}

export type ShareCreateResponsePayload = {
  shares: Share[]
  shareRequests: ShareRequest[]
}

export type ShareRequestByKeyResponsePayload = {
  shareRequests: Array<{
    id: string
    email: string
    rights: string
    cameraId: string
    sharerName: string
    userId: string
    sharerEmail: string
    createdAt: DateType
  }>
}

export type ResendShareRequestPayload = {
  email: string
  apiId?: string
  apiKey?: string
}

export enum SharePermission {
  Minimum = "minimum",
  Share = "minimal+share",
  Full = "full",
  Custom = "custom",
}

export enum ShareType {
  Share = "share",
  Request = "request",
}

export enum ShareRequestStatus {
  All = "",
  Pending = -1,
  Cancelled = -2,
  Failed = -3,
  Used = 1,
}

export enum ShareVisibility {
  PublicDiscoverable = "publicDiscoverable",
  PublicUndiscoverable = "publicUndiscoverable",
  Private = "private",
}

export type ProjectShare = {
  id: number
  projectId: string
  userId: number
  email: string
  fullname: string
  sharerId: number
  sharerEmail: string
  sharerName: string
  role: "member" | "admin"
  cameras: Record<string, string>
  message: string | null
  updatedAt: DateType
  insertedAt: DateType
}

export type ProjectShareRequest = ProjectShare

export type ProjectShareResponse = {
  projectShares: ProjectShare[]
  projectShareRequests: ProjectShareRequest[]
}

export type AdminShare = {
  sharerId: number
  sharerFullname: string
  sharerApiId: string
  sharerApiKey: string
  shareeId: number
  shareeFullname: string
  shareeApiId: string
  shareeApiKey: string
  shareeEmail: string
  cameraId: number
  exid: string
  projectId: string
  name: string
  id: number
  message: string
  createdAt: DateType
}

export type CameraShareRequestPayload = {
  email: string[]
  rights: string
  message?: string
}

export type ShareQueryParams = {
  exid: string
  sharerFullname: string
  shareeFullname: string
  shareeEmail: string
}

export type CameraShare = {
  sharerId: number
  sharerFullname: string
  sharerApiId: string
  sharerApiKey: string
  shareeId: number
  shareeFullname: string
  shareeApiId: string
  shareeApiKey: string
  shareeEmail: string
  cameraId: number
  exid: string
  projectId: string
  name: string
  id: number
  message: string
  createdAt: DateTime
}

export type CameraShareRequestsQueryParams = {
  shareeEmail: string
  camera: string
  sharer: string
  status: string
}

export type CameraShareRequest = {
  id: number
  shareeEmail: string
  camera: string
  sharer: string
  message: number
  rights: string
  status: number
  projectId: string
  cameraExid: string
  apiId: string
  apiKey: number
  createdAt: DateTime
}
