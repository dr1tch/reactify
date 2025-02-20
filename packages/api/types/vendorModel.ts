export type VendorModel = {
  cameraCount: number
  exid: string
  h264Url: string
  jpgUrl: string
  name: string
  online: number
  playbackUrl: string
}

export type VendorModelRequestPayload = {
  sort: string
}

export type VendorModelResponsePayload = {
  data: VendorModel[]
}
