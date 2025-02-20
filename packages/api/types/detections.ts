import {
  type CameraExid,
  type DateType,
  DetectionLabel,
  SegmentLabel,
  type TimelineDateInterval,
  TimelinePrecision,
} from "@/types"

export type DetectionsFilters = {
  cameraExid: CameraExid
  fromDate: string | Date
  toDate: string | Date
  labels: DetectionLabel | DetectionLabel[]
}

export type BBox = [number, number, number, number]

export type Detection = {
  bbox: BBox
  timestamp: string | Date
}

export type Tracking = {
  trackId: number
  fromDate: string | Date
  toDate: string | Date
  detections: Detection[]
}

export type TrackingLabel = string

export type TrackingsByLabel = Record<TrackingLabel, Tracking[]>

export type SegmentsByLabel = Record<SegmentLabel, Segment[]>

export type SegmentPolygonCoords = number[][]

export type Segment = {
  id: number
  mask: SegmentPolygonCoords
  label: string
  timestamp: string | Date
}

export type SegmentSimilarityResult = {
  distance: number
  segment: Segment
}

export type SegmentsSimilaritySearchResult = {
  firstSeen: DateType | null
  lastSeen: DateType | null
  similarSegments: SegmentSimilarityResult[]
}

export type SegmentsSimilaritySearchParams = {
  cameraExid: CameraExid
  segmentId: number
  leftInterval: TimelineDateInterval
  rightInterval: TimelineDateInterval
  maxDistance: number
  areaTolerance: number
}

export type CountsParams = {
  cameraExid: CameraExid
  fromDate: string | Date
  toDate: string | Date
  precision: TimelinePrecision
}

export type CountByPeriod = {
  date: string | Date
  counts: Record<string, number>
}

export type DetectionsPresenceByLabel = Record<
  DetectionLabel,
  TimelineDateInterval[]
>

export type SegmentsPresenceByLabel = Record<
  SegmentLabel,
  TimelineDateInterval[]
>

export type LuminanceReading = {
  timestamp: string
  luminanceDelta: number
  luminanceAverage: number
}
