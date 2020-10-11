import { queryCache, useMutation } from "react-query"
import { postApi } from "./apiHelpers"
import { PostNewOrder } from "../pages/api/order"
import { GetMeResponse } from "../pages/api/me"

const useCreateOrder = () => {
  const createOrder = postApi<PostNewOrder>("/order")
  return useMutation(createOrder, {
    onSuccess: async (data, variables) => {
      const cache = queryCache.getQueryData<GetMeResponse>(["me"])
      console.log(cache)
      if (cache !== undefined) {
        console.log(cache)
        console.log({ id: variables.eventId })
        cache.upcomingEvents.push({ id: variables.eventId })
        queryCache.setQueryData<GetMeResponse>(["me"], cache)
      }
    },
  })
}

export default useCreateOrder
