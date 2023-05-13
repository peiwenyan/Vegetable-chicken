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
    <a-form-model-item
      label="政策标题"
      prop="name"
      :style="{width:searchForm.width}">
      <a-input
        allowClear
        v-model="searchForm.form.policyTitle"
        type="text"
        placeholder="请输入政策标题"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item :label-width="0" :style="{width:searchForm.width}">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
      <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TagSearchForm',
  data () {
    return {
      searchForm: {
        width: '280px',
        form: {}
      },
      seatNumberList: []
    }
  },
  methods: {
    moment,
    search () {
      console.log('哈哈哈救命啊')
      console.log(this.searchForm.form)
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
    }
  }
}
</script>

<style scoped>

</style>
