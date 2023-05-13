import { baseDel, post } from '@/api/api'
const baseUrl = '/policy'

/*
政策增删改查
*/
export function listAllPolicy (data) {
  return post(baseUrl + '/listAllPolicy', data)
}

export function listPolicyData (data) {
  return post(baseUrl + '/data/list', data)
}

export function getPolInfo (data) {
  return post(baseUrl + '/getPolInfo', data)
}

export function addPolicy (ids) {
  return post(baseUrl + '/addPolicyInfo', ids)
}

export function updatePolicyInfo (data) {
  return post(baseUrl + '/updatePolicyInfo', data)
}

export function delPolicy (ids) {
  return baseDel(baseUrl + '/delPolicy', ids)
}
/*
标签增删改查
*/
export function listTag (data) {
  return post(baseUrl + '/listTag', data)
}
// 根据热度量排序展示标签
export function listTagByViews (data) {
  return post(baseUrl + '/listTagByViews', data)
}

export function listByViews (data) {
  return post(baseUrl + '/listByViews', data)
}
export function addTag (data) {
  return post(baseUrl + '/addPolicyTag', data)
}

export function updateTag (data) {
  return post(baseUrl + '/updateTag', data)
}

export function delTags (ids) {
  return baseDel('/policy/delTags', ids)
}

export function listTrending (data) {
  return post(baseUrl + '/listTrending', data)
}

export function listGraphData (data) {
  return post('/neo' + '/listAllGraData', data)
}
