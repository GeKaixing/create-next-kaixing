import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useDocsMDXComponents as getMDXComponents } from '../../../../mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props) {
    const params = await props.params
    const { metadata } = await importPage(params.mdxPath, params.locale)
    return metadata
}

const Wrapper = getMDXComponents().wrapper

export default async function Page(props) {
    const params = await props.params

    const result = await importPage(params.mdxPath, params.locale)
    const { default: MDXContent, toc, metadata } = result
    return (
        <Wrapper toc={toc} metadata={metadata}>
            <MDXContent {...props} params={params} />
        </Wrapper>
    )
}