<template>
  <van-skeleton title avatar v-for="user in props.userList" :row="3" :loading="props.loading">
    <van-card
        :desc="user.profile"
        :title="`${user.username} (${user.planetCode})`"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-space wrap>
          <van-tag plain type="primary" v-for="tag in user.tags">
            {{ tag }}
          </van-tag>
        </van-space>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </van-skeleton>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {UserType} from "../models/user";

interface UserCardListProp {
  userList: UserType[];
  loading: boolean; //从外层传递过来的值
}

const props = withDefaults(defineProps<UserCardListProp>(), {
  loading: true,
  // @ts-ignore
  userList: [] as UserType[],   //withDefaults 用于为 userList 属性指定一个空数组 [] 作为默认值。as UserType[] 表示这个空数组应该被视为 UserType 类型的数组，其中 UserType 是另一个 TypeScript 类型或接口，定义了数组中元素的结构。
});
</script>

<style scoped>

</style>
