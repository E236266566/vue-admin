import request from '@/utils/request'

const api_pre = `/admin/product`
export const reqSpuList = (page, limit, cate3Id) => {
    return request({
        url: `${api_pre}/${page}/${limit}`,
        method: 'get',
        params: { cate3Id }
    })
}
export const reqBaseSaleAttrList = () => {
    return request({
        url: `${api_pre}/baseSaleAttrList`,
        method: 'get',
    })
}
export const findSpuInfoByKeyword = (keyword) => {
    return request({
        url: `${api_pre}/findSpuInfoByKeyword/${keyword}`,
        method: 'get',
    })
}
export const deleteSpu = (spuId) => {
        return request({
            url: `${api_pre}/deleteSpu/${spuId}`,
            method: 'delete',
        })
    }
    // 
export const findSpuInfoBySpuIdList = (spuIdList) => {
    return request({
        url: `${api_pre}/inner/findSpuInfoBySpuIdList`,
        method: 'post',
        data: spuIdList
    })
}
export const saveSpuInfo = (spuInfo) => {
    return request({
        url: `${api_pre}/saveSpuInfo`,
        method: 'post',
        data: spuInfo
    })
}
export const updateSpuInfo = (spuInfo) => {
    return request({
        url: `${api_pre}/updateSpuInfo`,
        method: 'post',
        data: spuInfo
    })
}
export const reqSpuById = (spuId) => {
    return request({
        url: `${api_pre}/getSpuById/${spuId}`,
        method: 'get',
    })
}
export const reqSpuImageList = (spuId) => {
    return request({
        url: `${api_pre}/spuImageList/${spuId}`,
        method: 'get',
    })
}
export const findBySpuId = (spuId) => {
    return request({
        url: `${api_pre}/findBySpuId/${spuId}`,
        method: 'get',
    })
}