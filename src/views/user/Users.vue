<template>
  <div class="users">
    <Row>
      <!-- <Col span="6">
        <Avatar icon="ios-person" size="large" />
      </Col> -->
      <Col span="12" offset="6">
        <List header="基本信息">
          <ListItem>
            <Row :style="{ width: '100%' }">
              <Col span="6">手机号：</Col>
              <Col span="12">{{ usersInfo.mb }}</Col>
            </Row>
          </ListItem>
          <ListItem>
            <Row :style="{ width: '100%' }">
              <Col span="6">昵称：</Col>
              <Col span="12">{{ usersInfo.nick_name }}</Col>
            </Row>
          </ListItem>
          <ListItem>
            <Row :style="{ width: '100%' }">
              <Col span="6">剩余条数：</Col>
              <Col span="12">{{ usersInfo.coin }}</Col>
            </Row>
          </ListItem>
          <ListItem>
            <Row :style="{ width: '100%' }">
              <Col span="6">是否认证通过：</Col>
              <Col span="12">
                <span :style="usersInfo.is_verified ? {} : { color: '#fc9215' }">{{ usersInfo.is_verified ? '是' : '否' }}</span>
              </Col>
            </Row>
          </ListItem>
        </List>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'Users',
  created () {
    this.getUsersInfo()
  },
  data () {
    return {
      usersInfo: {}
    }
  },
  methods: {
    async getUsersInfo () {
      const { data: res } = await this.$http.get('info')
      if (res.status !== 0) return this.$Message.error(res.content)
      this.usersInfo = res.content
      window.localStorage.setItem('usersInfo', JSON.stringify(res.content))
      this.getChildValue(res.content)
    },
    getChildValue (usersInfo) {
      this.$emit('getChildVal', usersInfo)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
