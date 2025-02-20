import { DateType } from "@/types/time"

export type _360CameraParams = {
  azimuthAngle: number
  polarAngle: number
}

export type _360Floor = {
  floorID: string
  name: string
}

export type _360Scene = {
  date: string // DD-MM-YYYY
  dateID: string
  floors: _360Floor[]
  polarAngle: number
  azimuthAngle: number
}

export type _360ProjectJsonResponse = {
  dates: _360Scene[]
  [key: string]: any
}

export type MobileCaptureSnapshot = {
  id: string
  uploadedBy: string
  updatedAt: string //YYYY-MM-DDTHH:mm:SS.MS (ISO)
  assetType: string //mobile_photos or mobile_audios
  thumbnailUrl: string //presigned S3 URL
}

export enum _360UrlParams {
  DateId = "date_id",
  Floor = "floor",
  Marker = "marker",
  PolarAngle = "polarAngle",
  AzimuthAngle = "azimuthAngle",
}

export enum _360AssetType {
  Video = "video",
  Image = "image",
  Model = "model",
  Route = "route",
  MobilePhoto = "mobile_photos",
  MobileAudio = "mobile_audios",
}

export enum _360IntergrationType {
  Matterport = "Matterport",
  OpenSpace = "Openspace",
  HoloBuilder = "Holobuilder",
  DroneDeploy = "Dronedeploy",
  Evercam = "Evercam",
}

export type _360AssetsQueryParams = {
  page: number
  limit: number
  projectID: string
  date: DateType
  floor: string
  id: string
}

export type _360AssetsRequestPayload = {
  projectId: string
  date: DateType
  floor: string
  uploadedBy?: string
}

export type _360AssetsUploadPayload = {
  targetPointsCount: number
  assetType: string
  upload: {
    url: string
    title: string
    fileExtension: string
  }[]
  deviceSerial: string
  startPosition: string
  endPosition: string
  isTimelapse: boolean
}

export type Generate360MapRequestPayload = {
  dateId: string
  floorId: string
  cameraOffset: string
  startPoint: string
  endPoint: string
}
