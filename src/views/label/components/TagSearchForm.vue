<template>
  <a-form-model
    ref="searchForm"
    :model="searchForm.form"
    layout="inline"
    @submit.native.prevent
    :label-col="{span:6}"
    :wrapper-col="{ span: 14 }"
  >
    <a-form-model-item
      label="标签内容"
      prop="name"
      :style="{width:searchForm.width}">
      <a-input
        allowClear
        v-model="searchForm.form.name"
        type="text"
        placeholder="请输入标签值"
        @keyup.enter.native="search"
      />
    </a-form-model-item>
    <a-form-model-item :label-width="0" :style="{width:searchForm.width}">
      <a-button type="primary" icon="search" @click="search">搜索</a-button>
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
      this.$emit('click2')
    }
  }
}
</script>

<style scoped>

</style>
