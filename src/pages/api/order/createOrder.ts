import { insertOrder } from "../../../db"

export interface PostNewOrder {
  eventId: string
  price: string
  userId?: string
}

const createOrder = (newOrder: PostNewOrder) => {
  try {
    const result = insertOrder(
      newOrder.userId!,
      newOrder.eventId,
      newOrder.price
    )
    if (!result) {
      console.log("error insert order")
    }
  } catch (error) {
    console.log(error)
  }
}

export default createOrder
