import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextra from "nextra";

const nextConfig: NextConfig = {
  /* config options here */
   i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
  }
};
const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
  
  
});
const withNextIntl = createNextIntlPlugin("./library/i18n/request.ts");

export default withNextIntl(withNextra(nextConfig));

