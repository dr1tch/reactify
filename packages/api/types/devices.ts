export type MilesightRequestParams = {
  host: string
  httpPort: number
  username: string
  password: string
}

export type MilesightCameraNetworkConfiguration = {
  httpEnable: number
  httpPort: number
  httpsEnable: number
  httpsPort: number
  certSubject: string
  certDate: string
  certResult: number
  requestSubject: string
  certUpdateFlag: number
  ipv4Ipaddress: string
  ipv6Ipaddress: string
  notBefore: string
  notAfter: string
  country: string
  ST: string
  O: string
  CN: string
}

export type MilesightCameraSystemSettings = {
  model: string
  mac: string
  firmwareVersion: string
  systemBootTime: string
  wireless: number
  dhcpEnable: number
  ipaddress: string
  netmask: string
  gateway: string
  pppoeEnable: number
  dns0: string
  dns1: string
  ddnsEnable: number
  ddnsHostName: string
  ddnsStatus: number
  wirelessEnable: number
  deviceName: string
  deviceLacation: string
  deviceInformation: string
  deviceVender: string
  hardwareVersion: string
  kernelVersion: string
  sdkVersion: string
  aiNnieStatus: number
  ioSupport: number
  audioSupport: number
  audioMode: number
  audioType: number
  audioLineInput: number
  alarmInputSupport: number
  alarmOutputSupport: number
  fisheyeSupport: number
  vcaSupport: number
  vcaType: number
  anrSupport: number
  speakerSupport: number
  lprSupport: number
  lprVersion: number
  lprLicense: number
  radarSupport: number
  upgrade: number
  faceSupport: number
  polygonFaceSupport: number
  irSensor: number
  dnSensitivitySupport: number
  croproiSupport: number
  dnRefocusSupport: number
  reduceStutteringSupport: number
  polygonSupport: number
  localDisplaySupport: number
  fanWorkingModeSupport: number
  smartIrLimitType: number
  smartIrLimitSum: number
  audioFileManagerSupport: number
  humanVehicleSupport: number
  manualSpeedSupport: number
  snCode: string
  mosaicSupport: number
  antiShakeSupport: number
  corridorModeSupport: number
  imageRotationSupport: number
  humanDetectionSupport: number
  regionalPeopleSupport: number
  heatMapSupport: number
  msChip: string
  runtime: number
  lprlicenStatus: number
  p2pSupport: number
  ptzSupport: number
  adminoptions: number
  adminuser: string
  miscAnonymous: number
  pwdStrengthType: number
  viewerdef: number
  viewerOptions: number
  oemIndex: number
  audioAlarmSupport: number
  ledSupport: number
  ledGroupSupport: number
  ptzMaxZoomTimes: number
  realPtzSupport: number
  iotSupport: number
  isSpeedDm: number
  supportOsdLarger: number
  isFaceCustomizeModeExists: number
  autoTrackSupport: number
  smartStreamSupportInOtherStream: number
  wiperSupport: number
  oemupdateonline: number
  whiteLedSupport: number
  defogSupport: number
  manualTrackingSupport: number
  manualTrackingDisable: number
  "3DPositionSupport": number
  rs485Support: number
  ptzStatusSupport: number
  heaterSupport: number
}

export type MilesightCameraStreamConfig = {
  enable?: number
  width?: number
  height?: number
  url?: string
  profileGop?: number
  rateMode?: MilesightCameraRateModeId
  framerate?: number
  bitrate?: number
  smartStreamEnable?: number
  smartStreamLevel?: number
  profile?: number
  profileCodec?: MilesightCameraCodecId
  rateQuality?: number
  vbrQuality?: MilesightCameraVbrQualityId
}

export type MilesightCameraStreamConfigList = {
  mainStream: MilesightCameraStreamConfig
  subStream: MilesightCameraStreamConfig
  thirdStream: MilesightCameraStreamConfig
  fourthStream?: {
    enable: number
  }
  fifthStream?: {
    enable: number
  }
}

export type MilesightCameraVideoConfig = {
  deviceModel: string
  deviceSensor: string
  deviceTvStandards: number
  streamList: MilesightCameraStreamConfigList
  cTvStandards: number
  rtspPort: number
  eventStreamEnable: number
  eventStreamFramerate: number
  eventStreamBitrate: number
  eventStreamIframe: number
  fishDisplayModel: number
  fishInstallModel: number
  fishCorrectModel: number
  mainCodecres: number
  imageScheMode: number
  hlcMode: number
  exposurectrl: number
  wdrEnable: number
}
export type MilesightCameraStreamOsdInfo = {
  streamIndex: number
  osdEnable: number
  osdString: string
  osdDateTimeEnable: number
  osdFontSize: number
  osdFontColor: string
  osdBackgroundEnable: number
  osdBackgroundColor: string
  osdTextPosition: number
  osdDateTimePosition: number
  osdDateTimeFormat: number
  cropRoiEnable: number
}

export type MilesightCameraOsdConfiguration = {
  osdInfoList: MilesightCameraStreamOsdInfo[]
  osdZoomTime: number
}

export type MilesightCameraSdCardInfo = {
  sdcardStatus: number
  sdcardDiskStatus: number
  sdcardFullStatus: number
  sdcardTotalSize: string
  sdcardFreeSize: string
  sdcardUseSize: string
  sdEncryptStatus: number
}

export type MilesightCameraTimeInfo = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  timeZoneTz: string
  zoneNameTz: string
  dayLight: number
  timeType: number
  ntpServer: string
  ntpSyncEnable: number
  ntpInterval: number
}

export enum MilesightCameraCodecId {
  H264 = 0,
  H265 = 3,
  MJpeg1 = 1,
  MJpeg2 = 2,
}
export enum MilesightCameraVbrQualityId {
  Low = 0,
  Medium = 1,
  High = 2,
}

export enum MilesightCameraRateModeId {
  CBR = 0,
  VBR = 1,
}
