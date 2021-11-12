import { parse as qsParse } from 'qs'
import { getCurrentInstance } from 'vue-demi';
import { StoryData } from 'storyblok-js-client'
declare const window: any

export const storyblokBridge = (
  story: StoryData,
  events: string[],
  callback: (story: StoryData) => void
): any => {
  if (!window.storyblok || !Array.isArray(events) || !events.length || !story || !story.id) {
    return
  }
  const { id } = getStoryblokQueryParams()

  if(id !== '' + story.id) {
    return
  }

  window.storyblok.init()
  window.storyblok.on(events, (event) => {
    if (event.action !== 'input' || !event.story || event.story.id !== story.id) {
      return
    }

    callback(event.story);
  })
}

export const getStoryblokQueryParams = (_route = null) => {
  let route = _route;
  if (!route) {
    const vm = getCurrentInstance() as any;
    route = vm.$root.$route as any;
  }
  const queryString = route.fullPath.replace(route.path, '')
  const { _storyblok: id, _storyblok_c: c, _storyblok_tk: storyblok = {} } = qsParse(queryString, { ignoreQueryPrefix: true }) as any
  const { space_id: spaceId, timestamp, token } = storyblok

  let [, ...fullSlug] = route.path

  if (!fullSlug) {
    fullSlug = 'home'
  }

  return {
    c,
    id,
    fullSlug,
    spaceId,
    timestamp,
    token
  }
}
