import { Context } from '@vue-storefront/core'
import { useCache } from '@absolute-web/vsf-cache';
import { ContentSearchParams, UseStoryblokContent } from '../types'
import { UseStoryblokContentFactoryParams, useStoryblokContentFactory } from 'factories/useStoryblokContentFactory'
import { getStoryblokQueryParams } from '../helpers/storyblokBridge'

const factoryParams: UseStoryblokContentFactoryParams = {
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
) => UseStoryblokContent = useStoryblokContentFactory(factoryParams)

export { useStoryblokContent }
