<template>
  <div>
<!--    <div>-->
<!--      <a-card :bordered="false">-->
<!--        <TrendingSearchForm @search="(data)=>this.search(data)"></TrendingSearchForm>-->
<!--      </a-card></div>-->
    <div style='margin-top: 23px'>
<!--      <a-card>-->
<!--&lt;!&ndash;        <a-radio-group default-value="北京" size="small">&ndash;&gt;-->
<!--        <a-radio-group v-model='radio' size="small">-->
<!--          <a-radio-button v-for='(item,index) in province' :key='item.name' :value='item.name' @click="chooseProvince(item.name,index)">-->
<!--            {{item.name}}</a-radio-button>-->
<!--        </a-radio-group>-->
<!--      </a-card>-->
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
          <template slot="view" slot-scope="text,record" >
            <font v-if='!isEdit'>{{record ['orders'] }}</font>
            <a-input v-else size="small" :value="record ['orders']" style='width: 100px' v-model="record ['orders']">
              <a-icon slot="suffix" type="check" style="color: rgba(0,0,0,.45)" @click="save(record['id'],record ['orders'])"/>
            </a-input>
<!--            {{record['id']}}, {{record ['views']}}-->
          </template>
          <template slot="show" slot-scope="text,record">
            <a-tag :color="record['color']">{{ record['name'] }}</a-tag>
          </template>
<!--          //action展现形式的定义-->
<!--          <template slot="action">-->
<!--            <a-button type='primary'>删除</a-button>-->
<!--          </template>-->

          <template slot="msg" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </template>
          <template slot="action" slot-scope="text,row,record">
            <a @click="edit(record['id'])">编辑</a>
          </template>
        </s-table>
      </a-card>
    </div>
  </div>
</template>

<script>
import TrendingSearchForm from '@/views/trending/components/TrendingSearchForm'
import { Ellipsis, STable } from '@/components'
import { listTagByViews, updateTag } from '@/api/policy'
// import { parseFormData } from '@/utils'
import { delTrending } from '@/api/trending'

export default {
  name: 'label',
  components: {
    TrendingSearchForm,
    STable,
    Ellipsis
  },
  data () {
    return {
      radio: '北京',
      oldRadio: '',
      province: [
        { name: '北京' }, { name: '天津' }, { name: '上海' }, { name: '重庆' }, { name: '河北' }, { name: '山西' },
        { name: '黑龙江' }, { name: '吉林' }, { name: '辽宁' }, { name: '江苏' }, { name: '浙江' }, { name: '安徽' },
        { name: '福建' }, { name: '江西' }, { name: '山东' }, { name: '河南' }, { name: '湖北' }, { name: '湖南' },
        { name: '广东' }, { name: '海南' }, { name: '四川' }, { name: '贵州' }, { name: '云南' }, { name: '陕西' },
        { name: '甘肃' }, { name: '青海' }, { name: '内蒙古' }, { name: '广西' }, { name: '西藏' }, { name: '宁夏' },
        { name: '新疆' }, { name: '香港' }, { name: '澳门' }, { name: '台湾' }
      ],
      searchForm: {
        form: {}
      },
      isEdit: false,
      editForm: {
        views: 0,
        id: 0
      },
      table: {
        hasData: false,
        columns: [{
          align: 'center',
          title: '序号',
          scopedSlots: { customRender: 'index' }
        }, {
          align: 'center',
          dataIndex: 'name',
          title: '标签内容'
        }, {
          align: 'center',
          title: '点击量',
          dataIndex: 'views'
        }, {
          align: 'center',
          title: '热度',
          dataIndex: 'orders',
          scopedSlots: { customRender: 'view' }
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
          return listTagByViews(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            return res
          }).catch(error => {
            console.log(error)
          })
        },
        editForm: {
          show: false,
          loading: false,
          title: '新增热搜',
          justPermission: false,
          form: {
            name: '',
            color: ''
          }
          // rules: {
          //   name: { required: true, trigger: 'blur', message: '请输入用户名称' },
          //   departmentId: { required: true, trigger: 'change', message: '请选择所属部门' },
          //   gender: { required: true, trigger: 'change', message: '请选择性别' },
          //   type: { required: true, trigger: 'change', message: '请选择用户类型' },
          //   roles: { required: true, type: 'array', trigger: 'change', message: '请选择用户对应的角色' }
          }
        }
      }
    },
  methods: {
    chooseProvince (province) {
      if (province === this.oldRadio) {
        this.radio = ''
        this.oldRadio = ''
        console.log('radio1', this.radio)
        console.log('oldRadio1', this.oldRadio)
      } else {
        this.oldRadio = province
        console.log('radio2', this.radio)
        console.log('oldRadio2', this.oldRadio)
      }
    },
    search (data) {
      this.searchForm.form = data
      // const that = this
      // listTag(this.searchForm.form).then(function (res) {
      //   console.log('查询')
      //   console.log(res)
      //   that.$refs.table = res.data
      // }).catch(function (error) {
      //   console.log(error)
      // })
      this.$refs.table.refresh()
    },
    // edit (row) {
    //   this.editForm.title = `编辑-${row.username}`
    //   this.showEditContext()
    //   parseFormData(this.editForm.form, row)
    //   this.editForm.form.status = this.editForm.form.status === 1
    //   this.editForm.show = true
    // },
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
      updateTag(this.editForm).then(function (res) {
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
      console.log(id)
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

<style scoped>
/deep/ .ant-radio-button-wrapper:focus-within {
   -webkit-box-shadow: none;
   box-shadow: none;
}
</style>
