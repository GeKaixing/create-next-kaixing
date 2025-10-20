import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextra from "nextra";
const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './library/i18n/messages/en.json'
  }
});


const nextConfig: NextConfig = {
  /* config options here */
};
const withNextra = nextra({
  search: true,
  defaultShowCopyCode: true,
});


export default withNextIntl(withNextra(nextConfig));

