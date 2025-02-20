export type RouteParams = {
  projectExid?: string
  cameraExid?: string
  timestamp?: string
  fromDate?: string
  toDate?: string
}

export enum UrlParamValue {
  True = "true",
  False = "false",
}

export enum TimelineUrlParam {
  CameraExid = "cameraExid",
  Timestamp = "timestamp",
  FromDate = "fromDate",
  ToDate = "toDate",
  Live = "live",
  Video = "video",
  BeforeTimestamp = "beforeTimestamp",
  OverlayType = "overlayType",
  Sidebar = "sidebar",
  ThreeSixtyId = "_360Id",
  DroneId = "droneId",
  MediaId = "mediaId",
}

export enum Timeline360UrlParams {
  Show360 = "show360",
}

export enum TimelineDroneUrlParams {
  ShowDrone = "showDrone",
}

export enum TimelineMediaUrlParams {
  ShowMedia = "showMedia",
}

export enum TimelineBimUrlParams {
  ShowBim = "showBim",
}

export enum TimelineExNvrRecordingsUrlParams {
  ShowExNvrRecordings = "showExNvrRecordings",
}

export enum TimelineAnprUrlParams {
  ShowAnpr = "showAnpr",
}

export enum TimelineMobileCaptureUrlParams {
  ShowMobileCapture = "showMobileCapture",
}

export enum TimelineCommentsUrlParams {
  ShowComments = "showComments",
}

export type TimelineUrlParams = Record<
  | TimelineUrlParam
  | TimelineMediaUrlParams
  | TimelineBimUrlParams
  | TimelineExNvrRecordingsUrlParams
  | TimelineAnprUrlParams
  | TimelineMobileCaptureUrlParams
  | TimelineCommentsUrlParams,
  string | null
>
