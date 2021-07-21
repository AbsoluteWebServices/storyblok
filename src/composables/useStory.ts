import { ref, computed, onMounted } from 'vue-demi';
import { onSSR } from '@vue-storefront/core';
import { useStoryblokContent } from './useStoryblokContent';
import { storyblokBridge } from '../helpers/storyblokBridge';

const useStory = (
  slug: string,
  { skipLoading, prefetchedStory } = { skipLoading: false, prefetchedStory: null }
) => {
  const { loading, content, error, search } = useStoryblokContent(slug, prefetchedStory);
  const changedStory = ref(null);
  const story = computed(() => changedStory.value || content.value);
  const storyContent = computed(() => story.value?.content || null);
  const loadStory = async () => search({ slug });

  if (!skipLoading && !prefetchedStory) {
    onSSR(async () => {
      await loadStory();
    });
  }

  onMounted(async () => {
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
