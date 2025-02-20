import { DateTime, DateType } from "@/types"

export enum BimModelType {
  Architectural = "Architectural",
  Structural = "Structural",
  FourD = "4D",
  Mep = "Mep",
}

export type BimSnapshotRequestPayload = {
  model: string
  layerTimestamp: string
  apiKey: string
  apiId: string
}

export type BimSnapshotResponsePayload = {
  imageUrl?: string
}

export type BimModelRequestPayload = {
  model?: string
  timestamp?: string
  apiKey?: string
  apiId?: string
}

export type BimModelResponsePayload = {
  dates?: [string]
  height?: number
  imageUrl?: string
  model?: string
  models?: [string]
  rotation?: number
  scaleX?: number
  scaleY?: number
  viewerHeight?: number
  viewerWidth?: number
  width?: number
  x?: number
  y?: number
}

export type BimCompareExportRequestPayload = {
  name: string
  cameraExid: string
  snapshotDate: string
  bimDate: string
  embed: string
  compareExid: string
  createAnimation: boolean
  bimTransparency?: number
  model?: string
  layerId?: number
  maskId?: number
  evercamWatermark?: boolean
}

export type BimLayerResponsePayload = {
  id: number
  name: string
  insertedAt: DateTime
  updatedAt: DateTime
  shapes: string
  startAt: DateTime
}

export enum BimUploadStatus {
  Initial = 0,
  Saving = 1,
  Success = 2,
  Failed = 3,
}

export type BimCreationPayload = {
  title: string
  software:
    | "synchro"
    | "navisworks"
    | "revit"
    | "tekla"
    | "archicad"
    | "solibri"
    | "bim360"
    | "other"
  model: string
  apiKey: string
  apiId: string
  displayName: string
  fileUrl: string
  requestor: string
  finalView: boolean
  enableDistortion: boolean
  startAt: string
}

export enum BIMLayerTypes {
  Mask = "mask",
  MeasuringGrid = "measuring_grid",
  BimArchitectural = "bim_architectural",
  BimStructural = "bim_structural",
  Bim4D = "bim_4d",
  BimMep = "bim_mep",
  RecordingsTag = "recordings_tag",
  Milestone = "milestone",
}

export type BimLayersQueryParams = {
  layerType: BIMLayerTypes
  timestamp: DateType
}

export type BIMLayerPostPayload = {
  name: string
  layerType: BIMLayerTypes
  startAt: DateType
  shapes: string
  zIndex: number
}

export type BIMLayer = {
  id: number
  name: string
  layerType: BIMLayerTypes
  startAt: DateType
  insertedAt: DateType
  updatedAt: DateType
  shapes: string
}

export type BimPendingImage = {
  url: string
  s3Url: string
}

export type BimUploadCameraParameters = {
  distortionFov: [number]
  horizontalFov: number
  verticalFov: number
  focalLength1: number
  focalLength2: number
  centerX: number
  centerY: number
}

export type PendingBimImagesParams = {
  model: string
  apiKey: string
  apiId: string
}

export type ProcessPendingImagesBimParams = {
  model: string
  names: string[]
  enableDistortion: boolean
  apiId: string
  apiKey: string
}

export type BimUploadsQueryParams = {
  page: number
  limit: number
  projectId: string
  id: string
  uploadedBy: string
}

export type BimUploadPayload = {
  upload: {
    url: string
    title: string
    fileExtension: string
  }[]
}
