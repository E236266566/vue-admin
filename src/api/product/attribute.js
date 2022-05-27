import request from '@/utils/request'

export const getCategory1 = () => {
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}
export const getCategory2 = (cate1Id) => {
  return request({
    url: `/admin/product/getCategory2/${cate1Id}`,
    method: 'get'
  })
}
export const getCategory3 = (cate2Id) => {
  return request({
    url: `/admin/product/getCategory3/${cate2Id}`,
    method: 'get'
  })
}
export const getAttrInfoList = (cate1Id, cate2Id, cate3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${cate1Id}/${cate2Id}/${cate3Id}`,
    method: 'get'
  })
}
export const attrDeleteById = (attrId) => {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
export const getAttrValueList = (attrId) => {
  return request({
    url: `/admin/product/getAttrValueList/${attrId}`,
    method: 'get'
  })
}
export const setAttrInfo = (attrInfo) => {
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data: attrInfo
  })
}
export const findBaseCate3ByCate3IdList = (cate3IdList) => {
  return request({
    url: `/admin/product/inner/findBaseCategory3ByCategory3IdList`,
    method: 'post',
    data: cate3IdList
  })
}
// 删除分类
export const removeCategory1 = (cate1Id) => {
  return request({
    url: `/admin/product/removeCategory1/${cate1Id}`,
    method: 'delete'
  })
}
export const removeCategory2 = (cate2Id) => {
  return request({
    url: `/admin/product/removeCategory2/${cate2Id}`,
    method: 'delete'
  })
}
export const removeCategory3 = (cate3Id) => {
  return request({
    url: `/admin/product/removeCategory3/${cate3Id}`,
    method: 'delete'
  })
}
// 新增分类
export const saveCategory1 = (baseCategory1) => {
  return request({
    url: `/admin/product/saveCategory1`,
    method: 'post',
    data: baseCategory1
  })
}
export const saveCategory2 = (baseCategory2) => {
  return request({
    url: `/admin/product/saveCategory2`,
    method: 'post',
    data: baseCategory1
  })
}
export const saveCategory3 = (baseCategory3) => {
  return request({
    url: `/admin/product/saveCategory3`,
    method: 'post',
    data: baseCategory1
  })
}
// 修改分类
export const updateeCategory1 = (baseCategory1) => {
  return request({
    url: `/admin/product/updateeCategory1`,
    method: 'put',
    data: baseCategory1
  })
}
export const updateeCategory2 = (baseCategory2) => {
  return request({
    url: `/admin/product/updateeCategory2`,
    method: 'put',
    data: baseCategory1
  })
}
export const updateeCategory3 = (baseCategory3) => {
  return request({
    url: `/admin/product/updateeCategory3`,
    method: 'put',
    data: baseCategory1
  })
}
