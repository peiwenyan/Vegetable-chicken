<template>
  <div>
    <div class="ck-content info-content">
      <div v-html="content" />
    </div>
    <FooterToolBar :custom-bar-width="width" v-if="showBar">
      <a-button type="primary" @click="importInfo">导入</a-button>
    </FooterToolBar>
  </div>
</template>

<script>
import { getTextContentByUuid } from '@/api/api'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
  name: 'ArticleView',
  components: { FooterToolBar },
  props: {
    uuid: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 1000
    },
    showBar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      content: ''
    }
  },
  watch: {
    uuid () {
      this.getContent()
    }
  },
  created () {
    this.getContent()
  },
  methods: {
    getContent () {
      this.$message.loading('加载中..', 0)
      getTextContentByUuid(this.uuid).then(res => {
        this.$message.destroy()
        this.content = res.data
        // 后台返回的富文本框数据
        const content = res.data
        this.content = content.replace(/<oembed url/ig, "<video style='width:100%' controls='controls' src").replace(/oembed>/ig, 'video>')
      })
    },
    importInfo () {
      this.$emit('import', this.content)
    }
  }
}
</script>
<style src="../../styles/ck-content-style.css"></style>
<style scoped>
.info-content{
  white-space: pre-wrap;
}
</style>
