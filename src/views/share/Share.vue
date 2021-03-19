<template>
  <div class="share">
    <Row>
      <Col :xl="{ span: 8, offset: 8 }" :md="{ span: 12, offset: 6 }" :xs="{ span: 22, offset: 1 }">
        <Alert show-icon v-if="message">
          说明信息
          <template slot="desc">{{ message }}</template>
        </Alert>
        <Form ref="formInline" :model="formInline" :label-width="100" :rules="ruleValidate">
          <FormItem label="姓名" prop="name">
            <Input v-model="formInline.name" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="id">
            <Input v-model="formInline.id" placeholder="请输入身份证号"></Input>
          </FormItem>
          <FormItem label="图形验证码" prop="icode">
            <Row :gutter="8">
              <Col :lg="16" :md="15" :sm="14" :xs="13">
                <Input v-model="formInline.icode" placeholder="请输入验证码"></Input>
              </Col>
              <Col :lg="8" :md="9" :sm="10" :xs="11">
                <div class="code-box" @click="getImagesCode">
                  <img :src="'http://test1.qijan.cn/code?r=' + numRegister" alt="">
                </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="手机号" prop="mb">
            <Row :gutter="8">
              <Col :lg="16" :md="15" :sm="14" :xs="13">
                <Input v-model="formInline.mb" placeholder="请输入手机号"></Input>
              </Col>
              <Col :lg="8" :md="9" :sm="10" :xs="11">
                <Button long @click="getAuthCode" v-if="isSend">获取验证码</Button>
                <Button long v-else>已发送 {{ countDownTime }}S</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="短信验证码" prop="code">
            <Input v-model="formInline.code" placeholder="请输入验证码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" long @click="handleSubmit('formInline')" :loading="loading">提交</Button>
          </FormItem>
        </Form>
        <Table border :columns="columns1" :data="data1"></Table>
      </Col>
    </Row>

    <Modal v-model="modal2" width="360">
      <p slot="header" style="color:#2d8cf0;text-align:center">
        <Icon type="ios-information-circle" style="margin-right: 5px;"></Icon>
        <span>反馈结果</span>
      </p>
      <div style="text-align:center">
          <p style="font-weight: bold;">认证成功</p>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="del">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Share',
  created () {
    this.getLinkInfo()
  },
  data () {
    return {
      formInline: {
        name: '',
        id: '',
        mb: '',
        aid: this.$route.query.aid ? this.$route.query.aid : '',
        code: '',
        icode: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
        ],
        mb: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        icode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      numRegister: Math.random(),
      // 控制 获取验证码按钮 | 已发送 显示隐藏
      isSend: true,
      // 已发送倒计时 60S
      countDownTime: 60,
      columns1: [
        {
          title: '回执编号',
          key: 'content',
          align: 'center'
        }
      ],
      data1: [],
      modal2: false,
      loading: false,
      message: ''
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getUserAutonym(this.formInline)
        } else {
        }
      })
    },
    async getUserAutonym (formInline) {
      this.loading = true
      const { data: res } = await this.$http.post('auth', formInline)
      this.loading = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.modal2 = true
      this.data1 = [
        res
      ]
    },
    async getAuthCode () {
      const { data: res } = await this.$http.post('smscode', this.formInline)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.isSend = false
      let timer = null
      timer = setInterval(() => {
        this.countDownTime--
        if (!this.countDownTime) {
          clearInterval(timer)
          this.isSend = true
          this.countDownTime = 60
        }
      }, 1000)
    },
    getImagesCode () {
      this.numRegister = Math.random()
    },
    del () {
      this.modal2 = false
    },
    async getLinkInfo () {
      if (!this.$route.query.aid) return
      const { data: res } = await this.$http.get('linkinfo?lid=' + (this.$route.query.aid ? this.$route.query.aid : ''))
      if (res.status !== 0) return this.$Message.error(res.content)
      document.title = 'smoke-' + res.content.title
      this.message = res.content.content
    }
  }
}
</script>

<style lang="less" scoped>
.code-box {
  background-color: #fff;
  border-radius: 4px;
  height: 32px;
  img {
    width: 100%;
    height: 32px;
  }
}
</style>
