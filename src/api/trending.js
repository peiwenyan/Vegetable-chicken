import { post } from '@/api/api'
const baseUrl = '/trending'

/**
 * 删除热搜
 * @param id
 * @returns {AxiosPromise}
 */
export function delTrending (id) {
  return post(baseUrl + '/delete', { id })
}
