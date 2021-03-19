<template>
  <div class="link">
    <Row>
      <Col>
        <Button @click="value3 = true" type="primary" ghost>创建链接</Button>
      </Col>
    </Row>

    <Drawer
      title="创建链接"
      v-model="value3"
      width="560"
      :mask-closable="false"
      :styles="styles"
      @on-close="resetForm"
    >
      <Form ref="formData" :model="formData" :label-colon="true" :rules="ruleCustom" :hide-required-mark="true">
        <Row :gutter="32">
          <Col span="12">
            <FormItem label="分组名" label-position="top" prop="alias">
              <Input
                v-model="formData.alias"
                placeholder="请输入分组名"
              />
            </FormItem>
          </Col>
        </Row>
        <FormItem label="备注" label-position="top" prop="comments">
          <Input
            type="textarea"
            v-model="formData.comments"
            :rows="4"
            placeholder="请输入备注"
          />
        </FormItem>
        <FormItem label="标题" label-position="top" prop="title">
          <Input
            v-model="formData.title"
            placeholder="请输入标题"
          />
        </FormItem>
        <FormItem label="说明信息" label-position="top" prop="content">
          <Input
            type="textarea"
            v-model="formData.content"
            :rows="4"
            placeholder="请输入说明信息"
            show-word-limit
            maxlength="2000"
          />
        </FormItem>
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="getCreateLink('formData')" :loading="isLoadingLink">提交</Button>
      </div>
    </Drawer>

    <Table
      :columns="columns1"
      :data="data1"
      :style="{ marginTop: '16px' }"
      :loading="isLoading"
    >
      <template slot-scope="{ row }" slot="action">
        <Button type="info" size="small" style="margin-right: 5px;" @click="showAuthenticationLogs(row.lid)">查询</Button>
        <Button type="primary" size="small" style="margin-right: 5px;" @click="copyLink(row.lid)">复制</Button>
        <Button type="error" size="small" @click="remove(row.lid)">删除</Button>
      </template>
    </Table>

    <Modal v-model="modal12" draggable scrollable title="获取指定链接认证日志" width="680">
      <Table border :columns="columns2" :data="data2" :loading="isLoadingLogs"></Table>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'Link',
  created () {
    this.getLinkList()
  },
  data () {
    return {
      value3: false,
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        alias: '',
        comments: '',
        title: '',
        content: ''
      },
      ruleCustom: {
        alias: [
          { required: true, message: '请填写分组名', trigger: 'blur' }
        ],
        comments: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请填写标题', trigger: 'blur' }
        ],
        content: []
      },
      columns1: [
        {
          title: '链接ID',
          key: 'lid'
        },
        {
          title: '分组名',
          key: 'alias'
        },
        {
          title: '备注',
          key: 'comments'
        },
        {
          title: '认证成功链接数量',
          key: 'sn',
          sortable: true
        },
        {
          title: '操作',
          slot: 'action',
          width: 190,
          align: 'center'
        }
      ],
      data1: [],
      // 表格 加载中
      isLoading: true,
      modal12: false,
      columns2: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'mb'
        },
        {
          title: '身份证号',
          key: 'id_card'
        },
        {
          title: '是否认证通过',
          key: 'is_verified',
          render: (h, params) => {
            return h('span', params.row.is_verified ? '是' : '否')
          }
        },
        {
          title: '认证时间',
          key: 'time',
          render: (h, params) => {
            return h('span', this.$dateFormat(params.row.time))
          }
        }
      ],
      data2: [],
      isLoadingLogs: true,
      isLoadingLink: false
    }
  },
  methods: {
    async getLinkList () {
      const { data: res } = await this.$http.get('ll')
      this.isLoading = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data1 = res.content ? res.content : []
    },
    getCreateLink (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getNewLink(this.formData)
        } else {
        }
      })
    },
    async getNewLink (parameter) {
      this.isLoadingLink = true
      const { data: res } = await this.$http.post('newlink', parameter)
      this.isLoadingLink = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.value3 = false
      this.$refs.formData.resetFields()
      this.getLinkList()
    },
    remove (lid) {
      this.$Modal.confirm({
        title: '删除链接',
        content: '您确定要删除链接吗？',
        loading: true,
        onOk: () => {
          this.getDeleteLink(lid)
        }
      })
    },
    async getDeleteLink (id) {
      const { data: res } = await this.$http.get('delink?id=' + id)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.$Modal.remove()
      this.getLinkList()
    },
    copyLink (lid) {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.setAttribute('value', window.location.origin + '/#/share?aid=' + lid)
      input.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
      }
      document.body.removeChild(input)
    },
    showAuthenticationLogs (lid) {
      this.modal12 = true
      this.getAuthenticationLogs(lid)
    },
    async getAuthenticationLogs (lid) {
      this.isLoadingLogs = true
      const { data: res } = await this.$http.get('llog?lid=' + lid)
      this.isLoadingLogs = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data2 = res.content ? res.content : []
    },
    resetForm () {
      this.$refs.formData.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>
