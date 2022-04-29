import {
  ComposableFunctionArgs,
  useContentFactory,
  UseContent,
  UseContentFactoryParams,
  Context,
} from '@absolute-web/vsf-core'
import { useCache } from '@absolute-web/vsf-cache'
import { ContentSearchParams } from '../types'

const factoryParams: UseContentFactoryParams<any, ContentSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    }
  },
  search: async (
    context: Context,
    params: ComposableFunctionArgs<ContentSearchParams>,
  ): Promise<any> => {
    const {
      signal,
      ...searchParams
    } = {
      ...params
    };

    const response = await context.$sb.getApi.getContent(searchParams, undefined, signal)

    if (response) {
      let tags = []
      if (Array.isArray(response)) {
        response.forEach(({ _meta: { id } }) => tags.push({ prefix: `sb_`, value: id }))
      } else if (Object.prototype.hasOwnProperty.call(response, '_meta')) {
        tags.push({ prefix: `sb_`, value: (response as any)._meta.id })
      }

      if (tags.length) {
        context.cache.addTags(tags);
      }
    }

    return response
  },
}

const useContent: (cacheId: string) => UseContent<any, ContentSearchParams> =
  useContentFactory<any, ContentSearchParams>(factoryParams)

export { useContent }
