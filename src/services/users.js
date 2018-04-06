import { server } from 'utils'

export function query (params) {
  return server.get('/people', { params })
}
