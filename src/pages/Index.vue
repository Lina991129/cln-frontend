<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode"/>
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>

  <van-empty v-if="!userList || userList.length < 1" image="search" description="搜索结果为空"/>


</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref, watchEffect} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {onMounted} from 'vue';
import UserCardList from "../components/UserCardList.vue";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref(true);
const route = useRoute()
const {tags} = route.query //相当于const tags = route.query.tags;


const loadData = async () => {
  loading.value = true;
  let userListData;
  //心动模式，根据标签匹配用户
  if (isMatchMode.value) { //响应式变量要取value 否则这里始终为true
    const num = 10;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      }
    })
        .then(function (response) {
          console.log('/user/match', response);
          // showToast('请求成功')
          console.log(response)
          console.log("返回值", response.data)
          return response?.data   //response.data?.data 表达式的意思是，先访问 response 对象的 data 属性，如果 response 对象不存在或者 data 属性不存在，直接返回 undefined；如果 response.data 存在，再访问其 data 属性，如果 data 属性不存在，同样返回 undefined。
        })
        .catch(function (error) {
          console.log('/user/match', error);
          showToast('请求失败')
        })
  } else {
    //普通模式，分页查询用户
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend', response);
          // showToast('请求成功')
          console.log(response)
          console.log("返回值", response.data)
          return response.data?.records   //response.data?.data 表达式的意思是，先访问 response 对象的 data 属性，如果 response 对象不存在或者 data 属性不存在，直接返回 undefined；如果 response.data 存在，再访问其 data 属性，如果 data 属性不存在，同样返回 undefined。
        })
        .catch(function (error) {
          console.log('/user/recommend', error);
          showToast('请求失败')
        })
    console.log("后面", userListData)
  }
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags) //后端传过来的是JSON格式的标签，需要转换成数组
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

//async 关键字用于声明一个函数是异步函数，即函数内部可能包含异步操作。异步函数会返回一个 Promise 对象。
//当遇到 await 关键字时，代码会等待 Promise 对象的状态变为 resolved，然后获取到 Promise 对象的返回值。
</script>

<style scoped>

</style>
