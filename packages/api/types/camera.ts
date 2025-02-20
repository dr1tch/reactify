import {
  AuditLogActionType,
  DateTime_Z_micros,
  DateType,
  EntityByExid,
  Exid,
  PaginationParams,
  PowerSchedule,
  PowerType,
  ProjectExid,
  Schedule,
} from "@/types"

export type CameraExid = Exid

export type CamerasByExid = EntityByExid<Camera>

export type Cartesian3 = {
  x: number
  y: number
  z: number
}

export type Camera = {
  cameraPowerSchedule?: Schedule
  camPassword?: string
  camUsername?: string
  cloudRecordings: {
    frequency: number
    schedule: Schedule
    status: string
    storageDuration: string
  }
  createdAt: DateTime_Z_micros
  description: null
  discoverable: boolean
  external: {
    host: string
    http: {
      camera: string
      jpg: string
      nvrJpg: string
      nvrPort: string
      port: string
    }
    rtsp: {
      h264: string
      port: string
    }
  }
  featureFlags: Array<CameraFeatureFlag>
  fovAngle: number
  fovRadius: number
  heading: null
  id: CameraExid
  exid: CameraExid
  isOnline: boolean
  isPowerScheduleActive: boolean
  isPublic: boolean
  lastOnlineAt: DateTime_Z_micros
  lastPolledAt: DateTime_Z_micros
  location: { lat: number; lng: number }
  modelId: string
  modelName: string
  name: string
  nvrChannel: number
  nvrDeviceId: string
  nvrHost: string
  nvrHttpPort: number
  nvrModel: NvrModel
  nvrScheme: string
  nvrSnapshotEndpoint: string
  nvrStreamingEndpoint: string
  offlineReason: string
  owned: boolean
  owner: string
  pitch: null
  project: { id: string; name: string }
  proxyUrl: { hls: string; rtmp: string }
  ptz: boolean
  rights: string
  roll: null
  routerId: number
  status: CameraStatus
  streamingServer: string
  thumbnailUrl: string
  largeThumbnailUrl?: string
  timezone: string
  updatedAt: DateTime_Z_micros
  vendorName: string
}

export type AdminCamera = {
  cameraHost: string
  cameraHttpPort: number
  cameraModel: string
  cameraPassword: string
  cameraPictureEndpoint: string
  cameraRtspPort: number
  cameraScheme: string
  cameraUsername: string
  cloudRecordingFrequency: number
  cloudRecordingId: number
  cloudRecordingSchedule: Schedule
  cloudRecordingStatus: string
  cloudRecordingStorageDuration: number
  createdAt: DateTime_Z_micros
  description: null
  discoverable: false
  exid: CameraExid
  featureFlags: CameraFeatureFlag[]
  fovAngle: 45.0
  fovRadius: number
  heading: null
  id: number
  isPowerScheduleActive: true
  isPublic: false
  kitId?: number
  lastOnlineAt: DateTime_Z_micros
  lastPolledAt: DateTime_Z_micros
  location: { lat: number; lng: number }
  macAddress: string
  name: string
  nvrChannel: null
  nvrDeviceId: string
  nvrHost: string
  nvrHttpPort: number
  nvrModel: NvrModel
  nvrPassword: string
  nvrPictureEndpoint: string
  nvrRtspPort: number
  nvrScheme: string
  nvrUsername: string
  offlineReason: null
  pitch: null
  powerSchedule: Schedule
  projectExid: string
  projectFeatureFlags: []
  projectId: number
  projectName: string
  ptz: false
  recordingFromNvr: false
  roll: null
  routerId: number
  status: string
  storageProviders: []
  streamEndpoint: string
  timezone: string
  updatedAt: DateTime_Z_micros
  userApiId: string
  userApiKey: string
  userEmail: string
  userFullname: string
  userId: number
  zohoId: string
  thumbnailUrl?: string
}

export type CameraMapMarker = {
  isOnline: boolean
  location: {
    lat: number
    lng: number
  }
  needFov: boolean
  rotation: number
  fovAngle: number
  fovRadius: number
}

export enum CameraStatus {
  Online = "online",
  Offline = "offline",
  OfflineScheduled = "offline_scheduled",
  Decommissioned = "decommissioned",
  OnHold = "on_hold",
  Waiting = "waiting",
  UnderMaintenance = "under_maintenance",
  WaitingForSiteVisit = "waiting_for_site_visit",
}

export enum CameraFeatureFlag {
  EdgeVideo = "edge_video",
  BimCompare = "bim_compare",
  GateReport = "gate_report",
  VideoStream = "video_stream",
  WebRTC = "webrtc",
  ANPR = "anpr",
  ReverseANPR = "reverse_anpr",
  PTZ = "ptz",
  ObjectDetection = "object_detection",
  Segmentation = "segmentation",
  SegmentationAutoLabelling = "segmentation_auto_labelling",
}

export type CameraLogsRequestPayload = {
  limit: number
  page: number
  types: string
  from: string
  to: string
}

export type CameraUpdateRequestPayload = {
  status?: string
  timezone?: string
  isPuclic?: boolean
  discoverable?: boolean
  fullname?: string
  lastOnline?: string
  owner?: string
  description?: string
  cameraPowerSchedule?: Schedule
  isPowerScheduleActive?: boolean
  powerSchedule?: object
  ptz?: boolean
  camUsername?: string
  camPassword?: string
  project?: { id: string; name: string }
  modelName?: string
  host?: string
  nvrChannel?: number
  nvrPortHttp?: string
  externalRtspPort?: string
  name?: string
  h264Url?: string
  snapshotUrl?: string
  nvrSnapshotUrl?: string
  routerId?: string | number
  coordinates?: Array<number>
  heading?: number
  fovAngle?: number
  fovRadius?: number
}

export type CamerasResponsePayload = {
  cameras?: Camera[]
}

export type CameraLogsResponsePayload = {
  cameraExid: string
  cameraName: string
  logs?: Log[]
  details?: { customMessage?: string }
}

export type CameraStatusLog = {
  start: string
  end: string
  state: CameraStatus
}

export type Log = {
  details: {
    agent?: string
    country?: string
    countryCode?: string
    ip?: string
    with?: string
    message?: string
    status?: string
    type?: string
  }
  insertedAt: string
  type: string
  who: string
}

export type NvrConfig = {
  apiUrl: string
  username?: string
  password?: string
  deviceId: string
  streamingUrl: string
  snapshotUrl: string
  bifUrl: string
}

export enum NvrModel {
  YCam = "y-cam",
  Axis = "axis",
  Dahua = "dahua",
  Mobotix = "mobotix",
  Hikvision = "hikvision",
  Avigilion = "avigilion",
  Hanwha = "hanwha",
  Nxwitness = "nxwitness",
  ExNvr = "ex_nvr",
}

export enum CameraModel {
  YCam = "y-cam",
  Axis = "axis",
  Dahua = "dahua",
  Mobotix = "mobotix",
  Milesight = "milesight",
  Hikvision = "hikvision",
  Avigilion = "avigilion",
  Hanwha = "hanwha",
  Other = "other",
}

export type DroneCameraTransform = {
  position: Cartesian3
  direction: Cartesian3
  up: Cartesian3
  right: Cartesian3
}

export type Footage = {
  cameraExid: string
  cameraName: string
  endDate: string | null
  startDate: string | null
}

export type Hdd = {
  id: number
  location: string
  serialNumber: string
  hddStatus: string
  shelfBlock: string
  type: string
  size: string
  format: string
  footages: Array<Footage>
  reportedCapacity: string
  reportedFreeSpace: string
  reportedProperty: string
  reportedPath: string
  reportedHddType: string
  errorStatus: string
  canExpand: boolean
}

export enum ResolutionDimensions {
  QVGA = "320x240",
  VGA = "640x480",
  SVGA = "800x600",
  XGA = "1024x768",
  HD = "1280x720",
  WXGA = "1280x800",
  HDPlus = "1366x768",
  WXGAPlus = "1440x900",
  HDPlusPlus = "1600x900",
  UXGA = "1600x1200",
  FullHD = "1920x1080",
  WUXGA = "1920x1200",
  TwoK = "2048x1080",
  QHD = "2560x1440",
  WQXGA = "2560x1600",
  FourK = "3840x2160",
  FourKCinema = "4096x2160",
  FiveK = "5120x2880",
  EightK = "7680x4320",
  WHUXGA = "7680x4800",
}

export enum ResolutionLabel {
  QVGA = "QVGA",
  VGA = "VGA",
  SVGA = "SVGA",
  XGA = "XGA",
  HD = "HD",
  WXGA = "WXGA",
  HDPlus = "HD+",
  WXGAPlus = "WXGA++",
  HDPlusPlus = "HD++",
  UXGA = "UXGA",
  FullHD = "FullHD",
  WUXGA = "WUXGA",
  TwoK = "2K",
  QHD = "QHD",
  WQXGA = "WQXGA",
  FourK = "4K",
  FourKCinema = "4KCinema",
  FiveK = "5K",
  EightK = "8K",
  WHUXGA = "WHUXGA",
}

export type ResolutionInfo = {
  ratioString: string
  ratioFloat: number
  resolutionDimensions: ResolutionDimensions
  resolutionLabel: ResolutionLabel
}

export type CameraPath = {
  projectExid: ProjectExid
  cameraExid: CameraExid
}

export type CheckCameraPortPayload = {
  address: string
  port: number
}

export type CameraCreateRequestPayload = {
  status: CameraStatus
  timezone?: string
  powerSchedule?: Schedule
  isPowerScheduleActive?: boolean
  ptz?: boolean
  name: string
  coordinates?: [number, number]
  recordingFromNvr?: boolean
  CameraConfig: {
    model: CameraModel
    scheme?: "http" | "https"
    host: string
    httpPort: number
    username: string
    password: string
    rtspPort?: number
    pictureEndpoint?: string
    streamEndpoint?: string
  }
  nvr?: {
    model: NvrModel
    serial?: string
    deviceType?: "rpi4" | "orin_nano"
    macAddress?: string
    username: string
    password: string
    httpUrl: string
    rtspUrl?: string
  }
  cloudRecording?: {
    id?: number
    frequency: 1 | 2 | 4 | 5 | 6 | 10 | 12 | 30 | 60
    storageDuration: -1 | 1 | 7 | 30 | 90
    status: "on" | "off" | "paused" | "on_scheduled"
    schedule: Schedule
  }
  ownerId: number
  projectId: number
}

export type CameraDeletePayload = {
  verify: string
  password: string
}

export type SaveNotePayload = {
  noteType: string
  content: string
}

export type CameraNote = {
  id: number
  cameraId: number
  noteType: string
  content: string
  insertedAt: DateType
}

export type CreateCameraNotePayload = {
  id?: number
  cameraExid: CameraExid
  customMessage: string
  action: string
}

export enum HddStatus {
  Error = "error",
  Idle = "idle",
  NotExist = "notExist",
  Unformatted = "unformatted",
  Ok = "ok",
}

export type NvrQueryParams = PaginationParams & {
  ownerId: number
  cameraName: string
  cameraExid: CameraExid
  cameraIp: string
  hddStatus: HddStatus
}

export type OfflineCamera = {
  id: number
  exid: string
  name: string
  fullname: string
  timezone: string
  status: CameraStatus
  zohoId: string
  externalHost: string
  nvrHttpPort: string
  externalRtspPort: string
  username: string
  password: string
  createdAt: DateType
  lastPolledAt: DateType
  lastOnlineAt: DateType
  powerType: PowerType
  powerSchedule: PowerSchedule
  batteryReadingsLastSeen: DateType
  batteryReadingsLastVoltage: number
  sims: {
    billPayer: string
    number: string
    provider: string
  }[]
}

export type OfflineCameraQueryParams = PaginationParams & {
  status: CameraStatus
  cameraExid: CameraExid
  cameraName: string
  timezone: string
  cameraOwner: string
  powerType: PowerType
  powerSchedule: PowerSchedule
  batteryReadingsLastVoltage: number
}

export type OfflineCameraNote = {
  action: AuditLogActionType
  username: string
  insertedAt: DateType
  cameraId: number
  customMessage: string
}

export type OfflineCameraNoteResponse = {
  publicNotes: OfflineCameraNote[]
  privateNotes: OfflineCameraNote[]
}

export type SiteVisitCamerasQueryParams = PaginationParams & {
  cameraOwner: string
}

export type ProjectCamera = {
  apiId: string
  apiKey: string
  exid: string
  id: number
  name: string
  ownerEmail: string
  ownerFullname: string
}

export enum DuplicatedCameraFields {
  Host = "host",
  CameraHttpPort = "camera_http_port",
  NvrHttpPort = "nvr_http_port",
  NvrDeviceId = "nvr_device_id",
}

export type DuplicatedCameraObject = {
  exid: string
  name: string
  cameraStatus: string
  crStatus: string
}

export type DuplicatedCameraResponse = {
  cameras: DuplicatedCameraObject[]
  host: string
  cameraHttpPort: number
  nvrHttpPort: number
  nvrDeviceId: string
  count: number
}

export type MergeDuplicatedCameraPayload = {
  masterCamera: Record<string, unknown>
  shareeCameras: Record<string, unknown>
}

export type FetchCameraQueryParams = PaginationParams & {
  status: CameraStatus
  isPublic: boolean
  featureFlags: CameraFeatureFlag[]
  ptz: boolean
  frequency: number
  channel: number
  cameraExid: CameraExid
  cameraExids: CameraExid[]
  cameraName: string
  projectName: string
  timezone: string
  region: string
  cameraModel: CameraModel
  nvrModel: NvrModel
  cameraOwner: string
  ownerEmail: string
  isRecording: boolean
  cloudRecordingStorageDuration: number
  cameraIds: string
  hasLocation: boolean
  externalHttpPort: string
  externalRsptPort: string
  nvrHttpPort: string
}
