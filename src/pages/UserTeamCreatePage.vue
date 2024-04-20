<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-button type="primary" @click="doJoinTeam">创建队伍</van-button>
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
  const doJoinTeam = () => {
    router.push({
      path: "/team/add",
    })
  }

const teamList = ref([]);

const searchText = ref('');

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create",{
    params :{
      searchText: val,
    }
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
