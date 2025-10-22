import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'

export const metadata = {
  title: '隐私政策'
}

export default async function PrivacyPolicyLayout({ children, params }) {
  const { locale } = await params
  const banner = (
    <Banner storageKey="pp-release">
      🔒 隐私政策已更新。
    </Banner>
  )

  return (
    <html lang={locale || 'en'} suppressHydrationWarning>
      <Head backgroundColor={{ dark: '#0f172a', light: '#f8fafc' }} />
      <body>
        <Layout banner={banner}
        >
          <Navbar pageMap={await getPageMap(locale || 'en')}>
            <Search />
            <ThemeSwitch />
          </Navbar>

          {children}

          <Footer>
            © {new Date().getFullYear()} Privacy Policy
          </Footer>
        </Layout>
      </body>
    </html>
  )
}