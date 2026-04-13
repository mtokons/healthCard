import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { VirtualCard } from '../components/VirtualCard'

export function CardPage() {
  const { member } = useAuth()

  if (!member) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="page card-page">
      <div className="card-page__intro">
        <h1>আপনার ভার্চুয়াল কার্ড</h1>
        <p>
          অংশগ্রহণকারী সেবা ব্যবহারের সময় এই কার্ড বা QR কোড দেখান। আপনার সদস্য তথ্য গোপন রাখুন।
        </p>
      </div>
      <VirtualCard member={member} />
    </div>
  )
}
