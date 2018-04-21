import { request, config, server } from 'utils'

const { api } = config
const { user } = api

export function query (params) {
  return request({
    url: user,
    method: 'get',
    data: params,
  })
}

export function create (params) {
  return server.post('/people', params)
}

export function remove (params) {
  return server.delete(`/people/${params}`)
}

export function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
