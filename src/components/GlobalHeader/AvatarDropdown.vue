<template>
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
      <span v-if='!isEdit'>{{ currentUser.name }}</span>
      <a-input v-else size="small" :value="currentUser.name" style='width: 100px' v-model="currentUser.name">
        <a-icon slot="suffix" type="check" style="color: rgba(0,0,0,.45)" @click="save(currentUser.id,currentUser.name)"/>
      </a-input>
      <a-icon type="edit" @click='edit()'/>
    </span>
    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
<!--        <a-menu-item v-if="menu" key="center" @click="handleToCenter">-->
<!--          <a-icon type="user" />-->
<!--          {{ $t('menu.account.center') }}-->
<!--        </a-menu-item>-->
<!--        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">-->
<!--          <a-icon type="setting" />-->
<!--          {{ $t('menu.account.settings') }}-->
<!--        </a-menu-item>-->
<!--        <a-menu-divider v-if="menu" />-->
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import { updateMyInfo } from '@/api/user'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isEdit: false,
      editForm: {
        id: 0,
        name: ''
      }
    }
  },
  methods: {
    edit () {
      this.isEdit = true
    },
    save (id, name) {
      console.log(id)
      this.editForm.id = id
      this.editForm.name = name
      console.log(this.editForm)
      updateMyInfo(this.editForm).then(function (res) {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
      this.isEdit = false
      // this.$refs.table.refresh()
      console.log('刷新')
    },
    handleToCenter () {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'Login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
