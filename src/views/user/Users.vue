<template>
  <div class="users">
    <Row>
      <Col>
        <Button @click="value3 = true" type="primary" ghost>创建链接</Button>
      </Col>
    </Row>

    <Drawer
      title="创建链接"
      v-model="value3"
      width="560"
      :mask-closable="true"
      :styles="styles"
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
      </Form>
      <div class="demo-drawer-footer">
        <Button type="primary" @click="getCreateLink('formData')">提交</Button>
      </div>
    </Drawer>

    <Table
      :columns="columns1"
      :data="data1"
      :style="{ marginTop: '16px' }"
    ></Table>
  </div>
</template>

<script>
export default {
  name: 'Users',
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
        comments: ''
      },
      ruleCustom: {
        alias: [
          { required: true, message: '请填写分组名', trigger: 'blur' }
        ],
        comments: [
          { required: true, message: '请填写备注', trigger: 'blur' }
        ]
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
          key: 'sn'
        }
      ],
      data1: []
    }
  },
  methods: {
    async getLinkList () {
      const { data: res } = await this.$http.get('ll')
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data1 = res.content
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
      const { data: res } = await this.$http.post('newlink', parameter)
      if (res.status !== 0) return this.$Message.error(res.content)
      this.value3 = false
      this.getLinkList()
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
