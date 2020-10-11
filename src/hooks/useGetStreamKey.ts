import { useQuery } from "react-query"
import { getApi } from "./apiHelpers"
import { GetStreamKeyResponse } from "../pages/api/events/[id]/streamKey"

const useGetStreamKey = (eventId?: number, initialStreamKey?: string) => {
  const getStreamKey = getApi<GetStreamKeyResponse>(
    `/events/${eventId}/streamKey`
  )
  return useQuery(["events", eventId, "streamKey"], getStreamKey, {
    enabled: eventId !== undefined,
    initialData: {
      streamKey: initialStreamKey,
    },
  })
}

export default useGetStreamKey
