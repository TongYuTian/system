// 引入axios实例
import request from '../utils/request';


export default {
    // 测试接口
    getList(){
        return request({
            method:"get",
            url:"/member/list"
        })
    },
    // 获取会员列表接口
    getPageList(page,size,data){
        return request({
            method:"post",
            url: `/member/list/search/${page}/${size}`,
            data : data
        })
    }
}