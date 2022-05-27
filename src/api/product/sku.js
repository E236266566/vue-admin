import request from '@/utils/request'

// 下架
export const cancelSale = (skuId) => {
        return request({
            url: `/admin/product/cancelSale/${skuId}`,
            method: 'get',
        })
    }
    // 上架
export const reqOnSale = (skuId) => {
    return request({
        url: `/admin/product/onSale/${skuId}`,
        method: 'get',
    })
}

export const getSkuById = (skuId) => {
    return request({
        url: `/admin/product/getSkuById/${skuId}`,
        method: 'get',
    })
}
export const findSkuInfoByKeyword = (keyword) => {
    return request({
        url: `/admin/product/inner/findSkuInfoByKeyword/${keyword}`,
        method: 'get',
    })
}
export const reqSkuList = (page, limit) => {
    return request({
        url: `/admin/product/list/${page}/${limit}`,
        method: 'get',
    })
}


export const reqSpuSaleAttrList = (spuId) => {
        return request({
            url: `/admin/product/spuSaleAttrList/${spuId}`,
            method: 'get',
        })
    }
    // POST
export const findSkuInfoBySkuIdList = (skuIdList) => {
    return request({
        url: `/admin/product/inner/findSkuInfoBySkuIdList`,
        method: 'post',
        data: skuIdList
    })
}
export const saveSkuInfo = (skuInfo) => {
    return request({
        url: `/admin/product/saveSkuInfo`,
        method: 'post',
        data: skuInfo
    })
}
export const updateSkuInfo = (skuInfo) => {
        return request({
            url: `/admin/product/updateSkuInfo`,
            method: 'post',
            data: skuInfo
        })
    }
    // DELETE
export const deleteSku = (skuId) => {
    return request({
        url: `/admin/product/deleteSku/${skuId}`,
        method: 'delete',
    })
}