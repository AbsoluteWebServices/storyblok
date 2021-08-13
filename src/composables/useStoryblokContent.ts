import { Context } from '@vue-storefront/core'
import { useCache } from '@absolute-web/vsf-cache';
import { ContentSearchParams, UseStoryblokContent } from '../types'
import { UseStoryblokContentFactoryParams, useStoryblokContentFactory } from 'factories/useStoryblokContentFactory'
import { getStoryblokQueryParams } from '../helpers/storyblokBridge'

const factoryParams: UseStoryblokContentFactoryParams<any, ContentSearchParams> = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (
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

    const content = await context.$sb.api.getContent(params);

    if (content) {
      context.cache.addTags([{ prefix: `sb_`, value: content.id }]);
    }

    return content;
  }
};

const useStoryblokContent: (
  cacheId: string,
  prefetchedValue?: any,
) => UseStoryblokContent<any, ContentSearchParams> = useStoryblokContentFactory<
  any,
  ContentSearchParams
>(factoryParams)

export { useStoryblokContent }
