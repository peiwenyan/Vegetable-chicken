<template>
  <div>
    <a-card>
      <a-row type="flex" justify="space-between">
        <a-input-search
          v-model="searchForm.form.title"
          allow-clear
          style="width: 600px"
          placeholder="请输入您要搜索的公告标题"
          enter-button="搜索"
          @keyup.enter.native="search"
          @search="search"
        />
        <a-row>
          <a-button type="primary" @click="addDoc">新增公告</a-button>
        </a-row>
      </a-row>
    </a-card>
    <a-card class="mt-10">
      <s-table
        ref="table"
        class="mt-10"
        row-key="id"
        :columns="table.columns"
        :data="table.loadData"
        :alert="false"
        show-pagination="auto"
        :scroll="{ x: 1000 }"
      >
        <template slot="index" slot-scope="text,record,index">
          {{ index+1 }}
        </template>
        <template slot="user" slot-scope="text">
          {{ text === 0 ? '全部' : '普通用户' }}
        </template>
        <template slot="action" slot-scope="text,row">
          <a @click="showDetail(text)">查看公告内容 |</a>
          <a @click="edit(row)"> 编辑 |</a>
          <a @click="del(row.id)"> 删除</a>
<!--          <a-button type="primary" size="small" @click="edit(row)">编辑</a-button>-->
<!--          <a-button type="danger" size="small" class="ml-5" @click="del(row.id)">删除</a-button>-->
        </template>
      </s-table>
    </a-card>
    <!--新增消息-->
    <a-drawer
      :title="doc.title"
      :visible="doc.show"
      :width="1200"
      @close="()=>{doc.show=false}"
    >
      <DocForm @ok="handleOk"/>
    </a-drawer>
    <!--修改消息-->
    <a-drawer
      :title="doc2.title"
      :visible="doc2.show"
      :width="1200"
      @close="()=>{doc2.show=false}"
    >
      <DocForm2 @ok2="handleOk2" :id="doc2.id" :isEdit='isEdit=true'/>
    </a-drawer>
    <!--查看内容的弹窗-->
    <a-modal
      :visible="detail.show"
      :title="detail.title"
      :confirm-loading="detail.loading"
      :width="700"
      @cancel="detail.show=false"
      footer=''
    >
<!--      <ckeditor v-model="detail.text" class="my-editor" :editor="ckeditor.editor" :config="ckeditor.editorConfig" />-->
<!--      <a-textarea :placeholder="detail.text" :rows="8" :value=this.detail.text disabled='true'></a-textarea>-->
      <div v-html='this.detail.content'></div>
    </a-modal>
  </div>
</template>

<script>
import DocForm from './components/DocForm'
import DocForm2 from './components/DocForm2'
import { STable } from '@/components'
// import { delDoc, listAllDoc } from '@/api/doc'
import TableMixins from '@/mixins/TableMixins'
import { delNote, showSysMessage } from '@/api/notification'
export default {
  name: 'list',
  components: { DocForm, STable, DocForm2 },
  mixins: [TableMixins],
  data () {
    return {
      isEdit: false,
      searchForm: {
        form: { }
      },
      doc: {
        show: false,
        title: '',
        text: '',
        id: 0
      },
      doc2: {
        show: false,
        title: '',
        text: '',
        id: 0
      },
      detail: {
        show: false,
        loading: false,
        title: '',
        content: ''
      },
      table: {
        columns: [{
          width: 80,
          align: 'center',
          title: '序号',
          scopedSlots: { customRender: 'index' }
        }, {
          width: 80,
          align: 'center',
          dataIndex: 'id',
          title: '公告id'
        }, {
          width: 380,
          align: 'center',
          dataIndex: 'title',
          title: '公告标题'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'account',
          title: '发布者'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'type',
          title: '发布对象',
          scopedSlots: { customRender: 'user' }
        }, {
          width: 250,
          align: 'center',
          title: '操作',
          height: 53.8,
          // fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo,
            type: 1
          }
          const requestParameters = Object.assign({}, pageData, this.searchForm.form)
          console.log(requestParameters)
          return showSysMessage(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            return res
          })
        }
      }
    }
  },
  methods: {
    search () {
      this.$refs.table.refresh()
    },
    addDoc () {
      this.doc.title = '新增公告'
      this.doc.id = 0
      this.doc.show = true
    },
    showDetail (text) {
      this.detail.title = '公告内容-【' + text.title + '】'
      this.detail.content = text.content
      console.log(this.detail.content)
      this.detail.show = true
    },
    edit (row) {
      console.log('该行数据为')
      console.log(row)
      this.doc2.title = '编辑公告-【' + row.title + '】'
      this.doc2.id = row.id
      this.doc2.show = true
    },
    del (id) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认删除该数据？',
        loading: true,
        onOk () {
          delNote(id).then(() => {
            _this.refresh()
            modal.destroy()
            _this.$message.success({
              content: '删除成功'
            })
          })
        }
      })
    },
    handleOk () {
      console.log('点击ok')
      this.doc.show = false
      console.log('怎会如此', this.doc.show)
      this.refresh()
    },
    handleOk2 () {
      this.doc2.show = false
      this.refresh()
    }
  }
}
</script>

<style scoped>
/deep/.ant-input[disabled] {
  color: rgba(0, 0, 0, 0.85);
  background-color: #fff;
  cursor: not-allowed;
  opacity: 1;
}

</style>
