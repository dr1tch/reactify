import { PaginationParams, DateType } from "@/types"

export enum IngestProcessingStatus {
  Completed = "completed",
  Uploading = "uploading",
  Created = "created",
  Failed = "failed",
  Aborted = "aborted",
  Paused = "paused",
  InProgress = "inprogress",
  Pending = "pending",
}

export type DronesQueryParams = Omit<PaginationParams, "sort"> & {
  projectId: string
  consumed: string
  token: string
  processingStatus: IngestProcessingStatus
}

export type DroneUploadUpdateRequestPayload = {
  flightMetadata: {
    dateTime: string
    gpsAltitude: string
    gpsCoordinates: string
  }
  upload: {
    url: string
    title: string
    fileExtension: string
  }[]
  projectName: string
}

export type CalculateMeasuringOperationRequestPayload = {
  date: DateType
  points: [number, number][]
  operation: string
}

export type FlightImagesQueryParams = Partial<
  Omit<PaginationParams, "sort">
> & {
  date: DateType
}

export type InspectionToolRequestPayload = {
  date: DateType
  gpsAltitude: string
  gpsCoordinates: string
}
