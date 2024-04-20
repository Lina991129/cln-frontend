<template>
  <div id="teamUpdatePage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="updateTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="updateTeamData.description"
            rows="4"
            autosize
            label="队伍描述"
            type="textarea"
            placeholder="请输入队伍描述"
        />


        <van-field
            v-model="result"
            is-link
            readonly
            name="datePicker"
            label="过期时间"
            placeholder="点击选择过期时间"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-date-picker @confirm="onConfirm" @cancel="showPicker = false"
                           :min-date="minDate"/>
        </van-popup>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="updateTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-model="updateTeamData.password"
            v-if="updateTeamData.status === '2'"
            type="password"
            name="密码"
            label="密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>

</template>

<script setup>

import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {useRoute, useRouter} from "vue-router";
import {showToast} from "vant";

const router = useRouter();
const route = useRoute();


//需要用户填写的表单数据
const updateTeamData = ref({}) //使用 ref() 创建响应式对象时，总是应该提供一个初始值，除非能正确处理undefined

const id = route.query.id;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};


//获取之前的队伍信息
onMounted( async () => {
  if (id <= 0) {
    showToast("加载队伍失败")
    return;
  }
  const res = await myAxios.get("/team/get",{
    params :{
      teamId: id,
    }
  });
  if (res?.code === 0) {
    updateTeamData.value = res.data;
    result.value = formatDate(updateTeamData.value.expireTime)
  }else {
    showToast("更新队伍失败，请刷新重试")
  }
})

const minDate = new Date();
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  result.value = selectedValues.join('-');
  // 这里要注意，因为 updateTeamData 是一个 ref，所以访问它的属性需要通过 .value
  updateTeamData.value.expireTime = result.value;
  showPicker.value = false;
};

//提交
const onSubmit = async () => {
  const postData = {
    ...updateTeamData.value,
    status: Number(updateTeamData.value.status) //updateTeamData 是一个 ref，所以访问它的属性需要通过 .value
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/update", postData);
  if (res?.code === 0){
    showToast("更新成功");
    router.push({
      path:'/team',
      replace: true
    });
  }else {
    showToast("更新失败");
  }
}

</script>

<style scoped>

</style>
