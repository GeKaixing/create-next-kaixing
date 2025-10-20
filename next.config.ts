import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  contentDirBasePath: "/docs",
  search: {
    codeblocks: false,
  },
  // useContentDir: true
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
const withNextIntl = createNextIntlPlugin("./library/i18n/request.ts");

export default withNextIntl(withNextra(nextConfig));
