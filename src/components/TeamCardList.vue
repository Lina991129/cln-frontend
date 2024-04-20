<template>
  <van-card
      v-for="team in props.teamList"
      :desc="team.description"
      :title="`${team.name}`"
      :thumb="kunkun"
  >
    <template #tags>
      <van-space wrap>
        <van-tag plain type="primary">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </van-space>
    </template>
    <template #bottom>
      <div id="line">
        {{ `队伍人数：${team.hasJoinNum} / ${team.maxNum}` }}
      </div>
      <div v-if="team.expireTime" id="line">
        {{ '过期时间：' + team.expireTime }}
      </div>
      <div id="line">
        {{ '创建时间：' + team.createTime }}
      </div>
    </template>
    <template #footer>
      <van-button v-if="team.userId !== currentUser?.id && !team.hasJoin" size="small" type="primary" plain
                  @click="preJoinTeam(team)">加入队伍
      </van-button>
      <van-button v-if="team.userId === currentUser.id" size="small" plain
                  @click="doUpdateTeam(team.id)">更新队伍
      </van-button>
      <!--   <van-button v-if="team.createUser.id === currentUser.id" size="small" type="primary" plain @click="doJoinTeam(team.id)">更新队伍</van-button>
         这种写法可能createUser是null，会报错，如果要这样写的话要改为team?.createUser?.id === currentUser?.id
         -->
      <!--仅加入用户可见-->
      <van-button v-if="team.hasJoin" size="small" type="primary" plain
                  @click="doQuitTeam(team.id)">退出队伍
      </van-button>

      <van-button v-if="team.userId === currentUser.id" size="small" type="danger" plain
                  @click="doDeleteTeam(team.id)">解散队伍
      </van-button>

    </template>
  </van-card>
  <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
    <van-field v-model="passWord" placeholder="请输入密码"/>
  </van-dialog>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import kunkun from '../assets/kunkun.png'
import myAxios from "../plugins/myAxios.js";
import {showToast} from "vant";
import {getCurrentUserState} from "../state/user";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import {useRouter} from "vue-router";

interface TeamCardListProp {
  teamList: TeamType[];

}

const router = useRouter();

const props = withDefaults(defineProps<TeamCardListProp>(), {
  // @ts-ignore
  teamList: [] as TeamType[],
});

const showPasswordDialog = ref(false);
const passWord = ref('');
const joinTeamId = ref();
const preJoinTeam = (team : TeamType) => {
    joinTeamId.value = team.id;
    if (team.status === 0){
      doJoinTeam()
    }
    else {
      showPasswordDialog.value = true;
    }
}
const doJoinCancel = () => {
  passWord.value = '';
  joinTeamId.value = 0;
}
const currentUser = ref();
onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

/**
 * 加入队伍
 * @param id
 * @param password
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post("/team/join", {
    teamId: joinTeamId?.value,
    password: passWord?.value,
  });
  if (res?.code === 0) {
    showToast("加入成功");
  } else {
    showToast("加入失败" + (res.description ? `, ${res.description}` : ''));
  }
  doJoinCancel();
}

/**
 * 解散队伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post("/team/delete", {
    id: id
  });
  if (res?.code === 0) {
    showToast("解散成功");
  } else {
    showToast("解散失败" + (res.description ? `, ${res.description}` : ''));
  }
}

/**
 * 退出队伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post("/team/quit", {
    teamId: id
  });
  if (res?.code === 0) {
    showToast("退出成功");
  } else {
    showToast("退出失败" + (res.description ? `, ${res.description}` : ''));
  }
}

/**
 * 跳转到更新队伍页面
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id: id,
    }
  })
}
</script>

<style scoped>
#line {
  white-space: nowrap;
}
</style>
