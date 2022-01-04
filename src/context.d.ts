import { IntegrationContext } from '@absolute-web/vsf-core'
import { ContentSearchParams } from './types'

declare module '@absolute-web/vsf-core' {
  export interface Context {
    $sb: IntegrationContext<
      any,
      ContentSearchParams,
      {
        getContent: (params: ContentSearchParams) => Promise<[] | void | {}>
      }
    >
  }
}
