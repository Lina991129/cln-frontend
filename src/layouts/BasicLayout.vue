<template>

  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view/>
  </div>
<!--如果使用replace to的话用户不能通过浏览器的后退按钮返回到之前的页面-->
<!--  @change: 是 v-on:change 的简写，用于监听 DOM 事件-->
  <van-tabbar route >
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>



</template>

<script setup>
import { showToast } from 'vant';
import { useRouter } from 'vue-router';
import {ref} from "vue";
import routes from "../config/route.ts";

const router = useRouter(); // 获取路由实例
const route = useRouter();
const DEFAULT_TITLE = '伙伴匹配';
const title = ref(DEFAULT_TITLE);

router.beforeEach((to,from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  if (!route || !route.title) {
    title.value = DEFAULT_TITLE;
  } else {
    title.value = route.title;
  }
})
const onClickLeft = () => router.back();
const onClickRight = () => router.push('/search');
</script>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>
