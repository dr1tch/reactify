import Axios, { type CancelTokenSource } from "axios"
import type {
  ErrorInterceptor,
  ExtendedAxiosInstance,
  RequestInterceptor,
  ResponseInterceptor,
} from "@/types"
import { onRequest, onResponse, onError } from "./interceptors"

let requestInterceptors: RequestInterceptor[] = []
let responseInterceptors: ResponseInterceptor[] = []
let errorInterceptors: ErrorInterceptor[] = []

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

const axios = Axios.create({
  headers: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore (See: https://github.com/axios/axios/issues/4193 )
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  },
}) as ExtendedAxiosInstance

axios.env = {}

axios.addEnvironmentVariables = (vars: Record<string, any>) => {
  axios.env = { ...axios.env, ...vars }
  // log a warning if some values are null, undefined or no length only if localhost
  Object.entries(axios.env).forEach(([key, value]) => {
    if (
      (value === null ||
        value === undefined ||
        (typeof value === "string" && !value.length)) &&
      window.location.hostname.includes("localhost")
    ) {
      console.warn(
        `AXIOS environment value for ${key} is ${value} - check your .env file.`
      )
    }
  })
}

axios.addRequestInterceptor = (
  requestInterceptor: RequestInterceptor,
  errorInterceptor?: ErrorInterceptor
) => {
  requestInterceptors.push(requestInterceptor)
  if (errorInterceptor && !errorInterceptors.includes(errorInterceptor)) {
    errorInterceptors.push(errorInterceptor)
  }

  // Ensure we only set up the interceptors once to prevent duplicate calls
  // @ts-expect-error
  if (axios.interceptors.request.handlers.length === 0) {
    axios.interceptors.request.use(
      async (request) => {
        for (const interceptor of requestInterceptors) {
          request = await interceptor(request, axios.env)
        }

        return request
      },
      (error) => {
        for (const interceptor of errorInterceptors) {
          interceptor(error, axios.env)
        }
      }
    )
  }
}

axios.addResponseInterceptor = (
  responseInterceptor,
  errorInterceptor?: ErrorInterceptor
) => {
  responseInterceptors.push(responseInterceptor)
  if (errorInterceptor && !errorInterceptors.includes(errorInterceptor)) {
    errorInterceptors.push(errorInterceptor)
  }

  // Ensure we only set up the interceptors once to prevent duplicate calls
  // @ts-expect-error
  if (axios.interceptors.response.handlers.length === 0) {
    axios.interceptors.response.use(
      async (response) => {
        for (const interceptor of responseInterceptors) {
          response = await interceptor(response, axios.env)
        }

        return response
      },
      (error) => {
        for (const interceptor of errorInterceptors) {
          interceptor(error, axios.env)
        }

        return Promise.reject(error)
      }
    )
  }
}

// Adds auth guards and applies cameraCase -> snake_case transforms on request payload & params
axios.addRequestInterceptor(onRequest, onError)

// Apply snake_case -> camelCase on incoming responses data
axios.addResponseInterceptor(onResponse, onError)

const setHeader = (headerName: string, value: any) => {
  if (!value) {
    delete axios.defaults.headers.common[headerName]
  } else {
    axios.defaults.headers.common[headerName] = value
  }
}

const setToken = (token: string) => {
  setHeader("Authorization", token ? `Bearer ${token}` : null)
}

axios.CancelToken = Axios.CancelToken
axios.isCancel = Axios.isCancel
axios.setHeader = setHeader
axios.setToken = setToken

let cancelTokens: CancelTokenSource[] = []

axios.generateCancelTokenSource = () => axios.CancelToken.source()
axios.addCancelToken = (token: CancelTokenSource) =>
  (cancelTokens = [token, ...cancelTokens])
axios.resetCancelTokens = () => (cancelTokens = [])
axios.cancelRequests = () => {
  if (cancelTokens.length) {
    cancelTokens.forEach((t) => {
      t.cancel("Operation canceled due to new request")
    })
    axios.resetCancelTokens()
  }
}

export { axios }
