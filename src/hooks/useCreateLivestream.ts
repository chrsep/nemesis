import { queryCache, useMutation } from "react-query"
import { postApi } from "./apiHelpers"
import { GetStreamKeyResponse } from "../pages/api/events/[id]/streamKey"
import { PostNewLivestreamResponse } from "../pages/api/events/[id]/livestream"
import { GetPlaybackIdResponse } from "../pages/api/events/[id]/playbackId"

const useCreateLivestream = (eventId?: number) => {
  const createLivestream = postApi(`/events/${eventId}/livestream`)
  return useMutation(createLivestream, {
    onSuccess: async (data) => {
      const body: PostNewLivestreamResponse = await data.json()
      queryCache.setQueryData<GetStreamKeyResponse>(
        ["events", eventId, "streamKey"],
        { streamKey: body.livestream.key }
      )
      queryCache.setQueryData<GetPlaybackIdResponse>(
        ["events", eventId, "playbackId"],
        { playbackId: body.livestream.playbackId }
      )
    },
  })
}

export default useCreateLivestream
