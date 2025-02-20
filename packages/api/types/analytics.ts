import { DateType } from "@/types"

export type AnalyticsRequestPayload = {
  name: string
  cameraExid: string
} & { [key: string]: any }

export enum AnalyticsEventPageId {
  Timeline = "Timeline",
  Copilot = "Copilot",
  Recordings = "Recordings",
  Liveview = "LiveView",
  Compare = "Compare",
  BimCompare = "BimCompare",
  Sharing = "Sharing",
  Timelapse = "Timelapse",
  Project = "Project",
  AllProjects = "AllProjects",
  Tutorials = "Tutorials",
  ProjectMapView = "PorjectMapView",
  AccountMapView = "AccountMapView",
  Automations = "Automations",
  ProgressPhotosUnsubscribe = "ProgressPhotosUnsubscribe",
  VideoWall = "VideoWall",
  ProjectMembers = "ProjectMembers",
  ProjectOverview = "ProjectOverview",
  ProjectCameraSettings = "ProjectCameraSettings",
  Connectors = "Connectors",
  MediaHub = "MediaHub",
  MediaOveriew = "MediaOveriew",
  GateReport = "GateReport",
  Bim = "Bim",
  Drone = "Drone",
  ThreeSixty = "360",
  SitePlanner = "SitePlanner",
  Account = "Account",
  Activities = "Activities",
  Company = "Company",
  EmbeddedLive = "EmbeddedLive",
  EmbeddedRecordings = "EmbeddedRecordings",
  EmbeddedBimCompare = "EmbeddedBimCompare",
  GateReportInfo = "GateReportInfo",
  BimInfo = "BimInfo",
  DroneInfo = "DroneInfo",
  ThreeSixtyInfo = "360Info",
  BimCompareInfo = "BimCompareInfo",
}

export enum AnalyticsEvent {
  // Global events
  PageView = "PageView",
  ToggleHelpDialog = "ToggleHelpDialog",

  // Layout events
  LayoutToggleRightSidebar = "Layout-ToggleRightSidebar",
  LayoutResizeRightSidebar = "Layout-ResizeRightSidebar",
  LayoutThemeMode = "Layout-ThemeMode",

  // Features toggle events
  Xray = "Xray-Toggle",
  Weather = "Weather-Toggle",
  MarkUpTool = "MarkUpTool-Toggle",
  Comment = "Comment-Toggle",
  Compare = "Compare-Toggle",
  Copilot = "Copilot-Toggle",

  // App settings events
  OpenAppSettings = "OpenAppSettings",
  OpenCompanyPage = "OpenCompanyPage",
  ActivitiesSettingsFromDateSelect = "FromDateSelect",
  ActivitiesSettingsToDateSelect = "ToDateSelect",
  ConnectorsSettingsContactUsButtonClick = "ContactUs-ButtonClick",

  // Player events
  PlayerSelectCamera = "Player-SelectCamera",
  PlayerDownload = "Player-Download",
  PlayerToggleFullscreen = "Player-ToggleFullscreen",
  PlayerEnableLive = "Player-EnableLive",
  PlayerTogglePlayback = "Player-TogglePlayback",
  PlayerSelectSpeed = "Player-SelectSpeed",
  PlayerSelectQuality = "Player-SelectQuality",
  PlayerJumptoNextTicks = "Player-JumptoNextTicks",
  PlayerJumptoPreviousTicks = "Player-JumptoPreviousTicks",
  PlayerSwitchMode = "Player-SwitchMode",
  PlayerZoomIn = "Player-ZoomIn",
  PlayerZoomOut = "Player-ZoomOut",

  // PTZ camera events
  PTZAddPresetClick = "PTZ-AddPresetClick",
  PTZCreatePreset = "PTZ-CreatePreset",
  PTZUpdatePreset = "PTZ-UpdatePreset",
  PTZDeletePreset = "PTZ-DeletePreset",
  PTZMoveDown = "PTZ-MoveDown",
  PTZMoveLeft = "PTZ-MoveLeft",
  PTZMoveRight = "PTZ-MoveRight",
  PTZMoveUp = "PTZ-MoveUp",
  PTZPresetSelect = "PTZ-PresetSelect",
  PTZResetPosition = "PTZ-ResetPosition",
  PTZToggleCreatePresetForm = "PTZ-ToggleCreatePresetForm",
  PTZToggleDeletePresetDialog = "PTZ-ToggleDeletePresetDialog",
  PTZToggleEditPresetForm = "PTZ-ToggleEditPresetForm",
  PTZTogglePresetsMenu = "PTZ-TogglePresetsMenu",
  PTZZoomIn = "PTZ-ZoomIn",
  PTZZoomOut = "PTZ-ZoomOut",

  // Timeline actions
  TimemlineSelectMilestoneItem = "Timeline-SelectMilestoneItem",
  TimelineClickEvent = "Timeline-ClickEvent",
  TimelineSelectTimestamp = "Timeline-SelectTimestamp",

  // Copilot
  CopilotSendMessage = "Copilot-SendMessage",
  CopilotClickTimestamp = "Copilot-ClickTimestamp",
  CopilotRegenerate = "Copilot-Regenerate",
  CopilotError = "Copilot-Error",
  CopilotNavigation = "Copilot-Navigation",
  CopilotToggle = "Copilot-Toggle",

  // Timeline groups visibitlity events
  GroupsVisibilityMobileCapture = "GroupsVisibility-MobileCapture",
  GroupsVisibilityAnpr = "GroupsVisibility-Anpr",
  GroupsVisibilityComments = "GroupsVisibility-Comments",
  GroupsVisibilityMediaHub = "GroupsVisibility-MediaHub",
  GroupsVisibilityBimMilestones = "GroupsVisibility-BimMilestines",
  GroupsVisibilityDroneFlights = "GroupsVisibility-DroneFlights",
  GroupsVisibility360Walks = "GroupsVisibility-360Walks",
  GroupsVisibilityExNvrVideoRecordings = "GroupsVisibility-ExNvrVideoRecordings",
  GroupsVisibilityLuminance = "GroupsVisibility-Luminance",

  // Comments events
  CommentsPlaceMarker = "Comments-PlaceMarker",
  CommentsSave = "Comments-Save",
  CommentsCancelSave = "Comments-CancelSave",
  CommentsRemove = "Comments-Remove",
  CommentsCancelRemove = "Comments-CancelRemove",
  CommentsArchive = "Comments-Archive",
  CommentsCancelArchive = "Comments-CancelArchive",
  CommentsSelect = "Comments-Select",

  // Xray events
  XrayMove = "Xray-Move",
  XrayMoveBeforeMarker = "Xray-MoveBeforeMarker",
  XrayMoveAfterMarker = "Xray-MoveAfterMarker",
  XrayToggleExportDialog = "Xray-ToggleExportDialog",
  XrayDownload = "Xray-Download",
  XraySaveToMediaHub = "Xray-SaveToMediaHub",
  XarySelectDate = "Xray-SelectDate",
  XarySelectLatestDate = "Xray-SelectLatestDate",
  XarySelectOldestDate = "Xray-SelectOldestDate",
  XraySendToConnector = "Xray-SendToConnector",

  // Weather events
  WeatherSelectProvider = "Weather-SelectProvider",
  WeatherSelectDate = "Weather-SelectDate",
  WeatherGoBackDate = "Weather-GoBackDate",
  WeatherGoForwardDate = "Weather-GoForwardDate",
  WeatherSelectTempScale = "Weather-SelectTempScale",
  WeatherSelectLegend = "Weather-SelectLegend",

  // Compare events
  CompareSlide = "Compare-Slide",
  CompareMoveBeforeMarker = "Compare-MoveBeforeMarker",
  CompareMoveAfterMarker = "Compare-MoveAfterMarker",
  CompareSelectBeforeDate = "Compare-SelectBeforeDate",
  CompareSelectBeforeLatestDate = "Compare-SelectBeforeLatestDate",
  CompareSelectBeforeOldestDate = "Compare-SelectBeforeOldestDate",
  CompareSelectAfterDate = "Compare-SelectAfterDate",
  CompareSelectAfterOldestDate = "Compare-SelectAfterOldestDate",
  CompareSelectAfterLatestDate = "Compare-SelectAfterLatestDate",
  CompareToggleExportDialog = "Compare-ToggleExportDialog",
  CompareSaveToMediaHub = "Compare-SaveToMediaHub",
  CompareGoToMediaHub = "Compare-GoToMediaHub",
  CompareDownloadAs = "Compare-DownloadAs",
  CompareCopyDownloadFileUrl = "Compare-CopyDownloadFileUrl",

  // Bim Compare events
  BimCompareSlide = "BimCompare-Slide",
  BimCompareSelectCameraDate = "BimCompare-SelectCameraDate",
  BimCompareSelectCameraLatestDate = "BimCompare-SelectCameraLatestDate",
  BimCompareSelectCameraOldestDate = "BimCompare-SelectCameraOldestDate",
  BimCompareSelectBimDate = "BimCompare-SelectBimDate",
  BimCompareSelectBimOldestDate = "BimCompare-SelectBimOldestDate",
  BimCompareSelectBimLatestDate = "BimCompare-SelectBimLatestDate",
  BimCompareSelectModel = "BimCompare-SelectModel",
  BimCompareChangeTransparency = "BimCompare-ChangeTransparency",
  BimCompareSelectTimelineDate = "BimCompare-SelectTimelineDate",
  BimCompareToggleExportDialog = "BimCompare-ToggleExportDialog",
  BimCompareSaveToMediaHub = "BimCompare-SaveToMediaHub",
  BimCompareGoToMediaHub = "BimCompare-GoToMediaHub",
  BimCompareDownloadAs = "BimCompare-DownloadAs",
  BimCompareCopyDownloadFileUrl = "BimCompare-CopyDownloadFileUrl",

  // Mark-up tool events
  MarkUpToolClose = "MarkUpTool-Close",
  MarkUpToolCopyImage = "MarkUpTool-CopyImage",
  MarkUpToolOpen = "MarkUpTool-Open",
  MarkUpToolSelectTool = "MarkUpTool-SelectTool",
  MarkUpToolSelectBlur = "MarkUpTool-SelectBlur",
  MarkUpToolSelectCrop = "MarkUpTool-SelectCrop",
  MarkUpToolSelectLine = "MarkUpTool-SelectLine",
  MarkUpToolSelectBrush = "MarkUpTool-SelectBrush",
  MarkUpToolSelectRectangle = "MarkUpTool-SelectRectangle",
  MarkUpToolSelectCircle = "MarkUpTool-SelectCircle",
  MarkUpToolSelectArrow = "MarkUpTool-SelectArrow",
  MarkUpToolSelectText = "MarkUpTool-SelectText",
  MarkUpToolUndo = "MarkUpTool-Undo",
  MarkUpToolRedo = "MarkUpTool-Redo",
  MarkUpToolSelectColor = "MarkUpTool-SelectColor",
  MarkUpToolApplyCrop = "MarkUpTool-ApplyCrop",
  MarkUpToolCancelCrop = "MarkUpTool-CancelCrop",
  MarkUpToolCancelSend = "MarkUpTool-CancelSend",
  MarkUpToolOpenEditName = "MarkUpTool-OpenEditName",
  MarkUpToolCancelEditName = "MarkUpTool-CancelEditName",
  MarkUpToolSaveEditedName = "MarkUpTool-SaveEditedName",
  MarkUpToolSaveToMediaHub = "MarkUpTool-SaveToMediaHub",
  MarkUpToolDownloadAs = "MarkUpTool-DownloadAs",
  MarkUpToolSendToConnector = "MarkUpTool-SendToConnector",

  // Ai Tools events
  AiToolToggleBrainToolsMenu = "AITool-ToggleBrainToolsMenu",
  AiToolSelectObjectDetection = "AITool-SelectObjectDetection",
  AiToolSelectAskChatGpt = "AITool-SelectAskChatGpt",
  AiToolSelectSegmentation = "AITool-SelectSegmentation",
  AiToolSelectDepthAnalysis = "AITool-SelectDepthAnalysis",
  AiToolUpdateTransparency = "AITool-UpdateTransparency",

  // Recordings events
  RecordingsSelectDate = "SelectDate",
  RecordingsSelectDateClickMonthYear = "SelectDate-ClickMonthYear",
  RecordingsSelectLatestDate = "SelectLatestDate",
  RecordingsSelectOldestDate = "SelectOldestDate",
  RecordingsClickSupportLink = "ClickSupportLink",
  RecordingsToggleExportDialog = "ToggleExportDialog",
  RecordingToggleGateReportEvents = "ToggleGateReportEvents",

  // Sharing events
  SharingToggleAddUserDialog = "ToggleAddUserDialog",
  SharingToggleEditVisibilityOptionsDialog = "ToggleEditVisibilityOptionsDialog",
  SharingAddUser = "AddUser",
  SharingToggleDeleteUserDialog = "ToggleDeleteUserDialog",
  SharingDeleteUser = "DeleteUser",
  SharingSaveVisibilityOptions = "SaveVisibilityOptions",
  SharingCopyLink = "CopyLink",
  SharingResendInvite = "ResendInvite",
  SharingTransferOwnership = "TransferOwnership",
  SharingSortBy = "SortBy",
  SharingChangeAccessRight = "ChangeAccessRight",

  // ThreeSixty events
  ThreeSixtyShareView = "ShareView",
  ThreeSixtyOpen = "Open",
  ThreeSixtyOpenMarkersThumbnailsList = "OpenMarkersThumbnailsList",
  ThreeSixtyOpenTagsList = "OpenTagsList",
  ThreeSixtyMarkerThumbnailClicked = "MarkerThumbnailClicked",
  ThreeSixtyToggleMarkersVisibility = "ToggleMarkersVisibility",
  ThreeSixtyToggleMinimapVisibility = "ToggleMinimapVisibility",
  ThreeSixtyToggleTagsVisibility = "ToggleTagsVisibility",
  ThreeSixtyTourPause = "Tour-Pause",
  ThreeSixtyTourPlay = "Tour-Play",
  ThreeSixtyTourSetSpeedXHalve = "Tour-SetSpeedX0.5",
  ThreeSixtyTourSetSpeedX1 = "Tour-SetSpeedX1",
  ThreeSixtyTourSetSpeedX2 = "Tour-SetSpeedX2",
  ThreeSixtyTourSetSpeedX4 = "Tour-SetSpeedX4",
  ThreeSixtyTourToggleLoop = "Tour-ToggleLoop",

  // Drone events
  DroneAreaToolClick = "AreaTool-Click",
  DroneChangeDate = "ChangeDate",
  DroneCompareToolClick = "CompareTool-Click",
  DroneCompareToolSliderMove = "CompareTool-SliderMove",
  DroneGenerateUploadFlight = "GenerateUploadFlight",
  DroneInspectionToolClick = "InspectionTool-Click",
  DroneMeasuringToolClick = "MeasuringTool-Click",
  DroneOpenHelpPanel = "OpenHelpPanel",
  DroneOpenImageViewer = "OpenImageViewer",
  DroneResetView = "ResetView",
  DroneSettingsToggle360PathsVisibility = "Settings-Toggle360PathsVisibility",
  DroneSettingsToggleCameraMarkersVisibility = "Settings-ToggleCameraMarkersVisibility",
  DroneSettingsToggleSurroundingBuildingsTool = "Settings-ToggleSurroundingBuildingsTool",
  DroneSettingsToggleTagsVisibility = "Settings-ToggleTagsVisibility",
  DroneShareLink = "ShareLink",
  DroneTagsToolClick = "TagsTool-Click",
  DroneToggleBimCompareTool = "ToggleBimCompareTool",
  DroneToggleFullScreen = "ToggleFullScreen",
  DroneToggleMapStyle = "ToggleMapStyle",
  DroneToggleSceneMode = "ToggleSceneMode",
  DroneVolumeToolClick = "VolumeTool-Click",
  DroneUploadFlight = "UploadFlight",
  DroneZoomIn = "ZoomIn",
  DroneZoomOut = "ZoomOut",

  // Site Planner events
  SitePlannerAddCameraClick = "AddCameraClick",
  SitePlannerAddSitePlanDrawingClick = "AddSitePlanDrawingClick",
  SitePlannerAddSitePlanClick = "AddSitePlanClick",
  SitePlannerAttachSitePlanDrawing = "AttachSitePlanDrawing",
  SitePlannerCameraMarkerEditFOVAngle = "CameraMarker-EditFOVAngle",
  SitePlannerCameraMarkerEditHeading = "CameraMarker-EditHeading",
  SitePlannerCameraMarkerEditName = "CameraMarker-EditName",
  SitePlannerCameraMarkerEditRadius = "CameraMarker-EditRadius",
  SitePlannerCameraMarkerSelectColor = "CameraMarker-SelectColor",
  SitePlannerCameraMarkerToggleVisibility = "CameraMarker-ToggleVisibility",
  SitePlannerCameraMarkerToggleDeleteDialog = "CameraMarker-ToggleDeleteDialog",
  SitePlannerCancelUploadSitePlanDrawing = "CancelUploadSitePlanDrawing",
  SitePlannerChangeLocation = "ChangeLocation",
  SitePlannerOpen = "Open",
  SitePlannerResetView = "ResetView",
  SitePlannerSitePlansList = "SitePlansList",
  SitePlannerToggleCamerasLabel = "ToggleCamerasLabel",
  SitePlannerToggleFullscreen = "ToggleFullscreen",
  SitePlannerToggleMapStyle = "ToggleMapStyle",
  SitePlannerToggleRightSideMenu = "ToggleRightSideMenu",
  SitePlannerToggleSaveSessionDialog = "ToggleSaveSessionDialog",
  SitePlannerUploadSitePlanDrawing = "UploadSitePlanDrawing",
  SitePlannerZoomIn = "ZoomIn",
  SitePlannerZoomOut = "ZoomOut",

  // Markers events
  MarkerClicked = "MarkerClicked",

  // Timelapse Creator events
  TimelapseToggleHelpDialog = "ToggleHelpDialog",
  TimelapseSelectCustomPeriod = "SelectCustomPeriod",
  TimelapseToggleCustomScheduleDialog = "ToggleCustomScheduleDialog",
  TimelapseSaveCustomSchedule = "SaveCustomSchedule",
  TimelapseToggleExportDialog = "ToggleExportDialog",
  TimelapseExportSelectStep = "SelectStep",
  TimelapseSelectOption = "SelectOption",
  TimelapseSaveToMediaHub = "SaveToMediaHub",
  TimelapseGoToMediaHub = "GoToMediaHub",
  TimelapseToggleUploadLogoDialog = "ToggleUploadLogoDialog",
  TimelapseUploadLogo = "UploadLogo",

  // Progress Photos events
  ProgressPhotoToggleCreateDialog = "ProgressPhoto-ToggleCreateDialog",
  ProgressPhotoToggleEditDialog = "ProgressPhoto-ToggleEditDialog",
  ProgressPhotoSelectProvider = "ProgressPhoto-SelectProvider",
  ProgressPhotoSelectMember = "ProgressPhoto-SelectMember",
  ProgressPhotoSelectCameras = "ProgressPhoto-SelectCameras",
  ProgressPhotoSelectDays = "ProgressPhoto-SelectDays",
  ProgressPhotoSelectTime = "ProgressPhoto-SelectTime",
  ProgressPhotoSelectTimezone = "ProgressPhoto-SelectTimezone",
  ProgressPhotoCreate = "ProgressPhoto-Create",
  ProgressPhotoEdit = "ProgressPhoto-Edit",
  ProgressPhotoPause = "ProgressPhoto-Pause",
  ProgressPhotoResume = "ProgressPhoto-Resume",
  ProgressPhotoDelete = "ProgressPhoto-Delete",
  ProgressPhotoUnsubscribeUser = "ProgressPhoto-UnsubscribeUser",

  // Map View events
  MapViewToggleCameraMapInfoTooltip = "MapView-ToggleCameraMapInfoTooltip",
  MapViewClickCameraLink = "MapView-ClickCameraLink",

  // Video Wall events
  VideoWallToggleFullscreen = "VideoWall-ToggleFullscreen",
  VideoWallToggleCameraFullscreen = "VideoWall-ToggleCameraFullscreen",
  VideoWallToggleConfigDialog = "VideoWall-ToggleConfigDialog",
  VideoWallToggleCameraVisibility = "VideoWall-ToggleCameraVisibility",
  VideoWallPositionCameraOnWall = "VideoWall-PositionCameraOnWall",
  VideoWallSaveConfig = "VideoWall-SaveConfig",

  // Project Members events
  ProjectMembersToggleAddDialog = "ToggleAddDialog",
  ProjectMembersAddMember = "AddMember",
  ProjectMembersApplyCamerasFilter = "ApplyCamerasFilter",
  ProjectMembersApplySearchFilter = "ApplySearchFilter",
  ProjectMembersShareCamera = "ShareCamera",
  ProjectMembersEditCameraAccess = "EditCameraAccess",
  ProjectMembersDeleteCameraAccess = "DeleteCameraAccess",

  // Project Camera settings events
  ProjectCameraSettingsUpdateCameraName = "UpdateCameraName",
  ProjectCameraSettingsUpdateCameraVisibility = "UpdateCameraVisibility",

  // Connectors events
  ConnectorsConnectToProcore = "Connectors-ConnectToProcore",
  ConnectorsToggleAconexDialog = "Connectors-ToggleAconexDialog",
  ConnectorsConnectToAconex = "Connectors-ConnectToAconex",
  ConnectorsConnectToAutodesk = "Connectors-ConnectToAutodesk",
  ConnectorsToggleVoyageControlDialog = "Connectors-ToggleVoyageControlDialog",
  ConnectorsConnectToVoyageControl = "Connectors-ConnectToVoyageControl",
  ConnectorsToggleConnectorPromptDialog = "Connectors-ToggleConnectorPromptDialog",

  // Media Hub events
  MediaHubSelectFilter = "SelectFilter",
  MediaHubApplyFilters = "ApplyFilters",
  MediaHubToggleAddMediaUrlDialog = "ToggleAddMediaUrlDialog",
  MediaHubToggleUploadFileDialog = "ToggleUploadFileDialog",
  MediaHubToggleUploadLocalClipDialog = "ToggleUploadLocalClipDialog",
  MediaHubSaveMediaUrl = "SaveMediaUrl",
  MediaHubUploadFile = "UploadFile",
  MediaHubSelectPage = "SelectPage",
  MediaHubGoToNextPage = "GoToNextPage",
  MediaHubGoToPreviousPage = "GoToPreviousPage",

  // Media Hub Item events
  MediaDelete = "Media-Delete",
  MediaToggleTitleEditing = "Media-ToggleTitleEditing",
  MediaSaveTitle = "Media-SaveTitle",
  MediaDownloadAs = "Media-DownloadAs",
  MediaTogglePublicVisibility = "Media-TogglePublicVisibility",
  MediaShareToPlatform = "Media-ShareToPlatform",
  MediaCopyMediaLink = "Media-CopyMediaLink",
  MediaGoToMediaHub = "Media-GoBackToMediaHub",

  // Gate report
  GateReportCalendarTreeDateClick = "CalendarTree-DateClick",
  GateReportExportPdf = "ExportPdf",
  GateReportExportCsv = "ExportCsv",
  GateReportFilterEntryExit = "FilterEntryExit",
  GateReportFilterCameras = "FilterCameras",
  GateReportFilterPlateNumber = "FilterPlateNumber",
  GateReportFilterVehicleTypes = "FilterVehicleTypes",
  GateReportTimelineDateClick = "Timeline-DateClick",
  GateReportToggleThumbnails = "ToggleThumbnails",

  // TODO: The events bellow are old events, should be updated!
  // Recordings
  CreateClip = "create_clip",

  //Help Menu
  HelpMenuToggleMenuButton = "HelpMenu-ToggleMenuButton",
  HelpMenuOpenLiveChat = "HelpMenu-OpenLiveChat",
  HelpMenuClickTutorialsLink = "HelpMenu-ClickTutorialsLink",
  HelpMenuClickWhatsNewLink = "HelpMenu-ClickWhatsNewLink",
  HelpMenuClickUserManuaLink = "HelpMenu-ClickUserManuaLink",
  HelpMenuClickSupportTicketsLink = "HelpMenu-ClickSupportTicketsLink",
}

export type ProjectPAStatsRequestPayload = {
  period: "day" | "week" | "month"
  startDate?: string
  endDate?: string
}

export type ProjectPAStatsResponsePayload = {
  period: DateType
  name: string
  count: number | string
}

export type ActiveUsersStatsRequestPayload = {
  companyId: number
  from: string
  to: string
}

export type ActiveUserStat = {
  date: string
  dau: number
  wau: number
  mau: number
}
