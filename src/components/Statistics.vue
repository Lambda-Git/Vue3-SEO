<template>
  <div class="stais">
    <div class="container">
      <el-row style="margin-bottom: 30px;">
        <el-col :span="6">
          <el-statistic title="今日发文数量" :value="obj_statistics?.today_push_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="昨日发文数量" :value="obj_statistics?.yesterday_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="7日发文数量" :value="obj_statistics?.seven_day_post_count" />
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="getStaisInfo" round><el-icon>
              <Refresh />
            </el-icon>刷新</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 30px;">
        <el-col :span="6">
          <el-statistic title="今日推送数量" :value="obj_statistics?.today_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="昨日推送数量" :value="obj_statistics?.yesterday_push_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日推荐分类的文章" :value="obj_statistics?.today_recommend_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日信用卡分类的文章数量" :value="obj_statistics?.today_credit_card_post_count" />
        </el-col>
      </el-row>
      <el-row style="margin-bottom: 30px;">
        <el-col :span="6">
          <el-statistic title="今日保险分类的文章数量" :value="obj_statistics?.today_insurance_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日理财分类的文章数量" :value="obj_statistics?.today_financial_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日股票分类的文章数量" :value="obj_statistics?.today_stock_post_count" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日贷款分类的文章数量" :value="obj_statistics?.today_loan_post_count" />
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="今日推送明细" name="first">
          <el-table :data="res_data1" style="width: 100%;height: 100%" v-loading="tableLoad" size="large">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="article_url" label="网址" />
            <el-table-column prop="datetime" label="时间" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="昨日推送明细" name="second">
          <el-table :data="res_data2" style="width: 100%;height: 100%" v-loading="tableLoad" size="large">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column prop="article_url" label="网址" />
            <el-table-column prop="datetime" label="时间" />
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import req from '../req.js'

// --------const
const obj_statistics = ref({})
const tableLoad = ref(false)

const res_data1 = ref([])
const res_data2 = ref([])
const activeName = ref('first')

const handleClick = (tab) => {
  getStaisInfo()
}

const getStaisInfo = () => {
  tableLoad.value = true
  req.get('/tan_long/statistics').then(res => {
    obj_statistics.value = res
    res_data1.value = res?.today_push_count_detail?.push_detail || []
    res_data2.value = res?.yesterday_push_count_and_detail?.push_detail || []
    tableLoad.value = false
  })
}

watchEffect(() => {
  getStaisInfo()
})

</script>

<style>
.container {
  border-radius: 8px;
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 40px;
}

.el-statistic__head {
  color: #249eff;
}
</style>