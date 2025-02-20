import { axios } from "./client"
import type {
  CamerasResponsePayload,
  CameraUpdateRequestPayload,
  PaginatedItems,
  AdminCamera,
  Project,
  Hdd,
  AdminUser,
  ProgressPhotosCreateUpdateRequestPayload,
  ProgressPhoto,
  Kit,
  PatchPayload,
  StorageServersResponsePayload,
  MediaFilterQueryParams,
  Media,
  MediaDeleteRequestPayload,
  AuditLogsParams,
  AuditLog,
  SnapshotExtractionQyeryParams,
  SnapshotExtraction,
  CameraCreateRequestPayload,
  CameraDeletePayload,
  SnapshotTestPayload,
  SnapshotTestResponse,
  DuplicatedCameraFields,
  DuplicatedCameraResponse,
  MergeDuplicatedCameraPayload,
  FetchCameraQueryParams,
  DeleteSnapshotQueryParams,
  SaveNotePayload,
  CameraNote,
  CreateCameraNotePayload,
  CompanyQueryParams,
  Company,
  CompanyUpdatePayload,
  SuppressionsQueryParams,
  Suppression,
  SnapshotExtractionType,
  PaginationParams,
  GateReportProject,
  KitQueryParams,
  KitCreatePayload,
  AdminKit,
  CameraLogsQueryParams,
  CameraLog,
  CameraAuditLogsQueryParams,
  CameraAuditLog,
  NvrQueryParams,
  Nvr,
  SiteVisitCamerasQueryParams,
  OfflineCameraQueryParams,
  OfflineCamera,
  OfflineCameraNoteResponse,
  UserStatsResponse,
  EntityStatsQueryParams,
  EntityStat,
  UserSession,
  UserCameraResponse,
  UserProjectResponse,
  ProjectUsers,
  ProjectCamera,
  ProjectsQueryParams,
  ProjectStatusStats,
  ProjectCreateRequestPayload,
  ProjectCreateResponse,
  ProjectUpdateRequestPayload,
  RouterQueryParams,
  Router,
  RouterCreatePayload,
  GlobalSearchQueryParams,
  CameraShareRequestsQueryParams,
  CameraShareRequest,
  CameraShareRequestPayload,
  ShareCreateResponsePayload,
  ShareQueryParams,
  AdminShare,
  SimCreateUpdatePayload,
  SimsQueryParams,
  Sim,
  SendSmsPayload,
  SendSmsResponse,
  SmsHistoryResponse,
  SmsQueryParams,
  Sms,
  ProgressPhotosQueryParams,
  ProgressPhotoItem,
  progressPhotosHistoryQueryParams,
  ProgressPhotosHistory,
  AdminUserUpdateRequestPayload,
  AdminQueryParams,
  Admin,
  ImpersonateUserResponse,
  AdminUserQueryParams,
  AdminCompareQueryParams,
  AdminCompare,
  NvrUpdatePayload,
} from "@evercam/api/types"

export const AdminApi = {
  mediaHub: {
    getAllMedia(params: {
      params: Partial<MediaFilterQueryParams>
    }): Promise<PaginatedItems<Media>> {
      return axios.get("/admin/media-hub", params)
    },
    deleteMedia(params: Partial<MediaDeleteRequestPayload>): Promise<void> {
      return axios.delete("/admin/media-hub", { params })
    },
  },
  auditLogs: {
    getAuditLogs(params: {
      params: Partial<AuditLogsParams>
    }): Promise<PaginatedItems<AuditLog>[]> {
      return axios.get("/admin/audit-logs", params)
    },
  },
  cameras: {
    getCamerasStats(params: {
      params: {
        email?: string
      }
    }): Promise<CamerasResponsePayload> {
      return axios.get("/admin/cameras/status-stats", params)
    },
    rebootCamera(cameraId: string): Promise<{ message: string }> {
      return axios.post(`/admin/devices/camera/${cameraId}/reboot`)
    },
    focusCamera(
      cameraId: string,
      device: string
    ): Promise<{ message: string }> {
      return axios.post(`/admin/devices/${device}/${cameraId}/focus`)
    },
    getStorageServers(): Promise<StorageServersResponsePayload> {
      return axios.get("/admin/storage/servers")
    },
    getStorageDetails() {
      return axios.get("/admin/storage")
    },
    getSnapshotExtractions(params: {
      params: Partial<SnapshotExtractionQyeryParams>
    }): Promise<PaginatedItems<SnapshotExtraction>> {
      return axios.get("/admin/snapshot-extractions", params)
    },
    createCameras(
      payload: CameraCreateRequestPayload
    ): Promise<{ cameras: [AdminCamera] }> {
      return axios.post("/admin/cameras", payload)
    },
    deleteCamera(exid: string, payload: CameraDeletePayload): Promise<void> {
      return axios.post(`/admin/cameras/${exid}/delete`, payload)
    },
    testSnapshot(payload: SnapshotTestPayload): Promise<SnapshotTestResponse> {
      return axios.post("/admin/cameras/test-snapshot", payload)
    },
    getDuplicateCameras(params: {
      params: {
        fields?: DuplicatedCameraFields[]
        sort?: string
      }
    }): Promise<PaginatedItems<DuplicatedCameraResponse>> {
      return axios.get("/admin/duplicate-cameras", params)
    },
    mergeDuplicateCameras(
      payload: MergeDuplicatedCameraPayload
    ): Promise<{ success: boolean }> {
      return axios.post("/admin/merge-cameras", payload)
    },
    getCameras(params: {
      params: Partial<FetchCameraQueryParams>
    }): Promise<PaginatedItems<AdminCamera>> {
      return axios.get("/admin/cameras", params)
    },
    getCompares(params: {
      params: AdminCompareQueryParams
    }): Promise<PaginatedItems<AdminCompare[]>> {
      return axios.get("/admin/compares", params)
    },
    getCameraDetails(exid: string): Promise<AdminCamera> {
      return axios.get(`/admin/cameras/${exid}`)
    },
    deleteSnapshots(
      cameraId: string,
      params: DeleteSnapshotQueryParams
    ): Promise<void> {
      return axios.delete(`admin/cameras/${cameraId}/snapshots`, {
        params,
      })
    },
    refreshDeviceSettings(cameraId: string): Promise<void> {
      return axios.post(
        `/admin/cameras/${cameraId}/device-settings/refresh`,
        {}
      )
    },
    // (Azhar) Old save note code will be remove once we migrate all old saved camera notes
    saveNote(cameraId: string, params: SaveNotePayload): Promise<CameraNote> {
      return axios.post(`/admin/cameras/${cameraId}/save-note`, params)
    },
    saveCameraNote(
      cameraId: string,
      params: CreateCameraNotePayload
    ): Promise<{ message: string }> {
      return axios.post(`/admin/cameras/${cameraId}/note`, params)
    },
    update(
      cameraId: string,
      params: CameraUpdateRequestPayload
    ): Promise<CamerasResponsePayload> {
      return axios.patch(`/admin/cameras/${cameraId}`, params)
    },
  },
  companies: {
    getCompanies(params: {
      params: Partial<CompanyQueryParams>
    }): Promise<PaginatedItems<Company[]>> {
      return axios.get("/admin/companies", params)
    },
    updateCompany(
      id: string,
      params: CompanyUpdatePayload
    ): Promise<Omit<CompanyUpdatePayload, "linkedinUrl">> {
      return axios.patch(`/admin/companies/${id}`, params)
    },
    deleteCompany(params: {
      ids: string | string[]
    }): Promise<{ success: true }> {
      return axios.delete("/admin/companies", { params })
    },
    reSyncCompanies(params: {
      companyIds: string[]
    }): Promise<{ success: true }> {
      return axios.post("/admin/companies/resync", params)
    },
  },
  emailing: {
    performEmailing(template: string, params: Record<string, unknown>) {
      return axios.post(`/admin/mailing/${template}`, params)
    },
    suppressions(params: {
      params: SuppressionsQueryParams
    }): Promise<PaginatedItems<Suppression[]>> {
      return axios.get("/admin/mailing/suppressions", params)
    },
    deleteSuppression(id: number): Promise<void> {
      return axios.delete(`/admin/mailing/suppressions/${id}`)
    },
  },
  extractions: {
    updateCloudRecordings(cameraId: string, params: Record<string, unknown>) {
      return axios.post(`/admin/cameras/${cameraId}/cloud-recordings`, params)
    },
    addExtraction(
      cameraId: string,
      params: SnapshotExtractionQyeryParams
    ): Promise<PaginatedItems<SnapshotExtraction>> {
      return axios.post(`admin/cameras/${cameraId}/extractions`, params)
    },
    getExtractionStatus(
      cameraId: string,
      extractionId: number,
      params: {
        type: SnapshotExtractionType
      }
    ): Promise<{ status: string; jpegs: number }> {
      return axios.get(
        `admin/cameras/${cameraId}/extractions/${extractionId}`,
        {
          params,
        }
      )
    },
    deleteSnapshotExtraction(
      cameraId: string,
      extractionId: number,
      params: {
        type: SnapshotExtractionType
      }
    ): Promise<void> {
      return axios.delete(
        `admin/cameras/${cameraId}/extractions/${extractionId}`,
        {
          params,
        }
      )
    },
  },
  gateReport: {
    getGateReportProjects(params: {
      params: PaginationParams
    }): Promise<PaginatedItems<GateReportProject[]>> {
      return axios.get("/admin/gate-report", params)
    },
    getGateReportProject(projectExid: string): Promise<Project> {
      return axios.get(`/admin/projects/${projectExid}`)
    },
  },
  kits: {
    getAllKits(params: {
      params: KitQueryParams
    }): Promise<PaginatedItems<Kit[]>> {
      return axios.get("/admin/kits", params)
    },
    async getKit(kitId: number): Promise<Kit> {
      return axios.get(`/admin/kits/${kitId}`)
    },
    createKit(params: KitCreatePayload): Promise<AdminKit> {
      return axios.post("/admin/kits", params)
    },
    updateKit(id: string, params: PatchPayload<Kit>) {
      return axios.patch(`/admin/kits/${id}`, params)
    },
    deleteKit(id: string, params: Record<string, unknown>) {
      return axios.delete(`/admin/kits/${id}`, { params })
    },
  },
  logs: {
    getAllCamerasStatusLogs(params: {
      params: CameraLogsQueryParams
    }): Promise<{ data: CameraLog[] }> {
      return axios.get("/admin/cameras-logs", params)
    },
    getCameraLogs(
      cameraId: string,
      payload: {
        params: CameraAuditLogsQueryParams
      }
    ): Promise<PaginatedItems<CameraAuditLog[]>> {
      return axios.get(`/admin/cameras/${cameraId}/audit-logs`, payload)
    },
  },
  nvrs: {
    getNvrs(params: {
      params: NvrQueryParams
    }): Promise<PaginatedItems<Nvr[]>> {
      return axios.get("/admin/nvrs", params)
    },
    updateNvr(id: string, params: PatchPayload<NvrUpdatePayload>) {
      return axios.patch(`/admin/nvrs/${id}`, params)
    },
    rebootNVR(cameraId: string): Promise<{ message: string }> {
      return axios.post(`/admin/devices/nvr/${cameraId}/reboot`)
    },
  },
  offlineCameras: {
    getSiteVisitCameras(params: {
      params: Partial<SiteVisitCamerasQueryParams>
    }): Promise<PaginatedItems<AdminCamera>> {
      return axios.get("/admin/site-visit-cameras", params)
    },
    getOfflineCameras(params: {
      params: Partial<OfflineCameraQueryParams>
    }): Promise<PaginatedItems<OfflineCamera>> {
      return axios.get("/admin/offline-cameras", params)
    },
    getOfflineCamerasLastNote(params: {
      cameraIds: number[]
    }): Promise<OfflineCameraNoteResponse> {
      return axios.get("/admin/offline-cameras/notes", { params: params })
    },
  },
  pa: {
    getPAUser(
      id: number,
      params: Record<string, unknown>
    ): Promise<UserStatsResponse> {
      return axios.get(
        `/admin/users/${id}${"with_zoho" in params ? "?with_zoho" : ""}`
      )
    },
    getPAProjectPeriodEvents(
      id: string | number,
      payload: EntityStatsQueryParams
    ): Promise<EntityStat[]> {
      return axios.get(`/admin/projects/${id}/stats`, { params: payload })
    },
    getPAUserEvents(id: string | number): Promise<UserSession[]> {
      return axios.get(`/admin/users/${id}/events`)
    },
    getPAUserCameras(id: number): Promise<UserCameraResponse> {
      return axios.get(`/admin/users/${id}/cameras`)
    },
    getPAUserProjects(id: number): Promise<UserProjectResponse> {
      return axios.get(`/admin/users/${id}/projects`)
    },
    getPAUserPeriodEvents(
      id: number,
      payload: EntityStatsQueryParams
    ): Promise<EntityStat[]> {
      return axios.get(`/admin/users/${id}/stats`, { params: payload })
    },
    getProjectUsers(id: string): Promise<ProjectUsers> {
      return axios.get(`/admin/projects/${id}/users`)
    },
    getPAProject(
      id: string,
      params: Record<string, unknown>
    ): Promise<{ data: Project }> {
      return axios.get(
        `/admin/projects/${id}${"with_zoho" in params ? "?with_zoho" : ""}`
      )
    },
    getPAProjectCameras(id: string): Promise<{ data: ProjectCamera[] }> {
      return axios.get(`/admin/projects/${id}/cameras`)
    },
  },
  projects: {
    getAll(params: {
      params: Partial<ProjectsQueryParams>
    }): Promise<PaginatedItems<Project>> {
      return axios.get("/admin/projects", params)
    },
    getProject(exid: string): Promise<Project> {
      return axios.get(`/admin/projects/${exid}`)
    },
    getProjectsStats(): Promise<ProjectStatusStats> {
      return axios.get("/admin/projects/status-stats")
    },
    createProject(
      params: ProjectCreateRequestPayload
    ): Promise<ProjectCreateResponse> {
      return axios.post("/admin/projects", params)
    },
    updateProject(
      projectExid: string,
      params: Partial<ProjectUpdateRequestPayload>
    ): Promise<ProjectCreateResponse> {
      return axios.put(`/admin/projects/${projectExid}`, params)
    },
    deleteProject(projectExid: string): Promise<{ success: boolean }> {
      return axios.delete(`/admin/projects/${projectExid}`)
    },
    addToProject(
      projectExid: string,
      params: { cameraExids: string[] }
    ): Promise<void> {
      return axios.post(`/admin/projects/${projectExid}/add-cameras`, params)
    },
  },
  routers: {
    getRouters(params: {
      params: Partial<RouterQueryParams>
    }): Promise<PaginatedItems<Router[]>> {
      return axios.get("/admin/routers", params)
    },
    getRouterTypes(): Promise<string[]> {
      return axios.get("/admin/router-types")
    },
    createRouter(params: RouterCreatePayload): Promise<{ routerId: number }> {
      return axios.post("/admin/routers", params)
    },
    updateRouter(
      id: number,
      params: RouterCreatePayload
    ): Promise<{ success: boolean }> {
      return axios.patch(`/admin/routers/${id}`, params)
    },
    deleteRouter(id: number): Promise<void> {
      return axios.delete(`/admin/routers/${id}`)
    },
    getRouter(id: number): Promise<Router> {
      return axios.get(`/admin/routers/${id}`)
    },
  },
  search: {
    search(params: {
      params: GlobalSearchQueryParams
    }): Promise<PaginatedItems<Record<string, unknown>>> {
      return axios.get("/admin/search", params)
    },
  },
  hdds: {
    getHdds(payload: { projectId: string; companyId: string }): Promise<Hdd[]> {
      return axios.get("/admin/hdds", { params: payload })
    },
  },
  shareRequests: {
    getShareRequests(params: {
      params: Partial<CameraShareRequestsQueryParams>
    }): Promise<PaginatedItems<CameraShareRequest[]>> {
      return axios.get("/admin/camera-share-requests", params)
    },
    deleteShareRequest(params: {
      ids: number[]
    }): Promise<{ success: boolean }> {
      return axios.delete("/admin/camera-share-requests", { params: params })
    },
    updateShareRequestStatus(params: {
      ids: number[]
      status: string
    }): Promise<{ success: boolean }> {
      return axios.patch("/admin/camera-share-requests", params)
    },
  },
  shares: {
    createShares(
      cameraExid: string,
      payload: CameraShareRequestPayload
    ): Promise<ShareCreateResponsePayload> {
      return axios.post(`/admin/cameras/${cameraExid}/shares`, payload)
    },
    getShares(params: {
      params: Partial<ShareQueryParams>
    }): Promise<PaginatedItems<AdminShare[]>> {
      return axios.get("/admin/camera-shares", params)
    },
    deleteShares(ids: number[]): Promise<void> {
      return axios.delete("/admin/camera-shares", { params: ids })
    },
  },
  sims: {
    deleteSim(simId: number): Promise<{ deleted: boolean }> {
      return axios.delete(`/admin/sims/${simId}`)
    },
    createSim(
      params: Omit<SimCreateUpdatePayload, "cameraId">
    ): Promise<{ success: boolean }> {
      return axios.post("/admin/sims", params)
    },
    updateSim(
      simId: number,
      params: CameraShareRequestPayload
    ): Promise<{ success: boolean }> {
      return axios.patch(`/admin/sims/${simId}`, params)
    },
    getSims(params: {
      params: Partial<SimsQueryParams>
    }): Promise<PaginatedItems<Sim[]>> {
      return axios.get("/admin/sims", params)
    },
    getSimProviders() {
      return axios.get("/admin/sim-providers")
    },
    getBillPayers() {
      return axios.get("/admin/sims/bill-payers")
    },
  },
  sms: {
    sendSms(number: string, params: SendSmsPayload): Promise<SendSmsResponse> {
      return axios.post(`/admin/sims/${number}/sms`, params)
    },
    getSimHistory(number: string): Promise<SmsHistoryResponse> {
      return axios.get(`/admin/sims/${number}/sms`)
    },
    getSms(params: {
      params: Partial<SmsQueryParams>
    }): Promise<PaginatedItems<Sms[]>> {
      return axios.get("/admin/sms", params)
    },
  },
  progressPhotos: {
    getProgressPhotos(params: {
      params: Partial<ProgressPhotosQueryParams>
    }): Promise<PaginatedItems<ProgressPhotoItem[]>> {
      return axios.get("/admin/progress-photos", params)
    },
    getProgressPhotosHistory(params: {
      params: Partial<progressPhotosHistoryQueryParams>
    }): Promise<ProgressPhotosHistory> {
      return axios.get("/admin/progress-photos/history", params)
    },
    getProgressPhotoTemplate({
      id,
    }: {
      id: string
    }): Promise<{ progressPhoto: string }> {
      return axios.get(`/admin/progress-photos/history/${id}/email`)
    },
    update(
      id: string,
      payload: ProgressPhotosCreateUpdateRequestPayload
    ): Promise<ProgressPhoto> {
      return axios.patch(`/admin/progress-photos/${id}`, payload)
    },
  },
  users: {
    updateUser(
      id: number,
      params: Partial<AdminUserUpdateRequestPayload>
    ): Promise<AdminUser> {
      return axios.put(`/admin/users/${id}`, params)
    },
    getAdmins(params: {
      params: Partial<AdminQueryParams>
    }): Promise<PaginatedItems<Admin[]>> {
      return axios.get("/admin", params)
    },
    deleteAdmin(email: string): Promise<void | { message: string }> {
      return axios.put(`/admin/users/${email}/revoke-admin`)
    },
    makeAdmin(email: string): Promise<void | { message: string }> {
      return axios.put(`/admin/users/${email}/grant-admin`)
    },
    deleteUser(
      email: string,
      params: { verifyEmail: string }
    ): Promise<void | { message: string }> {
      return axios.post(`/users/${email}/delete`, params)
    },
    impersonateUser(email: string): Promise<ImpersonateUserResponse> {
      return axios.post(`/admin/users/${email}/impersonate`)
    },
    getUsers(params: {
      params: Partial<AdminUserQueryParams>
    }): Promise<PaginatedItems<AdminUser>> {
      return axios.get("/admin/users", params)
    },
    getUserPasswordResetLink(
      email: string
    ): Promise<{ passwordResetLink: string }> {
      return axios.post(`/admin/users/${email}/password/reset`)
    },
  },
}
