export type AutodeskUserHubsResponsePayload = Array<{
  text: string
  value: string
}>

export type AutodeskProjectsResponsePayload = Array<{
  text: string
  value: string
}>

export type AutodeskFolderResponsePayload = {
  text: string
  value: string
  allowedFileType: string
  allowedFolderType: string
  children: Array<AutodeskFolderResponsePayload>
  parentName?: string
}

export type AutodeskUploadSnapshotPayload = {
  projectId: string
  folderId: string
  accFileType: string
  accFolderType: string
  projectExid: string
  snapshot: string
}

export type AutodeskTokenResponsePayload = {
  token: string
  expiresAt: string
  login: string
}
