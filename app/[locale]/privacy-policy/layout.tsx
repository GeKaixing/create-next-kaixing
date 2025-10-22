import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-blog/style.css'

export const metadata = {
  title: '隐私政策'
}

export default async function PrivacyPolicyLayout({ children, params }:{
  children: React.ReactNode,
  params: {
    locale: string
  }
}) {
  const { locale } = await params
  const banner = (
    <Banner storageKey="pp-release">
      🔒 隐私政策已更新。
    </Banner>
  )

  return (
        <Layout 
          banner={banner}
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
  )
}