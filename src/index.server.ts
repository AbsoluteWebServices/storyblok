import { ApiClientExtension, apiClientFactory } from '@absolute-web/vsf-core'
import { ApiContext, ContentSearchParams } from './types'
import StoryblokClient from 'storyblok-js-client'

import { getContent } from './api'

const defaultSettings = {
  headers: {
    cacheTagsHeaderName: 'x-cache-tags'
  }
};

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
      if (response && response.length) {
        const cacheTagsHeaderName = configuration.headers?.cacheTagsHeaderName || defaultSettings.headers.cacheTagsHeaderName;
        const tags = response.map(({ _meta: { id } }) => 'sb_' + id);

        res.header(cacheTagsHeaderName, tags.join(','));
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
