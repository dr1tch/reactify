import { DateTime, PaginationParams } from "@/types"
export enum SmsCommands {
  Cellular = "cellular",
  Gpson = "gpson",
  GPS = "gps",
  IPUnblock = "ipunblock",
  IOStatus = "iostatus",
  IOSet = "ioset",
  MonitoringStatus = "monitoring_status",
  MobileOn = "mobileon",
  MobileOff = "mobileoff",
  Reboot = "reboot",
  Restore = "restore",
  RmsOn = "rms_on",
  RmsConnect = "rms_connect",
  RmsStatus = "rms_status",
  SwitchSIM = "switch_sim",
  Status = "status",
  SshOn = "sshon",
  SshOff = "sshoff",
  Uci = "uci",
  VpnOn = "vpnon",
  VpnOff = "vpnoff",
  VpnStatus = "vpnstatus",
  WifiOn = "wifion",
  WifiOff = "wifioff",
  Wakeup = "wakeup",
  WebOn = "webon",
  WebOff = "weboff",
}

export enum SmsStatuses {
  Delivered = "Delivered",
  Accepted = "accepted",
  Pending = "Pending",
}

export type SimCreateUpdatePayload = {
  number: string
  simProvider: string
  billPayer?: string
  pin1?: string
  pin2?: string
  puk?: string
  iccid?: string
  description?: string
  cameraId: string[]
}

export type SimsQueryParams = PaginationParams & {
  simProvider: string
  number: string
  billPayer: string
  iccid: string
  cameraName: string
  description: string
}

export type Sim = {
  id: number
  number: string
  simProvider: string
  billPayer: string
  lastSms: string
  pin1: string
  pin2: string
  puk: string
  iccid: string
  description: string
  lastSmsAt: DateTime
  cameras: {
    name: string
    exid: string
    id: number
  }[]
}

export type SendSmsPayload = {
  number: string
  smsMessage: string
}

export type SendSmsResponse = {
  status: number
  errorText: string
}

export type SmsHistory = {
  insertedAt: DateTime
  type: string
  status: string
  text: string
  deliveryDatetime: DateTime
}

export type SmsHistoryResponse = {
  singleSimSms: SmsHistory[]
}

export type Sms = {
  id: number
  from: string
  fromName: string
  to: string
  toName: string
  messageId: string
  status: string
  text: string
  type: string
  insertedAt: DateTime
  deliveryDatetime: DateTime
}

export type SmsQueryParams = PaginationParams & {
  dateRange: string
  fromName: string
  toName: string
  fromNumber: string
  toNumber: string
  smsText: string
  smsType: string
  smsStatus: SmsStatuses
  deliveryDatetime: string
}
