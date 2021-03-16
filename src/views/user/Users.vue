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
              <Col span="2" offset="4" align="right">
                <a @click="showEditNickName">修改</a>
                <Modal
                  v-model="modal6"
                  title="修改昵称"
                  :loading="loading"
                  @on-ok="asyncOK('formItem')">
                  <Alert banner show-icon>帐号名一个自然年内仅能修改3次</Alert>
                  <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="80">
                    <FormItem label="新账号名" prop="nickname">
                      <Input type="text" v-model="formItem.nickname"></Input>
                    </FormItem>
                  </Form>
                </Modal>
              </Col>
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
      usersInfo: {},
      modal6: false,
      loading: true,
      formItem: {
        nickname: ''
      },
      ruleItem: {
        nickname: [
          { required: true, message: '请输入新账号名', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getUsersInfo () {
      const { data: res } = await this.$http.get('info')
      if (res.status !== 0) return this.$Message.error(res.content)
      this.usersInfo = res.content
      window.localStorage.setItem('usersInfo', JSON.stringify(res.content))
      this.getChildValue(res.content)
      this.formItem.nickname = JSON.parse(JSON.stringify(res.content.nick_name))
    },
    getChildValue (usersInfo) {
      this.$emit('getChildVal', usersInfo)
    },
    showEditNickName () {
      this.modal6 = true
    },
    asyncOK (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getEditNickName(this.formItem.nickname)
        } else {
        }
      })
    },
    async getEditNickName (nickname) {
      const { data: res } = await this.$http.get('update_nickname?nickname=' + nickname)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.modal6 = false
      this.getUsersInfo()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
