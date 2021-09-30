import { ApiContext, ContentSearchParams } from './types'
import { Logger } from '@vue-storefront/core'
import { StoriesParams } from 'storyblok-js-client'

export const getContent = async (
  { client }: ApiContext,
  { id, slug }: ContentSearchParams,
): Promise<any> => {
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
    const { data } = await client.get(storyPath, params)
    response = data?.story
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      if(error?.response?.status === 404) {
        Logger.warn("Story not found", error)
      } else {
        Logger.error("Can't get data from Storyblok.", error)
      }
    }
  }
  return response
}

export const getStories = async (
  { client }: ApiContext,
  params: StoriesParams,
): Promise<any> => {
  let response = null
  try {
    const { data } = await client.get('cdn/stories', params)
    response = data?.stories
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.log(error?.response);
      if(error?.response?.status === 404) {
        Logger.warn("Stories not found", error)
      } else {
        Logger.error("Can't get data from Storyblok.", error)
      }
    }
  }
  return response
}
