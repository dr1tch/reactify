import type { DateType, PaginationParams } from "@/types"

export type CompanyUser = {
  id: number
  fullname: string
  email: string
  eventsCount: number
  lastSeenAt: string
  active: boolean
}

export type CompanyProject = {
  exid: string
  name: string
  status: string
  startedAt: DateType
}

export type Company = {
  id: number
  exid: string
  name: string
  zohoId: string
  domains: string
  linkedinUrl: string
  sessions: number
  projects: number
  cameras: number
  users: number
  activeUsers: number
  createdAt: DateType
}

export type CompanyQueryParams = PaginationParams & {
  name: string
  exid: string
  domains: string
  projects: string
  cameras: string
  users: string
  activeUsers: string
  sessions: string
}

export type CompanyUpdatePayload = {
  name: string
  exid: string
  linkedinUrl?: string
  domains?: string
  zohoId?: string
}
