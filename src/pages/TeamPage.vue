<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <div style="margin-bottom: 16px"/>
    <van-button class="add-button" icon="plus" type="primary" @click="toAddTeam"/>
    <team-card-list :teamList="teamList"></team-card-list>
    <van-empty v-if="teamList?.length < 1" image="search" description="搜索结果为空"/>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";

const router = useRouter();
// 跳转到创建队伍页
  const toAddTeam = () => {
    router.push({
      path: "/team/add",
    })
  }

const teamList = ref([]);
const searchText = ref('');
const active = ref('0')

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  if (name === 'public') {
    listTeam(searchText.value,0);
  }else {
    listTeam(searchText.value,2);
  }

}
/**
 * 搜索队伍
 * @param val
 * @param status
 * @returns {Promise<void>}
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list",{
    params :{
      searchText: val ,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    teamList.value = res.data;
  }else {
    showToast("加载队伍失败，请刷新重试")
  }
};

// 页面加载时只触发一次
onMounted( async () => {
  await listTeam();
})

const onSearch = async (val) => {
  await listTeam(val);
};
</script>

<style scoped>

</style>
