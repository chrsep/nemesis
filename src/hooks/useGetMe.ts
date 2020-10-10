import { useQuery } from "react-query"
import { getApi } from "./apiHelpers"
import { GetMeResponse } from "../pages/api/me"

const useGetMe = () => {
  const getMe = getApi<GetMeResponse>("/me")
  return useQuery(["me"], getMe)
}

export default useGetMe
