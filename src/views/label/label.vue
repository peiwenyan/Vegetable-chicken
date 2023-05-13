<template>
  <div>
    <a-row :gutter="24">
      <!--左，知识图谱-->
      <a-col :span="18">
        <div id="nav">
          <a-card>
          <!-- <b> 导航部分 </b> | -->
<!--            <a @click='chooseTwo'> 2D知识图谱</a> |-->
<!--            <a @click='chooseThree'> 3D知识图谱</a>-->
<!--            <gSearch @getData="update" />-->
<!--            <a-divider style='margin-top: 10px;'></a-divider>-->
            <twoView></twoView>
          </a-card>
        </div>
        <router-view/>
      </a-col>
      <!--右，标签列表-->
      <a-col :span="6">
        <div>
<!--          <a-card>-->
<!--            <TagSearchForm @search="search"></TagSearchForm>-->
<!--          </a-card>-->
          <!--表格-->
          <a-card class="mt-10">
            <a-row>
              <s-table
                ref="table"
                rowKey="id"
                :columns="table.columns"
                :data="table.loadData"
                :alert="false"
                showPagination="auto"
              >
                <template slot="index" slot-scope="text,record,index">
                  {{ index+1 }}
                </template>
                <!--          <template slot="show" slot-scope="text,record">-->
                <!--            <a-tag :color="record['color']">{{ record['name'] }}</a-tag>-->
                <!--          </template>-->
                <template slot="action" slot-scope="text, record">
                  <a @click="del(record.id)">删除</a>
                </template>
              </s-table>
            </a-row>
          </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { STable } from '@/components'
import TableMixins from '@/mixins/TableMixins'
import TagSearchForm from '@/views/label/components/TagSearchForm'
import { delTags, listTag } from '@/api/policy'
// import { parseFormData } from '@/utils'
// import cloneDeep from 'lodash.clonedeep'
import twoView from '@/views/label/2dView'
// import threeView from '@/views/label/3dView'
// import { judgeRole } from '@/api/sys'

export default {
  name: 'Label',
  // eslint-disable-next-line standard/object-curly-even-spacing
  components: { TagSearchForm, STable, twoView },
  mixins: [TableMixins],
  data () {
    return {
      input: '',
      // 后台请求到的json数据
      // searchData: require('../data/records.json'),
      results: [],
      table: {
        columns: [{
          align: 'center',
          dataIndex: 'name',
          title: '标签内容'
        }, {
          align: 'center',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo
          }
          const requestParameters = Object.assign({}, pageData, this.searchForm.form)
          return listTag(requestParameters).then(res => {
            console.log(res)
            res['pageNo'] = parameter['pageNo']
            return res
          }).catch(error => {
            console.log(error)
          })
        },
        editForm: {
          show: false,
          loading: false,
          title: '新增',
          justPermission: false,
          form: {
            id: 0,
            name: '',
            color: ''
          }
        }
      },
      isShow: []
    }
  },
  methods: {
    // 显示信息编辑form
    showEditContext (isAdd, justPermission = false) { // justPermission是啥?
      this.editForm.show = true
      this.editForm.loading = false
      this.editForm.justPermission = justPermission
      // 初始化ID，方式编辑后残留数据值
      this.editForm.form.id = 0
      if (isAdd && this.$refs.editForm) {
        this.$refs.editForm.resetFields()
        this.editForm.form.name = ''
        this.editForm.form.color = ''
      }
    },
    // 处理表单提交事件
    handleSubmit () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editForm.loading = true
          // const requestData = cloneDeep(this.editForm.form)
          // requestData['menuIds'] = this.$refs.choosePermission.getChosenNodes().join(',')
          // editTag(requestData).then(() => {
          //   this.$refs.table.refresh()
          //   this.editForm.show = false
          // }).finally(() => {
          //   this.editForm.loading = false
          // })
        }
      })
    },
    // 点击编辑
    handleEdit (index, row) {
      this.$set(this.isShow, index, true)
    },
    // 取消编辑
    handelCancel (index, row) {
      this.$set(this.isShow, index, false)
    },
    edit (row) {
      // this.editForm.title = '编辑'
      console.log(row)
      // parseFormData(this.editForm.form, row)
      // this.editForm.form.status = this.editForm.form.status === 1
      // this.editForm.form.menuIds = row.menuList.map(node => node.menuId)
    },
    del (ids) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认删除？',
        loading: true,
        onOk () {
          console.log('jll')
          delTags(ids).then(() => {
            console.log('jll2')
            _this.$refs.table.refresh()
            modal.destroy()
            _this.$message.success({
              content: '删除成功'
            })
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.icon {
  position:relative;
  top:4px;
}
/deep/.ant-pagination-options {
  display: inline-block;
  margin-left: 16px;
  vertical-align: middle;
  display: none;
}
</style>
