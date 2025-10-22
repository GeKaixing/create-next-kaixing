import React from 'react'

export default {
  head: ({ meta }) => (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={meta.description || 'Privacy Policy'} />
      <meta name="theme-color" content="#ffffff" />
    </>
  )
} as any


