import { Ref, computed } from 'vue-demi';
import { UseStories, UseStoriesErrors } from '../types';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams
} from '@absolute-web/vsf-core';
import { StoriesParams, StoryData } from 'storyblok-js-client'

export interface UseStoriesFactoryParams extends FactoryParams {
  search: (context: Context, params: StoriesParams) => Promise<StoryData[]>;
}

export function useStoriesFactory(
  factoryParams: UseStoriesFactoryParams
) {
  return function useStories(id: string): UseStories {
    const results: Ref<StoryData[]> = sharedRef([], `useStories-${id}-results`);
    const loading: Ref<boolean> = sharedRef(false, `useStories-${id}-loading`);
    const error: Ref<UseStoriesErrors> = sharedRef({
      search: null
    }, `useStories-${id}-error`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async(params: StoriesParams): Promise<void> => {
      Logger.debug(`useStories/${id}/search`, params);

      try {
        loading.value = true;
        results.value = await _factoryParams.search(params);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useStories/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      results: computed(() => results.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
