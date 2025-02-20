import {
  BoundingBox,
  CameraExid,
  DateType,
  GateReportVehicleType,
  TimelinePrecision,
} from "@/types"

export type AnprQueryParams = {
  page?: number
  limit?: number
  firstSeen?: {
    gte: DateType
  }
  lastSeen?: {
    lte: DateType
  }
  captureTime?: {
    gte?: DateType
    lt?: DateType
  }
  direction?: { eq?: string } | string
  plateNumber?: { eq?: string } | string
  sort?: string
  fromDate?: DateType
  toDate?: DateType
  tab?: string
}

export type AnprCountsQueryParams = {
  precision: TimelinePrecision
  fromDate?: string
  toDate?: string
  isPublic?: boolean
  cameras?: CameraExid[]
  direction?: AnprDirection
  isPlate?: boolean
  isDuplicate?: boolean
  vehicleTypes?: GateReportVehicleType[]
  camerasExid?: CameraExid[]
}

export enum AnprDirection {
  Left = "reverse",
  Arrived = "forward",
  Unknown = "unknown",
}

export type AnprEvent = {
  id: number
  plateNumber: string
  cameraex: CameraExid
  picName: string
  captureTime: string
  insertedAt: string
  isDuplicate: boolean
  direction: AnprDirection
  updatedAt: string
  isPlate: boolean
  isPostprocessed: boolean
  vehicleType?: GateReportVehicleType
  contextVehicleType?: GateReportVehicleType
  anprVehicleType: string
  anprVehicleModel: string
  anprVehicleMake: string
  anprVehicleColor: string
  anprVehicleSpeed: number | null
  anprSnapshotLink: string
  contextSnapshotLink: string
  contextCamera: string
  votedVehicleType: GateReportVehicleType | string
  metadata_: {
    evercamMetadata?: {
      anpr?: {
        bbox: BoundingBox
        label: string
        score: number
      }
      context?: {
        bbox: BoundingBox
        label: string
        score: number
      }
    }
    plateRecognizerMetadata?: {
      plateNumber?: string
      vehicleMake?: string
      vehicleType?: string
      vehicleColor?: string
      vehicleModel?: string
      vehicleOrientation?: string
    }
  }
}

export type AnprCount = {
  date: string
  counts: Record<AnprDirection, number>
}

export enum AnprEventStatus {
  IsPlate = "is_plate",
  NotPlate = "not_plate",
  IsDuplicate = "is_duplicate",
  NotDuplicate = "not_duplicate",
}
