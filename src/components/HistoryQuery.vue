<template>
  <div style="margin-bottom: 5px;">
    <span class="labels">查询时间:</span>
    <el-config-provider :locale="zhCn">
      <el-date-picker v-model="search_time" type="daterange" unlink-panels range-separator="-"
        start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="large" />
    </el-config-provider>
  </div>
  <span class="labels">权重区间:</span>
  <el-select v-model="m_br_min" style="width:120px ;" placeholder="最小权重" size="large" @change="onMinChange">
    <el-option v-for="item in optionsStart" :key="item.value" :label="item.value" :value="item.value"
      :disabled="item.disabled" />
  </el-select>
  <span> - </span>
  <el-select v-model="m_br_max" style="width:120px ;" placeholder="最大权重" size="large" @change="onMaxChange">
    <el-option v-for="item in optionsEnd" :key="item.value" :label="item.value" :value="item.value"
      :disabled="item.disabled" />
  </el-select>

  <span class="labels rights">词量区间:</span>
  <el-input-number v-model="pc_nums_min" :min="0" placeholder="最小词量" controls-position="right" size="large" :step="10"
    :precision="0" @change="handleChange" />
  <span> - </span>
  <el-input-number v-model="pc_nums_max" :min="pc_nums_min" placeholder="最大词量" controls-position="right" size="large"
    :step="10" :precision="0" @change="handleChange" />

  <el-button style="margin-left: 50px;" type="primary" size="large"
    @click="f_query_content(page, page_size)">查询</el-button>

  <div class="w-full" style="margin-top: 20px;height: calc(100% - 100px - 20px)">
    <el-table :data="res_data" style="width: 100%;" v-loading="tableLoad" size="large">
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
    <div v-if="total > 0" style="display: flex;
                            justify-content: center;
                            padding: 20px;"><el-pagination background layout="prev, pager, next" :total="total"
        :page-size="page_size" @current-change="handleCurrentChange" /></div>
  </div>
</template>

<script setup>
import { ref,watchEffect } from 'vue'
import req from '../req.js'
import dayjs from "dayjs";
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const res_data = ref([])

const page = ref(1)
const page_size = ref(20)
const total = ref(0)
const tableLoad = ref(false)

const search_time = ref('')
const m_br_min = ref(undefined)
const m_br_max = ref(undefined)
const pc_nums_min = ref(undefined)
const pc_nums_max = ref(undefined)

const optionsStart = ref([
  { value: 0, disabled: false },
  { value: 1, disabled: false },
  { value: 2, disabled: false },
  { value: 3, disabled: false },
  { value: 4, disabled: false },
  { value: 5, disabled: false },
  { value: 6, disabled: false },
  { value: 7, disabled: false },
  { value: 8, disabled: false },
  { value: 9, disabled: false },
])

const optionsEnd = ref([
  { value: 0, disabled: false },
  { value: 1, disabled: false },
  { value: 2, disabled: false },
  { value: 3, disabled: false },
  { value: 4, disabled: false },
  { value: 5, disabled: false },
  { value: 6, disabled: false },
  { value: 7, disabled: false },
  { value: 8, disabled: false },
  { value: 9, disabled: false },
])

const shortcuts = [
  {
    text: '近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '近一月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '近三周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

const onMinChange = (value) => {
  if (m_br_max.value !== null && m_br_max.value < value) {
    m_br_max.value = null
  }
  optionsEnd.value.forEach(item => {
    if (item.value < value) {
      item.disabled = true
    } else {
      item.disabled = false
    }
  })
}

const onMaxChange = (value) => {
  console.log(value, 'value')
}

const handleCurrentChange = (val) => {
  f_query_content(val, page_size.value)
}

function f_query_content(page_, page_size_) {
  tableLoad.value = true

  let params = {
    pc_min_time: search_time.value === null ? undefined : search_time._rawValue[0] === undefined ? undefined : dayjs(search_time._rawValue[0]).format("YYYY-MM-DD"),
    pc_max_time: search_time.value === null ? undefined : search_time._rawValue[1] === undefined ? undefined : dayjs(search_time._rawValue[1]).format("YYYY-MM-DD"),
    pc_br_min: m_br_min.value === null ? undefined : m_br_min.value,
    pc_br_max: m_br_max.value === null ? undefined : m_br_max.value,
    pc_nums_min: pc_nums_min.value === null ? undefined : pc_nums_min.value,
    pc_nums_max: pc_nums_max.value === null ? undefined : pc_nums_max.value,
    page: page_,
    page_size: page_size_
  }

  // 测试数据
  // params = {
  //   "pc_min_time": "2019-11-27",
  //   "pc_max_time": "2023-11-08",
  //   "pc_br_min": 0,
  //   "pc_br_max": 10000,
  //   "pc_nums_min": 0,
  //   "pc_nums_max": 10000,
  //   "page": 1,
  //   "page_size": 20
  // }

  // 发送请求
  req.post('/url_query/history', params).then(res => {
    console.log(res)
    if (res?.results) {
      res_data.value = res?.results || []
      total.value = res?.total_count || 0
    } else {
      res_data.value = []
      total.value = 0
    }
    tableLoad.value = false
  })

}

watchEffect(() => {
  f_query_content(page.value, page_size.value)
})



</script>
<style scoped>
.labels {
  margin-right: 10px;
}

.rights {
  margin-left: 20px;
}
</style>