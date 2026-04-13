export interface Member {
  id: string
  email: string
  fullName: string
  memberSince: string
  cardNumber: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  icon: 'heart' | 'shield' | 'stethoscope' | 'brain' | 'pill' | 'phone'
}
