import { ApiContext, ContentSearchParams } from './types'
import { Logger } from '@vue-storefront/core'

export const getContent = async (
  { client, config }: ApiContext,
  { id, slug, throwErrors }: ContentSearchParams,
): Promise<any> => {
  const { token, cacheProvider } = config
  const Storyblok = new client({
    accessToken: token,
    cache: {
      clear: 'auto',
      type: cacheProvider,
    },
  })
  let response = null
  try {
    let storyPath = 'cdn/stories/'
    let params = {}
    if (id) {
      storyPath += id
      params = {
        version: 'draft'
      }
    } else {
      storyPath += slug
    }
    const { data } = await Storyblok.get(storyPath, params)
    response = data?.story
  } catch (error) {
    if (throwErrors) {
      if(error?.response?.status === 404) {
        Logger.warn("Story not found", error)
      } else {
        Logger.error("Can't get data from Storyblok.", error)
      }
    }
  }
  return response
}
