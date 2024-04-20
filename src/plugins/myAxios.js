// Set config defaults when creating the instance
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8080/api'
});
myAxios.defaults.withCredentials = true; //如果你的后端服务器要求进行身份验证或者会话管理，你需要在 Axios 请求中设置 withCredentials 为 true，以确保跨域请求能够正确携带凭据。

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    //未登录就跳转到登录页
    if (response?.data?.code === 40100) {
        const redirectUrl = window.location.href;
        window.location.href = `/user/login?redirect=${redirectUrl}`;
    }
    // 对响应数据做点什么
    return response.data; //从全局拦截器取data，这样就不用每个请 求都取data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default myAxios;
