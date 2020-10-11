import { useMutation } from "react-query"
import { insertOrder } from "../../../db"

export interface PostNewOrder {
  eventId: string
  price: string
  userId?: string
}

const createOrder = () => {
  const fetchApi = async (newOrder: PostNewOrder): Promise<void> => {
    const result = await insertOrder(
      newOrder.userId!,
      newOrder.eventId,
      newOrder.price
    )

    if (!result) {
      console.log("error create order")
    }
  }

  return useMutation(fetchApi)
}

export default createOrder
