<template>
  <div class="app-login">
    <vue-particles></vue-particles>
    <div :class="typePanel ? 'login-box register-box' : 'login-box'">
      <div class="login-content" v-if="!typePanel" key="0">
        <h4>管理员登录</h4>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="mb">
            <Input type="text" v-model="formInline.mb" placeholder="手机号">
              <Icon type="ios-phone-portrait" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="passwd">
            <Input type="password" v-model="formInline.passwd" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="icode">
            <Row :gutter="8">
              <Col span="15">
                <Input type="text" v-model="formInline.icode" placeholder="请输入验证码">
                  <Icon type="ios-apps-outline" slot="prefix"></Icon>
                </Input>
              </Col>
              <Col span="9">
                <div class="code-box" @click="updateNum(0)">
                  <img :src="'http://api.npm.link/code?r=' + num" alt="">
                </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline', 0)" long>登录</Button>
          </FormItem>
        </Form>
        <Row>
          <Col :span="3">
            <span @click="registerPanel(1)">注册</span>
          </Col>
        </Row>
      </div>
      <!-- 注册面板 -->
      <div class="login-content" v-if="typePanel === 1" key="1">
        <h4>注册</h4>
        <Form ref="formRegister" :model="formRegister" :rules="ruleRegister">
          <FormItem prop="mb">
            <Input type="text" v-model="formRegister.mb" placeholder="手机号">
              <Icon type="ios-phone-portrait" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="passwd">
            <Input type="password" v-model="formRegister.passwd" placeholder="密码">
              <Icon type="ios-lock-outline" slot="prefix"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="code">
            <Row :gutter="8">
              <Col span="15">
                <Input type="text" v-model="formRegister.code" placeholder="请输入验证码">
                  <Icon type="ios-apps-outline" slot="prefix"></Icon>
                </Input>
              </Col>
              <Col span="9">
                <Button long @click="getCode" v-if="!countDown">获取验证码</Button>
                <Button long v-else>已发送 {{ countDownTime }}S</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem prop="icode">
            <Row :gutter="8">
              <Col span="15">
                <Input type="text" v-model="formRegister.icode" placeholder="请输入验证码">
                  <Icon type="ios-apps-outline" slot="prefix"></Icon>
                </Input>
              </Col>
              <Col span="9">
                <div class="code-box" @click="updateNum(1)">
                  <img :src="'http://api.npm.link/code?r=' + numRegister" alt="">
                </div>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formRegister', 1)" long>注册</Button>
          </FormItem>
        </Form>
        <Row>
          <Col :span="3">
            <span @click="registerPanel(0)">登录</span>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  destroyed () {
    clearInterval(this.timer)
  },
  data () {
    return {
      formInline: {
        mb: '',
        passwd: '',
        icode: ''
      },
      formRegister: {
        mb: '',
        passwd: '',
        code: '',
        icode: ''
      },
      ruleInline: {
        mb: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
        ],
        icode: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      },
      ruleRegister: {
        mb: [
          { required: true, message: '请填写手机号', trigger: 'blur' },
          { pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/, message: '手机号格式不正确', trigger: 'blur' }
        ],
        passwd: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { type: 'string', min: 6, max: 18, message: '密码长度6-18位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ]
      },
      // 登录图形验证码 随机数
      num: Math.random(),
      // 注册图形验证码 随机数
      numRegister: Math.random(),
      // 登录面板 注册面板 找回密码面板
      typePanel: 0,
      // 手机验证码倒计时
      countDown: false,
      // 手机验证码时间
      countDownTime: 60,
      // 手机验证码倒计时定时器
      timer: null
    }
  },
  methods: {
    handleSubmit (name, type) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (!type) {
            this.getLoginPost(this.formInline)
          } else if (type === 1) {
            this.getRegisterPost(this.formRegister)
          }
        } else {
          // this.$Message.error('Fail!')
        }
      })
    },
    updateNum (type) {
      if (!type) {
        this.num = Math.random()
      } else if (type === 1) {
        this.numRegister = Math.random()
      }
    },
    // 登录提交
    async getLoginPost (formInline) {
      const { data: res } = await this.$http.post('login', formInline)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.$router.push('/users')
    },
    // 注册按钮
    registerPanel (type) {
      // 0 -> 登录   1 -> 注册   2 -> 找回密码
      this.typePanel = type
    },
    // 获取手机验证码
    async getCode () {
      const { data: res } = await this.$http.post('smscode', this.formRegister)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.countDown = true
      this.getCountDown()
    },
    // 手机验证码倒计时
    getCountDown () {
      this.timer = setInterval(() => {
        this.countDownTime--
        if (!this.countDownTime) {
          clearInterval(this.timer)
          this.countDown = false
          this.countDownTime = 60
        }
      }, 1000)
    },
    // 注册提交
    async getRegisterPost (formRegister) {
      const { data: res } = await this.$http.post('register', formRegister)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.$Message.success('注册成功')
    }
  }
}
</script>

<style lang="less" scoped>
.app-login {
  position: relative;
  height: 100%;
  #particles-js {
    background-image: url(../assets/images/sky.871d198.jpg);
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .login-box {
    z-index: 999;
    color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, .5);
    width: 500px;
    height: 400px;
    box-sizing: border-box;
    padding: 0 50px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgb(105, 105, 105, 7%);
    animation: mymove 1s ease-in-out alternate;
    overflow: hidden;
    transition: 1.8s;
    .login-content {
      width: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      h4 {
        color: #606266;
        font-size: 24px;
        margin-bottom: 30px;
        text-align: center;
      }
      .code-box {
        background-color: #fff;
        border-radius: 4px;
        height: 32px;
        img {
          width: 100%;
          height: 32px;
        }
      }
    }
  }
  .register-box {
    transform: translate(-50%, -50%) rotateY(360deg);
  }
}
@keyframes mymove {
  0% {
    opacity: 0;
    top: 48%;
  }
  100% {
    opacity: 1;
    top: 50%;
  }
}
</style>
