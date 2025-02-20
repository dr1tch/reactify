import type {
  AnalyticsEventPageId,
  CameraExid,
  CameraFeatureFlag,
  CameraStatus,
  ProjectExid,
  ProjectFeatureFlag,
  ProjectStatus,
} from "@/types"

export enum CopilotMessageAuthor {
  Copilot = "copilot",
  User = "user",
}

export enum CopilotMessageType {
  Text = "text",
  Progress = "progress",
  Error = "error",
  Json = "json",
}

export type CopilotMessage = {
  content: string
  url?: string
  type: CopilotMessageType
  id?: number
  conversationId?: number
}

export enum CopilotStepId {
  SendToLLM = "send_to_llm",
  FunctionCallRequest = "function_call_request",
  ExecFunctionCall = "exec_function_call",
  SendToUser = "send_to_user",
  RequestMissingFields = "request_missing_fields",
  CompletedFieldsResponse = "completed_fields_response",
  SendRawToolCallResponse = "send_raw_tool_call_response",
  SubmitToolOutputsToLLM = "submit_tool_outputs_to_llm",
  CancelCall = "cancel_call",
}

export enum CopilotMissingFieldsLabels {
  ProjectExid = "Project",
  CameraExid = "Camera",
  FromDate = "Start date",
  ToDate = "End date",
}

export type CopilotMissingField = {
  name: string
  label: string
  value: any
  type: string
  toolId: string
}

export type CopilotMissingFields = Record<number, CopilotMissingField[]>

export type UserConversations = CopilotConversation & {
  Message: CopilotMessage[]
}

export enum CopilotSocketEvent {
  ConversationStart = "conversation:start",
  ConversationCreated = "conversation:created",
  LLMMessageChunk = "llm:message:chunk",
  LLMMessageComplete = "llm:message:complete",
  LLMMessageLoading = "llm:message:loading",
  LLMRequestCancel = "llm:request:cancel",
  LLMRequestCanceled = "llm:request:canceled",
  UserMessage = "user:message",
  ContextError = "chat:contextError",
  ChatError = "chat:chatError",
  MissingFields = "chat:missingFields",
  MissingFieldsCompleted = "chat:missingFields:completed",
  SystemToolCallResponse = "system:toolCall:response",
}

export type CopilotConversation = {
  id: number
  user: string
  model: string
  context: string
  cameraExid: CameraExid
  projectExid: ProjectExid
  startDate: string
  endDate: string
  messagesCount: number
}

export enum CopilotProvider {
  Gemini = "gemini",
  ChatGPT = "chatgpt",
}

export enum CopilotSuggestion {
  UserManual = "user_manual",
  GateReport = "gate_report",
  Weather = "weather",
  Clip = "clip",
  Timelapse = "timelapse",
}

export enum CopilotChatProvider {
  Gemini = "gemini",
  ChatGpt = "chatGpt",
}

export enum CopilotLayout {
  Floating = "floating",
}

export enum CopilotToolId {
  GetReports = "getReports",
  GetVehiclesDetections = "getVehiclesDetections",
  GetVehiclesDetectionsCounts = "getVehiclesDetectionsCounts",
  GetWeather = "getWeather",
  CreateClip = "createClip",
  NavigateToPage = "navigateToPage",
  CreateTimelapse = "createTimelapse",
  RequestMissingFields = "requestMissingFields",
  RenderCharts = "renderCharts",
}

export type CopilotSystemToolCallResponse<I = unknown, O = unknown> = {
  toolId?: CopilotToolId
  input?: I
  output?: O
}

export type CopilotCamera = {
  name: string
  exid: CameraExid
  status: CameraStatus
  featureFlags?: CameraFeatureFlag[]
}

export type CopilotProject = {
  name: string
  exid: ProjectExid
  status: ProjectStatus
  featureFlags?: ProjectFeatureFlag[]
  cameras?: CopilotCamera[]
}

export type CopilotConversationContext = {
  availableProjects: CopilotProject[]
}

export type CopilotMessageContext = {
  pageId?: AnalyticsEventPageId
  selectedCamera?: CopilotCamera
  selectedProject?: CopilotProject
}

export type CopilotMessageStep = {
  args: string[]
  depth: number
  id: number
  message_id: number
  step: CopilotStepId
  timestamp: string
}

export enum CopilotMissingFieldComponent {
  Select = "SelectField",
  DateTime = "DateTimeField",
  Schedule = "ScheduleField",
  MultiOptions = "MultiOptionsField",
  Switch = "SwitchField",
}

export enum CopilotMissingFieldName {
  ProjectExid = "projectExid",
  CameraExid = "cameraExid",
  FromDate = "fromDate",
  ToDate = "toDate",
  Schedule = "schedule",
  Duration = "duration",
}

export enum CopilotMissingFieldType {
  Boolean = "boolean",
  String = "string",
  Number = "number",
}
