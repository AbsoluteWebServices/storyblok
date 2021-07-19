import { ref, computed, onMounted } from 'vue-demi';
import { onSSR } from '@vue-storefront/core';
import { useStoryblokContent } from './useStoryblokContent';
import { storyblokBridge } from '../helpers/storyblokBridge';

const useStory = (
  slug: string,
  { skipLoading } = { skipLoading: false }
) => {
  const { loading, content, error, search } = useStoryblokContent(slug);
  const changedStory = ref(null);
  const story = computed(() => changedStory.value || content.value);
  const storyContent = computed(() => story.value?.content || {});
  const loadStory = async () => search({ slug });

  if (!skipLoading) {
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
