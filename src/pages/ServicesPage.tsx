import { Navigate } from 'react-router-dom'
import { CARD_SERVICES } from '../data/services'
import { useAuth } from '../hooks/useAuth'
import { IconBrain, IconHeart, IconPhone, IconPill, IconShield, IconStethoscope } from '../components/Icons'
import type { ServiceItem } from '../types'

function ServiceIcon({ icon }: { icon: ServiceItem['icon'] }) {
  const cls = 'service-card__icon'
  switch (icon) {
    case 'heart':
      return <IconHeart className={cls} />
    case 'shield':
      return <IconShield className={cls} />
    case 'stethoscope':
      return <IconStethoscope className={cls} />
    case 'brain':
      return <IconBrain className={cls} />
    case 'pill':
      return <IconPill className={cls} />
    case 'phone':
      return <IconPhone className={cls} />
    default:
      return null
  }
}

export function ServicesPage() {
  const { member } = useAuth()

  if (!member) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="page services-page">
      <div className="services-page__header">
        <h1>অন্তর্ভুক্ত সেবাসমূহ</h1>
        <p>এই সুবিধাগুলো আপনার কমিউনিটি হেলথ কার্ড সদস্যপদের সঙ্গে যুক্ত।</p>
      </div>
      <ul className="service-list">
        {CARD_SERVICES.map((s) => (
          <li key={s.id} className="service-card">
            <div className="service-card__top">
              <ServiceIcon icon={s.icon} />
              <h2>{s.title}</h2>
            </div>
            <p>{s.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
