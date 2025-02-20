export type DateType = Date | string | number

type YYYY = number
type MM = number
type DD = number
type HH = number
type mm = number
type ss = number
type microS = number

export type Date_YYYY = `${YYYY}` | string

export type Date_YYYY_MM = `${YYYY}-${MM}` | string

export type Date_YYYY_MM_DD = `${YYYY}-${MM}-${DD}` | string

export type Time_HH_mm_ss = `${HH}:${mm}:${ss}` | string

export type Date_HH = `${HH}` | string

export type DateTime = `${Date_YYYY_MM_DD}T${Time_HH_mm_ss}` | string

export type DateTime_tz =
  | `${Date_YYYY_MM_DD}T${Time_HH_mm_ss}${"+" | "-"}${HH}:${mm}`
  | string

export type DateTime_Z = `${Date_YYYY_MM_DD}T${Time_HH_mm_ss}Z` | string

export type DateTime_Z_micros =
  | `${Date_YYYY_MM_DD}T${Time_HH_mm_ss}.${microS}Z`
  | string

export type DateTimeSpaceSeparated =
  | `${Date_YYYY_MM_DD} ${Time_HH_mm_ss}`
  | string
