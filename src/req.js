// req.js
import request from 'superagent';
import router from './router';  // 确保你已经设置了路由
import {store} from './store';  // 导入store
import globalConfig from "./globalConfig.js";

// 处理错误 401 403
function handleError(err) {
    if (err.response && err.response.status === 401) {
        // 设置登录状态
        store.commit('setIsLogin', false);
        // 清除token
        store.commit('setToken', '');
        // Token失效，重定向到登录页面
        router.push('/login');
    }
    // 403
    else if (err.response && err.response.status === 403) {
        // 设置登录状态
        store.commit('setIsLogin', false);
        // 清除token
        store.commit('setToken', '');
        // Token失效，重定向到登录页面
        router.push('/login');
    } else {
        throw err;
    }
}

const req = {
    get: async (url, params) => {
        url = globalConfig.urlDomain.httpUrl + url;
        try {
            const res = await request.get(url).query(params).set('Authorization', 'Bearer ' + store.getters.token);
            return res.body;
        } catch (err) {
            handleError(err);
        }
    },
    post: async (url, data) => {
        url = globalConfig.urlDomain.httpUrl + url;
        try {
            const res = await request.post(url).send(data).set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + store.getters.token);
            return res.body;
        } catch (err) {
            handleError(err);
        }
    },
};

export default req;
