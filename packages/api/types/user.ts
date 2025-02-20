import type { DateTime, PaginationParams } from "@/types"

export type User = {
  id?: number
  fullname?: string
  firstname: string
  lastname: string
  email: string
  telephone: string
  country: string
  isAdmin: boolean
  persona: Persona
  companyId?: string
  companyName?: string
  companyExid?: string
  features?: Array<UserFeatureFlag>
}

export type AdminUser = {
  id: number
  fullname: string
  firstname: string
  email: string
  telephone: string
  country: string
  isAdmin: boolean
  companyId: string
  companyName: string
  companyExid: string
  features: Array<UserFeatureFlag>
  active: boolean
  cameraShares: number
  camerasCount: number
  camerasOwned: number
  countryId: number
  countryName: string
  createdAt: DateTime
  integrations: string[]
  lastEventBrowser: string
  lastEvenCreatedAt: DateTime
  lastEventId: number
  lastEventIpAddress: string
  lastEventName: string
  lastEventOs: string
  lastLoginAt: string
  lastname: string
  persona: string
  projects: string[]
  projectsCount: number
  referralUrl?: string
  snapmailCount: number
  zohoId: string
}

export enum UserFeatureFlag {
  CompanyAdmin = "company-admin",
  VideoWalls = "video-walls",
  MassCameraSharing = "mass-camera-sharing",
  Copilot = "copilot",
  ProjectSharing = "project-sharing",
}

export type ProjectUser = User & {
  lastSeenAt: string
  active: boolean
  activeOneMonth: boolean
  eventsCount: string
  cameraExid: string
  cameraRights: string
}

export enum Persona {
  HQ = "HQ",
  PM = "PM",
  QS = "QS",
  Marketing = "Marketing",
  HS = "H&S",
  DI = "DI",
  Other = "Other",
}

export type UpdatePasswordRequestPayload = {
  token: string
  password: string
}

export type Credentials = {
  apiKey: string
  apiId: string
}

export type LoginRequestPayload = {
  username: string
  password: string
  redirectToZoho?: boolean
}

export type RemotePasswordUpdateRequestPayload = {
  currentPassword: string
  newPassword: string
}

export type LoginResponsePayload = {
  confirmedAt?: string
  country?: string
  createdAt?: string
  email?: string
  firstname?: string
  id?: string
  isAdmin?: boolean
  lastLoginAt?: string
  lastname?: string
  persona?: Persona
  telephone?: string
  token?: string
  updatedAt?: string
  evercamAccount?: string
}

export type LogoutParams = {
  token: string
  fromAdmin?: boolean
}

export type UserSession = {
  browser: string
  createdAt: string
  id: number
  ipAddress: string
  isCurrent: boolean
  lastUsedAt: string
  os: string
}

export type SessionsListRequestPayload = {
  authorization: string
  browser?: string
  os?: string
  ipAddress?: string
  sort: string
  limit: number
  page: number
}

export type SessionActivityCamSettingsDetail = {
  new: any
  old: any
}

export type SessionActivityDetail = {
  agent: string
  camSettings: SessionActivityCamSettingsDetail
  country: string
  countryCode: string
  ip: string
}

export type SessionActivity = {
  cameraExid: string
  details: SessionActivityDetail
  insertedAt: string
  type: string
  who: string
}

export type SessionActivitiesListRequestPayload = {
  limit: number
  from: string
  to: string
}

export type UserUpdateRequestPayload = {
  firstname: string
  lastname: string
  email: string
  telephone: string
  country: string
  persona: string
  apiKey: string
  apiId: string
}

export type UserDeleteRequestPayload = {
  verifEmail: string
}

export type GoogleAuthRequestPayload = { code: string; redirectUri: string }

export type UserStatsResponse = { data: { userStats: AdminUser } }

export type UserCamera = {
  id: number
  exid: string
  ownerFullname: string
  ownerEmail: string
  apiId: string
  apiKey: string
}

export type UserCameraResponse = { data: UserCamera[] }

export type UserProject = {
  id: number
  exid: string
  name: string
  startedAt: DateTime
}

export type UserProjectResponse = { data: UserProject[] }

export type AdminUserUpdateRequestPayload = {
  companyId: string
  email: string
  persona: Persona
  country: string
  features: UserFeatureFlag[]
}

export type AdminQueryParams = PaginationParams & {
  email: string
  fullname: string
}

export type Admin = {
  id: number
  fullname: string
  email: string
  createdAt: DateTime
  updatedAt: DateTime
  lastSignInAt: DateTime
  signInCount: number
  lastSignInIp: string
  apiId: string
  apiKey: string
}

export type ImpersonateUserResponse = {
  id: string
  firstname: string
  lastname: string
  telephone: string
  email: string
  is_admin: boolean
  persona: Persona
  country: string
  companyId: number
  companyExid: string
  companyName: string
  evercamAccount: boolean
  createdAt: DateTime
  updatedAt: DateTime
  confirmedAt: DateTime
  last_loginAt: DateTime
  features: UserFeatureFlag[]
  token: string
}

export type AdminUserQueryParams = PaginationParams & {
  fullname: string
  email: string
  telephone: string
  persona: Persona
  companyName: string
  camerasCount: string
  projectsCount: string
  snapmailCount: string
  camerasOwned: string
  cameraShares: string
  createdAtDate: string
  lastLoginAtDate: string
  integrations: "procore" | "aconex" | "autodesk"
  features: UserFeatureFlag.ProjectSharing | UserFeatureFlag.VideoWalls
}

export type SuppressionsQueryParams = PaginationParams & {
  id: number
  email: string
  source: string
}

export type Suppression = {
  id: number
  email: string
  source: string
  insertedAt: DateTime
  updatedAt: DateTime
}
