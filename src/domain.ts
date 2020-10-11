export interface ConcertEvent {
  attendance: 0
  date: string
  id: number
  name: string
  price: number
  ticketsSold: number
  totalTickets: number
  thumbnailUrl: string
  artists: string
  description: string
  genre: string
  startTime: string
  endTime: string
}

export interface OrderData {
  id: number
  userId: string
  eventId: number
  price: number
  buyDate: Date
}
