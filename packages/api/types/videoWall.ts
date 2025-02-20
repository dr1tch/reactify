import { Camera, Media } from "@/types"

export enum VideoWallItemType {
  LiveView = "live",
  Video = "video",
  Image = "image",
}

export type VideoWallItem<T extends Camera | Media> = {
  value: T
  type: VideoWallItemType
}

export type VideoWallPresetItemConfig = {
  camera: Camera
  h: number
  i: string | number
  moved: boolean
  w: number
  x: number
  y: number
}

export type VideoWallPreset = {
  name?: string
  configuration: Array<VideoWallPresetItemConfig>
}
