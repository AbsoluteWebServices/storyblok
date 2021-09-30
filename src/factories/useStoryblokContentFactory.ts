import { Ref, computed } from 'vue-demi';
import { UseStoryblokContent, UseStoryblokContentErrors, ContentSearchParams } from '../types';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams
} from '@vue-storefront/core';
import { StoryData } from 'storyblok-js-client'

export interface UseStoryblokContentFactoryParams extends FactoryParams {
  search: (context: Context, params: ContentSearchParams) => Promise<StoryData>;
}

export function useStoryblokContentFactory(
  factoryParams: UseStoryblokContentFactoryParams
) {
  return function useStoryblokContent(id: string, prefetchedValue?: StoryData): UseStoryblokContent {
    const content: Ref<StoryData> = sharedRef(prefetchedValue || null, `useStoryblokContent-content-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useStoryblokContent-loading-${id}`);
    const error: Ref<UseStoryblokContentErrors> = sharedRef({
      search: null
    }, `useStoryblokContent-error-${id}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async(params: ContentSearchParams): Promise<void> => {
      Logger.debug(`useStoryblokContent/${id}/search`, params);

      try {
        loading.value = true;
        content.value = await _factoryParams.search(params);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useStoryblokContent/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      content: computed(() => content.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}
