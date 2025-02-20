import { CameraExid, DateType, ProjectExid } from "@/types"

export type CommentsRequestPayload = {
  cameraExid: CameraExid
  fromDate: string
  toDate: string
  page?: number
  limit?: number
}

export type CommentPosition = {
  coordinates: Array<number>
  type: string
}

export type Comment = {
  fromDate?: string
  toDate?: string
  timestamp: string
  projectExid: ProjectExid
  updatedAt?: string
  id?: number
  cameraExid: CameraExid
  content: string
  createdAt?: string
  creatorEmail?: string
  creatorName?: string
  position2d: CommentPosition
  canDelete?: boolean
}

export type CommentCreationRequestPayload = {
  fromDate?: DateType
  toDate?: DateType
  timestamp: DateType
  projectExid: ProjectExid
  cameraExid: CameraExid
  content: string
  position2d: Array<number>
}
