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
// function---------
const logout = () => {
  req.get('/user/logout/').then(res => {
    store.commit('setToken', '')
    store.commit('setIsLogin', false)
    router.push('/login')
  })
}
</script>

<template>
  <div class=" w-full h-full flex" style="flex-direction: row-reverse">
    <!--    最右边一个头像-->
    <div class="flex items-center justify-center">
      <el-dropdown>
        <span class="el-dropdown-link">
          <div class="flex justify-center items-center">
            <img src="../assets/logo.png" style="width: 30px; height: 30px" alt="">
            <el-icon>
              <ArrowDownBold />
            </el-icon>
          </div>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped></style>