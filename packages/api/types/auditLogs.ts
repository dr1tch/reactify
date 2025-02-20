/* eslint-disable @typescript-eslint/naming-convention */
import { CameraStatus, DateType, PaginationParams } from "@/types"

export enum AuditLogActionType {
  VH_STATUS = "vh_status",
  CR_UPDATED = "cr_updated",
  CR_CREATED = "cr_created",
  ONLINE = "online",
  OFFLINE = "offline",
  ON_HOLD = "on_hold",
  WAITING = "waiting",
  DECOMMISSIONED = "decommissioned",
  UNDER_MAINTENANCE = "under_maintenance",
  WAITING_FOR_SITE_VISIT = "waiting_for_site_visit",
  SMS = "sms",
  CUSTOM = "custom",
  PUBLIC_NOTE = "public_note",
  SIM = "sim",
  LOGIN = "login",
  LOGOUT = "logout",
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  DEVICE_SETTINGS = "device_settings",
  LINK_SIM_WITH_ROUTER = "link_sim_with_router",
  UNLINK_SIM_FROM_ROUTER = "unlink_sim_from_router",
  LINK_CAMERA_WITH_ROUTER = "link_camera_with_router",
  UNLINK_CAMERA_FROM_ROUTER = "unlink_camera_from_router",
  SHARE = "share",
  UPDATE_SHARE = "update_share",
  DELETE_SHARE = "delete_share",
  SHARE_REQUEST = "share_request",
  DELETE_SHARE_REQUEST = "delete_share_request",
  TRANSFER_OWNERSHIP = "transfer_ownership",
  BIM_NOTE = "bim_note",
  GATE_REPORT_NOTE = "gate_report_note",
}

export type AuditLog = {
  id: number
  action: AuditLogActionType
  details: Record<string, any>
  insertedAt: DateType
  entity: string
  user_details: {
    browser: string
    country: string
    countryCode: string
    device: string | null
    ip: string
    os: string | null
  }
  who: string
}

export type AuditLogsParams = PaginationParams & {
  routerId: number
  cameraId: number
  entity: string
  byRouter: boolean
  byCamera: boolean
  byProject: boolean
  action: string
}

export type CameraLogsQueryParams = {
  historyDays: number
  accountId?: string
  status: CameraStatus[]
}

export type CameraLogItem = {
  start: DateType
  state: CameraStatus
  end: DateType
}

export type CameraLog = {
  data: CameraLogItem[]
  measure: string
}

export type CameraAuditLog = {
  id: number
  action: AuditLogActionType
  details: {
    error_body?: string
    exid: string
    id: number
    name: string
    reason?: string
  }
  insertedAt: DateType
  entity: string
  user_details: {
    ip: string
    country: string
    countryCode: string
    agent: string
  }
  who: string
}

export type CameraAuditLogsQueryParams = PaginationParams & {
  from: string
  to: string
  action: AuditLogActionType[]
}
