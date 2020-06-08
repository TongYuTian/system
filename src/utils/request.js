import axios from 'axios' //引入axios

// 创建一个axios实例
const request = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //基础路径: /dev-api
    timeout: 5000, //请求超时
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

// request.get('/data.json').then(res => {
//     console.log(res)
// }).catch(err => {
//     console.log(err.res)
// })

// 导出 request 对象
export default request