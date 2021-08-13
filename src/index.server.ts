import { ApiClientExtension, apiClientFactory } from '@vue-storefront/core'
import { ApiContext, ContentSearchParams } from './types'
import StoryblokClient from 'storyblok-js-client'

import { getContent } from './api'

const setup = ({ token, cacheProvider }: ContentSearchParams): ApiContext => {
  return {
    client: StoryblokClient,
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
  },
  extensions: [cacheExtension],
} as any)

export { createApiClient }

