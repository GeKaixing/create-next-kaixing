/* eslint-disable react-hooks/rules-of-hooks -- false positive, useMDXComponents/useTOC are not react hooks */

import { useMDXComponents } from 'nextra-theme-docs'
import { generateStaticParamsFor, importPage } from 'nextra/pages'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props:{
  params: {
    locale: string
    mdxPath: string
  }
}) {
  const params = await props.params
  const { metadata } = await importPage(params.mdxPath as unknown as string[], params.locale)
  return metadata
}

export default async function Page(props:{
  params: {
    locale: string
    mdxPath: string
  }
}) {
  const params = await props.params
  const result = await importPage(params.mdxPath as unknown as string[], params.locale)
  const { default: MDXContent, toc, metadata, sourceCode } = result

  const Wrapper = useMDXComponents().wrapper

  return (
    <Wrapper  metadata={metadata} toc={toc} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}