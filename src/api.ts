import { ApiContext, ApiResponse, ContentSearchParams } from './types'
import { Logger } from '@absolute-web/vsf-core'
import { nanoid } from 'nanoid'
import { errorMessage } from './helpers/constants'
import { extractNestedComponents } from './helpers'

export const getContent = async (
  { client, config }: ApiContext,
  {
    id,
    url,
    custom,
    cache = true,
    locale,
    relations,
    version = 'published',
  }: ContentSearchParams,
): Promise<[] | void | {}> => {
  if (!url && !id && !custom) {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.EMPTY_ID}`)
  }
  const { token, cacheProvider } = config
  const Storyblok = new client({
    accessToken: token,
    cache: {
      clear: 'auto',
      type: cacheProvider,
    },
  })
  const resolveCustomSearch = custom || {}
  if (!id && custom && typeof custom !== 'object') {
    return Logger.warn(`${errorMessage.GENERAL} ${errorMessage.WRONG_CUSTOM}`)
  }
  try {
    const { data }: { data: ApiResponse } = await Storyblok.get(
      `cdn/stories/${id || url || ''}`,
      {
        ...((!cache ? { cv: nanoid() } : {}) as any),
        ...resolveCustomSearch,
        resolve_relations: relations,
        language: locale,
        version,
      },
    )
    return data.stories
      ? data.stories.map((story) => extractNestedComponents(story))
      : extractNestedComponents(data.story)
  } catch (error) {
    Logger.warn(`${errorMessage.GENERAL}`, error)
    return []
  }
}
