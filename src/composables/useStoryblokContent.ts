import { Context } from '@vue-storefront/core'
import { ContentSearchParams, UseStoryblokContent } from '../types'
import { useStoryblokContentFactory } from 'factories/useStoryblokContentFactory'
import { getStoryblokQueryParams } from '../helpers/storyblokBridge'

const search = async (
  context: Context,
  params: ContentSearchParams,
): Promise<any> => {
  const { id, fullSlug } = getStoryblokQueryParams()

  if (params.slug === fullSlug) {
    params.id = id;
  }

  if (process?.env?.NODE_ENV === 'development') {
    params.throwErrors = true;
  }

  return context.$sb.api.getContent(params)
}

const useStoryblokContent: (
  cacheId: string,
  prefetchedValue?: any,
) => UseStoryblokContent<any, ContentSearchParams> = useStoryblokContentFactory<
  any,
  ContentSearchParams
>({ search })

export { useStoryblokContent }
