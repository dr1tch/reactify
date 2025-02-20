import { axios } from "./client"
import type { AxiosRequestConfig } from "axios"
import { queryStringToObject, toQueryString } from "@evercam/api/utils"
import type {
  AconexAuthCallbackParams,
  AconexEditedImageUploadRequestPayload,
  AconexUserProjectsResponsePayload,
  ActiveUsersStatsRequestPayload,
  ActiveUserStat,
  AnalyticsRequestPayload,
  ApiCredentials,
  AutodeskFolderResponsePayload,
  AutodeskProjectsResponsePayload,
  AutodeskTokenResponsePayload,
  AutodeskUploadSnapshotPayload,
  AutodeskUserHubsResponsePayload,
  AvailableDaysRequestPayload,
  AvailableDaysResponsePayload,
  AvailableHoursRequestPayload,
  AvailableHoursResponsePayload,
  BatteryReading,
  BatteryVoltage,
  BimCompareExportRequestPayload,
  BimCreationPayload,
  BIMLayer,
  BIMLayerPostPayload,
  BimLayersQueryParams,
  BimModelRequestPayload,
  BimModelResponsePayload,
  BimPendingImage,
  BimSnapshotRequestPayload,
  BimSnapshotResponsePayload,
  BimUploadCameraParameters,
  CameraExid,
  CameraLogsResponsePayload,
  CamerasResponsePayload,
  CameraStatusLog,
  CameraUpdateRequestPayload,
  CheckCameraPortPayload,
  Comment,
  CommentCreationRequestPayload,
  CommentsRequestPayload,
  Company,
  CompanyProject,
  CompanyUser,
  Compare,
  CompareRequestPayload,
  ConnectorResponsePayload,
  Credentials,
  GoogleAuthRequestPayload,
  LoginRequestPayload,
  LoginResponsePayload,
  Logo,
  LogoutParams,
  Media,
  MediaCreateRequestPayload,
  MediaFilterQueryParams,
  MediaUpdateRequestPayload,
  MediaUsersResponsePayload,
  NearestSnapshotRequestPayload,
  NearestSnapshotResponsePayload,
  PaginatedItems,
  PendingBimImagesParams,
  ProcessPendingImagesBimParams,
  ProcoreEditedImageUploadRequestPayload,
  ProcoreProjectsAlbumsPayload,
  ProcoreProjectsAlbumsRequestPayload,
  ProcoreUserCompaniesResponsePayload,
  ProcoreUserProjectRequestPayload,
  ProcoreUserProjectsResponsePayload,
  ProgressPhotosCreateUpdateRequestPayload,
  ProgressPhotosResponsePayload,
  ProgressPhotosUnSubscribeParams,
  ProjectBatteryReading,
  ProjectExid,
  ProjectLogoResponsePayload,
  ProjectPAStatsRequestPayload,
  ProjectPAStatsResponsePayload,
  ProjectResponsePayload,
  ProjectShareResponse,
  RemotePasswordUpdateRequestPayload,
  ResendShareRequestPayload,
  SessionActivitiesListRequestPayload,
  SessionActivity,
  SessionsListRequestPayload,
  Share,
  ShareCreateRequestPayload,
  ShareCreateResponsePayload,
  ShareDeletionRequestPayload,
  SharedUsersResponsePayload,
  ShareProjectCamerasRequestPayload,
  ShareRequestsResponsePayload,
  SharesResponsePayload,
  Snapshot,
  SnapshotRangeRequestPayload,
  SnapshotRangeResponsePayload,
  ThumbnailData,
  TimelapseCreationRequestPayload,
  TimelapseCreationResponsePayload,
  TimelapseSnapshotRequestPayload,
  TimelapseSnapshotResponsePayload,
  UpdatePasswordRequestPayload,
  UserDeleteRequestPayload,
  UserSession,
  UserUpdateRequestPayload,
  VoyageControlConnectorPayload,
  Widget,
  WidgetFull,
  WidgetPayload,
  WidgetsListRequestPayload,
} from "@evercam/api/types"

export const EvercamApi = {
  apiStatus: {
    getApiStatus() {
      return axios.get("/status")
    },
  },
  users: {
    fetchAccessFeatures(email: string): Promise<{ features: string[] }> {
      return axios.get(`/users/${email}/features`)
    },
    impersonationLogin(token: string) {
      return axios.post(`/auth/impersonate/${token}`)
    },
    login(params: LoginRequestPayload): Promise<LoginResponsePayload> {
      return axios.post("/auth/login", toQueryString(params))
    },
    loginWithApiCredentials(
      apiId: String,
      apiKey: String
    ): Promise<LoginResponsePayload> {
      return axios.post(`/auth/login?api_id=${apiId}&api_key=${apiKey}`)
    },
    loginWithWidgetCredentials(
      widgetId: String,
      widgetKey: String
    ): Promise<LoginResponsePayload> {
      return axios.post(
        `/auth/login?widget_id=${widgetId}&widget_key=${widgetKey}`
      )
    },
    loginWithProvider(
      provider: string,
      payload: GoogleAuthRequestPayload
    ): Promise<LoginResponsePayload> {
      return axios.post(`/auth/${provider}`, payload)
    },
    getUser(email: string): Promise<{ users: LoginResponsePayload[] }> {
      return axios.get(`/users/${email}`)
    },
    logout(
      payload: LogoutParams,
      config: Partial<AxiosRequestConfig> = {}
    ): Promise<void> {
      return axios.delete("/auth/logout", { params: payload, ...config })
    },
    resetPassword(email: string): Promise<{ message: string }> {
      return axios.post(`/users/${email}/password/reset`)
    },
    getCredentials(): Promise<Credentials> {
      return axios.get("/auth/credentials")
    },
    updatePassword(
      user: string,
      payload: UpdatePasswordRequestPayload
    ): Promise<{ message: string }> {
      return axios.patch(`/users/${user}/password`, payload)
    },
    remotePasswordUpdate(
      email: string,
      payload: RemotePasswordUpdateRequestPayload
    ): Promise<{ message: string }> {
      return axios.patch(`/users/${email}/password/update`, payload)
    },
    confirm(email: string, payload: any): Promise<LoginResponsePayload> {
      return axios.post(`/users/${email}/confirm`, payload)
    },
    deleteActiveSession(sessionId: string, payload: any = {}): Promise<void> {
      return axios.delete(`/users/active-sessions/${sessionId}`, {
        params: payload,
      })
    },
    getActiveSessions(
      payload: SessionsListRequestPayload
    ): Promise<PaginatedItems<UserSession>> {
      return axios.get("/users/active-sessions", {
        params: payload,
      })
    },
    getSessionActivities(
      payload: SessionActivitiesListRequestPayload
    ): Promise<PaginatedItems<SessionActivity>> {
      return axios.get("/users/session/activities", { params: payload })
    },
    update(
      email: string,
      params: Partial<UserUpdateRequestPayload> = {}
    ): Promise<{ users: LoginResponsePayload[] }> {
      return axios.patch(`/users/${email}`, params)
    },
    delete(email: string, params: UserDeleteRequestPayload): Promise<void> {
      return axios.post(`/users/${email}/delete`, params)
    },
    fetchPermissions(): Promise<{ permissions: string[] }> {
      return axios.get("/users/permissions")
    },
  },
  notifications: {
    get() {
      return axios.get("/notifications")
    },
    markAllAsRead(id: string) {
      return axios.patch(`/notifications/${id}`)
    },
    markAsRead() {
      return axios.post("/notifications/mark-as-read")
    },
  },
  bim: {
    getBimSnapshot(
      cameraId: string,
      dateTime: string,
      payload: Partial<BimSnapshotRequestPayload>,
      extraParams?: AxiosRequestConfig
    ): Promise<BimSnapshotResponsePayload> {
      return axios.get(`/cameras/${cameraId}/bim/${dateTime}`, {
        params: payload,
        ...(extraParams || {}),
      })
    },
    getBimModel(
      cameraId: string,
      payload: BimModelRequestPayload,
      extraParams?: AxiosRequestConfig
    ): Promise<BimModelResponsePayload> {
      return axios.get(`/cameras/${cameraId}/bim`, {
        params: payload,
        ...(extraParams || {}),
      })
    },
    pendingBimImages(
      cameraId: string,
      params: PendingBimImagesParams
    ): Promise<BimPendingImage[]> {
      return axios.get(`/cameras/${cameraId}/bim/pending`, { params })
    },
    processPendingImages(
      cameraId: string,
      params: Partial<ProcessPendingImagesBimParams>
    ): Promise<void> {
      return axios.post(`/cameras/${cameraId}/bim/pending`, params)
    },
    createBim(cameraId: string, params: BimCreationPayload): Promise<void> {
      return axios.post(`/cameras/${cameraId}/bim`, params)
    },
    getCameraParameters(
      cameraId: string,
      params: ApiCredentials
    ): Promise<BimUploadCameraParameters> {
      return axios.get(`/cameras/${cameraId}/bim/camera-parameters`, {
        params,
      })
    },
    uploadCameraParameters(
      cameraId: string,
      params: BimUploadCameraParameters
    ): Promise<BimUploadCameraParameters> {
      return axios.post(`/cameras/${cameraId}/bim/camera-parameters`, params)
    },
    exportCompare(
      projectExid: string,
      payload: BimCompareExportRequestPayload
    ): Promise<Compare> {
      return axios.post(
        `/projects/${projectExid}/media-hub/compares/bim-compares`,
        payload
      )
    },
  },
  cameras: {
    getCameras(): Promise<CamerasResponsePayload> {
      return axios.get("/cameras")
    },
    getCameraById(
      cameraId: string,
      params?: ApiCredentials
    ): Promise<CamerasResponsePayload> {
      return axios.get(`/cameras/${cameraId}?${toQueryString(params)}`)
    },
    getCameraLastPublicNote(
      cameraId: string
    ): Promise<CameraLogsResponsePayload> {
      return axios.get(`/cameras/${cameraId}/last-public-note`)
    },
    portCheck(payload: {
      params: CheckCameraPortPayload
    }): Promise<CheckCameraPortPayload & { open: boolean }> {
      return axios.get("/cameras/port-check", payload)
    },
    getNvrStreamingToken({
      cameraExid,
      token,
    }: {
      cameraExid: string
      token: string
    }): Promise<string> {
      return fetch(
        `${axios.env.baseUrl}/cameras/${cameraExid}/hls?authorization=${token}`
      ).then(
        ({ url }) => queryStringToObject(url.split("?")[1] || "").access_token
      ) as Promise<string>
    },
    getCameraStatusLogs(
      exid: string,
      params: {
        params: {
          from: string
          to: string
        }
      }
    ): Promise<CameraStatusLog[]> {
      return axios.get(`/cameras/${exid}/health`, params)
    },
    updateCamera(
      exid: string,
      params: CameraUpdateRequestPayload
    ): Promise<CamerasResponsePayload> {
      return axios.patch(`/cameras/${exid}`, params)
    },
  },
  projects: {
    index(params?: ApiCredentials): Promise<ProjectResponsePayload> {
      return axios.get(`/projects?${toQueryString(params)}`)
    },
    getLogos(projectId: string): Promise<ProjectLogoResponsePayload> {
      return axios.get(`/projects/${projectId}/logos`)
    },
    createLogo(
      projectId: string,
      formData: FormData
    ): Promise<Logo & { id: number }> {
      const headers = { "Content-Type": "multipart/form-data" }

      return axios.post(`/projects/${projectId}/logos`, formData, {
        headers,
      })
    },
    deleteLogo(projectId: string, id: number): Promise<void> {
      return axios.delete(`/projects/${projectId}/logos/${id}`)
    },
    updateLogo(projectId: string, id: number, name: string) {
      return axios.patch(
        `/projects/${projectId}/logos/${id}`,
        toQueryString({ name })
      )
    },
    updateThumbnail(
      projectExid: string,
      params: { cameraExid?: string; uploadedThumbnail?: string }
    ): Promise<{ message: string }> {
      if (params.uploadedThumbnail) {
        return axios.post(`/projects/${projectExid}/thumbnail`, {
          thumbnail: params.uploadedThumbnail,
        })
      }

      return axios.put(`/projects/${projectExid}/thumbnail`, {
        cameraExid: params.cameraExid,
      })
    },
    getThumbnailData(projectExid: string): Promise<ThumbnailData> {
      return axios.get(`/projects/${projectExid}/thumbnail?include_data=true`)
    },
  },
  timelapse: {
    getSnapshotRange(
      cameraId: string,
      payload: TimelapseSnapshotRequestPayload,
      extraParams?: AxiosRequestConfig
    ): Promise<TimelapseSnapshotResponsePayload> {
      return axios.get(`/cameras/${cameraId}/timelapses/snapshots`, {
        params: payload,
        ...(extraParams || {}),
      })
    },
    createTimelapse(
      projectExid: string,
      payload: TimelapseCreationRequestPayload
    ): Promise<TimelapseCreationResponsePayload> {
      return axios.post(
        `/projects/${projectExid}/media-hub/timelapses`,
        payload
      )
    },
    cUpdate(
      projectExid: string,
      id: string | number,
      payload: MediaUpdateRequestPayload
    ): Promise<TimelapseCreationResponsePayload> {
      return axios.patch(
        `/projects/${projectExid}/media-hub/timelapses/${id}`,
        payload
      )
    },
    cDelete(projectExid: string, id: number): Promise<void> {
      return axios.delete(`/projects/${projectExid}/media-hub/timelapses/${id}`)
    },
  },
  compares: {
    cCreate(
      projectExid: string,
      payload: CompareRequestPayload
    ): Promise<Compare> {
      return axios.post(`/projects/${projectExid}/media-hub/compares`, payload)
    },
    cShow(projectExid: string, id: string): Promise<Compare> {
      return axios.get(`/projects/${projectExid}/media-hub/compares/${id}`)
    },
    cUpdate(
      projectExid: string,
      id: string,
      payload: MediaUpdateRequestPayload
    ): Promise<Compare> {
      return axios.patch(
        `/projects/${projectExid}/media-hub/compares/${id}`,
        payload
      )
    },
    cDelete(projectExid: string, id: string): Promise<void> {
      return axios.delete(`/projects/${projectExid}/media-hub/compares/${id}`)
    },
  },
  providers: {
    getProviders(): Promise<ConnectorResponsePayload> {
      return axios.get("/oauth2-tokens/providers")
    },
  },
  aconex: {
    authenticate(payload: AconexAuthCallbackParams): Promise<void> {
      return axios.get("/aconex/auth/callback", {
        params: payload,
      })
    },
    getUserProjects(): Promise<AconexUserProjectsResponsePayload> {
      return axios.get("/aconex/projects")
    },
    revoke(): Promise<void> {
      return axios.post("/aconex/auth/revoke")
    },
    uploadEditedSnapshot(
      projectId: number,
      payload: AconexEditedImageUploadRequestPayload
    ): Promise<void> {
      return axios.post(
        `/aconex/projects/${projectId}/upload-snapshot`,
        payload
      )
    },
    getDocumentSchema(projectId: number): Promise<void> {
      return axios.get(`/aconex/projects/${projectId}/register/schema`)
    },
  },
  procore: {
    getUserCompanies(): Promise<ProcoreUserCompaniesResponsePayload> {
      return axios.get("/procore/companies")
    },
    getUserProjects(
      payload: ProcoreUserProjectRequestPayload
    ): Promise<ProcoreUserProjectsResponsePayload> {
      return axios.get("/procore/projects", {
        params: payload,
      })
    },
    getProjectAlbums(
      payload: ProcoreProjectsAlbumsRequestPayload
    ): Promise<ProcoreProjectsAlbumsPayload> {
      return axios.get("/procore/image-categories", {
        params: payload,
      })
    },
    uploadEditedSnapshot(
      payload: ProcoreEditedImageUploadRequestPayload
    ): Promise<void> {
      return axios.post("/procore/upload-snapshot", payload)
    },
    sendRevoke(): Promise<void> {
      return axios.post("/users/auth/procore/revoke")
    },
  },
  autodesk: {
    sendRevoke(): Promise<void> {
      return axios.post("/users/auth/autodesk/revoke")
    },
    getUserHubs(): Promise<AutodeskUserHubsResponsePayload> {
      return axios.get("/autodesk/hubs")
    },
    getProjects(hubId: string): Promise<AutodeskProjectsResponsePayload> {
      return axios.get(`/autodesk/hubs/${hubId}/projects`)
    },
    getFolders(
      hubId: string,
      projectId: string
    ): Promise<Array<AutodeskFolderResponsePayload>> {
      return axios.get(`/autodesk/hubs/${hubId}/projects/${projectId}/folders`)
    },
    getSubFolders(
      projectId: string,
      parentFolderId: string,
      getDerivatives: Boolean
    ): Promise<Array<AutodeskFolderResponsePayload>> {
      return axios.get(
        `/autodesk/projects/${projectId}/folders/${parentFolderId}/subfolders`,
        {
          params: {
            getDerivatives,
          },
        }
      )
    },
    getFolder(
      projectId: string,
      folderId: string
    ): Promise<AutodeskFolderResponsePayload> {
      return axios.get(`/autodesk/projects/${projectId}/folders/${folderId}`)
    },
    uploadEditedSnapshot(
      payload: AutodeskUploadSnapshotPayload
    ): Promise<null> {
      return axios.post("/autodesk/upload-snapshot", payload)
    },
    fetchViewerToken(exid: string): Promise<AutodeskTokenResponsePayload> {
      return axios.get(`/autodesk/${exid}/token/viewer`)
    },
  },
  voyageControl: {
    connect(payload: VoyageControlConnectorPayload): Promise<unknown> {
      return axios.post("/voyage-control/auth/connect", payload)
    },
    sendRevoke(): Promise<null> {
      return axios.post("/voyage-control/auth/revoke")
    },
  },
  recordings: {
    oldest(cameraId: string, payload?: ApiCredentials): Promise<Snapshot> {
      return axios.get(`/cameras/${cameraId}/recordings/snapshots/oldest`, {
        params: payload,
      })
    },
    latest(cameraId: string, payload?: ApiCredentials): Promise<Snapshot> {
      return axios.get(`/cameras/${cameraId}/recordings/snapshots/latest`, {
        params: payload,
      })
    },
    nearest(
      cameraId: string,
      timestamp: string,
      payload?: NearestSnapshotRequestPayload,
      extraParams?: AxiosRequestConfig
    ): Promise<NearestSnapshotResponsePayload> {
      return axios.get(
        `/cameras/${cameraId}/recordings/snapshots/${timestamp}/nearest`,
        {
          params: payload,
          ...(extraParams || {}),
        }
      )
    },
    availableDays({
      cameraId,
      year,
      month,
      payload,
    }: AvailableDaysRequestPayload): Promise<AvailableDaysResponsePayload> {
      return axios.get(
        `/cameras/${cameraId}/recordings/snapshots/${year}/${month}/days`,
        {
          params: payload,
        }
      )
    },
    availableHours({
      cameraId,
      year,
      month,
      day,
      payload,
      cancelToken,
    }: AvailableHoursRequestPayload): Promise<AvailableHoursResponsePayload> {
      return axios.get(
        `/cameras/${cameraId}/recordings/snapshots/${year}/${month}/${day}/hours`,
        {
          params: payload,
          cancelToken,
        }
      )
    },
    getSnapshot(
      cameraId: string,
      dateTime: string
    ): Promise<SnapshotRangeResponsePayload> {
      return axios.get(`/cameras/${cameraId}/recordings/snapshots/${dateTime}`)
    },
    getSnapshotRange(
      cameraId: string,
      payload: SnapshotRangeRequestPayload
    ): Promise<SnapshotRangeResponsePayload> {
      return axios.get(`/cameras/${cameraId}/recordings/snapshots`, {
        params: payload,
      })
    },
  },
  progressPhotos: {
    index(): Promise<ProgressPhotosResponsePayload> {
      return axios.get("/progress-photos")
    },
    show(id: string): Promise<ProgressPhotosResponsePayload> {
      return axios.get(`/progress-photos/${id}`)
    },
    create(
      payload: ProgressPhotosCreateUpdateRequestPayload
    ): Promise<ProgressPhotosResponsePayload> {
      return axios.post("/progress-photos", payload)
    },
    update(
      id: string,
      payload: ProgressPhotosCreateUpdateRequestPayload
    ): Promise<ProgressPhotosResponsePayload> {
      return axios.patch(`/progress-photos/${id}`, payload)
    },
    unsubscribe(
      progressPhotoId: string,
      params: ProgressPhotosUnSubscribeParams
    ): Promise<ProgressPhotosResponsePayload> {
      return axios.patch(
        `/progress-photos/${progressPhotoId}/unsubscribe?${toQueryString(
          params
        )}`
      )
    },
    delete(id: string, params?: ApiCredentials): Promise<void> {
      return axios.delete(`/progress-photos/${id}?${toQueryString(params)}`)
    },
  },
  mediaHub: {
    getAllMedia(
      projectExid: string,
      params: MediaFilterQueryParams
    ): Promise<PaginatedItems<Media>> {
      return axios.get(
        `projects/${projectExid}/media-hub?${toQueryString(params, {
          forceArrayBrackets: true,
        })}`
      )
    },
    getAllMediaUsers(projectExid: string): Promise<MediaUsersResponsePayload> {
      return axios.get(`/projects/${projectExid}/media-hub/users`)
    },
    cShow(projectExid: string, id: string): Promise<Media> {
      return axios.get(`/projects/${projectExid}/media-hub/${id}`)
    },
    cCreate(
      projectExid: string,
      payload: MediaCreateRequestPayload
    ): Promise<Media> {
      return axios.post(`/projects/${projectExid}/media-hub`, payload)
    },
    cUpdate(
      projectExid: number,
      id: number,
      payload: MediaUpdateRequestPayload
    ): Promise<Media> {
      return axios.patch(`/projects/${projectExid}/media-hub/${id}`, payload)
    },
    cDelete(projectExid: number, id: number): Promise<void> {
      return axios.delete(`/projects/${projectExid}/media-hub/${id}`)
    },
  },
  analytics: {
    sendAnalyticsEvent(
      params: AnalyticsRequestPayload,
      headers: object
    ): Promise<null> {
      return axios.post("/pa/events", params, headers)
    },
    getPACompanyPeriodEvents(
      id: string | number,
      payload: ProjectPAStatsRequestPayload
    ): Promise<PaginatedItems<ProjectPAStatsResponsePayload>> {
      return axios.get(`/companies/${id}/stats`, { params: payload })
    },
    getPAProjectPeriodEvents(
      projectId: string,
      payload: ProjectPAStatsRequestPayload
    ): Promise<PaginatedItems<ProjectPAStatsResponsePayload>> {
      return axios.get(`/projects/${projectId}/stats`, { params: payload })
    },
    getActiveUsers(params: {
      params: ActiveUsersStatsRequestPayload
    }): Promise<ActiveUserStat> {
      return axios.get("/pa/active-users", params)
    },
  },
  shares: {
    updateShareRights(
      cameraExid: CameraExid,
      payload: { email: string; rights: string }
    ): Promise<Share> {
      return axios.patch(`/cameras/${cameraExid}/shares`, payload)
    },
    updateShareRequestRights(
      cameraExid: CameraExid,
      payload: { email: string; rights: string }
    ) {
      return axios.patch(`/cameras/${cameraExid}/shares/requests`, payload)
    },
    cIndex(cameraId: string): Promise<SharesResponsePayload> {
      return axios.get(`/cameras/${cameraId}/shares`)
    },
    getShareRequest(
      cameraId: string,
      payload: { status: string }
    ): Promise<ShareRequestsResponsePayload> {
      return axios.get(`/cameras/${cameraId}/shares/requests`, {
        params: payload,
      })
    },
    deleteShare(
      cameraId: string,
      payload: { [key: string]: ShareDeletionRequestPayload }
    ): Promise<void> {
      return axios.delete(`/cameras/${cameraId}/shares`, payload)
    },
    deleteRequest(
      cameraId: string,
      payload: { [key: string]: ShareDeletionRequestPayload }
    ): Promise<void> {
      return axios.delete(`/cameras/${cameraId}/shares/requests`, payload)
    },
    deleteShareRequest(payload: {
      params: ShareDeletionRequestPayload
    }): Promise<void> {
      return axios.delete(`/share-requests/${payload.params.key}`)
    },
    getSharedUsers(cameraId: string): Promise<SharedUsersResponsePayload> {
      return axios.get(`/cameras/${cameraId}/shares/users`)
    },
    cCreate(
      cameraId: string,
      payload: ShareCreateRequestPayload
    ): Promise<ShareCreateResponsePayload> {
      return axios.post(`/cameras/${cameraId}/shares`, payload)
    },
    shareProjectCameras(
      projectExid: ProjectExid,
      payload: ShareProjectCamerasRequestPayload
    ) {
      return axios.post(`/projects/${projectExid}/shares/cameras`, payload)
    },
    getShareRequestByKey(
      key: string
    ): Promise<Pick<ShareCreateResponsePayload, "shareRequests">> {
      return axios.get(`/shares/requests/${key}`)
    },
    transferOwnership(
      cameraId: string,
      payload: { userId: number }
    ): Promise<void> {
      return axios.put(`/cameras/${cameraId}`, payload)
    },
    resendShareRequest(
      cameraId: string,
      data: ResendShareRequestPayload
    ): Promise<void> {
      return axios.post(`/cameras/${cameraId}/shares/requests/resend`, data)
    },
    getProjectShares(exid: string): Promise<ProjectShareResponse> {
      return axios.get(
        `/projects/${exid}/shares?include_camera_shares=true&sort=fullname|asc`
      )
    },
  },
  companies: {
    getCompanyUsers(
      companyExid: string,
      params: { params: { page: number; limit: number } }
    ): Promise<PaginatedItems<CompanyUser>> {
      return axios.get(`/companies/${companyExid}/users`, params)
    },
    getCompanyProjects(
      companyId: string,
      params: { params: { page: number; limit: number } }
    ): Promise<PaginatedItems<CompanyProject>> {
      return axios.get(`/companies/${companyId}/projects`, params)
    },
    getPACompanyDetails(
      companyId: string,
      params: Record<string, string> = {}
    ): Promise<Company> {
      return axios.get(
        `/companies/${companyId}${"with_zoho" in params ? "?with_zoho" : ""}`
      )
    },
    getActiveUsers(
      params: ActiveUsersStatsRequestPayload
    ): Promise<ActiveUserStat> {
      return axios.get("/pa/active-users", { params })
    },
    getCompanyCameras(id: string, params: Record<string, string>) {
      return axios.get(`/companies/${id}/cameras`, params)
    },
  },
  batteries: {
    ProjectBatteryReadings(
      projectExid: string
    ): Promise<ProjectBatteryReading[]> {
      return axios.get(`/projects/${projectExid}/battery-readings`)
    },
    batteryReadings(
      cameraExid: string,
      params: { fromDate: string; toDate: string }
    ): Promise<PaginatedItems<BatteryReading>> {
      return axios.get(`/cameras/${cameraExid}/battery-readings`, {
        params: params,
      })
    },
    readingsVoltageSummary(
      cameraExid: string,
      params: { fromDate: string; toDate: string }
    ): Promise<BatteryVoltage[]> {
      return axios.get(
        `/cameras/${cameraExid}//battery-readings/voltage-summary`,
        {
          params: params,
        }
      )
    },
  },
  layers: {
    getLayer(
      cameraId: string,
      params: BimLayersQueryParams,
      extraParams: Record<string, string> = {}
    ): Promise<BIMLayer[]> {
      return axios.get(`/cameras/${cameraId}/layers`, {
        params,
        ...(extraParams || {}),
      })
    },
    getLayersById(
      cameraId: string,
      id: number,
      params: Record<string, string>
    ): Promise<BIMLayer> {
      return axios.get(`/cameras/${cameraId}/layers/${id}`, { params })
    },
    getLayers(
      cameraId: string,
      params: BimLayersQueryParams
    ): Promise<BIMLayer[]> {
      return axios.get(`/cameras/${cameraId}/layers`, { params })
    },
    createLayer(
      cameraId: string,
      params: BIMLayerPostPayload
    ): Promise<BIMLayer> {
      return axios.post(`/cameras/${cameraId}/layers`, params)
    },
    deleteLayer(
      cameraId: string,
      id: number,
      params: Record<string, unknown>
    ): Promise<void> {
      return axios.delete(`/cameras/${cameraId}/layers/${id}`, { params })
    },
    updateLayer(
      cameraId: string,
      id: number,
      params: Partial<BIMLayerPostPayload>
    ): Promise<BIMLayer> {
      return axios.put(`/cameras/${cameraId}/layers/${id}`, params)
    },
  },
  comments: {
    fetchComments(
      projectExid: string,
      params: CommentsRequestPayload
    ): Promise<PaginatedItems<Comment>> {
      return axios.get(`/projects/${projectExid}/comments`, { params })
    },
    addComment(
      projectId: string,
      params: CommentCreationRequestPayload
    ): Promise<Comment> {
      return axios.post(`/projects/${projectId}/comments`, params)
    },
    archiveOrUnarchiveComment(
      projectId: string,
      id: number,
      archive: boolean
    ): Promise<Comment> {
      return axios.patch(
        `/projects/${projectId}/comments/${id}?${toQueryString({ archive })}`
      )
    },
    deleteComment(projectId: string, id: number): Promise<void> {
      return axios.delete(`/projects/${projectId}/comments/${id}`)
    },
  },
  storyblock: {
    getStory(params: { route: string; params: string }) {
      return axios.get("/proxy/storyblok", { params })
    },
  },
  mailing: {
    unsubscribe(params: { key: string }) {
      return axios.post("/mailing/unsubscribe", params)
    },
  },
  widgets: {
    index(params: WidgetsListRequestPayload): Promise<PaginatedItems<Widget>> {
      return axios.get("/widgets", { params })
    },
    listByProject(
      projectId: string,
      params: WidgetsListRequestPayload
    ): Promise<PaginatedItems<Widget>> {
      return axios.get(`/projects/${projectId}/widgets`, { params })
    },
    listByCamera(
      cameraId: string,
      params: WidgetsListRequestPayload
    ): Promise<PaginatedItems<Widget>> {
      return axios.get(`/cameras/${cameraId}/widgets`, { params })
    },
    show(id: number): Promise<WidgetFull> {
      return axios.get(`/widgets/${id}`)
    },
    getByKeys(params: any): Promise<WidgetFull> {
      return axios.get("/widgets/credentials", { params })
    },
    createProjectWidget(
      projectId: string,
      payload: WidgetPayload
    ): Promise<WidgetFull> {
      return axios.post(`/projects/${projectId}/widgets`, payload)
    },
    createCameraWidget(
      cameraId: string,
      payload: WidgetPayload
    ): Promise<WidgetFull> {
      return axios.post(`/cameras/${cameraId}/widgets`, payload)
    },
    update(id: number, payload: WidgetPayload): Promise<WidgetFull> {
      return axios.put(`/widgets/${id}`, payload)
    },
    delete(id: number) {
      return axios.delete(`/widgets/${id}`)
    },
  },
}
