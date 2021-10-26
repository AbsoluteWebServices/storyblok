import { IntegrationContext } from '@absolute-web/vsf-core'
import { ContentSearchParams } from './types'
import { StoriesParams, StoryData } from 'storyblok-js-client'

declare module '@absolute-web/vsf-core' {
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
