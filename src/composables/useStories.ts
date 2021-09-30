import { Context } from '@vue-storefront/core'
import { useCache } from '@absolute-web/vsf-cache';
import { UseStories } from '../types'
import { UseStoriesFactoryParams, useStoriesFactory } from 'factories/useStoriesFactory'
import { StoriesParams, StoryData } from 'storyblok-js-client'

const factoryParams: UseStoriesFactoryParams = {
  provide() {
    return {
      cache: useCache(),
    };
  },

  search: async (
    context: Context,
    params: StoriesParams,
  ): Promise<StoryData[]> => {
    const results = await context.$sb.api.getStories(params);

    if (results && results.length) {
      for (const content of results) {
        context.cache.addTags([{ prefix: `sb_`, value: content.id }]);
      }
    }

    return results;
  }
};

const useStories: (
  cacheId: string,
) => UseStories = useStoriesFactory(factoryParams)

export { useStories }
