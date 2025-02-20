export type AconexUserProjectsResponsePayload = Array<{
  id: number
  name: string
  shortName: string
  startDate: string
  endDate: string
}>

export type AconexDocumentSchemaField = {
  dataType: AconexDocumentDataType
  identifier: string
  schemaValues: Array<{ id: string; value: string }>
  fieldName: string
  mandatoryStatus: AconexMandatoryStatus
  componentType?: AconexFormComponentType
  items?: Array<any>
  disabled?: boolean
}

export enum AconexDocumentDataType {
  Long = "LONG",
  Integer = "INTEGER",
  String = "STRING",
  Boolean = "BOOLEAN",
  Date = "DATE",
}

export enum AconexFormComponentType {
  Select = "SelectField",
  Text = "TextField",
  DateTime = "DateTimeField",
  Switch = "SwitchField",
}

export enum AconexMandatoryStatus {
  Mandatory = "MANDATORY",
  NotMandatory = "NOT_MANDATORY",
}

export type AconexAuthCallbackParams = {
  code: string
  location: string
}

export type AconexEditedImageUploadRequestPayload = {
  projectExid: string
  snapshot: string
}
