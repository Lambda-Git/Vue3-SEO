<script setup>
import { useRoute } from 'vue-router';
// --------const
const route = useRoute();

</script>

<template>
  <div class="h-full w-full">
    <!--    来一个放logo的地方-->
    <div class="w-full nav_header flex justify-center items-center">
      <img src="../assets/logo.png" style="width: 30px; height: 30px" alt="">
      <span class="text-white pl-1 font-bold">SEO综合管理平台</span>
    </div>

    <div class="nav_nav">
      <el-menu router :default-active="route.path" active-text-color="#229eff" background-color="rgb(30 41 59 )"
        text-color="#fff">
        <el-menu-item index="/urlQuery">
          <el-icon>
            <Share />
          </el-icon>
          <span>域名批量查询</span>
        </el-menu-item>
        <el-menu-item index="/historyQuery">
          <el-icon>
            <Clock />
          </el-icon>
          <span>历史查询筛选</span>
        </el-menu-item>
        <el-menu-item index="/statistics">
          <el-icon>
            <Grid />
          </el-icon>
          <span>统计信息查询</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <el-icon>
            <DocumentCopy />
          </el-icon>
          <span>文章信息查询</span>
        </el-menu-item>
      </el-menu>
    </div>

  </div>
</template>

<style scoped>
.el-menu {
  height: 100% !important;
  border-right: none !important;
}

.el-menu-item {
  justify-content: center !important;
}

.nav_header {
  height: 60px;
  background: rgb(30 41 59);
  border-bottom: 1px solid #6d7e93;
}

.nav_nav {
  height: calc(100% - 60px);
}
</style>