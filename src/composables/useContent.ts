import { useContentFactory, UseContent, Context } from '@absolute-web/vsf-core'
import { ContentSearchParams } from '../types'

const search = async (
  context: Context,
  params: ContentSearchParams,
): Promise<any> => {
  return context.$sb.api.getContent(params)
}
const useContent: (cacheId: string) => UseContent<any, ContentSearchParams> =
  useContentFactory<any, ContentSearchParams>({ search })

export { useContent }
