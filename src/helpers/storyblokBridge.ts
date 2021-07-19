import { parse as qsParse } from 'qs'
import { getCurrentInstance } from 'vue-demi';
declare const window: any

export const storyblokBridge = (
  story: { id: number, content: {}[] },
  events: string[],
  callback: (story: { content: {}[] }) => void
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
    if (story.id !== event.story.id) {
      return
    }
    
    if (event.action === 'input') {
      callback(event.story);
    }
  })
}

export const getStoryblokQueryParams = () => {
  const vm = getCurrentInstance();
  const route = vm.$root.$route as any;
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
