<template>
  <div>
    <div>
      <a-card :bordered="false">
        <TrendingSearchForm @search="(data)=>this.search(data)"></TrendingSearchForm>
      </a-card></div>

    <div style='margin-top: 23px'>
      <a-card :bordered="false" class="mt-10">
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
          //status展现形式的定义
          <template slot="status" slot-scope="text">
            <a-tag :color="table.filter.status.color[text-1]">
              {{ table.filter.status.text[text-1] }}
            </a-tag>
          </template>
          <template slot="view" slot-scope="text,record" >
            <font v-if='!isEdit'>{{record ['orders'] }}</font>
            <a-input v-else size="small" :value="record ['orders']" style='width: 100px' v-model="record ['orders']">
              <a-icon slot="suffix" type="check" style="color: rgba(0,0,0,.45)" @click="save(record['id'],record ['orders'])"/>
            </a-input>
            <!--            {{record['id']}}, {{record ['views']}}-->
          </template>
          <template slot="pubNumber" slot-scope="text,record">
<!--            {{record.pubNumber}}-->
            <span v-if="record.pubNumber === null">暂无数据</span>
            <span v-else>{{ record.pubNumber }}</span>
          </template>
          //action展现形式的定义
          <template slot="action" slot-scope="text,row,record">
            <a @click="edit(record['id'])">编辑</a>
          </template>

          <template slot="msg" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </template>
          <template slot="action" slot-scope="text,row,record">
            <a @click="edit(record['id'])">编辑</a>
<!--            <a-button type="danger" size="small" class="ml-5" @click="del(row.id)">删除</a-button>-->
          </template>
        </s-table>
      </a-card>
    </div>
  </div>
</template>

<script>
import { Ellipsis, STable } from '@/components'
import TrendingSearchForm from '@/views/trending/components/TrendingSearchForm'
// import { parseFormData } from '@/utils'
import { delTrending } from '@/api/trending'
import { listByViews, updatePolicyInfo } from '@/api/policy'

export default {
  name: 'trending',
  components: {
    TrendingSearchForm,
    STable,
    Ellipsis
  },
  data () {
    return {
      isEdit: false,
      editForm: {
        views: 0,
        id: 0
      },
      searchForm: {
        form: {}
      },
      table: {
        hasData: false,
        columns: [{
          width: 60,
          align: 'center',
          // dataIndex: 'index',
          title: '热搜排名',
          scopedSlots: { customRender: 'index' }
        },
        {
          width: 100,
          align: 'center',
          dataIndex: 'id',
          title: '政策id'
        }, {
            width: 100,
            align: 'center',
            dataIndex: 'pubNumber',
            title: '发文字号',
            scopedSlots: { customRender: 'pubNumber' }
        },
       {
          width: 120,
          align: 'center',
          dataIndex: 'policyTitle',
          title: '政策标题'
        }, {
          width: 120,
          align: 'center',
          dataIndex: 'pubAgencyFullname',
          title: '发布机构'
        }, {
          width: 100,
          align: 'center',
          dataIndex: 'pubTime',
          title: '发布时间'
        }, {
          width: 80,
          align: 'center',
          dataIndex: 'views',
          title: '点击量'
        }, {
            width: 80,
            align: 'center',
            title: '热度',
            dataIndex: 'orders',
            scopedSlots: { customRender: 'view' }
          }, {
          width: 60,
          align: 'center',
          dataIndex: 'action',
          title: '操作',
          scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo
          }
          const requestParameters = Object.assign({}, pageData, this.searchForm.form)
          return listByViews(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            return res
          }).catch(error => {
            console.log(error)
          })
        },
        // filter: {
        //   status: {
        //     color: ['blue', 'red'],
        //     text: ['成功', '失败']
        //   }
        // },
      editForm: {
        show: false,
        loading: false,
        title: '新增热搜',
        form: {
          id: 0,
          title: '',
          agencyFullName: undefined,
          pubTime: '',
          idCard: '',
          type: undefined,
          roles: [],
          status: true
        },
        rules: {
          name: { required: true, trigger: 'blur', message: '请输入用户名称' },
          departmentId: { required: true, trigger: 'change', message: '请选择所属部门' },
          gender: { required: true, trigger: 'change', message: '请选择性别' },
          type: { required: true, trigger: 'change', message: '请选择用户类型' },
          roles: { required: true, type: 'array', trigger: 'change', message: '请选择用户对应的角色' }
        }
      }
      }
    }
  },
  created () {
  },
  methods: {
    search (data) {
      console.log('查询')
      console.log(data)
      this.searchForm.form = data
      // console.log(this.searchForm.form)
      // const that = this
      // listAllPolicy(this.search.form).then(function (res) {
      //       console.log('查询')
      //       console.log(res)
      //       that.$refs.table = res.data
      //     }).catch(function (error) {
      //       console.log(error)
      //     })
      this.$refs.table.refresh()
    },
    edit () {
      this.isEdit = true
    },
    save (id, orders) {
      console.log('暗箱操作')
      console.log(id)
      this.editForm.id = id
      this.editForm.orders = orders
      console.log(this.editForm)
      // const that = this
      updatePolicyInfo(this.editForm).then(function (res) {
        console.log('暗箱操作2')
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
      this.isEdit = false
      this.$refs.table.refresh()
      console.log('刷新')
    },
    del (id) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认删除该热搜？',
        loading: true,
        onOk () {
          delTrending(id).then(() => {
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

<style lang="less" scoped>

</style>
