<template>
  <template v-if="user">
    <van-cell title="昵称" is-link :value="user.username" @click="toEdit('username','姓名',user.username)"/>
    <van-cell title="账号" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit">
      <img :src="user.avatarUrl" style="height: 48px">
    </van-cell>
    <van-cell title="性别" is-link :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell center title="注册时间" :value="user.createTime" />
  </template>

</template>

<script setup lang="ts"> //如果你不加 lang="ts"，那么 <script setup> 默认会按照普通的
// JavaScript 来处理代码。由于 TypeScript 是 JavaScript 的一个超集，它包含了很多
// JavaScript 不支持的类型系统特性，比如类型注解（string, number, any 等）。
// 当你尝试在 <script setup> 中使用这些 TypeScript 特性时（比如 editKey: string），
// 但没有指定 lang="ts"，编译器就会报错，因为它不知道这些类型注解是什么意思。
// 报错信息 “Types are not supported by current JavaScript version” 的含义是，
// 当前的 JavaScript 环境不支持 TypeScript 的类型系统。实际上，这并不是因为 JavaScript
// 版本太旧，而是因为代码被当作普通的 JavaScript 来处理，而普通的 JavaScript 不理解
// TypeScript 的类型注解。所以，当你在 <script setup> 中使用 TypeScript 特性时，
// 务必加上 lang="ts" 以确保代码能够正确地被当作 TypeScript 来处理。
// 这样，构建工具就可以利用 TypeScript 的编译器来检查类型错误，并提供更好的开发体验。
import {useRouter} from "vue-router";
import {onMounted,ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {getCurrentUser} from "../services/user";

// const user = {
//     id: res.id,
//     username: res.username,
//     userAccount: res.userAccount,
//     avatarUrl: res.userAccount,
//     gender: res.gender,
//     phone: res.phone,
//     email: res.email,
//     planetCode: res.planetCode,
// }
const user = ref();
onMounted(async () => {
  user.value = await getCurrentUser();

})

const router = useRouter();

const toEdit = (editKey:string, editName:string, currentValue:string) => {
  router.push({
    path: '/user/edit',
    query:{
      editKey,
      editName,
      currentValue,
      id:user.value.id
    }
  })
}




</script>

<style scoped>

</style>
