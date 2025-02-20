import { Camera, PaginationParams, Project, Sim } from "@/types"
export type RouterBillPayer = { name: string }

export type SimProvider = { name: string }

export type Router = {
  id?: number
  kitId: number | null
  routerType: string
  routerUserId: string
  routerPassword: string
  serialNumber: number | null
  rmsUrl?: string
  externalHost?: string
  routerHttpPort: number | null
  vpnPassword: string
  vpnUserId: string
  vpnServer: string
  netbirdUrl: string
  status: RouterStatus
  powerType: PowerType
  powerSchedule: string
  battery?: {
    lastVoltage: number
    lastSeen: string
  }
  sims: Array<Pick<Sim, "id" | "number">>
  billPayers?: Array<RouterBillPayer>
  simProviders?: Array<SimProvider>
  projects?: Pick<Project, "exid" | "id" | "name">[]
  cameras?: Pick<Camera, "id" | "name">[]
}

export enum PowerType {
  Mains = "mains",
  Battery = "battery",
  Solar = "solar",
  Generator = "generator",
  Other = "other",
}

export enum PowerSchedule {
  Schedule = "schedule",
  FullTime = "24/7",
}

export enum RouterStatus {
  Active = "active",
  Inactive = "inactive",
}

export type RouterQueryParams = PaginationParams & {
  routerType: string
  vpnServer: string
  serialNumber: string
}

export type RouterCreatePayload = {
  serialNumber: number
  vpnUserId?: string
  vpnPassword?: string
  routerType: string
  routerUserId?: string
  routerPassword?: string
  routerHttpPort: number
  powerType: PowerType
  powerSchedule: PowerSchedule
  vpnServer?: string
  netbirdUrl?: string
}
