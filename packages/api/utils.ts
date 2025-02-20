import { decamelizeKeys } from "humps"

export type Falsy = "" | null | undefined | false

export interface QueryParams {
  [k: string]: string | number | boolean | string[] | Falsy
}

export const toQueryString = <T extends Record<string, unknown>>(
  paramsObject: T | QueryParams = {},
  { forceSnakeCase = true, forceArrayBrackets = false } = {}
) => {
  if (Object.keys(paramsObject).length === 0) {
    return
  }
  let params = { ...paramsObject }
  if (forceSnakeCase) {
    params = decamelizeKeys(paramsObject) as QueryParams
  }

  return Object.entries(params).reduce((acc, [param, value], index) => {
    let encodedParam = ""
    if (
      value === null ||
      value === undefined ||
      (Array.isArray(value) && value.length === 0)
    ) {
      return acc
    } else if (value && typeof value === "object") {
      encodedParam = Object.entries(value).reduce((_acc, [key, v], i) => {
        let paramName = param
        if (isNaN(Number.parseInt(key))) {
          paramName = `${param}[${key}]`
        } else if (Array.isArray(value) && forceArrayBrackets) {
          paramName = `${param}[]`
        }

        return `${_acc}${i > 0 ? "&" : ""}${paramName}=${encodeURIComponent(v)}`
      }, "")
    } else {
      encodedParam = `${param}=${encodeURIComponent(
        value as string | number | boolean
      )}`
    }

    return `${acc}${index > 0 ? "&" : ""}${encodedParam}`
  }, "")
}

export function queryStringToObject(queryString = ""): QueryParams {
  const entries = [
    ...new URLSearchParams(
      queryString.indexOf("#") > -1 ? queryString.split("#")[0] : queryString
    ).entries(),
  ].filter(([, value]) => value)

  return entries.reduce<QueryParams>((acc, [key, value]) => {
    const isSingleParam =
      (queryString.match(new RegExp(`${key}=`, "g")) || []).length <= 1
    if (isSingleParam) {
      return { ...acc, [key]: value }
    }

    if (acc[key]) {
      return {
        ...acc,
        [key]: [...(acc[key] as string[]), value],
      }
    }

    return { ...acc, [key]: [value] }
  }, {})
}
