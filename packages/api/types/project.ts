import {
  AdminCamera,
  Camera,
  CameraExid,
  DateTime,
  DateType,
  EntityByExid,
  Exid,
  PaginationParams,
} from "@/types"

export type ProjectExid = Exid

export type ProjectsByExid = EntityByExid<Project>

export type Project = {
  id: string | number
  exid: ProjectExid
  name: string
  status?: ProjectStatus
  insertedAt?: string
  startedAt?: string
  timezone?: string
  zohoId?: string
  cameras?: Array<Camera | AdminCamera>
  featureFlags: Array<ProjectFeatureFlag>
  owner?: { email?: string }
}

export enum ProjectStatus {
  ToStart = "To Start",
  InProgress = "In Progress",
  Completed = "Completed",
  NotAplicable = "Not Applicable",
}

export type ProjectResponsePayload = {
  data?: Project[]
}

export type Logo = {
  name: string
  url: string
}

export type ProjectLogoResponsePayload = Logo[]

export enum ProjectFeatureFlag {
  AnprLegacy = "anpr_legacy",
  DroneView = "drone_view",
  Bim = "4d_bim",
  BimItwin = "4d_bim_itwin",
  BimForge = "4d_bim_forge",
  ThreeSixtyView = "360_view",
  NdaMc = "NDA/MC",
  GateReport = "gate_report",
  GateReportAutoVerify = "auto_publish",
  GateReportMotionDetection = "motion_detection",
  FullEmpty = "full_empty",
  MediaHubSharing = "archives_sharing",
  GateReportAnprBased = "anpr_sourced",
  NoCameras = "no_cameras",
  NoLicensePlate = "no_license_plate",
}

export type ProjectBatteryReading = {
  exid: number
  voltage: number
  lastSeen: DateType
}

export type ThumbnailData = {
  cameraExid: CameraExid
  custom: boolean
  image: string
}

export type ProjectsQueryParams = PaginationParams & {
  name: string
  exid: string
  status: ProjectStatus
  cameras: string
  featureFlags: Array<ProjectFeatureFlag>
  archived: string
}

export type ProjectCreateRequestPayload = {
  projectExid?: string
  projectName: string
  ownerId: number
  cameras: string[]
}

export type ProjectCreateResponse = {
  name: string
  exid: string
  id: number
  userId: number
  zohoId: string
}

export type ProjectUpdateRequestPayload = {
  name: string
  timezone: string
  featureFlags: ProjectFeatureFlag[]
  cameras: string[]
}

export type ProjectStatusStats = {
  nil: number
  Completed: number
  "In Progress": number
  "Not Applicable": number
  "To Start": number
}

export type ProjectUserProperty = {
  active: boolean
  activeOneMonth: boolean
  cameraExid: string
  cameraName: string
  cameraRights: string
  email: string
  eventsCount: number
  fullname: string
  id: number
  lastSeenAt: DateTime
  persona: string
}

export type ProjectUsers = {
  cameras: {
    exid: string
    name: string
  }[]
  users: Record<string, ProjectUserProperty[]>
}
