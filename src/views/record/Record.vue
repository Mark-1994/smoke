<template>
  <div class="record">
    <Row>
      <Col>
        <Button @click="getShowPayPanel" type="primary" ghost>代理充值</Button>
        <Modal
          v-model="modal1"
          title="代理充值"
          @on-ok="ok"
          @on-cancel="cancel">
          <Table border ref="selection" :columns="columns2" :data="data2" size="small" :loading="isLoadingMoney"></Table>
        </Modal>
      </Col>
    </Row>

    <Table :columns="columns1" :data="data1" :style="{ marginTop: '16px' }" :loading="isLoading"></Table>
  </div>
</template>

<script>
export default {
  name: 'Record',
  created () {
    this.getRechargeRecord()
  },
  data () {
    return {
      modal1: false,
      columns1: [
        {
          title: '金额',
          key: 'rmb'
        },
        {
          title: '条数',
          key: 'coin'
        },
        {
          title: '充值方式',
          key: 'pay_type',
          render: (h, params) => {
            return h('span', params.row.pay_type === 1 ? '支付宝PC网站支付' : '')
          }
        },
        {
          title: '充值时间',
          key: 'time',
          render: (h, params) => {
            return h('span', this.$dateFormat(Number(params.row.time + '000')))
          }
        }
      ],
      data1: [],
      currentChoose: '',
      currentTem: {},
      columns2: [
        {
          title: '选择',
          key: 'radio',
          width: 60,
          align: 'center',
          render: (h, params) => {
            const id = params.row.id
            let flag = false
            if (this.currentChoose === id) {
              flag = true
            } else {
              flag = false
            }
            const self = this
            return h('div', [
              h('Radio', {
                props: {
                  value: flag
                },
                on: {
                  'on-change': () => {
                    self.currentChoose = id
                    self.currentTem = params.row
                  }
                }
              })
            ])
          }
        },
        {
          title: '金额',
          key: 'rmb',
          render: (h, params) => {
            return h('span', '￥' + params.row.rmb)
          }
        },
        {
          title: '条数',
          key: 'coin'
        }
      ],
      data2: [],
      isLoading: true,
      isLoadingMoney: true
    }
  },
  methods: {
    async getRechargeRecord () {
      const { data: res } = await this.$http.get('rlogs')
      this.isLoading = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data1 = res.content ? res.content : []
    },
    ok () {
      this.getPay(this.currentTem.id)
    },
    cancel () {
    },
    async getRechargeList () {
      const { data: res } = await this.$http.get('rcl')
      this.isLoadingMoney = false
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data2 = res.content ? res.content : []
    },
    async getPay (id) {
      const { data: res } = await this.$http.get('rcg?id=' + id)
      if (res.status !== 0) return this.$Message.error(res.content)
      window.open(res.content)
    },
    getShowPayPanel () {
      this.modal1 = true
      this.getRechargeList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
