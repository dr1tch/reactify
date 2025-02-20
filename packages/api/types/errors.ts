import { AxiosError } from "axios"

export enum EvercamApiErrorCode {
  BadArgument = "BAD_ARGUMENT",
  DeviceError = "DEVICE_ERROR",
  UnsupportedOperation = "UNSUPPORTED_OPERATION",
  QuotaExceeded = "QUOTA_EXCEEDED",
  InvalidCredentials = "INVALID_CREDENTIALS",
  ProviderAuthFailure = "PROVIDER_AUTH_FAILURE",
  ProviderEmailRequired = "PROVIDER_EMAIL_REQUIRED",
  PasswordReset = "PASSWORD_RESET",
  RequireShareRequest = "REQUIRE_SHARE_REQUEST",
  Generic = "GENERIC",
}

type _EvercamApiError = {
  code: EvercamApiErrorCode
  message: string
  details: string
  innerError?: _EvercamApiError
}

export type EvercamApiError = AxiosError<_EvercamApiError>
