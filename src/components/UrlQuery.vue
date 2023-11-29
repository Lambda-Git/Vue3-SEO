<template>
  <div class="flex flex-col w-full h-full">
    <!-- 多域名查询 -->
    <div class="flex w-full" style="height: 100px">
      <el-input v-model="query_content" rows="5"  type="textarea"
        placeholder="批量输入域名（自动过滤重复域名）注意每行只能输入一个域名" />
      <el-button type="primary" @click="f_query_content" class="ml-2" style="height: 100%">查询</el-button>
    </div>
    <!-- 单域名查询 -->
    <!-- <div class="flex w-full">
      <el-input v-model="query_content" size="large" placeholder="请输入域名（注意只能输入一个域名" />
      <el-button type="primary" @click="f_query_content" class="ml-2" style="height: 100%">查询</el-button>
    </div> -->
    <div class="w-full" style="margin-top: 20px;height: calc(100% - 100px - 20px)">
      <el-table :data="res_data" style="width: 100%;height: 100%" v-loading="tableLoad" size="large">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="domain" label="域名" />
        <el-table-column prop="pc_br_max" label="最大权重" width="120" />
        <el-table-column prop="pc_nums_max" label="最大词量" width="120" />
        <el-table-column prop="pc_max_time" label="最大时间" width="120" />
        <el-table-column prop="m_br_max" label="移动最大权重" width="120">
          <template #default="scope">
            <div>{{ scope.row.m_br_max }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="m_nums_max" label="移动最大词量" width="120" />
        <el-table-column prop="m_max_time" label="移动最大时间" width="120" />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from "vue";
import { useStore } from 'vuex'
import req from '../req.js'

// --------const
const query_content = ref('')
const res_data = ref([])
const tableLoad = ref(false)


const rowClass = ref([
  'bg-blue-200',
  'bg-blue-200',
])

// 单域名查询
function f_query_content() {
  tableLoad.value = true // loading 效果
  
  let domain = query_content.value.trim()
  console.log('查询对象', domain)

  // 发送请求
  req.get('/url_query/searchByDomains', { domain }).then(res => {
    console.log(res)
    if (res?.ret === true) {
      res_data.value = res?.data || []
    } else {
      res_data.value = []
    }
    tableLoad.value = false
  })

}


// --------function  多域名查询
function f_query_content_() {
  // tableLoad.value = true // loading 效果
  let domain_list = query_content.value.split('\n')
  // 删除空对象
  domain_list = domain_list.filter(item => item)
  // 删除每个对象的首尾空格
  domain_list = domain_list.map(item => item.trim())
  // 删除重复对象
  domain_list = Array.from(new Set(domain_list))
  console.log('查询对象', domain_list)
  // 清空历史记录
  res_data.value = []
  rowClass.value = []


  // 发送请求
  req.get('/url_query/searchByDomains', { domain: domain_list }).then(res => {
    console.log(res)
  })

  // 放到res_data里
  // domain_list.forEach((item, index) => {
  //   res_data.value.push({
  //     '索引': index + 1,
  //     '域名': item,
  //     '最大权重': 0,
  //     '最大词量': 0,
  //     '最大时间': '',
  //     '移动最大权重': 0,
  //     '移动最大词量': 0,
  //     '移动最大时间': '',
  //   })
  // })
  // 有几个域名就给rowClass加几个class
  // for (let i = 0; i < domain_list.length; i++) {
  //   rowClass.value.push('bg-blue-200')
  // }
  // 并发查询
  // let index = 0
  // domain_list.forEach(url => {
  //   ws.send(JSON.stringify({
  //     '索引': index,
  //     'url': url
  //   }))
  //   index++
  // })
  for (let i = 0; i < 10; i++) {
    res_data.value.push({
      index: i,
      search_time: '2023-11-02',
      domain: 'www.baidu.com',
      pc_br_max: 2321212,
      pc_nums_max: 2321212,
      pc_max_time: 90,
      m_br_max: 2321212,
      m_nums_max: 2321212,
      m_max_time: 2321212,
    })
  }
}

function get_class(obj) {
  return rowClass.value[obj.rowIndex]
}


</script>

<style>
textarea {
  max-height: 100px !important;
}
</style>