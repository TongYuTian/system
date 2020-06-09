<template>
  <div>
    <el-breadcrumb v-show="$route.path != '/Index'" separator="/">
      <el-breadcrumb-item class="line" separator-class="el-icon-arrow-right" :to="{ path:$route.path }">{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped>
.el-breadcrumb {
     height:10px;
     padding:20px;
     border-radius:4px;
     box-shadow:0 2px 12px 0 rgb(0,0,0,0.1);
     margin:10px 10px;
}
.line {
     border-left:3px solid #31c17b;
     padding-left:10px;
}
</style>