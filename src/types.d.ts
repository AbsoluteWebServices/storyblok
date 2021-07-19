import { StoryblokCache } from 'storyblok-js-client'
import { ComputedRef } from 'vue-demi';

export interface UseStoryblokContentErrors {
  search: Error;
}
export interface UseStoryblokContent<CONTENT, CONTENT_SEARCH_PARAMS> {
  search: (params: CONTENT_SEARCH_PARAMS) => Promise<void>;
  content: ComputedRef<CONTENT>;
  loading: ComputedRef<boolean>;
  error: ComputedRef<UseStoryblokContentErrors>;
}

export interface ContentSearchParams {
  token?: string
  cacheProvider?: string
  cache?: StoryblokCache
  slug?: string
  id?: string
}
export interface ApiContext {
  client: any
  config: ContentSearchParams
}
export interface Component {
  component: string
}
