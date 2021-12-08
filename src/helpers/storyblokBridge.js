export const storyblokBridge = (
  content = {},
  events = ['change', 'input'],
  relations = [],
  callback,
) => {
  if (window) {
    // eslint-disable-next-line
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
  }
}
