import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  CancelTokenStatic,
} from "axios"

export type TimedRequest<T> = Promise<
  AxiosResponse<T> & { duration: number; error?: AxiosError }
>

export type AxiosEnvironment = {
  isStaging?: boolean
  baseUrl?: string | null
  stagingAiApiUrl?: string | null
  aiApiUrl?: string | null
  ingestApiUrl?: string | null
  posthogApiUrl?: string | null
  posthogProjectId?: string | null
  posthogPrivateApiKey?: string | null
  firebaseVideowallUrl?: string | null
  weatherApiBaseUrl?: string | null
  evercamLabsUrl?: string | null
  firebaseDbLink?: string | null
  snapshotsURL?: string | null
  app?: string | null
  getAuthToken?: () => string | null
  errorLogger?: (error: AxiosError) => void
}

export type RequestInterceptor = (
  req: AxiosRequestConfig,
  env: AxiosEnvironment
) => AxiosRequestConfig & any
export type ResponseInterceptor = (
  res: AxiosResponse,
  env: AxiosEnvironment
) => AxiosResponse & any
export type ErrorInterceptor = (error: any, env: AxiosEnvironment) => any

export interface ExtendedAxiosInstance extends AxiosInstance {
  CancelToken: CancelTokenStatic
  isCancel: (value: AxiosResponse | AxiosError | never) => boolean
  setToken: (token: string) => void
  setHeader: (headerName: string, value: any) => void
  generateCancelTokenSource: () => CancelTokenSource
  addCancelToken: (token: CancelTokenSource) => void
  resetCancelTokens: () => void
  cancelRequests: () => void
  env: AxiosEnvironment
  addEnvironmentVariables: (vars: Record<string, any>) => void
  addRequestInterceptor: (
    interceptor: RequestInterceptor,
    errorInterceptor?: ErrorInterceptor
  ) => void
  addResponseInterceptor: (
    interceptor: ResponseInterceptor,
    errorInterceptor?: ErrorInterceptor
  ) => void
  addErrorInterceptor: (interceptor: ErrorInterceptor) => void
}

declare module "axios" {
  export interface AxiosRequestConfig {
    // Skip all request / response interceptors
    raw?: boolean

    // Skip the camelCase / snake_case transformations
    preserveCasing?: boolean

    // Measure the request duration (adds a field "duration" to the response)
    timing?: boolean

    // (readonly) Start time of the request (automatically set when timing == true)
    _metadata?: { startTime: number }
  }
}
