import { Ref, computed } from 'vue-demi';
import { UseStoryblokContent, UseStoryblokContentErrors } from '../types';
import {
  Context,
  sharedRef,
  Logger,
  configureFactoryParams, FactoryParams
} from '@vue-storefront/core';

export interface UseStoryblokContentFactoryParams<
  CONTENT,
  CONTENT_SEARCH_PARAMS,
> extends FactoryParams {
  search: (context: Context, params: CONTENT_SEARCH_PARAMS) => Promise<CONTENT>;
}

export function useStoryblokContentFactory<CONTENT, CONTENT_SEARCH_PARAMS>(
  factoryParams: UseStoryblokContentFactoryParams<CONTENT, CONTENT_SEARCH_PARAMS>
) {
  return function useStoryblokContent(id: string): UseStoryblokContent<CONTENT, CONTENT_SEARCH_PARAMS> {
    const content: Ref<CONTENT> = sharedRef([], `useStoryblokContent-content-${id}`);
    const loading: Ref<boolean> = sharedRef(false, `useStoryblokContent-loading-${id}`);
    const error: Ref<UseStoryblokContentErrors> = sharedRef({
      search: null
    }, `useStoryblokContent-error-${id}`);
    // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
    const _factoryParams = configureFactoryParams(factoryParams);

    const search = async(params: CONTENT_SEARCH_PARAMS): Promise<void> => {
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
