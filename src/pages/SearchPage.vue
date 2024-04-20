<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        :clearable="false"
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0 ">请选择标签</div>
<!--  :show 是一个动态属性 (dynamic attribute) 的示例，它使用 v-bind 的简写形式。-->
<!--  这里，冒号 : 前缀告诉 Vue.js 我们要绑定一个表达式到属性 show，而不是一个静态的字符串。-->
<!--  具体来说，:show="show" 的意思是将组件或元素的 show 属性绑定到 Vue 实例中-->
<!--  名为 show 的数据属性或计算属性。当 show 属性的值在 Vue 实例中改变时，-->
<!--  它会动态地更新到组件或元素上。-->
  <van-row :gutter="[4, 4]">
    <van-col span="5" v-for="tag in activeIds">
      <van-tag :show="show" closeable size="medium" type="primary" @close="close(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <van-divider content-position="left">选择标签</van-divider>
<!--  这里使用了 Vue 3 的 v-model 语法糖，用于双向绑定 activeIds 数据属性到
组件的 active-id prop-->
<!--  同样使用了 v-model 语法糖，用于双向绑定 activeIndex 数据属性到-->
<!--  组件的 main-active-index prop-->
<!--  :items="tagList"：这里使用了 : 前缀，表示我们正在绑定一个动态属性（也称为 prop）。-->
<!--  这里，我们将 tagList 数据属性绑定到组件的 items prop。-->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
<div style="padding: 20px">
  <van-button block type="primary" @click="doSearchResult">搜索</van-button>
</div>


</template>

<script setup>
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from "vue-router";

const origintagList = [//origintagList 是一个包含多个对象的数组，每个对象都有一个 text 属性和一个 children 属性，其中 children 属性是一个包含多个对象的数组
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
    ],
  },
  {
    text: '兴趣',
    children: [
      { text: '游泳', id: '游泳' },
      { text: '跑步', id: '跑步' },
      { text: '跳远', id: '跳远' },
    ],
  },
];
//标签列表
let tagList = ref(origintagList);

const router = useRouter(); // 获取路由实例
const searchText = ref('');

const onSearch = () => {  //搜索过滤
  tagList.value = origintagList.map(parentTag => { //需要注意的是，parentTag 在这里只是一个变量名，它代表 origintagList 中的当前元素。它不是一个函数，而是一个对象。
    const tempChildren = [...parentTag.children]//扩展运算符 ... 在这里的作用是创建一个新数组，而不是直接引用 parentTag.children。这意味着 tempChildren 和 parentTag.children 是两个独立的数组，对 tempChildren 的任何修改都不会影响到 parentTag.children，反之亦然。
    const tempParentTag = { ...parentTag };
        tempParentTag.children = tempChildren
            .filter(item => item.text.includes(searchText.value));
        return tempParentTag; //map 方法返回一个新的数组，其中包含了所有处理过的 tempParentTag 对象。这个新数组被赋值给 tagList.value，从而更新了 tagList 的引用。
      })
};
const onCancel = () => {
  searchText.value = '';
  tagList.value = origintagList;
}
const show = ref(true);

//移除标签
const close = (tag) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
};

//右侧已选中的标签，右侧选中项的 id
const activeIds = ref([]);
//左侧选中项的索引
const activeIndex = ref(0);

const doSearchResult = () => {
  router.push({
    path : '/user/list',
    query: {
      tags : activeIds.value
    }
  })
}
</script>

<style scoped>

</style>
