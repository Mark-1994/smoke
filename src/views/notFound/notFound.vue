<template>
  <div class="notFound">
    <Row align="middle">
      <Col span="12">
        <div class="ivu-exception-img-element"></div>
      </Col>
      <Col span="9" offset="3">
        <h3>404</h3>
        <p>抱歉，你访问的页面不存在</p>
        <Button type="primary" size="large" to="/users">返回首页</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.notFound {
  height: 100%;
}
.ivu-exception-img-element {
  background-image: url("https://file.iviewui.com/iview-pro/icon-404.svg");
  width: 100%;
  max-width: 430px;
  height: 360px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  margin-left: auto;
}
h3 {
  margin-bottom: 24px;
  color: #515a6e;
  font-weight: 600;
  font-size: 72px;
  line-height: 72px;
}
h3 + p {
  margin-bottom: 16px;
    color: #808695;
    font-size: 20px;
    line-height: 28px;
}
.ivu-row {
  height: 80%;
}
</style>
