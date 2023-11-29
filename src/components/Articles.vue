<template>
  <div class="article">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keywords" placeholder="关键字" clearable />
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="formInline.category_id" placeholder="文章分类" clearable>
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-divider /> -->
    <el-table :data="res_data" style="width: 100%;" v-loading="tableLoad" size="large">
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="keywords" label="关键字" />
      <el-table-column prop="category_name" label="分类" width="100">
        <template #default="scope">
          <el-tag class="ml-2" type="success">{{ scope.row.category_name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="180">
        <template #default="scope">
          <el-tag class="ml-2" type="">{{ dayjs(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="80">
        <template #default="scope">
          <el-button link type="primary" size="large" @click="handleClick(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="total > 0" style="display: flex;
                                                                  justify-content: center;
                                                                  padding: 20px;"><el-pagination background
        layout="prev, pager, next" :total="total" :page-size="page_size" @current-change="handleCurrentChange" /></div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import req from '../req.js'
import dayjs from "dayjs";

// --------const
const router = useRouter()

const res_data = ref([])
const options = ref([])
const tableLoad = ref(false)

const page = ref(1)
const page_size = ref(10)
const total = ref(0)

const formInline = reactive({
  keywords: '',
  category_id: '',
})

const onSubmit = () => {
  f_query_content(page.value, page_size.value)
}

const handleClick = (row) => {
  localStorage.setItem('info', JSON.stringify(row))
  const { href } = router.resolve({
    path: '/articles-details',
  })
    window.open(href,"_blank")
}

const handleCurrentChange = (val) => {
  f_query_content(val, page_size.value)
}


// 单域名查询
function f_query_content(page, size) {
  tableLoad.value = true
  let params = {
    page,
    size,
    keyword: formInline.keywords === '' ? undefined : formInline.keywords,
    category_id: formInline.category_id === '' ? undefined : formInline.category_id
  }

  // 发送请求
  req.get('/article_api/get', params).then(res => {
    if (res?.article_list) {
      res_data.value = res?.article_list || []
      total.value = res?.total || 0
    } else {
      res_data.value = []
      total.value = 0
    }
    tableLoad.value = false
  })
}

function getCategories() {
  req.get('/article_api/categories').then(res => {
    console.log(res, 'res')
    options.value = res
  })

}

watchEffect(() => {
  getCategories()
  f_query_content(page.value, page_size.value)
})


</script>

<style></style>