export type ConnectorDetail = {
  login: string
  hostname: string
}

export enum Connector {
  Aconex = "aconex",
  Procore = "procore",
  Autodesk = "autodesk",
  AutodeskViewer = "autodesk_viewer",
  VoyageControl = "voyage_control",
}

export type ConnectorResponsePayload = Array<{
  hostname: string
  login: string
  provider: string
}>
