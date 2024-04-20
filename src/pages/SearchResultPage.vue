<template>
  <user-card-list :user-list="userList"/>
  <van-empty v-if="!userList || userList.length < 1" image="search" description="搜索结果为空"/>

</template>

<script setup>

import {useRoute} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {onMounted} from 'vue';
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";


const userList = ref([]);
const route = useRoute()
const {tags} = route.query //相当于const tags = route.query.tags;

//async 关键字用于声明一个函数是异步函数，即函数内部可能包含异步操作。异步函数会返回一个 Promise 对象。
//当遇到 await 关键字时，代码会等待 Promise 对象的状态变为 resolved，然后获取到 Promise 对象的返回值。
onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: params => {
      return qs.stringify(params, {indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed', response);
        // showToast('请求成功')
        console.log(response)
        console.log("返回值", response.data)
        return response.data   //response.data?.data 表达式的意思是，先访问 response 对象的 data 属性，如果 response 对象不存在或者 data 属性不存在，直接返回 undefined；如果 response.data 存在，再访问其 data 属性，如果 data 属性不存在，同样返回 undefined。
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error);
        showToast('请求失败')
      })
  console.log("后面", userListData)
  if (userListData) {
    userListData.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags) //后端传过来的是JSON格式的标签，需要转换成数组
      }
    })
    userList.value = userListData;
  }

})


// const mockUser = {
//   id: 1,
//   username: '鱼皮',
//   userAccount: 'dogYupi',
//   profile: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '13543005512',
//   email: '123456@qq.com',
//   createTime: new Date(),
//   planetCode: '1234',
//   userRole: 0,
//   tags: ['java', 'python', 'emo', '打工人'],
// }


</script>

<style scoped>

</style>
