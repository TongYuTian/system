import axios from 'axios' //引入axios
import { Loading } from 'element-ui';

// 创建一个axios实例
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //基础路径: /dev-api
    timeout: 5000, //请求超时
})

// Loading
const loading = {
    loadingStance: null,
    open: function () {
        if (this.loadingStance === null) { //防止切换路由时重复加载
            this.loadingStance = Loading.service({
                target: ".Home-container",
                text: "拼命加载中",
                background: "rgba(0,0,0,0.5)"
            });
        }
    },
    close: function () {
        if (this.loadingStance !== null) {
            this.loadingStance.close();
        };
        this.loadingStance = null;
    }
}

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    loading.open()
    return config;
}, function (error) {
    // Do something with request error
    loading.close()
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    loading.close();
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    loading.close();
    return Promise.reject(error);
});

// request.get('/data.json').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err.res)
// })

// 导出 request 对象
export default request