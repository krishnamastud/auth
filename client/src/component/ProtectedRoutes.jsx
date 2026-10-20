import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoutes = () => {

      const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if(!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <Outlet />
}

export default ProtectedRoutes