import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Home() {
  const { member } = useAuth()

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">আমির হামজা ফাউন্ডেশন কল্যাণ কর্মসূচি</p>
          <h1 className="hero__title">একটি ডিজিটাল কার্ডে আপনার স্বাস্থ্যসুবিধা</h1>
          <p className="hero__lead">
            বিনামূল্যে ভার্চুয়াল আমির হামজা ফাউন্ডেশন হেলথ কার্ডের জন্য নিবন্ধন করুন। প্রতিরোধমূলক সেবা, ছাড় ও সহায়তার সম্পদ—সব
            এক জায়গায়।
          </p>
          <div className="hero__actions">
            {member ? (
              <Link to="/card" className="btn btn--primary btn--lg">
                কার্ড দেখুন
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn--primary btn--lg">
                  কার্ড নিন
                </Link>
                <Link to="/login" className="btn btn--outline btn--lg">
                  প্রবেশ করুন
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero__visual" aria-hidden>
          <div className="hero__card-preview">
            <div className="hero__card-chip" />
            <div className="hero__card-lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">আপনি পাবেন</h2>
        <ul className="feature-grid">
          <li className="feature">
            <h3>ভার্চুয়াল সদস্য কার্ড</h3>
            <p>অংশগ্রহণকারী কেন্দ্রে দ্রুত যাচাইয়ের জন্য অনন্য কার্ড নম্বর ও QR কোড।</p>
          </li>
          <li className="feature">
            <h3>প্রতিরোধমূলক সেবা</h3>
            <p>সুস্থতা পরিদর্শন, টিকাদান ও স্ক্রিনিং—সম্প্রদায়ের স্বাস্থ্য লক্ষ্য অনুযায়ী।</p>
          </li>
          <li className="feature">
            <h3>সহায়তা ও সঞ্চয়</h3>
            <p>মানসিক স্বাস্থ্য সম্পদ, ফার্মেসিতে ছাড় ও ২৪/৭ নার্স পরামর্শ লাইন।</p>
          </li>
        </ul>
      </section>
    </div>
  )
}
