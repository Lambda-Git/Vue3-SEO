<template>
  <div class="article-details">
    <div class="title">{{ res_data_details.title }}</div>
    <div class="keywords">{{ res_data_details.keywords }}</div>
    <div class="create_time">{{ dayjs(res_data_details.create_time).format('YYYY-MM-DD HH:mm:ss') }}</div>
    <div class="content">{{ res_data_details.content }}</div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import dayjs from "dayjs";

// --------const

const res_data_details = ref({
  title: '',
  create_time: "",
  content: ''
})

watchEffect(() => {
  res_data_details.value = JSON.parse(localStorage.getItem("info"))
})


</script>

<style>
.title {
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  padding: 20px;
}
.keywords {
  text-align: center;
  
}
.create_time {
  text-align: center;
  color: #7b6969;
}

.content {
  padding: 30px 80px;
  line-height: 33px;
  letter-spacing: 2px;
  color: #333;
  text-indent: 35px;
}
</style>