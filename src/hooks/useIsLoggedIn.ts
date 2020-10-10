import { useEffect, useState } from "react"

const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.replace(" ", "").split(";")
    const flag = cookies.findIndex((item) => item === "loggedIn=1")
    if (flag < 0) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [])

  return isLoggedIn
}

export default useIsLoggedIn
