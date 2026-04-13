import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Register() {
  const { register, member } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  if (member) return <Navigate to="/card" replace />

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    const result = register(fullName, email, password)
    if (result.ok) navigate('/card', { replace: true })
    else setError(result.error)
  }

  return (
    <div className="page auth-page">
      <div className="auth-panel">
        <h1>অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="auth-panel__intro">আপনি একটি ভার্চুয়াল কার্ড নম্বর ও সদস্য সেবায় প্রবেশাধিকার পাবেন।</p>
        <form onSubmit={onSubmit} className="form">
          {error && (
            <div className="form__error" role="alert">
              {error}
            </div>
          )}
          <label className="form__field">
            <span>পূর্ণ নাম</span>
            <input
              name="fullName"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>
          <button type="submit" className="btn btn--primary btn--block">
            নিবন্ধন করুন ও কার্ড পান
          </button>
        </form>
        <p className="auth-panel__footer">
          ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login">প্রবেশ করুন</Link>
        </p>
      </div>
    </div>
  )
}
