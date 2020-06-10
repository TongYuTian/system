// 引入路由文件，通过引入路由我们获取到路由对象
import router from "./router"
// 引入axios请求
import loginApi from './api/login'
import login from "./api/login";

/* 
权限校验：
    通过router路由前置钩子函数beforeEach()
    在跳转路由前进行拦截判断是否登录
    如果已登录，则进行路由跳转，如果没有则回到登录页
*/

/* 
思路：
    1.判断用户是否是登录状态
        使用本地存储，能不能获取到本地储存的token
    2.获取到token，则表示的是登录状态
        允许跳转
    3.没有获取到token，则表示没用户没有登录
        跳转到登录页
*/

// 通过路由对象我们可以调用导航守卫方法
router.beforeEach((to, from, next) => {
    // 获取token
    const token = localStorage.getItem("adminToken")
    // 如果token存在
    if (token) {
        // 获取用户信息
        const userInfo = localStorage.getItem("info");
        // 如果存在
        if (userInfo) {
            next();
        } else { //如果用户信息不存在
            loginApi.getInfo(token).then(res => {
                const resp = res.data
                console.log(resp)
                if (resp.flag) {
                    localStorage.setItem("info",JSON.stringify(resp.data))
                    next()
                } else {
                    next({
                        path: '/'
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        }
    // 如果token不存在 
    } else {
        if(to.path == '/'){
            next()
        }else {
            next({path:'/'})
        }
    }

})