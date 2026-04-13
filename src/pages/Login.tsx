import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const { login, member, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (member) return <Navigate to="/card" replace />

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const result = await login(email, password)
    if (result.ok) navigate('/card', { replace: true })
    else setError(result.error)
  }

  return (
    <div className="page auth-page">
      <div className="auth-panel">
        <h1>প্রবেশ করুন</h1>
        <p className="auth-panel__intro">আপনার ভার্চুয়াল আমির হামজা ফাউন্ডেশন হেলথ কার্ড ও সুবিধায় প্রবেশ করুন।</p>
        <form onSubmit={onSubmit} className="form">
          {error && (
            <div className="form__error" role="alert">
              {error}
            </div>
          )}
          <label className="form__field">
            <span>ইমেইল</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form__field">
            <span>পাসওয়ার্ড</span>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            {loading ? 'অপেক্ষা করুন...' : 'প্রবেশ করুন'}
          </button>
        </form>
        <p className="auth-panel__footer">
          কার্ড লাগবে? <Link to="/register">নিবন্ধন করুন</Link>
        </p>
      </div>
    </div>
  )
}
