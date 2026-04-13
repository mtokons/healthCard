import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { CardPage } from './pages/CardPage'
import { ServicesPage } from './pages/ServicesPage'

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

  return (
    <AuthProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="card" element={<CardPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
