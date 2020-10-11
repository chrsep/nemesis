import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"

function msToHMS(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  const hours = Math.floor((ms / 1000 / 3600) % 24)

  return `${hours}h ${minutes}m ${seconds}s`
}

const useCountdown = (date: Dayjs) => {
  const [countdown, setCountdown] = useState(0)
  const formattedCountdown = msToHMS(countdown)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(date.diff(dayjs()))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return {
    formattedCountdown,
    countdown,
  }
}

export default useCountdown
