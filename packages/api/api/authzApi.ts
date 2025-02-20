import { axios } from "./client"

export const AuthzApi = {
  roles: {
    async get(params: any) {
      return await axios.get("/admin/authz/roles", params)
    },
    async getRoleDetails(id: number) {
      return await axios.get(`/admin/authz/roles/${id}`)
    },
    createRole(params: any) {
      return axios.post("/admin/authz/roles", params)
    },
    updateRole(id: number, params: any) {
      return axios.patch(`/admin/authz/roles/${id}`, params)
    },
    deleteRole(id: number) {
      return axios.delete(`/admin/authz/roles/${id}`)
    },
    addPermission(id: number, action: string) {
      return axios.post(`/admin/authz/roles/${id}/permissions/`, { action })
    },
    deletePermission(id: number, action: string) {
      return axios.delete(`/admin/authz/roles/${id}/permissions/${action}`)
    },
    async getRoleUsers(id: number) {
      return axios.get(`/admin/authz/roles/${id}/users`)
    },
    async assignUsers(id: number, emails: Array<string>, resource_id: string) {
      return axios.post(`/admin/authz/roles/${id}/users`, {
        emails,
        resource_id,
      })
    },
    async unassignUsers(
      id: number,
      emails: Array<string>,
      resource_id: string
    ) {
      return axios.delete(`/admin/authz/roles/${id}/users`, {
        params: {
          emails,
          resource_id,
        },
      })
    },
    getUserRoles() {
      return axios.get("/users/roles")
    },
  },
  scopes: {
    async get() {
      return await axios.get("/admin/authz/scopes")
    },
    create(params: any) {
      return axios.post("/admin/authz/scopes", params)
    },
    delete(id: number) {
      return axios.delete(`/admin/authz/scopes/${id}`)
    },
    update(id: number, params: any) {
      return axios.patch(`/admin/authz/scopes/${id}`, params)
    },
  },
}
