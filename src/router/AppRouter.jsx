import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();
  // const authStatus = 'not-authenticated';


  useEffect(() => {
    checkAuthToken();
  }, [])


  if (status === 'checking') {
    return (
      <h3>Cargando....</h3>
    );
  }

  return (
    <Routes>
      {
        // authStatus === 'not-authenticated'
        status === 'not-authenticated'
          ? (
            <>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
      }

    </Routes>
  )
}
