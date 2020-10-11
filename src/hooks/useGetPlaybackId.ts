import { useQuery } from "react-query"
import { getApi } from "./apiHelpers"
import { GetPlaybackIdResponse } from "../pages/api/events/[id]/playbackId"

const useGetPlaybackId = (eventId?: number, initialPlaybackId?: string) => {
  const getStreamKey = getApi<GetPlaybackIdResponse>(
    `/events/${eventId}/playbackId`
  )
  return useQuery(["events", eventId, "playbackId"], getStreamKey, {
    enabled: eventId !== undefined,
    initialData: {
      playbackId: initialPlaybackId,
    },
  })
}

export default useGetPlaybackId
