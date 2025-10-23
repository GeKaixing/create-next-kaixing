import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en', 
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/pathnames': {
      zh: '/pfadnamen'
    },
    '/subscription': '/subscription',
    '/success': '/success',
    '/protected-test': '/protected-test',
    '/auth-test': '/auth-test',
    '/login': '/login',
    '/privacy-policy': '/privacy-policy'
  }
});