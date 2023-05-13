<template>
  <div>
    <div>
      <a-card :bordered="false">
        <DataSearchForm @click1="showEditContext(true)" @search="(data)=>this.search(data)"></DataSearchForm>
      </a-card>
    </div>

    <div style="margin-top: 23px">
      <a-card :bordered="false" class="mt-10">
        <s-table
          ref="table"
          rowKey="id"
          :columns="table.columns"
          :data="table.loadData"
          :alert="false"
          showPagination="auto"
        >
          <template slot="noNull" slot-scope="text, record">
            <!--            {{ record.pubNumber === '' ? '暂无数据' : record.pubNumber }}-->
            <span v-if="record.pubNumber === null">暂无数据</span>
            <span v-else>{{ record.pubNumber }}</span>
          </template>
          <template slot="noNull2" slot-scope="text, record">
            <!--            {{ record.pubNumber === '' ? '暂无数据' : record.pubNumber }}-->
            <span v-if="record.label === null">暂无数据</span>
            <span v-else>{{ record.label }}</span>
          </template>
          //action展现形式的定义
          <template slot="action" slot-scope="text, record">
            <a @click="showEditContext2(record)">查看详情 |</a>
            <a @click="del(record.id)"> 删除</a>
            <!--            {{record}}-->
          </template>

          <template slot="msg" slot-scope="text">
            <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
          </template>
        </s-table>
      </a-card>
    </div>
    <!--增加政策的弹窗-->
    <a-modal
      :visible="editForm.show"
      :title="editForm.title"
      :confirm-loading="editForm.loading"
      :width="700"
      @ok="handleSubmit"
      @cancel="editForm.show=false"
    >
      <a-form-model
        ref="editForm"
        :model="editForm.form"
        :rules="editForm.rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发文字号" prop="pubNumber">
              <a-input v-model="editForm.form.pubNumber" placeholder="请输入发文字号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政策标题" prop="policyTitle">
              <a-input v-model="editForm.form.policyTitle" placeholder="请输入政策标题" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发布机构id" prop="pubAgencyId">
              <a-input v-model="editForm.form.pubAgencyId" placeholder="请输入发布机构id" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="发布机构" prop="pubAgencyFullname">
              <a-input v-model="editForm.form.pubAgencyFullname" placeholder="请输入发布机构" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="政策级别" prop="policyGrade">
              <a-select
                v-model="editForm.form.policyGrade"
                placeholder="请选择政策级别"
              >
                <a-select-option :value="1">国家级</a-select-option>
                <a-select-option :value="2">省级</a-select-option>
                <a-select-option :value="3">区县级</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政策种类" prop="policyType">
              <a-select
                v-model="editForm.form.policyType"
                placeholder="请选择政策种类">
                <a-select-option v-for="(item,index) in type" :key="index" :value="item.name">{{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="行业分类" prop="label" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
          <a-select
            v-model="editForm.form.policyTagId"
            placeholder="请选择行业分类">
            <a-select-option v-for="(item,index) in tag" :key="index" :value="item.id">{{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发布时间" prop="pubTime">
              <a-input v-model="editForm.form.pubTime" placeholder="请输入发布时间" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="来源" prop="policySource" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm.form.policySource" placeholder="请输入政策来源" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="省份" prop="province" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm.form.province" placeholder="若政策级别为省级以下，请输入省份" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="城市" prop="city" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm.form.city" placeholder="若政策级别为区县级，请输入城市" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="内容" prop="content" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
          <a-textarea v-model="editForm.form.content" placeholder="请输入正文" :rows="4" />
        </a-form-model-item>
        <!--                <a-form-model-item label="省市" prop="departmentId">-->
        <!--                  <a-tree-select-->
        <!--                    v-model="editForm.form.departmentId"-->
        <!--                    style="width: 100%"-->
        <!--                    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"-->
        <!--                    :tree-data="data.departmentList"-->
        <!--                    placeholder="请选择所属部门"-->
        <!--                  />-->
        <!--                </a-form-model-item>-->
        <!--                <a-form-model-item label="选择政策级别" prop="policyGrade">-->
        <!--                  <a-select-->
        <!--                    v-model="editForm.form.policyGrade"-->
        <!--                    option-filter-prop="children"-->
        <!--                    mode="multiple"-->
        <!--                    :max-tag-count="2"-->
        <!--                    allow-clear-->
        <!--                    placeholder="请选择政策级别"-->
        <!--                  >-->
        <!--                    <a-select-option v-for="item in data.roleList" :key="item.id" :value="item.id">{{ item.name }}-->
        <!--                    </a-select-option>-->
        <!--                  </a-select>-->
        <!--                </a-form-model-item>-->
      </a-form-model>
    </a-modal>
    <!--查看详情的弹窗-->
    <a-modal
      :visible="editForm2.show"
      :title="editForm2.title"
      :confirm-loading="editForm2.loading"
      :width="700"
      @cancel="editForm2.show=false"
      footer=""
    >
      <a-form-model
        ref="editForm"
        :model="editForm2.form"
        :rules="editForm2.rules"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发文字号" prop="pubNumber">
<!--              <span v-if="this.editForm2.form.policyInfo.pubNumber === null">暂无数据</span>-->
<!--              <span v-else>{{ this.editForm2.form.policyInfo.pubNumber }}</span>-->
              <a-input :value="this.editForm2.form.policyInfo.pubNumber" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政策标题" prop="policyTitle">
              <a-input v-model="editForm2.form.policyInfo.policyTitle" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发布机构id" prop="pubAgencyId">
              <a-input v-model="editForm2.form.policyInfo.pubAgencyId" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="发布机构" prop="pubAgencyFullname">
              <a-input v-model="editForm2.form.policyInfo.pubAgencyFullname" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="政策级别" prop="policyGrade">
              <a-input v-model="editForm2.form.policyInfo.policyGrade" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="政策种类" prop="policyType">
              <a-input v-model="editForm2.form.policyInfo.policyType" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="行业分类" prop="name" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
<!--          <span v-if="this.editForm2.form.policyTag[0].name === ''">暂无数据</span>-->
<!--          <span v-else>{{this.editForm2.form.policyTag[0].name}} </span>-->
          <a-input v-model="editForm2.form.policyTag[0].name" placeholder="暂无数据" disabled="true"/>
        </a-form-model-item>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="发布时间" prop="pubTime">
              <a-input v-model="editForm2.form.policyInfo.pubTime" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="来源" prop="policySource" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm2.form.policyInfo.policySource" placeholder="暂无数据" disabled="true"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12" >
            <a-form-model-item label="省份" prop="province" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm2.form.policyInfo.province" placeholder="为国家级政策，无省份信息" disabled="true"/>
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="城市" prop="city" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
              <a-input v-model="editForm2.form.policyInfo.city" placeholder="非区县级政策，无城市信息" disabled="true"/>
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-form-model-item label="内容" prop="content" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
          <a-textarea v-model="editForm2.form.policyContent.content" placeholder="暂无数据" :rows="4" disabled="true"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { Ellipsis, STable } from '@/components'
import DataSearchForm from '@/views/data/components/DataSearchForm'
import { addPolicy, delPolicy, getPolInfo, listAllPolicy, listTag } from '@/api/policy'
import TableMixins from '@/mixins/TableMixins'
import cloneDeep from 'lodash.clonedeep'
// import moment from 'moment/moment'
// import warning from 'ant-design-vue/lib/_util/warning'
// import { judgeUser } from '@/api/user'

export default {
  name: 'Data',
  components: {
    DataSearchForm,
    STable,
    Ellipsis
  },
  mixins: [TableMixins],
  data () {
    const validateNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入发文字号'))
      } else {
        callback()
      }
    }
    const validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入政策标题'))
      } else {
        callback()
      }
    }
    return {
      searchForm: {
        form: {}
      },
      editForm: {
        show: false,
        loading: false,
        title: '新增数据',
        justPermission: false,
        form: {
          pubNumber: '',
          policyTitle: '',
          policyGrade: '',
          pubAgencyFullname: '',
          pubTime: '',
          policyType: '',
          province: '',
          city: '',
          policySource: '',
          pubAgencyId: '',
          policyTagId: '',
          content: ''
          // status: true
        },
        rules: {
          // 参考user/List
          pubNumber: { required: true, message: '请输入发文字号', validator: validateNumber },
          policyTitle: { required: true, message: '请输入政策标题', validator: validateTitle },
          policyGrade: { required: true, trigger: 'change', message: '请选择政策级别' },
          policyType: { required: true, trigger: 'change', message: '请选择政策种类' },
          policyTag: { required: true, trigger: 'change', message: '请选择行业分类' },
          pubAgencyFullname: { required: true, message: '请输入发布机构' },
          pubTime: { required: true, message: '请输入发布时间' }
          // province: { required: true, type: 'blur', trigger: 'blur', message: '请输入发布省份' },
          // city: { required: true, type: 'blur', trigger: 'blur', message: '请输入发布城市' }
          // policyType: { required: true, trigger: 'change', message: '请选择政策分类' }

          // account: { required: true, trigger: 'blur', validator: validateAccount },
          // mobile: { required: true, trigger: 'blur', validator: validateMobile },
          // departmentId: { required: true, trigger: 'change', message: '请选择所属部门' },
          // email: { trigger: 'blur', validator: validateEmail },
          // gender: { required: true, trigger: 'change', message: '请选择性别' },
          // idCard: { trigger: 'blur', validator: validateIdCard },
          // type: { required: true, trigger: 'change', message: '请选择用户类型' },
          // roles: { required: true, type: 'array', trigger: 'change', message: '请选择用户对应的角色' }
        }
      },
      editForm2: {
        show: false,
        loading: false,
        title: '政策详情',
        justPermission: false,
        form: {
          policyTag: [{
              policyId: 0,
              name: '',
              id: 0,
              policyTagId: 0
            }],
          policyInfo: {
            id: 0,
            pubNumber: '',
            policyTitle: '',
            policyGrade: '',
            pubAgencyFullname: '',
            pubTime: '',
            policyType: '',
            province: '',
            city: '',
            policySource: '',
            pubAgencyId: '',
            createdTime: '',
            updatedTime: '',
            fileId: '',
            isCrawled: 0,
            isDeleted: 0,
            label: '',
            pubStatus: 0,
            textContentId: 0,
            url: '',
            views: 0
          },
          policyContent: ''
        },
        rules: {
          // 参考user/List
          pubNumber: { required: true, message: '请输入发文字号', validator: validateNumber },
          policyTitle: { required: true, message: '请输入政策标题', validator: validateTitle },
          policyGrade: { required: true, trigger: 'change', message: '请选择政策级别' },
          policyType: { required: true, trigger: 'change', message: '请选择政策种类' },
          policyTag: { required: true, trigger: 'change', message: '请选择行业分类' },
          pubAgencyFullname: { required: true, message: '请输入发布机构' },
          pubTime: { required: true, message: '请输入发布时间' }
          // province: { required: true, type: 'blur', trigger: 'blur', message: '请输入发布省份' },
          // city: { required: true, type: 'blur', trigger: 'blur', message: '请输入发布城市' }
          // policyType: { required: true, trigger: 'change', message: '请选择政策分类' }

          // account: { required: true, trigger: 'blur', validator: validateAccount },
          // mobile: { required: true, trigger: 'blur', validator: validateMobile },
          // departmentId: { required: true, trigger: 'change', message: '请选择所属部门' },
          // email: { trigger: 'blur', validator: validateEmail },
          // gender: { required: true, trigger: 'change', message: '请选择性别' },
          // idCard: { trigger: 'blur', validator: validateIdCard },
          // type: { required: true, trigger: 'change', message: '请选择用户类型' },
          // roles: { required: true, type: 'array', trigger: 'change', message: '请选择用户对应的角色' }
        }
      },
      id: {
        id: 0
      },
      seatNumberList: [],
      type: [
        { name: '办法' }, { name: '措施' }, { name: '方案' }, { name: '概要' }, { name: '公报' }, { name: '公告' },
        { name: '公示' }, { name: '规定' }, { name: '规划' }, { name: '规则' }, { name: '函' }, { name: '纪要' },
        { name: '决定' }, { name: '决议' }, { name: '名单' }, { name: '目录' }, { name: '批复' }, { name: '请示' },
        { name: '说明' }, { name: '条例' }, { name: '通报' }, { name: '通告' }, { name: '通知' }, { name: '意见' }, { name: '其他' }
      ],
      // tag: [
      //   { name: '节能环保' }, { name: '教育' }, { name: '医疗健康' }, { name: '农业' }, { name: '科学技术' }, { name: '文化' },
      //   { name: '服务业' }, { name: '金融贸易' }, { name: '建筑' }, { name: '工业' }, { name: '招标' }, { name: '交通/物流/供应链' },
      //   { name: '社会保障' }, { name: '法律' }, { name: '旅游' }, { name: '税务' }, { name: '经济' }, { name: '政务' }, { name: '其他' }
      // ],
      tag: [{
        color: '',
        name: '',
        id: '',
        views: ''
      }],
      table: {
        // hasData: false,
        columns: [{
      width: 50,
      align: 'center',
      dataIndex: 'id',
      title: '政策id'
    }, {
      width: 170,
      align: 'center',
      dataIndex: 'policyTitle',
      title: '政策标题'
    }, {
      width: 80,
      align: 'center',
      dataIndex: 'pubNumber',
      title: '发文字号',
      scopedSlots: { customRender: 'noNull' }
    }, {
      width: 60,
      align: 'center',
      dataIndex: 'pubAgencyFullname',
      title: '发布机构',
      ellipsis: true
    }, {
      width: 60,
      align: 'center',
      dataIndex: 'pubTime',
      title: '发布时间'
    },
    //       {
    //   width: 40,
    //   align: 'center',
    //   dataIndex: 'label',
    //   title: '行业分类',
    //   scopedSlots: { customRender: 'noNull2' }
    // },
    {
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
          const requestParameter = Object.assign({}, pageData, this.searchForm.form)
          return listAllPolicy(requestParameter).then(res => {
            res['pageNo'] = parameter['pageNo']
            console.log('listAllPolicy表格内容在这')
            console.log(res)
            return res
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  },
  created () {
    this.getTags()
  },
  methods: {
    // 增加数据显示信息编辑form
    showEditContext (isAdd) {
      this.editForm.title = '新增数据'
      this.editForm.id = 0
      if (this.$refs.editForm) {
        this.$refs.editForm.resetFields()
      }
      console.log(this.editForm)
      if (this.id !== 0) {
        this.editForm.form.id = this.id
      }
      this.editForm.show = true
    },
    showEditContext2 (record) {
      this.editForm2.title = '政策详情'
      this.id.id = record.id
      console.log(this.messageId)
      const that = this
      console.log('到这了')
      getPolInfo(that.id).then(function (res) {
        console.log('getPolInfo')
        console.log(res.data)
        console.log('get')
        that.editForm2.form = res.data
        that.editForm2.show = true
        console.log(that.editForm2.form.policyInfo)
        console.log('and')
        console.log(that.editForm2.form.policyTag)
        console.log('show', that.editForm2.show)
      }).catch(function (error) {
        console.log(error)
      })
      that.editForm2.show = true
      // if (that.editForm2.form.policyInfo.pubNumber == null) {
      //   that.editForm2.form.policyInfo.pubNumber = '暂无数据'
      // }
      // if (that.editForm2.form.policyInfo.province == null) {
      //   this.editForm2.form.policyInfo.province = '为国家级政策，无省份信息'
      // }
      // if (that.editForm2.form.policyInfo.city == null) {
      //   this.editForm2.form.policyInfo.city = '非区县级政策，无城市信息'
      // }
      // if (that.editForm2.form.policyInfo.content == null) {
      //   this.editForm2.form.policyContent = '暂无数据'
      // }
      // if (that.editForm2.form.policyTag.name == null) {
      //   this.editForm2.form.policyTag.name = '暂无数据'
      // }
    },
    handleSubmit () {
      console.log('jll0')
      this.$refs.editForm.validate(valid => {
        console.log('jll0.5')
        if (valid) {
          console.log('jll')
          this.editForm.loading = true
          const requestData = cloneDeep(this.editForm.form)
          console.log(requestData)
          addPolicy(requestData).then(() => {
            console.log('jll2')
            this.$refs.table.refresh(false)
            this.editForm.show = false
          }).finally(() => {
            this.editForm.loading = false
          })
        } else {
          console.log('验证失败')
        }
      })
    },
    search (data) {
      this.searchForm.form = data
      this.$refs.table.refresh()
    },
    del (ids) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认删除？',
        loading: true,
        onOk () {
          console.log('jll')
          delPolicy(ids).then(() => {
            console.log('jll2')
            _this.$refs.table.refresh()
            modal.destroy()
            _this.$message.success({
              content: '删除成功'
            })
          })
        }
      })
    },
    getTags () {
      const that = this
      listTag().then(function (res) {
        console.log('getTags')
        console.log(res)
        that.tag = res.data
        console.log(res.data)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-input[disabled] {
  color: rgba(0, 0, 0, 0.85);
  background-color: #fff;
  cursor: not-allowed;
  opacity: 1;
}
</style>
