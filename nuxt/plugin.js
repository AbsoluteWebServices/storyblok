import { integrationPlugin } from '@absolute-web/vsf-core'

export default integrationPlugin(({ integration }) => {
  integration.configure('sb', { ...<%= serialize(options) %> })
})
