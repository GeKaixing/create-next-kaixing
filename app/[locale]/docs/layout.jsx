import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import 'nextra-theme-docs/style.css'
import { getPageMap } from 'nextra/page-map';


export async function getLocalizedPageMap() {
    // 假设 getPageMap 返回一个 PageItem 数组
    const pageMap= await getPageMap();

    // newPageMap 的类型推断为 PageItem[]
    // @ts-ignore
    const newPageMap = pageMap.filter((pageItem, index) =>pageItem.name !== '[locale]');

    return newPageMap;
}
export const metadata = {
    // Define your metadata here
    // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

// const banner = <Banner storageKey="some-key">This template was created with 🩸 and 💦 by <Link href="https://github.com/phucbm">PHUCBM</Link> 🐧</Banner>
const navbar = (
    <Navbar
        logo={<img src="/images/general/logo.svg" alt="Logo" width={100} height={20} />}
    // ... Your additional navbar options
    />
)
const footer = <Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>

export default async function RootLayout({ children }) {
    const pageMap = await getLocalizedPageMap();
    return (
        <html
            // Not required, but good for SEO
            lang="en"
            // Required to be set
            dir="ltr"
            // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
            suppressHydrationWarning
        >
            <Head
            // ... Your additional head options
            >
                <link rel="shortcut icon" href="/images/general/icon.svg" />
                {/* Your additional tags should be passed as `children` of `<Head>` element */}
            </Head>
            <body>
                <Layout
                    // banner={banner}
                    navbar={navbar}
                    pageMap={pageMap}
                    docsRepositoryBase="https://github.com/phucbm/nextra-docs-starter/tree/main"
                    footer={footer}
                // ... Your additional layout options
                >
                    {children}
                </Layout>
            </body>
        </html>
    )
}