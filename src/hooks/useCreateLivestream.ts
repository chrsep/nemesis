import { useMutation } from "react-query"
import { postApi } from "./apiHelpers"

const useCreateLivestream = (eventId?: number) => {
  const createLivestream = postApi(`/events/${eventId}/livestream`)
  return useMutation(createLivestream)
}

export default useCreateLivestream
