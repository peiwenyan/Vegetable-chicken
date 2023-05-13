<template>
  <div class="item">
    <div class='item-title'>
      <a href='https://www.baidu.com' target='_blank' style='margin-right: 10em' v-html="title" />
      <span v-html="agency" />
      <span v-html="time" />
      <span v-html="tag" />
      <a-button class="item-btn" type="primary" ghost size="small" @click="showDetail">建筑</a-button>
    </div>
    <div class="item-content" v-html="intro" />
    <span>搜索权重：{{weight}}</span>
    <a-button class="item-btn" type="primary" ghost size="small" @click="showDetail">下载</a-button>
    <a-button class="item-btn" type="primary" ghost size="small" @click="showDetail">收藏</a-button>
    <a-divider class="mt-10" />
  </div>
</template>

<script>
import { isEmpty } from '@/utils'

export default {
  name: 'ContentListItem',
  props: {
    detail: {
      type: Object,
      default: () => {}
    },
    keyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    title () {
      let content = this.detail['title']
      if (!isEmpty(this.keyword)) {
        content = content.replace(this.keyword, '<span style="color:red">' + this.keyword + '</span>')
      }
      return content
    },
    agency () {
      let content = this.detail['agency']
      if (!isEmpty(this.keyword)) {
        content = content.replace(this.keyword, '<span style="color:red">' + this.keyword + '</span>')
      }
      return content
    },
    time () {
      let content = this.detail['time']
      if (!isEmpty(this.keyword)) {
        content = content.replace(this.keyword, '<span style="color:red">' + this.keyword + '</span>')
      }
      return content
    },
    tag () {
      let content = this.detail['tag']
      if (!isEmpty(this.keyword)) {
        content = content.replace(this.keyword, '<span style="color:red">' + this.keyword + '</span>')
      }
      return content
    },
    intro () {
      let content = this.detail['intro']
      if (!isEmpty(this.keyword)) {
        content = content.replace(this.keyword, '<span style="color:red">' + this.keyword + '</span>')
      }
      return content
    }
  },
  methods: {

    showDetail () {
      this.$emit('show')
    }
  }
}
</script>

<style scoped>
.item {
  line-height: 28px;
  margin: 20px;
  /*border-bottom: #EEEEEE solid 1px;*/
  /*border-top: #EEEEEE solid 1px;*/
}

.item-title {
  font-weight: 700;
  font-size: 1em;
}

.item-title span {
  margin-right: 3em;
  color: #8c939d;
  font-weight: 500;
}
.item-content {
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item-content span {
  font-size: 12.6px;
  float: left;
  margin-bottom: 10px;
}
.item-btn{
  float: right;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
