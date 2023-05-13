<template>
  <div style="margin-top: 20px;width: 500px;">
    <!-- <el-button style="margin-top: 15px;" @click="query">图数据切换，动态更新</el-button> -->
<!--    <a-input-search placeholder="请输入标签名查找相关节点" style="width: 400px" v-model="input" @select="handleSelect" @click="query"/>-->
    <a-input-search placeholder="请输入标签名查找相关节点" style="width: 400px" v-model="input" enter-button @search="onSearch"/>
  </div>
</template>

<script>
import { listGraphData } from '@/api/policy'

export default {
  name: 'GSearch',
  // props: {
  //   isShowPrepend: {
  //     type: Boolean,
  //     default: true
  //   }
  // },
  data () {
    return {
      input: '建筑',
      mode: '1',
      // 后台请求到的json数据
      data: require('../data/records.json'),
      data2: require('../data/top1.json'),
      results: [],
      words: {
        words: ''
      }
    }
  },
  mounted () {
    this.trySearch()
    // this.$emit('getData', this.data)
    // this.results = this.loadAll()
  },
  methods: {
    onSearch (value) {
      console.log('搜索知识图谱', value)
      this.trySearch()
    },
    query () {
      // console.log(typeof this.mode)
      if (this.data.length <= 20) {
        this.data = require('../data/top5.json')
      } else {
        this.data = require('../data/records11.json')
      }
      this.$emit('getData', this.data)
    },
    querySearch (queryString, cb) {
      var res = this.results
      var results = queryString ? res.filter(this.createFilter(queryString)) : res
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (res) => {
        return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
        // .indexOf(word) 返回word在res.value中出现的第一个位置
      }
    },
    // 模拟加载数据
    loadAll () {
      console.log('jll')
      return this.data
    },
    handleSelect (item) {
      console.log('还是用的这个方法吗')
      console.log(item)
      this.trySearch()
    },
    trySearch () {
          console.log('进来try了')
          this.words.words = this.input
          const that = this
          console.log(this.words)
          listGraphData(this.words).then(function (res) {
            console.log('listGraphData')
            that.data = res.data
            console.log(res.data)
            console.log('结束')
            that.$emit('getData', that.data)
          }).catch(function (error) {
            console.log(error)
          })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-select {
  width: 120px;
  // background-color: #fff;
}
.input-with-select .el-input-group__prepend {
  background-color: #6ecbf3;
}
::v-deep .ant-btn-primary {
  color: #fff;
  background-color: #aaaaff;
  border-color: #aaaaff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}
</style>
