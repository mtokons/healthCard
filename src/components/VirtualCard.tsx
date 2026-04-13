import { QRCodeSVG } from 'qrcode.react'
import type { Member } from '../types'

type Props = { member: Member }

export function VirtualCard({ member }: Props) {
  const qrPayload = JSON.stringify({
    v: 1,
    id: member.id,
    card: member.cardNumber,
  })

  const memberSince = new Date(member.memberSince).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="virtual-card">
      <div className="virtual-card__glow" aria-hidden />
      <div className="virtual-card__inner">
        <header className="virtual-card__header">
          <div>
            <p className="virtual-card__brand">আমির হামজা ফাউন্ডেশন হেলথ কার্ড</p>
            <p className="virtual-card__subtitle">সদস্য সুবিধা কর্মসূচি</p>
          </div>
          <div className="virtual-card__logo" aria-hidden>
            <span />
          </div>
        </header>
        <div className="virtual-card__body">
          <div className="virtual-card__info">
            <p className="virtual-card__label">সদস্যের নাম</p>
            <p className="virtual-card__name">{member.fullName}</p>
            <p className="virtual-card__label">কার্ড নম্বর</p>
            <p className="virtual-card__number">{member.cardNumber}</p>
            <p className="virtual-card__meta">সদস্য পদ গ্রহণ: {memberSince}</p>
          </div>
          <div className="virtual-card__qr">
            <QRCodeSVG value={qrPayload} size={112} level="M" includeMargin={false} />
            <span className="virtual-card__qr-caption">যাচাইয়ের জন্য স্ক্যান করুন</span>
          </div>
        </div>
      </div>
    </div>
  )
}
