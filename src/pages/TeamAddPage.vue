<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请输入队伍名' }]"
        />
        <van-field
            v-model="addTeamData.description"
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

        <van-field name="stepper" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="radio" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-model="addTeamData.password"
            v-if="addTeamData.status === '2'"
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

import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {useRouter} from "vue-router";

const router = useRouter();
const initFormData = {
  "description": "",
  "expireTime": null,
  "maxNum": 3,
  "name": "",
  "password": "",
  "status": 2,
}

//需要用户填写的表单数据
const addTeamData = ref({...initFormData}) //{...initFormData} 使用了 JavaScript 的展开运算符 (...) 来复制 initFormData 对象中的所有属性到一个新的对象中。这确保了 addTeamData 引用的是 initFormData 的一个副本，而不是直接引用 initFormData。这样，修改 addTeamData.value 不会影响到 initFormData 的原始值。

const minDate = new Date();
const result = ref('');
const showPicker = ref(false);
const onConfirm = ({selectedValues}) => {
  result.value = selectedValues.join('-');
  // 这里要注意，因为 addTeamData 是一个 ref，所以访问它的属性需要通过 .value
  addTeamData.value.expireTime = result.value;
  showPicker.value = false;
};

//提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status) //addTeamData 是一个 ref，所以访问它的属性需要通过 .value
  }
  // todo 前端参数校验
  const res = await myAxios.post("/team/add", postData);
  if (res?.code === 0){
    showToast("添加成功");
    router.push({
      path:'/team',
      replace: true
    });
  }else {
    showToast("添加失败");
  }
}

</script>

<style scoped>

</style>
