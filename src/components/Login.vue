<script setup>
// import---------
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import req from '../req.js'
// const---------
const router = useRouter()
const store = useStore()
const username = ref('')
const password = ref('')

// function---------
const login = () => {
  // 判断用户名和密码是否为空 用ElMessage
  if (username.value === '' || password.value === '') {
    ElMessage.error('用户名和密码不能为空')
    return
  }
  //  本地测试
  // store.commit('setToken', '1212123131321321312')
  // store.commit('setIsLogin', true)
  // router.push('/')

  // 发送请求
  req.post('/user/login/', { username: username.value, password: password.value }).then(res => {
    if (res?.access_token) {
      ElMessage({
        message: '登录成功！',
        type: 'success',
      })
      setTimeout(function () {
        store.commit('setToken', res?.access_token)
        store.commit('setIsLogin', true)
        router.push('/')
      }, 1000);
    } else {
      ElMessage.error('用户名或密码错误!')
    }
  })
}


</script>

<template>
  <div class="w-full h-full flex justify-center items-center" style="background: black;">
    <!--    用element搞一个登录页面, 用户名和密码, 不允许空用户名和密码-->
    <div class="flex-col">
      <h1 class="text-2xl text-center">SEO综合管理平台</h1>
      <div class="flex justify-between items-center mt-5">
        <span>账号:</span>
        <el-input class="ml-2" v-model="username" style="width: 300px"></el-input>
      </div>
      <div class="flex  justify-between items-center mt-5">
        <span>密码:</span>
        <el-input class="ml-2" type="password" show-password v-model="password" style="width: 300px"></el-input>
      </div>
      <div class="flex justify-center items-center mt-5">
        <el-button class="btn" @click="login" size="large" type="primary">登录</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.flex-col {
  width: 550px;
  height: 400px;
  display: flex;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, .7),
      rgba(255, 255, 255, .5),
      rgba(255, 255, 255, .4));
  /* 使背景模糊化 */
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px #a29bfe;
}

.btn {
  width: 150px;
}
</style>
