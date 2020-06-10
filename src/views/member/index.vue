<template>
  <div>
    <!-- 横向表单 -->
    <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
      <el-form-item prop="cardNum">
        <el-input v-model="formInline.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="formInline.name" placeholder="会员名字"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="formInline.payType" placeholder="支付类型">
          <el-option label="现金" value="shanghai"></el-option>
          <el-option label="微信" value="beijing"></el-option>
          <el-option label="支付宝" value="beijing"></el-option>
          <el-option label="银行卡" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birthday">
        <el-date-picker
          type="date"
          placeholder="出生日期"
          v-model="formInline.birthday"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="primary">新增</el-button>
        <el-button @click="resetForm('formInline')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 会员表格 -->
    <el-table :data="memList" height="350" border style="width: 98%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="cardNum" label="会员卡号" width="150"></el-table-column>
      <el-table-column prop="name" width="80" label="会员姓名"></el-table-column>
      <el-table-column prop="birthday" label="会员生日"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="integral" width="80" label="可用积分"></el-table-column>
      <el-table-column prop="money" width="80" label="开卡金额"></el-table-column>
      <el-table-column prop="payType" width="80" label="支付类型">
        <template slot-scope="scope">{{ scope.row.payType | payTypeFilter }}</template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import memberApi from "../../api/member";

// 支付类型
const payTypeOptions = [
  {
    type: "1",
    name: "现金"
  },
  {
    type: "2",
    name: "微信"
  },
  {
    type: "3",
    name: "支付宝"
  },
  {
    type: "4",
    name: "银行卡"
  }
];

export default {
  name: "",
  data() {
    return {
      // 查询默认数据
      formInline: {
        wordNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      // 会员管理列表
      memList: [],
      // 当前页码
      currentPage: 1,
      // 当前每页显示的会员数量
      pageSize: 10,
      // 会员总数
      total: 0
    };
  },
  props: {},
  components: {},
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    // 请求会员列表接口
    getData() {
      memberApi
        .getPageList(this.currentPage, this.pageSize, this.formInline)
        .then(res => {
          const resp = res.data;
          console.log(res);
          this.memList = resp.data.rows;
          this.total = resp.data.total;
        });
    },
    // 重置表单
    resetForm(formInline) {
      this.$refs[formInline].resetFields();
    },
    // 编辑
    handleEdit(id) {
      console.log(id + "编辑");
    },
    // 删除
    handleDelete(id) {
      console.log(id + "删除");
    },
    // 分页当前页码切换
    handleCurrentChange(value) {
      this.currentPage = value;
      this.getData();
    },
    // 当前页切换显示会员条数
    handleSizeChange(value) {
      this.pageSize = value
      this.getData()
    }
  },
  filters: {
    payTypeFilter(type) {
      const obj = payTypeOptions.find(data => {
        return data.type == type;
      });
      return obj ? obj.name : null;
    }
  }
};
</script>

<style scoped>
.demo-form-inline {
  margin: 20px 0 0 10px;
}
.el-table {
  margin-left: 10px;
}
</style>