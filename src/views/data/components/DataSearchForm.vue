<template>
  <a-form-model
    ref="searchForm"
    :model="searchForm.form"
    layout="inline"
    @submit.native.prevent
    :label-col="{span:6}"
    :wrapper-col="{ span: 18 }"
  >
    <a-form-model-item
      label="发文字号"
      prop="name"
      :style="{width:searchForm.width}">
      <a-input
        allowClear
        v-model="searchForm.form.pubNumber"
        type="text"
        placeholder="请输入发文字号"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item :label-width="0" :style="{width:searchForm.width}">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
      <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>
    </a-form-model-item>
    <a-form-model-item :label-width="0" style="width:100px;margin-left: 280px;">
      <a-button  class="ml-5" @click="children">添加数据</a-button>
    </a-form-model-item>
  </a-form-model>

</template>

<script>
import moment from 'moment'
// import cloneDeep from 'lodash.clonedeep'
// import { addPolicy } from '@/api/policy'

export default {
  name: 'DataSearchForm',
  data () {
    return {
      searchForm: {
        width: '300px',
        form: {}
      },
      editForm: {
        show: false,
        loading: false,
        title: '新增数据',
        justPermission: false,
        form: {
          pubNumber: '',
          policyTitle: '',
          policyGrade: '',
          pubAgencyFullName: '',
          pubTime: '',
          policyType: '',
          pubAgencyId: '',
          province: '',
          city: '',
          policySource: '',
          content: ''
          // status: true
        }
      },
      seatNumberList: [],
      type: [
        { name: '办法' }, { name: '措施' }, { name: '方案' }, { name: '概要' }, { name: '公报' }, { name: '公告' },
        { name: '公示' }, { name: '规定' }, { name: '规划' }, { name: '规则' }, { name: '函' }, { name: '纪要' },
        { name: '决定' }, { name: '决议' }, { name: '名单' }, { name: '目录' }, { name: '批复' }, { name: '请示' },
        { name: '说明' }, { name: '条例' }, { name: '通报' }, { name: '通告' }, { name: '通知' }, { name: '意见' }, { name: '其他' }
      ]
    }
  },
  methods: {
    moment,
    search () {
      this.$emit('search', this.searchForm.form)
    },
    reset () {
      this.searchForm.form = {}
      this.search()
    },
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    children () {
      this.$emit('click1')
    }
  }
}
</script>

<style scoped>
/deep/element.style {
  margin-left: -12px;
  margin-right: -2px;
}
</style>
