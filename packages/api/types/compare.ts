import { DateType, PaginationParams } from "@/types"

export type Compare = {
  cameraExid: string
  createdAt: string
  embedCode: string
  embedTime: boolean
  fileName: string
  frames: number
  fromDate: string
  id: number
  exid: string
  mediaUrls: {
    gif: string
    mp4: string
  }
  public: boolean
  requesterEmail: string
  requesterName: string
  status: string
  thumbnailUrl: string
  title: string
  toDate: string
  type: string
}

export enum CompareStatus {
  Processing = 0,
  Completed = 1,
  Failed = 2,
}

export type CompareRequestPayload = {
  name: string
  afterDate: string
  beforeDate: string
  embed: string
  compareExid: string
  cameraExid?: string
  createAnimation: boolean
  evercamWatermark?: boolean
}

export type AdminCompare = {
  id: number
  compareExid: string
  exid: string
  projectId: string
  apiId: string
  apiKey: string
  name: string
  fullname: string
  camera: string
  status: number
  embedCode: string
  insertedAt: DateType
}

export type AdminCompareQueryParams = PaginationParams & {
  name: string
  camera: string
}
