<template>
  <div>
    <a-card>
      <UserSearchForm @search="search" />
    </a-card>

    <a-card class="mt-10">
      <a-row>
        <a-button type="primary" icon="plus" @click="showEditContext">添加用户</a-button>
        <a-button icon="redo" class="ml-5" @click="refresh">刷新</a-button>
      </a-row>

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
        <template slot="gender" slot-scope="text">
          <a-tag :color="table.filter.gender.color[text]">{{ table.filter.gender.text[text] }}</a-tag>
        </template>

        <template slot="type" slot-scope="text">
          <a-badge :status="table.filter.userType.status[text-1]" :text="table.filter.userType.text[text-1]" />
        </template>

        <template slot="status" slot-scope="text,row">
          <a-switch size="small" :checked="text===1" @click="(checked)=>changeUserStatus(checked,row)" />
        </template>

        <template slot="role" slot-scope="text,record">
          <a-icon type="team" style="font-size: 18px" class="pointer" @click="showRoleChoose(record)" />
        </template>

        <template slot="action" slot-scope="text,row">
          <a-button type="primary" size="small" @click="editUser(row)">编辑</a-button>
          <a-button type="danger" size="small" class="ml-5" @click="del(row.id)">删除</a-button>
        </template>
      </s-table>

      <a-modal
        :visible="roleForm.show"
        title="设置用户角色"
        :confirm-loading="roleForm.loading"
        @ok="handleSubmit"
        @cancel="roleForm.show=false"
      >
        <a-form-model
          ref="roleForm"
          :model="roleForm.form"
          :rules="roleForm.rules"
          :label-width="100"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-form-model-item label="选择角色" prop="roles">
            <a-select
              v-model="roleForm.form.roles"
              option-filter-prop="children"
              mode="multiple"
              :max-tag-count="2"
              allow-clear
              placeholder="请选择角色"
            >
              <a-select-option v-for="item in data.roleList" :key="item.id" :value="item.id">{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <a-modal
        :visible="editForm.show"
        :title="editForm.title"
        :confirm-loading="editForm.loading"
        :width="700"
        @ok="handleEditUser"
        @cancel="editForm.show=false"
      >
        <a-form-model
          ref="editForm"
          :model="editForm.form"
          :rules="editForm.rules"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-form-model-item label="用户名称" prop="name">
            <a-input v-model="editForm.form.name" placeholder="请输入用户名称" />
          </a-form-model-item>
          <a-form-model-item label="登陆账号" prop="account">
            <a-input v-model="editForm.form.account" placeholder="请输入登陆账号" />
          </a-form-model-item>
          <a-form-model-item label="所属部门" prop="departmentId">
            <a-tree-select
              v-model="editForm.form.departmentId"
              style="width: 100%"
              :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
              :tree-data="data.departmentList"
              placeholder="请选择所属部门"
            />
          </a-form-model-item>
          <a-form-model-item label="选择角色" prop="roles">
            <a-select
              v-model="editForm.form.roles"
              option-filter-prop="children"
              mode="multiple"
              :max-tag-count="2"
              allow-clear
              placeholder="请选择角色"
            >
              <a-select-option v-for="item in data.roleList" :key="item.id" :value="item.id">{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="用户类型" prop="type">
            <a-select
              v-model="editForm.form.type"
              placeholder="请选择用户类型"
            >
              <a-select-option :value="1">超级管理员</a-select-option>
              <a-select-option :value="2">普通用户</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="用户性别" prop="gender">
            <a-select
              v-model="editForm.form.gender"
              placeholder="请选择用户性别"
            >
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="2">女</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="手机号码" prop="mobile">
            <a-input v-model="editForm.form.mobile" placeholder="请输入手机号码" />
          </a-form-model-item>
          <a-form-model-item label="是否启用" prop="status">
            <a-switch v-model="editForm.form.status" size="large" checked-children="启用" un-checked-children="禁用" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { changeUserStatus, delUser, editUser, judgeUser, listAllDepartment, listUser, setRole } from '@/api/user'
import UserSearchForm from '@/views/user/components/UserSearchForm'
import { STable } from '@/components'
import { listRoleAsDict } from '@/api/sys'
import TableMixins from '@/mixins/TableMixins'
import { validMobile } from '@/utils/validate'
import cloneDeep from 'lodash.clonedeep'
import { isEmpty, parseFormData } from '@/utils'

export default {
  name: 'UserList',
  components: { UserSearchForm, STable },
  mixins: [TableMixins],
  props: {
    departmentId: {
      type: Number,
      default: 0
    }
  },
  data () {
    const validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户登录账号'))
        return
      }
      judgeUser(this.editForm.form.id, 'account', value).then((response) => {
        const { data } = response
        if (data === 'false') {
          callback(new Error('登录账号已存在'))
          return
        }
        callback()
      })
    }
    const validateMobile = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback()
        return
      }
      if (!validMobile(value)) {
        callback(new Error('请输入正确的手机号码'))
        return
      }
      judgeUser(this.editForm.form.id, 'mobile', value).then((response) => {
        const { data } = response
        if (data === 'false') {
          callback(new Error('手机号码已存在'))
          return
        }
        callback()
      })
    }

    return {
      searchForm: {
        form: {}
      },
      data: {
        userList: [],
        roleList: []
      },
      table: {
        columns: [{
          width: 80,
          align: 'center',
          dataIndex: 'name',
          title: '用户姓名',
          fixed: 'left'
        }, {
          width: 120,
          align: 'center',
          dataIndex: 'account',
          title: '登录账号'
        }, {
          align: 'center',
          dataIndex: 'deptName',
          title: '所属部门'
        }, {
          width: 110,
          align: 'center',
          dataIndex: 'mobile',
          title: '联系方式'
        }, {
          width: 40,
          dataIndex: 'gender',
          align: 'center',
          scopedSlots: { customRender: 'gender' },
          title: '性别'
        }, {
          width: 95,
          dataIndex: 'type',
          align: 'center',
          title: '用户类型',
          scopedSlots: { customRender: 'type' }
        }, {
          width: 70,
          align: 'center',
          dataIndex: 'status',
          title: '用户状态',
          fixed: 'right',
          scopedSlots: { customRender: 'status' }
        }, {
          width: 70,
          align: 'center',
          title: '用户角色',
          fixed: 'right',
          scopedSlots: { customRender: 'role' }
        }, {
          width: 120,
          align: 'center',
          title: '操作',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }],
        loadData: parameter => {
          const pageData = {
            pageSize: parameter.pageSize,
            pageNumber: parameter.pageNo,
            departmentId: this.departmentId
          }
          const requestParameters = Object.assign({}, pageData, this.searchForm.form)
          return listUser(requestParameters).then(res => {
            res['pageNo'] = parameter['pageNo']
            return res
          })
        },
        filter: {
          gender: {
            color: ['', 'blue', 'magenta'],
            text: ['未知', '男', '女']
          },
          userType: {
            status: ['success', 'default'],
            text: ['超级管理员', '普通用户']
          }
        }
      },
      roleForm: {
        show: false,
        loading: false,
        form: {
          id: 0,
          roles: []
        },
        rules: {
          roles: { required: true, type: 'array', message: '请选择角色' }
        }
      },
      editForm: {
        show: false,
        loading: false,
        title: '新增用户',
        form: {
          id: 0,
          name: '',
          account: '',
          departmentId: undefined,
          mobile: '',
          email: '',
          gender: undefined,
          idCard: '',
          type: undefined,
          roles: [],
          status: true
        },
        rules: {
          name: { required: true, trigger: 'blur', message: '请输入用户名称' },
          account: { required: true, trigger: 'blur', validator: validateAccount },
          mobile: { trigger: 'blur', validator: validateMobile },
          departmentId: { required: true, trigger: 'change', message: '请选择所属部门' },
          gender: { required: true, trigger: 'change', message: '请选择性别' },
          type: { required: true, trigger: 'change', message: '请选择用户类型' },
          roles: { required: true, type: 'array', trigger: 'change', message: '请选择用户对应的角色' }
        }
      }
    }
  },
  watch: {
    departmentId () {
      this.refresh()
    }
  },
  created () {
    this.getRoleDictList()
    this.getAllDepartment()
  },
  methods: {
    getAllDepartment () {
      listAllDepartment().then(response => {
        this.data.departmentList = response.data
      })
    },
    getRoleDictList () {
      listRoleAsDict().then(response => {
        this.data.roleList = response.data
      })
    },
    showRoleChoose (record) {
      this.roleForm.form.id = record.id
      this.roleForm.form.roles = record.roles
      this.roleForm.show = true
    },
    handleSubmit () {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.roleForm.loading = true
          setRole(this.roleForm.form.id, this.roleForm.form.roles.join(',')).then(() => {
            this.$refs.table.refresh()
            this.roleForm.show = false
          }).finally(() => {
            this.roleForm.loading = false
          })
        }
      })
    },

    changeUserStatus (checked, row) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认切换用户状态？',
        loading: true,
        onOk () {
          const status = checked ? 1 : 2
          changeUserStatus(row['id'], status).then(() => {
            modal.destroy()
            row['status'] = status
            _this.$message.success({
              content: '切换成功'
            })
          })
        }
      })
    },
    del (id) {
      const _this = this
      const modal = this.$confirm({
        title: '系统提示',
        content: '是否确认删除该用户？',
        loading: true,
        onOk () {
          delUser(id).then(() => {
            _this.$refs.table.refresh()
            modal.destroy()
            _this.$message.success({
              content: '删除成功'
            })
          })
        }
      })
    },
    showEditContext () {
      this.editForm.title = '新增用户'
      this.editForm.form.id = 0
      if (this.$refs.editForm) {
        this.$refs.editForm.resetFields()
      }
      if (this.departmentId !== 0) {
        this.editForm.form.departmentId = this.departmentId
      }
      this.editForm.show = true
    },
    editUser (row) {
      this.editForm.title = `编辑用户-${row.username}`
      this.showEditContext()
      parseFormData(this.editForm.form, row)
      this.editForm.form.status = this.editForm.form.status === 1
      this.editForm.show = true
    },

    // 提交
    handleEditUser () {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.editForm.loading = true
          const requestData = cloneDeep(this.editForm.form)
          requestData['roles'] = requestData['roles'].join(',')
          requestData['status'] = requestData['status'] ? 1 : 2
          editUser(requestData).then(() => {
            this.$refs.table.refresh()
            this.editForm.show = false
          }).finally(() => {
            this.editForm.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.access-container {
  display: inline-block;
  margin-left: 20px;

  .tip {
    font-size: 15px;
    font-weight: bold;
    margin-right: 5px;
  }
}
</style>
