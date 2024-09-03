import { Spinner } from "@nextui-org/react"
import { useCurrentQuery } from "../../app/services/user-api"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return children
}