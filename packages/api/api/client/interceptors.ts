import { camelizeKeys, decamelize, decamelizeKeys } from "humps"
import Axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios"
import type { AxiosEnvironment } from "../../types"
import {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  BadGatewayError,
  GatewayTimeoutError,
  ForbiddenError,
} from "./customErrors"

let numberOfRequestsSentInThePastSecond = 0
const maxRequestsPerSecond = 10
const requestsRateLimit = async () => {
  while (numberOfRequestsSentInThePastSecond === maxRequestsPerSecond) {
    await new Promise((r) => setTimeout(r, 1000))
  }
  numberOfRequestsSentInThePastSecond++

  setTimeout(() => {
    numberOfRequestsSentInThePastSecond--
  }, 1000)
}

export const onRequest = async (
  request: AxiosRequestConfig,
  axiosEnv: AxiosEnvironment
) => {
  if (request?.raw) {
    return request
  }

  if (request?.timing) {
    request._metadata = { startTime: performance.now() }
  }
  await requestsRateLimit()
  ensureBaseUrl(request, axiosEnv)
  addAuthTokenHeader(request, axiosEnv)
  if (
    axiosEnv.app === "dashboard" &&
    typeof document.referrer === "string" &&
    document.referrer.length !== 0
  ) {
    // @ts-expect-error - common type string | number | undefined
    request.headers.common["iframe-origin"] = new URL(document.referrer).origin
  }

  if (!request.preserveCasing) {
    transformCamelCaseToSnakeCase(request)
  }

  return request
}

export const onResponse = (response: AxiosResponse) => {
  if (response?.config?.raw) {
    return response
  }

  if (!("data" in response)) {
    return response
  } else if (response.data instanceof Blob) {
    return response.data
  }

  const data = response?.config?.preserveCasing
    ? response.data
    : camelizeKeys(response.data)

  if (response?.config?.timing && response?.config?._metadata?.startTime) {
    const duration = performance.now() - response.config._metadata.startTime

    return {
      ...response,
      data: data,
      duration,
    }
  }

  return data
}

export const onError = async (
  error: AxiosError,
  axiosEnv: AxiosEnvironment
) => {
  if (error?.config?.timing && error?.config?._metadata?.startTime) {
    const duration = performance.now() - error.config._metadata.startTime

    return { error, duration }
  }
  const statusCode = error.response ? error.response.status : null
  const method = (error.config?.method || "").toUpperCase()
  const url = error.config?.url
  let customError = {}
  let customMessage = error.message

  if (url && method && statusCode) {
    customMessage = `${method} ${url} (${statusCode})`
  }
  switch (statusCode) {
    case 400:
      customError = new BadRequestError(new Error(customMessage))
      break
    case 401:
      customError = new UnauthorizedError(new Error(customMessage))
      break
    case 403:
      customError = new ForbiddenError(new Error(customMessage))
      break
    case 404:
      customError = new NotFoundError(new Error(customMessage))
      break
    case 502:
      customError = new BadGatewayError(new Error(customMessage))
      break
    case 504:
      customError = new GatewayTimeoutError(new Error(customMessage))
      break
    case null: // null case
    case 0: // 0 case occurred when user has no internet connection
      customError = new Error(
        "A network error occurred. This could be a CORS issue, a cancel request or a dropped internet connection."
      )
      break
  }
  const isCancelError = Axios.isCancel(error)

  if (isCancelError || statusCode === 404) {
    return Promise.reject(customError)
  }

  console.warn("[@evercam/shared/api/axios.ts]: Caught error:", error)

  const breadcrumbLogger = axiosEnv.errorLogger
  if (url && breadcrumbLogger) {
    breadcrumbLogger({
      // @ts-expect-error axios issue
      category: "axios.info",
      data: {
        url: `Error in URL: ${url}`,
        status: statusCode,
      },
    })
  }

  return Promise.reject(customError)
}

function addAuthTokenHeader(
  request: AxiosRequestConfig,
  axiosEnv: AxiosEnvironment
) {
  // Add auth token header
  const JwtToken = axiosEnv?.getAuthToken!()
  if (JwtToken) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (See https://github.com/axios/axios/issues/4193 )
    request.headers.common.Authorization = `Bearer ${JwtToken}`
  }
}

function ensureBaseUrl(
  request: AxiosRequestConfig,
  axiosEnv: AxiosEnvironment
) {
  // Set baseURL if not already set
  if (!request.baseURL) {
    request.baseURL = axiosEnv?.baseUrl as string
  }
}

function transformCamelCaseToSnakeCase(
  request: AxiosRequestConfig<Record<string, any>>
) {
  let paramsIgnoredCasing = {}
  let { data, params } = request

  if (
    data &&
    !(
      data instanceof Blob ||
      data instanceof FormData ||
      typeof data === "string"
    )
  ) {
    // Ignore casing transformation for some params when prompted using the `ignoreCasingFromParams` prop
    if (data?.ignoreCasingFromParams) {
      paramsIgnoredCasing =
        data.ignoreCasingFromParams.reduce(
          (acc: Record<string, any>, item: any) => ({
            ...acc,
            [item]: data![item],
          }),
          {}
        ) || {}
      delete data.ignoreCasingFromParams
    }
    if (Array.isArray(data)) {
      data = decamelizeKeys(data)
    } else {
      data = { ...decamelizeKeys(data), ...paramsIgnoredCasing }
    }
  }

  // Apply camelCase -> snake_cake on the request payload for FormData of instance of data
  if (data && data instanceof FormData) {
    let formData = new FormData()
    // @ts-ignore
    for (const [key, value] of data.entries()) {
      formData.append(decamelize(key), value)
    }
    data = formData
  }

  // Apply camelCase -> snake_cake on the request query params
  if (params && !(params instanceof Blob)) {
    params = decamelizeKeys(params)
  }

  request.data = data
  request.params = params
}

export const OnRequestExpiredTokenInterceptor = async (
  request: AxiosRequestConfig,
  isTokenExpired: () => boolean,
  handler: () => Promise<void>
) => {
  if (isTokenExpired()) {
    await handler()

    return {}
  }

  return request
}
