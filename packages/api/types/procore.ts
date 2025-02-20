export type ProcoreUserCompaniesResponsePayload = Array<{
  id: number
  isActive?: boolean
  name: string
}>

export type ProcoreUserProjectRequestPayload = {
  companyId: number
}

export type ProcoreUserProjectsResponsePayload = Array<{
  accountingProjectNumber?: number
  active: boolean
  address: string
  city: string
  company: {
    id: number
    name: string
  }
  completionDate: string
  countryCode: string
  county: string
  createdAt: string
  customFields?: object
  designatedMarketArea: string
  displayName: string
  estimatedValue: string
  id: number
  isDemo: boolean
  latitude: number
  longitude: number
  name: string
  originCode: string | number | null
  originData: string | null
  originId: number | null
  ownersProjectId: number | null
  parentJobId: number | null
  phone: string | number
  photoId: number
  projectBidTypeId: number | null
  projectNumber: string
  projectOwnerTypeId: number | null
  projectRegionId: number | null
  stage: string
  startDate: string
  stateCode: string
  storeNumber?: string
  timeZone: string
  totalValue: string
  updatedAt: string
  zip: number
}>

export type ProcoreEditedImageUploadRequestPayload = {
  projectExid: string
  companyId: number
  projectId: number
  snapshot: string
  categoryId?: number
}

export type ProcoreProjectsAlbumsPayload = Array<{
  count: number
  coverPhoto: string | null
  createdAt: string
  id: number
  links: {
    delete: string
    show: string
    update: string
  }
  name: string
  position: number
  private: boolean
  updatedAt: string
}>

export type ProcoreProjectsAlbumsRequestPayload = {
  companyId: number
  projectId: number
}
