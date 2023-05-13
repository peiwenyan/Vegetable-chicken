// eslint-disable-next-line
import { BasicLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'
import RouteView from '@/layouts/RouteView'
import BlankLayout from '@/layouts/BlankLayout'
import { bxAnaalyse } from '@/core/icons'
// 代表那些需求动态判断权限并通过 addRoutes 动态添加的页面
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/data',
    children: [
      // dashboard
      // {
      //   path: '/dashboard',
      //   name: 'dashboard',
      //   redirect: '/dashboard/analysis',
      //   component: RouteView,
      //   meta: { title: 'menu.dashboard', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
      //   children: [
      //     {
      //       path: '/dashboard/analysis/:pageNo([1-9]\\d*)?',
      //       name: 'Analysis',
      //       component: () => import('@/views/dashboard/Analysis'),
      //       meta: { title: 'menu.dashboard.analysis', keepAlive: false, permission: ['dashboard'] }
      //     }
      //   ]
      // },
      {
        path: '/data',
        name: 'Data',
        component: () => import('@/views/data/data'),
        meta: { title: '数据管理', keepAlive: true, icon: bxAnaalyse, permission: ['data'] }
      },
      // {
      //   path: '/user',
      //   name: 'User',
      //   component: RouteView,
      //   redirect: '/user/list',
      //   meta: { title: '员工管理', icon: 'user' },
      //   children: [
      //     {
      //       path: 'department',
      //       name: 'Department',
      //       component: () => import('@/views/user/department'),
      //       meta: { title: '部门管理' }
      //     },
      //     {
      //       path: 'list',
      //       name: 'UserManager',
      //       component: () => import('@/views/user'),
      //       meta: { title: '人员管理' }
      //     }
      //   ]
      // },
      {
        path: '/label',
        name: 'Label',
        component: () => import('@/views/label/label'),
        meta: { title: '标签管理', keepAlive: true, icon: 'tags' }
        // component: RouteView,
        // redirect: '/label/show',
        // meta: { title: '标签管理', icon: 'user' },
        // children: [
          // {
          //   path: 'show',
          //   name: 'show',
          //   component: () => import('@/views/label/show'),
          //   meta: { title: '大屏展示' }
          // },
        //   {
        //     path: 'label',
        //     name: 'label',
        //     component: () => import('@/views/label/label'),
        //     meta: { title: '标签列表' }
        //   },
        //   {
        //     path: '2dView',
        //     name: '2dView',
        //     component: () => import('@/views/label/2dView'),
        //     meta: { title: '2d知识图谱' }
        //   }
        // ]
      },

      {
        path: '/trending',
        name: 'Trending',
        component: RouteView,
        redirect: 'trending/trending',
        meta: { title: '热搜管理', icon: 'user' },
        children: [
          {
            path: 'trending',
            name: 'trending',
            component: () => import('@/views/trending/trending'),
            meta: { title: '政策热搜' }
          },
          {
            path: 'labelTrending',
            name: 'labelTrending',
            component: () => import('@/views/trending/labelTrending'),
            meta: { title: '标签热搜' }
          }
        ]
      },
      {
        path: '/notification',
        name: 'Notification',
        component: () => import('@/views/notification/list'),
        meta: { title: '公告管理', icon: 'notification' }
      },
      {
        path: '/monitor',
        name: 'Monitor',
        component: RouteView,
        redirect: '/monitor/online',
        meta: { title: '系统监控', icon: 'desktop' },
        children: [{
          path: 'online',
          name: 'OnlineMonitor',
          component: () => import('@/views/monitor/online/index'),
          meta: { title: '在线用户' }
        }, {
          path: 'login',
          name: 'LoginMonitor',
          component: () => import('@/views/monitor/login-info/index'),
          meta: { title: '登录日志' }
        }, {
          path: 'log',
          name: 'LogMonitor',
          component: () => import('@/views/monitor/operate-log/index'),
          meta: { title: '操作日志' }
        }, {
            path: 'server',
            name: 'ServerMonitor',
            component: () => import('@/views/monitor/server/index'),
            meta: { title: '服务监控' }
          }]
      }
      // {
      //   path: '/sys',
      //   name: 'Sys',
      //   component: RouteView,
      //   redirect: 'noRedirect',
      //   meta: {
      //     title: '系统设置',
      //     icon: 'setting'
      //   },
      //   children: [{
      //     path: 'role',
      //     name: 'Role',
      //     component: () => import('@/views/sys/role'),
      //     meta: {
      //       title: '角色管理'
      //     }
      //   }, {
      //     path: 'menus',
      //     name: 'Menus',
      //     component: () => import('@/views/sys/menus'),
      //     meta: {
      //       title: '菜单管理'
      //     }
      //   }, {
      //     path: 'config',
      //     name: 'Config',
      //     component: () => import('@/views/sys/config'),
      //     meta: {
      //       title: '系统配置'
      //     }
      //   }]
      // }
      // {
      //   path: '/userCenter',
      //   name: 'userCenter',
      //   component: RouteView,
      //   meta: { title: '个人中心',
      //     icon: 'setting' },
      //   redirect: 'noRedirect',
      //   children: [
      //     // dashboard
      //     {
      //       path: 'collection',
      //       name: 'collection',
      //       component: () => import('@/views/userCenter/collection'),
      //       meta: { title: '个人收藏' }
      //     }]
      // }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
// 代表那些不需要动态判断权限的路由，如登录页、404等通用页面
export const constantRouterMap = [
  {
    path: '/user',
    component: BlankLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login2')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/template',
    component: RouteView,
    hidden: true,
    children: [
      {
        path: 'login1',
        name: 'Login1',
        component: () => import('@/views/user/Login1')
      },
      {
        path: 'login2',
        name: 'Login2',
        component: () => import('@/views/user/Login2')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
