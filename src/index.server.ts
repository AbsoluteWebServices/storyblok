import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core'
import { ApiContext, ContentSearchParams } from './types'
import StoryblokClient, { StoryblokCache } from 'storyblok-js-client'

import { getContent, getStories } from './api'

const setup = ({ token, cacheProvider }: ContentSearchParams): ApiContext => {
  return {
    client: new StoryblokClient({
      accessToken: token,
      cache: {
        clear: 'auto',
        type: cacheProvider,
      } as StoryblokCache,
    }),
    config: {
      token,
      cacheProvider,
    },
  }
}


const cacheExtension: ApiClientExtension = {
  name: 'cacheExtension',
  hooks: (req, res) => ({
    afterCall: ({ configuration, response }) => {
      if (response && response.id) {
        const cacheTagsHeaderName = configuration.headers?.cacheTagsHeaderName || 'x-cache-tags';

        res.header(cacheTagsHeaderName, 'sb_' + response.id);
      }
      return response;
    }
  }),
};

const { createApiClient } = apiClientFactory({
  onCreate: setup,
  api: {
    getContent,
    getStories,
  },
  extensions: [cacheExtension],
} as any)

export { createApiClient }

