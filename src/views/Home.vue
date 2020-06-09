<template>
  <div>
    <Header class="Home-header"></Header>
    <Container class="Home-container"></Container>
    <Nav-bar class="Home-navbar"></Nav-bar>
  </div>
</template>

<script>
import Header from "../components/Header";
import Container from "../components/Container";
import NavBar from "../components/NavBar";

export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {
    Header,
    Container,
    NavBar
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
// 头部区域
.Home-header {
  width: 100%;
  line-height: 50px;
  height:50px;
  background: #2d3a4b;
  position: absolute;
}
// 右侧内容区域
.Home-container {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0;
  bottom: 0;
}
// 左侧导航区域
.Home-navbar {
  width: 230px;
  position: absolute;
  top: 50px;
  bottom: 0;
  left: 0;
  background: #545c64;
}

</style>