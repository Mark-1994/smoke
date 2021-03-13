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
          <Table border ref="selection" :columns="columns2" :data="data2" size="small"></Table>
        </Modal>
      </Col>
    </Row>

    <Table :columns="columns1" :data="data1" :style="{ marginTop: '16px' }"></Table>
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
          key: 'pay_type'
        },
        {
          title: '充值时间',
          key: 'time',
          render: (h, params) => {
            return h('span', params.row.time)
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
          title: 'id',
          key: 'id'
        },
        {
          title: '金额',
          key: 'rmb'
        },
        {
          title: '积分',
          key: 'coin'
        }
      ],
      data2: []
    }
  },
  methods: {
    async getRechargeRecord () {
      const { data: res } = await this.$http.get('rlogs')
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
      if (res.status !== 0) return this.$Message.error(res.content)
      this.data2 = res.content
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
