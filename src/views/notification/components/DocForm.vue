<template>
  <div>
    <a-row>
      <a-form-model
        :hide-required-mark="true"
        ref="form"
        :model="form"
        :rules="rules"
        labelAlign="left"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 22 }">
        <a-form-model-item label="公告标题" prop="title">
          <a-input v-model="form.title" placeholder="请输入公告标题"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发布对象" prop="type">
          <a-select
            v-model="form.type"
            placeholder="请选择发布对象"
          >
            <a-select-option value="0">全部</a-select-option>
            <a-select-option value="1">普通用户</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="公告内容" prop="text" :wrapper-col="{ span: 24 }">
          <ckeditor v-model="form.text" class="my-editor" :editor="ckeditor.editor" :config="ckeditor.editorConfig" />
        </a-form-model-item>
      </a-form-model>
    </a-row>
    <a-row type="flex" justify="end" class="mt-10">
      <a-button class="ml-10" type="primary" @click="handleSubmit">保存</a-button>
      <!--      <a-button class="ml-10" type="primary">导出word</a-button>-->
<!--      <a-button class="ml-10 orange-btn">重置</a-button>-->
    </a-row>
<!--    <a-card class="mt-10" v-if="showTip">-->
<!--      <SmartDocument @info="addInfo"></SmartDocument>-->
<!--    </a-card>-->
  </div>
</template>

<script>
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor'
import ContentListItem from '@/views/search/components/ContentListItem'
import ArticleView from '@/components/ArticleView'
import { uploadFile } from '@/api/api'
import cloneDeep from 'lodash.clonedeep'
import { editNote } from '@/api/notification'
// import { parseFormData } from '@/utils'
// import SmartDocument from '@/views/search/smart'

export default {
  name: 'DocForm',
  // components: { SmartDocument, ContentListItem, ArticleView },
  components: { ContentListItem, ArticleView },
  data () {
    return {
      ckeditor: {
        editor: ClassicEditor,
        editorConfig: {
          // Run the editor with the German UI.
          language: 'zh-cn',
          imageUpload: (file) => {
            const formData = new FormData()
            formData.append('type', '2')
            formData.append('source', '2')
            return new Promise((resolve, reject) => {
              formData.append('file', file)
              uploadFile('/file/upload', formData).then(res => {
                resolve({ url: process.env.VUE_APP_STATIC + '/image/' + res['data']['fileName'] })
              })
            })
          },
          videoUpload: (file) => {
            const formData = new FormData()
            formData.append('type', '4')
            formData.append('source', '2')
            return new Promise((resolve, reject) => {
              formData.append('file', file)
              uploadFile('/file/upload', formData).then(res => {
                resolve({ url: process.env.VUE_APP_STATIC + '/video/' + res['data']['fileName'] })
              })
            })
          },
          mediaEmbed: {
            extraProviders: [
              {
                name: 'leo',
                url: [
                  /(.*?)/
                ],
                html: match => {
                  const src = match.input
                  return (
                    '<div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;pointer-events: auto;">' +
                    '<video controls style="position: absolute; width: 100%; height: 100%; top: 0; left: 0;" src="' + src + '">' +
                    '</video>' +
                    '</div>'
                  )
                }
              }
            ]
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading', view: 'h1', title: '标题', class: 'ck-heading_heading' },
              { model: 'heading1', view: 'h2', title: 'Heading 1', class: 'ck-heading_heading1' },
              { model: 'heading2', view: 'h3', title: 'Heading 2', class: 'ck-heading_heading2' },
              { model: 'heading3', view: 'h4', title: 'Heading 3', class: 'ck-heading_heading3' }
            ]
          },
          fontSize: {
            options: [10, 14, 'default', 24, 30, 36]
          }
        }
      },
      form: {
        id: 0,
        title: '',
        text: '',
        type: ''
      },
      rules: {
        title: { required: true, trigger: 'blur', message: '请输入公告标题' },
        text: { required: true, trigger: 'blur', message: '请输入公告内容' }
      },
      showTip: false
    }
  },
  methods: {
    showTips () {
      this.showTip = !this.showTip
    },
    resetForm () {
      this.form.id = 0
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.form.title = ''
      this.form.type = ''
      this.form.text = ''
    },
    // getInfo () {
    //   console.log('jll0')
    //   if (this.id === 0) {
    //     return
    //   }
    //   console.log('这里的id为')
    //   console.log(this.id)
    //   this.messageId.messageId = this.id
    //   this.resetForm()
    //   console.log(this.messageId)
    //   const _this = this
    //   getNoteInfo(this.messageId).then(response => {
    //     console.log('jll1')
    //     const { data } = response
    //     console.log(response)
    //     _this.form.text = data.content
    //     _this.form.title = data.title
    //     // _this.form.type = data.
    //   })
    // },
    addInfo (content) {
      this.form.text = this.form.text + content
    },
    // 提交
    handleSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const requestData = cloneDeep(this.form)
          console.log(requestData)
          editNote(requestData).then(() => {
            this.$emit('ok')
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.orange-btn {
  background: #FF9801;
  color: white;
}
</style>

<style lang='less' scoped>
/deep/ .ck-content {
  min-height: 500px;
}
</style>
