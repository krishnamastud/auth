import AppRouter from "./router/AppRouter"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeAuth } from "./feature/auth/authAction"


const App = () => {

  const dispatch = useDispatch()
  const initialized = useSelector(state => state.auth.initialized)

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  if (!initialized) {
    return <div>Loading...</div>
  }

  return (
    <AppRouter />
  )
}

export default App