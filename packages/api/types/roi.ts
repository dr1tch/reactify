export enum RoiType {
  Gate = "gate",
  AnprContext = "anpr_context",
  ExclusionZone = "exclusion_zone",
  WorkflowArea = "workflow_area",
  SiteAnalytics = "site_analytics",
}

export enum RoiShapeType {
  Polygon = "polygon",
  Line = "line",
  Direction = "direction",
  Rectangle = "rectangle",
}

export type RoiShape = {
  id: number | null
  name: string
  x1: number
  x2: number
  y1: number
  y2: number
}

export enum RoiDirection {
  Arrived = "arrived",
  Left = "left",
  Bidirectional = "arrived,left",
}
