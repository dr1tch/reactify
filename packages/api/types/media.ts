import type { CameraExid, Exid, DateType } from "@/types"

export type MediaExid = Exid

export type Media = {
  project_exid?: string
  cameraExid?: CameraExid
  cameraName: string
  cameraTimezone: string
  createdAt: string
  fromDate: string
  id: number
  requesterEmail: string
  requesterName: string
  title: string
  toDate: string
  url?: string
  exid?: MediaExid
  embedCode?: string
  fileName?: string
  format?: string
  frames?: number
  link?: string
  public?: boolean
  type: MediaType
  status?: MediaStatus
  projectExid?: string
  thumbnailUrl?: string
  mediaUrl?: string
}

export enum MediaType {
  EditedImage = "edit",
  ExternalUrl = "url",
  Clip = "clip",
  File = "file",
  LocalClip = "local_clip",
  XRay = "x-ray",
  Timelapse = "timelapse",
  Compare = "compare",
  MobileAsset = "mobile-asset",
}

export enum MediaFileType {
  Gif = "gif",
  Mp4 = "mp4",
  Png = "png",
  Pdf = "pdf",
  Jpeg = "jpeg",
}

export enum MediaStatus {
  Pending = "Pending",
  Creating = "Creating",
  Processing = "Processing",
  Extracting = "Extracting",
  Uploading = "Uploading",
  Completed = "Completed",
  Failed = "Failed",
  NoData = "No Data",
}

export enum MediaStatusId {
  Pending = 0,
  Processing = 1,
  Completed = 2,
  Failed = 3,
}

export type MediaFilterQueryParams = {
  title?: string
  sort?: string
  sortBy?: string
  dateRange?: string | string[]
  fromDate?: string
  toDate?: string
  cameraName?: string
  requesterEmail?: string
  type?: MediaType
  cameraExid?: string
  page?: number
  limit?: number
  camera?: string
}

export type MediaUpdateRequestPayload = {
  name?: string
  title?: string
  public?: boolean
}

export type MediaCreateRequestPayload = {
  fromDate: DateType
  toDate: DateType
  title: string
  type: MediaType
  fileUrl?: string
  fileExtension?: string
  url?: string
  content?: string
  cameraExid?: string
  requestedBy?: string
  notes?: string
  category?: ClipsCategory
  isUrgent?: boolean
  storeAsType?: MediaType
}

export type MediaUsersResponsePayload = Array<{
  id: number
  email: string
  name: string
}>
export enum ClipsCategory {
  HealthSafetySecurity = "health_safety_security",
  Legal = "legal",
  Marketing = "marketing",
  BestPracticies = "best_practices",
}

export type MediaDeleteRequestPayload = {
  timelapseIds: (string | number)[]
  compareIds: (string | number)[]
  archiveIds: (string | number)[]
}
