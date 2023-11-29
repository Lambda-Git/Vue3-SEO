<script setup>
// --------import
import router from './router'
import {onBeforeMount} from 'vue';
import {useStore} from 'vuex'
import {computed, onMounted, ref, watchEffect} from "vue";
import Nav from './components/Nav.vue'
import Header from './components/Header.vue'
import req from './req.js'
// --------const
const store = useStore()
// isLogin
const isLogin = computed(() => store.getters.isLogin)

// --------event
onBeforeMount(() => {
  // 如果 !isLogin 则跳转到登录页面
  if (!isLogin.value) {
    router.push('/login')
  }
})
onMounted(() => {

})
</script>

<template>
  <div class="h-full w-full v-cloak">
    <!--    未登录-->
    <div v-if="!isLogin" class="h-full w-full">
      <router-view></router-view>
    </div>
    <!--    已登录-->
    <div v-else class="h-full w-full flex">
      <!--      左边导航 200px -->
      <el-scrollbar height="100%" class=" " style="width: 200px" view-style="height: 100%">
        <div class="h-full w-full">
          <Nav></Nav>
        </div>
      </el-scrollbar>
      <!--    右边是主体内容-->
      <div class="home_container h-full flex flex-col">
        <!--        头部-->
        <div class="flex justify-center home_header">
          <Header></Header>
        </div>
        <!--        内容-->
        <div class="home_content flex">
          <el-scrollbar height="100%" class="w-full h-full" view-style="height: 100%">
            <router-view></router-view>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}

.home_container {
  width: calc(100% - 200px);
}

.home_header {
  width: 100%;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #fff;
  padding: 5px 20px;
}

.home_content {
  width: 100%;
  padding: 20px;
  height: calc(100% - 60px);
  background: rgb(241 245 249);
}

[v-cloak] {
  display: none;
}
</style>
