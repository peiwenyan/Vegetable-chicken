<template>
  <div class="content">
    <div class="login-container">
      <div class="top">
<!--        <img src="../../assets/images/login/search.png">-->
        <span >政策检索</span>
      </div>
      <a-form-model ref="form" :model="form" class="login-form" :rules="rules">
        <a-form-model-item>
          <a-input placeholder="请输入手机号" v-model="form.account" ></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input placeholder="请输入密码" v-model="form.password" @keyup.enter.native="handleLogin"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button style="margin-left: 90px" @click="handleLogin" type="primary">登录</a-button>
        </a-form-model-item>
      </a-form-model>
      <span class="toregister">
        <router-link to="/user/register">没有账号？去注册</router-link>
      </span>
    </div>
  </div>
</template>

<script>
// import { login } from '@/api/user'

export default {
  name: 'Login3',
  data () {
    return {
      form: {
        account: '',
        password: '',
        keepLogin: 'false'
      },
        rules: {
          account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
          password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
        }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/myspace/information' })
          }).finally(() => {
            this.loading = false
          })
        }
      })
    }
  }
//     handleLogin () {
//       this.$refs.form.validate(valid => {
//         if (valid) {
//           // eslint-disable-next-line no-undef
// //           login(this.form).then(res => {
// //             if (res.code === 0) {
// //               this.$message.success('denglu成功')
// //             }
// // })
// //         } else {
// //           console.log('error submit!!')
// //           return false
// //         }
// //           })
//           this.$store.dispatch('Login', this.form).then(() => {
//             this.$router.push({ path: '/myspace/information' })
//           }).finally(() => {
//             this.loading = false
//           })
//     }
//   }
//
// }
  }
</script>

<style scoped>
.content{
  width: 100%;
  height: 600px;
  /*background: url("../../assets/images/login/b2.jpg") no-repeat;*/
  background-size:cover;
  display: flex;
  /* 主轴居中 */
  justify-content: center;
  /* 侧轴居中 */
  align-items: center;
}

.login-container{
  width:320px;
  height: 400px;
  background-color: white;
}
.top{
  height: 130px;
  background-color: #EBF2FE;
  text-align: center;
}
span{
  color: rgb(7, 98, 255);
  font-family: Noto Sans SC;
  font-size: 18px;
  font-weight: 650;
  line-height: 36px;
  letter-spacing: 0px;
  position:relative ;
  top:80px;
  left: -10px;
}
img{
  position:relative;
  top:30px;
  left: 40px;
}
.login-form{
  margin: 30px;
  width: 80%;
}
.toregister{
  text-align: center;
  width: 200px;
  position: relative;
  top:-20px;
  left:100px;
  font-weight: normal;
  font-size: small;
}
</style>
