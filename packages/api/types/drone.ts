export type DroneModel = {
  cesiumId: string
  cesiumId2D: string
  date: string
  cesiumPointCloudId: string
  pointSize: string
  maximumScreenSpaceError: string
  link: string
  trueIndex: number
}

export type DroneProjectJsonResponse = {
  models: DroneModel[]
  [key: string]: any
}

export enum DroneUrlParams {
  Date = "date",
}
