import { Ref, ref, computed, onMounted } from 'vue-demi';
import { onSSR, sharedRef } from '@vue-storefront/core';
import { useStoryblokContent } from './useStoryblokContent';
import { storyblokBridge } from '../helpers/storyblokBridge';
import { StoryData } from 'storyblok-js-client'

const useStory = (
  slug: string,
  { skipLoading, prefetchedStory } = { skipLoading: false, prefetchedStory: null }
) => {
  const { loading, content, error, search } = useStoryblokContent(slug, prefetchedStory);
  const storyLoaded: Ref<boolean> = sharedRef(false, `${slug}-storyLoaded`);
  const changedStory: Ref<StoryData> = ref(null);
  const story = computed(() => changedStory.value || content.value);
  const storyContent = computed(() => story.value?.content || null);
  const loadStory = async () => search({ slug });

  if (!storyLoaded.value) {
    storyLoaded.value = skipLoading || Boolean(prefetchedStory);
  }

  if (!storyLoaded.value) {
    onSSR(async () => {
      storyLoaded.value = true;
      await loadStory();
    });
  }

  onMounted(async () => {
    if (!storyLoaded.value) {
      storyLoaded.value = true;
      await loadStory();
    }

    /_storyblok/.test(window.location.search) &&
      storyblokBridge(
        content.value,
        ['input', 'published', 'change'],
        (updatedContent) => (changedStory.value = updatedContent)
      );
  });

  return {
    loading,
    story,
    storyContent,
    error,
    loadStory,
  };
};

export { useStory }
