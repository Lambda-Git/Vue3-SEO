import {createStore} from 'vuex'

export const store = createStore({
    state() {
        return {
            // 是否登录
            isLogin: false,
            token: '',
        }
    },
    mutations: {
        // 设置登录状态
        setIsLogin(state, isLogin) {
            // 将登录状态存入localStorage
            localStorage.setItem('isLogin', isLogin)
            state.isLogin = isLogin
        },
        // 设置token
        setToken(state, token) {
            // 将token存入localStorage
            localStorage.setItem('token', token)
            state.token = token
        },
    },
    getters: {
        // 取token的时候，直接从localStorage中取
        token(state) {
            if (!state.token) {
                state.token = localStorage.getItem('token')
            }
            return state.token
        },
        // 取isLogin的时候，直接从localStorage中取
        isLogin(state) {
            if (!state.isLogin) {
                // 变成布尔值
                if (localStorage.getItem('isLogin') === 'false') {
                    state.isLogin = false
                } else if (localStorage.getItem('isLogin') === 'true') {
                    state.isLogin = true
                }
            }
            return state.isLogin
        }
    }
})
