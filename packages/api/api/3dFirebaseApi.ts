import { axios } from "./client"
import {
  _360ProjectJsonResponse,
  DroneProjectJsonResponse,
  ProjectExid,
} from "@evercam/api/types"

export const _3dFirebaseApi = {
  drone: {
    getProjectInfo(
      projectExid: ProjectExid
    ): Promise<DroneProjectJsonResponse> {
      return fetch(
        `${axios.env.firebaseDbLink}data/projects/cesium/${projectExid}.json`
      ).then((res) => res.json())
    },
  },
  _360: {
    getProjectInfo(projectExid: ProjectExid): Promise<_360ProjectJsonResponse> {
      return fetch(
        `${axios.env.firebaseDbLink}data/projects/360/${projectExid}.json`
      ).then((res) => res.json())
    },
  },
}
