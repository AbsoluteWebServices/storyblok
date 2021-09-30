import { IntegrationContext } from '@vue-storefront/core'
import { ContentSearchParams } from './types'
import { StoriesParams, StoryData } from 'storyblok-js-client'

declare module '@vue-storefront/core' {
  export interface Context {
    $sb: IntegrationContext<
      any,
      ContentSearchParams,
      {
        getContent: (params: ContentSearchParams) => Promise<StoryData>
        getStories: (params: StoriesParams) => Promise<StoryData[]>
      }
    >
  }
}
