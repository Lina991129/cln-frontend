import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import routes from "./config/route";
import Vant from 'vant';
import 'vant/lib/index.css';
import '../global.css';

// // 2. 定义一些路由(抽取放到route.ts中）
// // 每个路由都需要映射到一个组件。
// // 我们后面再讨论嵌套路由。
// const routes = [
//     { path: '/', component: Index },
//     { path: '/about', component: Team },
// ]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHistory(),
    routes, // `routes: routes` 的缩写
})

const app = createApp(App)
app.use(Vant);
// 确保 _use_ 路由实例使
// 整个应用支持路由。
app.use(router)
app.mount('#app')//把App挂载到id=app的dom元素上
