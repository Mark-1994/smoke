<template>
  <div class="home">
    <div :style="{ position: 'fixed', backgroundColor: '#464c59', top: '0', left: '0', zIndex: 999, color: '#fff', width: '100%', textAlign: 'center', lineHeight: '36px' }" v-if="!userinfo.is_verified">
      <Icon type="ios-warning" color="#f83" />
      为保证您的账户及资源的安全，建议您优先完成实名认证。
      <Button type="text" ghost :style="{ color: '#39f' }" @click="goCertification">去认证</Button>
      <Modal
        v-model="modal1"
        title="代理三要素认证"
        @on-ok="ok('formInline')"
        @on-cancel="cancel">
        <div :style="{ border: '1px solid #5e7ce0', backgroundColor: '#f2f5fc', boxShadow: '0 1px 3px 0 rgb(70 94 184 / 25%)', padding: '6px 8px' }">
          <Icon type="md-alert" color="#5e7ce0" />
          个人证件信息仅用于实名认证，不会泄露您的任何证件信息。
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" hide-required-mark label-colon>
          <FormItem label="姓名" prop="name">
            <Input type="text" v-model="formInline.name" placeholder="姓名"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="id">
            <Input type="text" v-model="formInline.id" placeholder="身份证号"></Input>
          </FormItem>
        </Form>
      </Modal>
    </div>
    <Layout :style="!userinfo.is_verified ? { paddingTop: '36px' } : {}">
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <div class="layout-logo">
          <router-link to="/users">
            <img src="../assets/images/f7e0cec4edf9530202a1b12d6cec9f18_fullsize.jpg" alt="" :style="{ width: '80%', verticalAlign: 'middle' }">
          </router-link>
        </div>
        <Menu
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-1" to="client">
            <Icon type="ios-contact"></Icon>
            <span>用户列表</span>
          </MenuItem>
          <MenuItem name="2-1" to="link">
            <Icon type="ios-link"></Icon>
            <span>链接列表</span>
          </MenuItem>
          <MenuItem name="3-1" to="record">
            <Icon type="ios-list-box-outline"></Icon>
            <span>充值记录</span>
          </MenuItem>
          <!-- <Submenu name="6">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="6-1">
              <Icon type="ios-navigate"></Icon>
              <span>链接列表1</span>
            </MenuItem>
            <MenuItem name="6-2">
              <Icon type="ios-search"></Icon>
              <span>链接列表2</span>
            </MenuItem>
            <MenuItem name="6-3">
              <Icon type="ios-settings"></Icon>
              <span>链接列表3</span>
            </MenuItem>
          </Submenu> -->
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{ padding: 0 }" class="layout-header-bar">
          <Row type="flex" justify="space-between">
            <Col>
              <Icon
                @click.native="collapsedSider"
                :class="rotateIcon"
                :style="{ margin: '0 20px' }"
                type="md-menu"
                size="24"
              ></Icon>
            </Col>
            <Col>
              <Dropdown
                :style="{ margin: '0 20px' }"
                placement="bottom-end"
                @on-click="getNavEvent">
                <a href="javascript:void(0)">
                  <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                  {{ userinfo.nick_name }}
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="personal">
                    <Icon type="ios-contact-outline" />
                    个人中心
                  </DropdownItem>
                  <DropdownItem name="setting">
                    <Icon type="ios-settings-outline" />
                    设置
                  </DropdownItem>
                  <DropdownItem divided name="logout">
                    <Icon type="ios-log-out"></Icon>
                    退出登录
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Content
          :style="{ margin: '20px', background: '#fff', padding: '16px' }"
        >
          <router-view @getChildVal="getChildVal" />
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isCollapsed: false,
      modal1: false,
      formInline: {
        name: '',
        id: ''
      },
      ruleInline: {
        name: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请填写身份证号', trigger: 'blur' },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号格式不正确', trigger: 'blur' }
        ]
      },
      userinfo: window.localStorage.getItem('usersInfo') ? JSON.parse(window.localStorage.getItem('usersInfo')) : {}
    }
  },
  computed: {
    rotateIcon () {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  methods: {
    collapsedSider () {
      this.$refs.side1.toggleCollapse()
    },
    getNavEvent (name) {
      if (name === 'logout') {
        this.$router.push('/login')
      } else if (name === 'personal' && this.$route.path !== '/users') {
        this.$router.push('/users')
      }
    },
    goCertification () {
      this.modal1 = true
    },
    ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getDlauth(this.formInline)
        } else {
        }
      })
    },
    cancel () {
    },
    async getDlauth (formInline) {
      const { data: res } = await this.$http.post('dlauth', formInline)
      if (res.status !== 0) return this.$Message.error(res.content)
      if (res.content !== 0) {
        this.$Message.info('认证成功')
        this.getUsersInfo()
      } else {
        this.$Message.error('认证失败')
      }
    },
    getChildVal (val) {
      this.userinfo = val
    },
    async getUsersInfo () {
      const { data: res } = await this.$http.get('info')
      if (res.status !== 0) return this.$Message.error(res.content)
      window.localStorage.setItem('usersInfo', JSON.stringify(res.content))
      this.userinfo = JSON.parse(window.localStorage.getItem('usersInfo'))
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .ivu-layout {
    height: 100%;
  }
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
