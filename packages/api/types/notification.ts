export enum NotificationType {
  CameraShare = "camera_share",
  CameraStatusChange = "camera_status_changed",
  Mention = "mention",
  TimelapseCreated = "timelapse_created",
  TimelapseFailed = "timelapse_failed",
  DroneProcessing = "drone_processing_done",
  Processing360 = "three_sixty_done",
}

export interface CameraShareContext {
  cameraExid: string
  projectExid: string
  shareId: number
}

//   export interface CameraStatusChangeContext {
//     cameraExid: string;
//     projectExid: string;
//     status: string;
//   }

//   export interface MentionContext {
//     postId: number;
//     commentId?: number;
//   }

export type Notification = {
  id: number
  type: NotificationType
  insertedAt: string
  initiatorId: number
  initiatorFullname: string
  initiatorEmail: string
  targetId: number
  targetFullname: string
  targetEmail: string
  readTimestamp: string | null
  context: CameraShareContext //| CameraStatusChangeContext | MentionContext
}
