import { Outlet } from 'react-router-dom'

import { useGetMyProfile } from '@/hooks/services/starsched/use-get-my-profile'

import { Loading } from './components/loading'
import { Failure } from './components/failure'

export function ProfileCheck() {
  const { isLoading, error, refetch } = useGetMyProfile()

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <Failure error={error} onTryAgain={refetch} />
  }

  return <Outlet />
}
