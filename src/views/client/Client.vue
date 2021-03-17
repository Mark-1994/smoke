<template>
  <div class="client">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="idcard">
          <Input type="text" v-model="formInline.idcard" placeholder="身份证号">
            <Icon type="ios-person-add-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="name">
          <Input type="text" v-model="formInline.name" placeholder="姓名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="mb">
          <Input type="text" v-model="formInline.mb" placeholder="手机号">
            <Icon type="ios-phone-portrait" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="receipt">
          <Input type="text" v-model="formInline.receipt" placeholder="回执单号">
            <Icon type="ios-clipboard-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" icon="ios-search" @click="handleSubmit('formInline')">搜索</Button>
        </FormItem>
    </Form>
    <Table :columns="columns1" :data="data1" :loading="isLoading"></Table>
  </div>
</template>

<script>
export default {
  name: 'Client',
  created () {
    this.getUserList()
  },
  data () {
    return {
      columns1: [
        {
          title: '分组名',
          key: 'alias'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '身份证号',
          key: 'id_card'
        },
        {
          title: '手机号',
          key: 'mb'
        },
        {
          title: '是否认证成功',
          key: 'is_verified',
          render: (h, params) => {
            return h('span', params.row.is_verified ? '是' : '否')
          }
        },
        {
          title: '认证时间',
          key: 'atime',
          render: (h, params) => {
            return h('span', this.$dateFormat(params.row.atime))
          }
        },
        {
          title: '链接创建时间',
          key: 'ctime',
          render: (h, params) => {
            return h('span', this.$dateFormat(params.row.ctime))
          }
        }
      ],
      data1: [],
      formInline: {
        idcard: '',
        name: '',
        mb: '',
        receipt: ''
      },
      ruleInline: {},
      isLoading: true
    }
  },
  methods: {
    async getUserList (params) {
      const { data: res } = await this.$http.get('search', params)
      this.isLoading = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data1 = res.content ? res.content : []
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.getUserSearch(this.formInline)
        } else {
        }
      })
    },
    async getUserSearch (params) {
      this.isLoading = true
      const { data: res } = await this.$http.get(`search?idcard=${params.idcard}&name=${params.name}&mb=${params.mb}&receipt=${params.receipt}`)
      this.isLoading = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data1 = res.content ? res.content : []
    }
  }
}
</script>

<style lang="less" scoped>

</style>
