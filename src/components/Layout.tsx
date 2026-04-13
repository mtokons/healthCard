import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Layout() {
  const { member, logout, supabaseConfigured } = useAuth()

  return (
    <div className="layout">
      {!supabaseConfigured && (
        <div className="config-banner" role="status">
          <strong>ডাটাবেস সংযোগ সেট করা নেই।</strong> GitHub Actions-এ{' '}
          <code>VITE_SUPABASE_URL</code> ও <code>VITE_SUPABASE_ANON_KEY</code> সিক্রেট যোগ করুন, তারপর আবার
          ডিপ্লয় করুন। স্থানীয়ভাবে <code>.env.local</code> ব্যবহার করুন।
        </div>
      )}
      <header className="header">
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <span className="header__mark" aria-hidden />
            <span>আমির হামজা ফাউন্ডেশন হেলথ কার্ড</span>
          </Link>
          <nav className="header__nav" aria-label="প্রধান নেভিগেশন">
            {member ? (
              <>
                <NavLink to="/card" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  আমার কার্ড
                </NavLink>
                <NavLink to="/services" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
                  সেবাসমূহ
                </NavLink>
                <button type="button" className="btn btn--ghost" onClick={logout}>
                  প্রস্থান
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  প্রবেশ
                </Link>
                <Link to="/register" className="btn btn--primary btn--sm">
                  নিবন্ধন
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>
          ডেমো অ্যাপ—এখানে দেখানো সুবিধাগুলো নমুনামাত্র। এটি বীমা নয় এবং জরুরি চিকিৎসার বিকল্প নয়। জরুরি অবস্থায়
          বাংলাদেশে ৯৯৯ এ কল করুন।
        </p>
      </footer>
    </div>
  )
}
