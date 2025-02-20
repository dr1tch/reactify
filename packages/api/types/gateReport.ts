import {
  AnprDirection,
  CameraExid,
  Date_HH,
  Date_YYYY,
  Date_YYYY_MM,
  Date_YYYY_MM_DD,
  DateTime,
  DateTimeSpaceSeparated,
  DateType,
  PaginatedItems,
  PaginationParams,
  ProjectExid,
  ProjectFeatureFlag,
  Timestamp,
} from "@/types"

export enum GateReportDetectionType {
  Auto = "auto",
  Manual = "manual",
  Cloud = "cloud",
  Edge = "edge",
}

export enum GateReportEventType {
  Arrived = "arrived",
  Left = "left",
  Unknown = "unknown",
}

export enum DetectionLabel {
  ArticulatedDumper = "articulated-dumper",
  BackhoeLoader = "backhoe-loader",
  CompactExcavator = "compact-excavator",
  ConcretePump = "concrete-pump",
  Dumper = "dumper",
  Excavator = "excavator",
  FlatbedSemiTrailer = "flatbed-semi-trailer",
  IndustrialTruck = "industrial-truck",
  Loader = "loader",
  Mewps = "mewps",
  MobileCrane = "mobile-crane",
  MobileCrusher = "mobile-crusher",
  OtherTruck = "other-truck",
  PileDrillingRig = "pile-drilling-rig",
  RoadVehicle = "road-vehicle",
  Roller = "roller",
  SemiTrailer = "semi-trailer",
  SkidSteerLoader = "skid-steer-loader",
  SkipTruck = "skip-truck",
  SmallTruck = "small-truck",
  TankTruck = "tank-truck",
  TeleHandler = "tele-handler",
  TippingTruck = "tipping-truck",
  TowerCrane = "tower-crane",
  TowerMountedConcreteMix = "tower-mounted-concrete-mix",
  TractorDozer = "tractor-dozer",
  TruckHead = "truck-head",
  TruckMixer = "truck-mixer",
  TruckMountedMobileCrane = "truck-mounted-mobile-crane",
  Unknown = "unknown",
  Worker = "worker",
}

export enum SegmentLabel {
  AirCompressor = "air_compressor",
  Brick = "brick",
  Building = "building",
  CableReel = "cable_reel",
  CementMixer = "cement_mixer",
  CementPile = "cement_pile",
  ConcreteBarrier = "concrete_barrier",
  ConcreteBlock = "concrete_block",
  ConstructionContainer = "construction_container",
  ConstructionSite = "construction_site",
  Crane = "crane",
  DetachedExcavatorBucket = "detached_excavator_bucket",
  DryMortarSilo = "dry_mortar_silo",
  DumpTruck = "dump_truck",
  Dumpster = "dumpster",
  Fence = "fence",
  FireHydrant = "fire_hydrant",
  GarbageBin = "garbage_bin",
  HoseReel = "hose_reel",
  Ibc = "ibc",
  JerryCan = "jerry_can",
  MetalBeam = "metal_beam",
  MiniDumper = "mini_dumper",
  Pallet = "pallet",
  Pipe = "pipe",
  Puddle = "puddle",
  Rebar = "rebar",
  Rubble = "rubble",
  Scaffolding = "scaffolding",
  ShippingContainer = "shipping_container",
  SiteOffice = "site_office",
  TrafficCone = "traffic_cone",
  Transformer = "transformer",
  Vehicle = "vehicle",
  Window = "window",
  WoodenSpool = "wooden_spool",
  Unknown = "unknown",
}

export enum GateReportVehicleType {
  ConcretePump = DetectionLabel.ConcretePump,
  FlatbedSemiTrailer = DetectionLabel.FlatbedSemiTrailer,
  OtherTruck = DetectionLabel.OtherTruck,
  RoadVehicle = DetectionLabel.RoadVehicle,
  SemiTrailer = DetectionLabel.SemiTrailer,
  SmallTruck = DetectionLabel.SmallTruck,
  TankTruck = DetectionLabel.TankTruck,
  TippingTruck = DetectionLabel.TippingTruck,
  TruckHead = DetectionLabel.TruckHead,
  TruckMixer = DetectionLabel.TruckMixer,
  Unknown = DetectionLabel.Unknown,
}

export type GateReportVehicleTypeItem = {
  name: string
  id: GateReportVehicleType
}

export type GateReportEvent = {
  id: number
  vehicleTypes: GateReportVehicleType
  exid: string
  cameraExid?: string
  boundingBox: BoundingBox
  detectionType: GateReportDetectionType
  edited: boolean
  eventTime: string
  timestamp?: string
  eventType: GateReportEventType
  isPublic: boolean
  roiId: string
  truckType: GateReportVehicleType
  thumbnailUrl?: string
}

export type GateReportArrivedEvent = GateReportEvent & {
  eventType: GateReportEventType.Arrived
}

export type GateReportLeftEvent = GateReportEvent & {
  eventType: GateReportEventType.Left
}

export type GateReportVerifiedDay = {
  id: number
  day: Date_YYYY_MM_DD
  isMatched: boolean
  insertedAt: DateTime
  updatedAt: DateTime
  verifiedBy: string
  cameraExid: CameraExid
  projectExid: ProjectExid
}

export type BoundingBox = {
  xmax: number
  xmin: number
  ymax: number
  ymin: number
}

export type EventsCountsByVehicleType = Record<GateReportVehicleType, number>

export type EventsCount = {
  in: number
  out: number
  source: GateReportDataSource
}

export type YearlyEventCount = EventsCount & {
  year: Date_YYYY
}

export type MonthlyEventCount = EventsCount & {
  month: Date_YYYY_MM
}

export type DailyEventCount = EventsCount & {
  day: Date_YYYY_MM_DD
}

export type HourlyEventCount = {
  hour: Date_HH
  count: number
}

export type EventCountRequestPayload = {
  vehicleTypes?: GateReportVehicleType[]
  isPublic?: boolean
  camerasExid?: string[]
}

export type EventCountResponsePayload = {
  days?: DailyEventCount[]
  months?: MonthlyEventCount[]
  years?: YearlyEventCount[]
}

export type ProcessedDaysRequestPayload = {
  apiId?: string
  apiKey?: string
  isPublic?: Boolean
}

export type EventsRequestPayload = {
  apiId?: string
  apiKey?: string
  camerasExid?: CameraExid[]
  cameras?: string[]
  eventType?: GateReportEventType
  fromDate?: DateTime
  isPublic?: boolean
  toDate?: DateTime
  truckTypes?: GateReportVehicleType[]
  vehicleTypes?: string[]
} & PaginationParams

export type EventsResponsePayload = PaginatedItems<GateReportEvent>

export enum GateReportDataSource {
  Anpr = "anpr",
  Events = "events",
}

export type GateReportResponsePayload = {
  source: GateReportDataSource
  results: PaginatedItems<GateReportEvent>
}

export enum GateReportEventDirection {
  In = "in",
  Out = "out",
  Unknown = "unknown",
}

export type GatReportRequestPayload = {
  camerasExid?: CameraExid[]
  eventType?: GateReportEventType
  fromDate?: DateTime
  isPublic?: boolean
  toDate?: DateTime
  vehicleTypes?: GateReportVehicleType[]
} & PaginationParams

export enum GateReportExportType {
  Pdf = "pdf",
  Csv = "csv",
}

export type EventsExportRequestParameters = {
  vehicleTypes: GateReportVehicleType[]
  fileType: GateReportExportType
  fromDate: DateTimeSpaceSeparated
  toDate: DateTimeSpaceSeparated
  camerasExid: CameraExid[]
  eventType: GateReportEventType
}

export type AnprBasedGateReportExportRequestParams = {
  vehicleTypes?: GateReportVehicleType[]
  fileType?: GateReportExportType
  fromDate?: DateTimeSpaceSeparated
  toDate?: DateTimeSpaceSeparated
  camerasExid?: CameraExid[]
  direction?: AnprDirection
}

type X1 = number
type Y1 = number
type X2 = number
type Y2 = number

export enum GateReportROIShapeType {
  Rectangle = "rectangle",
  Direction = "direction",
  Line = "line",
}

export type GateReportROIShape = {
  coordinates: [[X1, Y1], [X2, Y2]]
  type: GateReportROIShapeType
}

export type GateReportROI = {
  cameraex?: string
  fromDate?: string
  directionFilter?: string
  id?: number
  insertedAt?: Timestamp
  isactive?: boolean
  name?: string
  roiType?: string
  updatedAt?: Timestamp
  shapes?: GateReportROIShape[]
}

export enum GateReportProcessingStatus {
  Processed = "processed",
  Unprocessed = "unprocessed",
}

export const VEHICLE_TYPE_IDS = Object.values(GateReportVehicleType)

export type GateReportCamera = {
  exid: number
  name: string
  status: string
  note: string
  last_published_day: DateType
  last_processed_day: DateType
}

export type GateReportProject = {
  exid: string
  name: string
  status: string
  featureFlags: ProjectFeatureFlag
  cameras: GateReportCamera[]
}

export type AnalyticsParameters = {
  id: number
  cameraex: string
  processingType: string
  startDate: DateTime
  endDate: DateTime
  skipWeekend: boolean
  hourSiteOpening: number
  hourSiteClosure: number
  gateReportActive: boolean
  countingActive: boolean
  queueSystem: string
  reprocess: boolean
  framesToSkip: number
  detection_model: string
  detectionThreshold: number
  printLogsFrame: number
  crossingVectorAngleLimit: number
  minTruckLife: number
  insideMinTime: number
  trackerMaxAge: number
  trackerMinHit: number
  snapshotUpload: boolean
  snapshotPerSecond: number
  detectionClasses: string
  deepEventEndpointUrl: string
  timestampCalculation: string
  matchingEmbeddedDstCoeff: number
  matchingTimeCoeff: number
  matchingQueueOrderCoeff: number
  rabbitmqServerUrl: string
  rabbitmqEventsQueue: string
  rabbitmqEventsExchange: string
  rabbitmqCountingQueue: string
  rabbitmqCountingExchange: string
  dangerZones: boolean
  workflows: boolean
  linkedAnprCameras: Record<string, unknown>
}

export type VerifiedDaysQueryParams = PaginationParams & {
  projectExid: ProjectExid
  camerasExid: CameraExid[]
  verifiedBy: string
  isMatched: boolean
  insertedAt: DateTime[]
  updatedAt: DateTime[]
  day: string
}

export type EventUpdateRequestPayload = {
  cameraex: string
  roiId: number
  eventType: string
  eventTime: "2024-12-13T14:25:58.066Z"
  truckType: string
  isPublic: boolean
  boundingBox: {
    additionalProp1: number
    additionalProp2: number
    additionalProp3: number
  }
  valid: boolean
  loadState: string
  embeddingId: number
  embedding: number[]
  similarityDst: number
  detectionType: string
  trackingId: number
  deliveriesId: number
  edited: boolean
  isDeleted: boolean
  modelVersion: string
}

export type VerifyDayUpdateRequestPayload = {
  camerasExid: string[]
  projectExid: string
  day: Date_YYYY_MM_DD
  isMatched: boolean
  verifiedBy: string
}

export type ProcessedDaysQueryParams = {
  camerasExid: CameraExid[]
  isPublic: boolean
  eventType: GateReportEventType
}

export type SecurityMeasurementQueryParams = {
  cameraex: string
  timestamp: DateTime
  prompt: string
  snapshotUrl: string
}

export type ObjectDetectionQueryParams = {
  cameraex: string
  timestamp: DateTime
  base64Img: string
  snapshotUrl: string
}

export type RoisQueryParams = {
  cameraExid: string
  id: number
  name: string
  fromDate: string
  roiType: GateReportROIShapeType
  isactive: boolean
  directionFilter: string
  sort: string
}

export type GateReportROICreateRequestPayload = {
  id?: number
  roi: {
    cameraex: string
    name: string
    roiType: string
    isactive: true
    fromDate: string
    shapes: Record<string, unknown>[]
    directionFilter: string
    note: string
  }
  createdBy: string
}
