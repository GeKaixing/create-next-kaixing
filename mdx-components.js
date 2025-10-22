import { useMDXComponents as getThemeComponents } from 'nextra-theme-blog'
import { useMDXComponents as getDocsThemeComponents } from 'nextra-theme-docs'
// Get the default MDX components
const themeComponents = getThemeComponents()
const docsThemeComponents = getDocsThemeComponents()        
// Merge components
export function useMDXComponents(components) {
    return {
        ...themeComponents,
        ...components
    }
}
export function useDocsMDXComponents(components) {
    return {
        ...docsThemeComponents,
        ...components
    }
}