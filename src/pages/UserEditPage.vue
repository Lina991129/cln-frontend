<template>
  <van-form @submit="onSubmit">
<!--      使用反引号（）包围的字符串是JavaScript的模板字符串。它们允许你嵌入表达式，这些表达式的结果会被插入到字符串中。在这个例子中，${editUser.editName}` 是一个嵌入的表达式。-->
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios.js";
import {getCurrentUser} from "../services/user.ts";

const route = useRoute()
const router = useRouter();
const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName
})

//能进到这一页说明前面UserPage已经取到了currentUser，直接获取

const onSubmit = async () => {
  const currentUser = await getCurrentUser();
  console.log(currentUser)
  if (!currentUser){
    showToast("用户未登录");
  }
  const res = await myAxios.post('/user/update',{
    'id':currentUser.id,
    [editUser.value.editKey] : editUser.value.currentValue, //[]用于动态设置属性名，因为不确定是修改哪个属性
  })
  console.log(res,'更新请求')
  if (res.code === 0 && res.data > 0 ) {//res是返回值
    showToast('修改成功');
    router.back();
  }else {
    showToast('修改错误');
  }
};
</script>

<style scoped>

</style>
