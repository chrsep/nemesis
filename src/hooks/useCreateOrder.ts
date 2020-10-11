import { useMutation } from "react-query"
import { postApi } from "./apiHelpers"
import { PostNewOrder } from "../pages/api/order/createOrder"

const useCreateOrder = () => {
  const createOrder = postApi<PostNewOrder>("/order")
  return useMutation(createOrder)
}

export default useCreateOrder
