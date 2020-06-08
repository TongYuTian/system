// 引入request
import request from "@/utils/request";

const BASE_URL = ""

// 测试1 调用get方式发送get请求
// request.get(BASE_URL + "/data.json").then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(error);
// });

// 测试2 
// request({
//     type: 'get',
//     url: BASE_URL + '/data.json'
// }).then(res => {
//     console.log(res.data);
// }).catch(err => {
//     console.log(error);
// });

export default {
    getList() {
        return request({
            type: 'get',
            url: BASE_URL + '/data.json'
        })
    }
}