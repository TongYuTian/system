// 引入request 
import request from '@/utils/request';

export default {
    // 获取登录接口
    getLogin(mobile,password){
        return request({
            method:"post",
            url:"/user/login",
            data:{
                mobile,
                password
            }
        })
    },
    // 获取用户信息接口
    getInfo(token){
        return request({
            method:"get",
            url:`/user/info/${token}`
        })
    }
}