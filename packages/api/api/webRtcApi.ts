import axios from "axios"

export const WebRtcApi = {
  webRtc: {
    requestIceServers({ url, token }: { url: string; token: string }) {
      return axios({
        url,
        method: "OPTIONS",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    sendLocalOffer({
      url,
      token,
      data,
    }: {
      url: string
      token: string
      data: {
        sdp: string
        type: string
      }
    }) {
      return axios({
        url,
        method: "POST",
        headers: {
          "Content-Type": "application/sdp",
          Authorization: `Bearer ${token}`,
        },
        data,
      })
    },
    sendLocalCandidates({
      url,
      token,
      data,
      tag,
    }: {
      url: string
      token: string
      data: Record<string, unknown>
      tag: string
    }) {
      return axios({
        url,
        method: "PATCH",
        headers: {
          "Content-Type": "application/trickle-ice-sdpfrag",
          "If-Match": tag,
          Authorization: `Bearer ${token}`,
        },
        data,
      })
    },
  },
}
