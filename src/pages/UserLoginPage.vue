<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="账号"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();


import {ref} from 'vue';
import myAxios from "../plugins/myAxios";

const userAccount = ref('');
const userPassword = ref('');
//myAxios.post 本身就是一个异步操作。在大多数情况下，当你发送网络请求时，它们都是异步的，
//因为网络请求需要一定的时间来完成，而 JavaScript 引擎不会等待这些操作完成就会继续执行后续的代码。
//使用 await 关键字可以使 JavaScript 引擎等待异步操作完成，并将其结果赋值给 res 变量。
//在这种情况下，await 关键字会暂停函数的执行，直到 myAxios.post 返回结果或抛出异常为止。

const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res,'用户登录')
  if (res.code === 0 && res.data){
    showToast("登录成功");
    //跳转到之前的页面
    const redirectUrl = route.query?.redirect ?? '/';
    window.location.href = redirectUrl;//这里如果用push的话用户点后退又能回到登录页面，所以要用replace替换掉当前的记录
  }else{
    showToast("登录失败");
  }


}


</script>

<style scoped>

</style>
