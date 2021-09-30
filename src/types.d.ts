import { StoryblokCache, StoriesParams, StoryData } from 'storyblok-js-client'
import { ComputedRef } from 'vue-demi';

export interface UseStoryblokContentErrors {
  search: Error | null;
}
export interface UseStoryblokContent {
  search: (params: ContentSearchParams) => Promise<void>;
  content: ComputedRef<StoryData>;
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

export interface UseStoriesErrors {
  search: Error | null;
}
export interface UseStories {
  search: (params: StoriesParams) => Promise<void>;
  results: ComputedRef<StoryData[]>;
  loading: ComputedRef<boolean>;
  error: ComputedRef<UseStoriesErrors>;
}
