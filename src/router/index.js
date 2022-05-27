import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
    {
        path: '/product',
        component: Layout,
        name: 'Product',
        meta: { title: '商品管理', icon: 'el-icon-s-goods' },
        children: [{
                path: '/trademark',
                name: 'Trademark',
                component: () =>
                    import ('@/views/product/trademark'),
                meta: { title: '品牌管理', }
            },
            {
                path: '/attribute',
                name: 'Attribute',
                component: () =>
                    import ('@/views/product/attribute'),
                meta: { title: '属性管理' }
            },
            {
                path: '/spu',
                name: 'Spu',
                component: () =>
                    import ('@/views/product/spu'),
                meta: { title: 'SPU管理' }
            },
            {
                path: '/sku',
                name: 'Sku',
                component: () =>
                    import ('@/views/product/sku'),
                meta: { title: 'SKU管理' }
            },
        ]
    },
    {
        path: '/rights',
        component: Layout,
        name: 'Rights',
        meta: { title: '权限管理', icon: 'el-icon-s-tools' },
        children: [{
                path: '/userManage',
                name: 'UsersManage',
                component: () =>
                    import ('@/views/rights/UsersManage'),
                meta: { title: '用户管理', }
            },
            {
                path: '/roleManage',
                name: 'RolesManage',
                component: () =>
                    import ('@/views/rights/RolesManage'),
                meta: { title: '角色管理' }
            },
            {
                path: '/menuManage',
                name: 'MenuManage',
                component: () =>
                    import ('@/views/rights/MenuManage'),
                meta: { title: '菜单管理' }
            },
        ]
    },


    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router