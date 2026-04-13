import type { ServiceItem } from '../types'

export const CARD_SERVICES: ServiceItem[] = [
  {
    id: 'wellness',
    title: 'বার্ষিক সুস্থতা পরিদর্শন',
    description: 'নেটওয়ার্ক সেবাদাতার সঙ্গে বছরে একবার অন্তর্ভুক্ত প্রতিরোধমূলক পরীক্ষা।',
    icon: 'stethoscope',
  },
  {
    id: 'immunizations',
    title: 'টিকাদান',
    description: 'ফ্লু, কোভিড বুস্টার ও নিয়মিত টিকা—স্বাস্থ্য নির্দেশিকা অনুযায়ী।',
    icon: 'shield',
  },
  {
    id: 'screenings',
    title: 'প্রতিরোধমূলক স্ক্রিনিং',
    description: 'রক্তচাপ, ডায়াবেটিস ও বয়স অনুযায়ী ক্যান্সার স্ক্রিনিং।',
    icon: 'heart',
  },
  {
    id: 'mental-health',
    title: 'মানসিক স্বাস্থ্য সহায়তা',
    description: 'কাউন্সেলিং রেফারেল ও সংকট সম্পদে প্রবেশাধিকার।',
    icon: 'brain',
  },
  {
    id: 'pharmacy',
    title: 'ফার্মেসিতে সঞ্চয়',
    description: 'অংশীদার ফার্মেসিতে জেনেরিক ও নির্বাচিত ব্র্যান্ড ওষুধে ছাড়।',
    icon: 'pill',
  },
  {
    id: 'nurse-line',
    title: '২৪/৭ নার্স পরামর্শ লাইন',
    description: 'জরুরি নয় এমন প্রশ্নের জন্য নিবন্ধিত নার্স সবসময় উপলব্ধ।',
    icon: 'phone',
  },
]
