import type { NvrModel } from "@evercam/api/types"

export type Nvr = {
  id?: number
  deviceType: string
  serial: string
  model: NvrModel
  httpUrl: string
  rtspUrl: string
  macAddress: string
  username: string
  password: string
}

export enum NvrHddStatus {
  Error = "error",
  Idle = "idle",
  NotExist = "notexist",
  Ok = "ok",
  Unformatted = "unformatted",
}

export type NvrUpdatePayload = {
  serial: string
  deviceType: string
  username: string
  password: string
  httpUrl: string
  rtspUrl: string
}
