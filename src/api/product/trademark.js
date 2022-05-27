//  获取品牌数据模块
import request from '@/utils/request'

export const reqTradeMarkList = (page, limit) => {
        return request({
            url: `/admin/product/baseTrademark/${page}/${limit}`,
            method: 'get'
        })
    }
    // 新增、修改
export const reqAddOrReqUpdate = (tradeMark) => {
        if (tradeMark.id) {
            return request({
                url: '/admin/product/baseTrademark/update',
                method: 'put',
                data: tradeMark
            })
        } else {
            return request({
                url: '/admin/product/baseTrademark/save',
                method: 'post',
                data: tradeMark
            })
        }
    }
    // 删除
export const deleteTradeById = (id) => {
        return request({
            url: `/admin/product/baseTrademark/remove/${id}`,
            method: 'delete',
        })
    }
    // 搜素
export const searchTradeById = (id) => {
        return request({
            url: `/admin/product/baseTrademark/get/${id}`,
            method: 'get',
        })

    }
    // 搜素
export const searchTradeByKeyword = (keyword) => {
    return request({
        url: `/admin/product/baseTrademark/findBaseTrademarkByKeyword/${keyword}}`,
        method: 'get',
    })

}
export const reqTrademarkList = () => {
    return request({
        url: `/admin/product/baseTrademark/getTrademarkList`,
        method: 'get',
    })

}