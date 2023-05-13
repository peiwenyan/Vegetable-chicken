import { baseDel, post } from '@/api/api'
const baseUrl = '/message'

export function showSysMessage (data) {
  return post(baseUrl + '/ListAllSysMessage', data)
}

export function delNote (data) {
  return baseDel(baseUrl + '/delMessage', data)
}
export function updateNote (data) {
  return post(baseUrl + '/updateMessage', data)
}
// 根据id获取数据
export function getNoteInfo (data) {
  return post(baseUrl + '/getByMessageId', data)
}

export function editNote (data) {
  return post(baseUrl + '/sentMessage', data)
}
