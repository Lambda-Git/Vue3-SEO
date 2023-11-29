import { createRouter, createWebHashHistory } from 'vue-router'

import { store } from './store';  // 导入store

const routes = [
    {
        path: '/',
        redirect: '/urlQuery'
    },
    {
        path: '/login',
        component: () => import('./components/Login.vue')
    },
    {
        path: '/urlQuery',
        component: () => import('./components/UrlQuery.vue')
    },
    {
        path: '/historyQuery',
        component: () => import('./components/HistoryQuery.vue')
    },
    {
        path: '/statistics',
        component: () => import('./components/Statistics.vue')
    },
    {
        path: '/articles',
        component: () => import('./components/Articles.vue')
    },
    {
        path: '/articles-details',
        component: () => import('./components/Articles_Details.vue')
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    const isLogin = store.state.isLogin;
    console.log(isLogin, '====isLogin===')
    if (!isLogin && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});
export default router
