<template>
  <div class="home">
    <Layout>
      <Sider
        ref="side1"
        hide-trigger
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <div class="layout-logo">
          <a href="javascript:;">
            <img src="../assets/images/f7e0cec4edf9530202a1b12d6cec9f18_fullsize.jpg" alt="" :style="{ width: '80%', verticalAlign: 'middle' }">
          </a>
        </div>
        <Menu
          active-name="1-1"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
        >
          <MenuItem name="1-1" to="users">
            <Icon type="ios-navigate"></Icon>
            <span>链接列表</span>
          </MenuItem>
          <MenuItem name="2-1" to="record">
            <Icon type="ios-navigate"></Icon>
            <span>充值记录</span>
          </MenuItem>
          <Submenu name="6">
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
          </Submenu>
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
                    Aresn
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
          :style="{ margin: '20px', background: '#fff', minHeight: '260px', padding: '16px' }"
        >
          <router-view/>
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
      isCollapsed: false
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
      }
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
