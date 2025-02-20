import type { DateTime } from "@evercam/api/types/time"

export enum WidgetType {
  LiveWidget = "Live View",
  Recording = "Recordings",
  BimCompare = "BIM Compare",
  VideoWall = "Video Wall",
}

export const RessourceByType = {
  camera: [WidgetType.LiveWidget, WidgetType.Recording, WidgetType.BimCompare],
  project: [WidgetType.VideoWall],
}

export type WidgetsListRequestPayload = {
  userId: number
  projectId: number
  cameraId: number
  active: boolean
  widgetType: WidgetType
  allowedOrigin: string
}

export type Widget = {
  id: number
  ressources: {
    camera?: {
      id: number
      exid: string
      name: string
    }
    project?: {
      id: number
      exid: string
      name: string
    }
  }
  widgetType: WidgetType
  active: boolean
  user: {
    id: number
    email: string
  }
  insertedAt: DateTime
  updatedAt: DateTime
}

export type WidgetFull = {
  id: number
  ressources: {
    camera?: {
      id: number
      exid: string
      name: string
    }
    project?: {
      id: number
      exid: string
      name: string
    }
  }
  widgetType: WidgetType
  widgetKey: string
  widgetId: string
  active: boolean
  user: {
    id: number
    email: string
  }
  settings: any
  allowedOrigin: string
  insertedAt: DateTime
  updatedAt: DateTime
}

export type WidgetPayload = {
  ressources: {
    cameraId?: number
    projectId?: number
  }
  widgetType: WidgetType
  active: boolean
  settings: any
  allowedOrigin: string
}
