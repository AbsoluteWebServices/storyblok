export const storyblokBridge = (
  content = {},
  events = ['change', 'input'],
  relations = [],
  callback,
  bridgeUrl = '',
) => {
  if (window) {
    const loadStoryblok = () => {
      const instance = new StoryblokBridge({
        resolveRelations: relations,
      })
      instance.on(events, (payload) => {
        if (!payload.story || payload.story.id !== content._meta.id) {
          return
        }

        callback({
          ...payload.story.content,
          _meta: payload.story,
        })
      })
    };
    // eslint-disable-next-line
    if (!window.StoryblokBridge) {
      const existingScript = document.getElementById('storyblok_script');
      if (!existingScript) {
        const js = document.createElement('script');
        js.id = 'storyblok_script';
        js.async = true;
        js.src = bridgeUrl;
        js.onload = loadStoryblok;
        document.body.appendChild(js);
      }
    } else {
      loadStoryblok();
    }
  }
}
