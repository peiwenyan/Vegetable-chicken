<template>
  <!-- header -->
  <!-- 搜索框 -->

  <!-- 主体 -->
  <div class="body">
    <!-- 左 目录导航 -->
    <div class="box left">
      <div>
        <a-collapse v-model="activeKey" class='font-size: 10px;line-height: 1;'>
          <a-collapse-panel key="1" header="政策级别">
            <a-tabs default-active-key="1" @change="callback">
              <a-tab-pane key="1" tab="国家级">
              </a-tab-pane>
              <a-tab-pane key="2" tab="省级" force-render>
                <span>怎么嵌套a啊</span>
                <span><a href='javascript:void(0)' v-for='province in provinces' :key='province'>{{province.name}}</a></span>
                <a href='https://www.baidu.com'>百度</a>

              </a-tab-pane>
              <a-tab-pane key="3" tab="区县级">
              </a-tab-pane>
            </a-tabs>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="行业分类" :disabled="false">
<!--            <p>{{ text }}</p>-->
            <a href='javascript:void(0)' v-for='tag in tags' :key='tag'>{{tag.name}}</a>
            <a href='' target='_blank'>教育</a>
            <a href='' target='_blank'>环保</a>
            <a href='' target='_blank'>农业</a>
            <a href='' target='_blank'>医疗</a>
            <a href='' target='_blank'>互联网</a>
            <a href='' target='_blank'>科学技术</a>
            <a href='' target='_blank'>建筑</a>
            <a href='' target='_blank'>法律</a>
            <a href='' target='_blank'>交通</a>
            <a href='' target='_blank'>餐饮</a>
            <a href='' target='_blank'>工业</a>
            <a href='' target='_blank'>旅游</a>
          </a-collapse-panel>
          <a-collapse-panel key="3" header="发布机构" :disabled="false">
<!--            <p>{{ text }}</p>-->
            <a href='javascript:void(0)' v-for='agency in agencys' :key='agency'>{{agency.name}}</a>
          </a-collapse-panel>
          <a-collapse-panel key="4" header="发布类型" :disabled="false">
            <!--            <p>{{ text }}</p>-->
            <a href='javascript:void(0)' v-for='agency in agencys' :key='agency'>{{agency.name}}</a>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div>

        <a-list size="small" bordered :data-source="tagTrending">
          <a-list-item slot="renderItem" slot-scope="item">
            {{ item }}
          </a-list-item>
          <div slot="header">
            热门搜索<sup>hot</sup>
          </div>
<!--          <template #header>-->
<!--            <div>热门搜索<sup>hot</sup></div>-->
<!--          </template>-->
        </a-list>
      </div>
      <ul>
        <li>
          <h6>政策级别</h6>
          <a href='' target='_blank'>国家级</a>
          <a href='' target='_blank'>省级</a>
          <a href='' target='_blank'>区县级</a>
        </li>
        <li>
          <a href='' target='_blank'>黑龙江</a>
          <a href='' target='_blank'>吉林</a>
          <a href='' target='_blank'>辽宁</a>
        </li>
        <li>
          <h6>行业分类</h6>
          <a href='' target='_blank'>教育</a>
          <a href='' target='_blank'>环保</a>
          <a href='' target='_blank'>农业</a>
          <a href='' target='_blank'>医疗</a>
          <a href='' target='_blank'>互联网</a>
          <a href='' target='_blank'>科学技术</a>
          <a href='' target='_blank'>建筑</a>
          <a href='' target='_blank'>法律</a>
          <a href='' target='_blank'>交通</a>
          <a href='' target='_blank'>餐饮</a>
          <a href='' target='_blank'>工业</a>
          <a href='' target='_blank'>旅游</a>
        </li>
        <li>
          <h6>发布机构</h6>
          <a href='' target='_blank'>发改委</a>
          <a href='' target='_blank'>财政</a>
          <a href='' target='_blank'>水利</a>
          <a href='' target='_blank'>建设</a>
          <a href='' target='_blank'>商务</a>
          <a href='' target='_blank'>农村</a>
          <a href='' target='_blank'>其他</a>
        </li>
        <li>
          <h6>发布类型</h6>
          <a href='' target='_blank'>通知</a>
          <a href='' target='_blank'>公示</a>
          <a href='' target='_blank'>决定</a>
          <a href='' target='_blank'>其他</a>
        </li>
        <li>
          <h6>热门搜索</h6>
          <a href='' target='_blank'>乡村振兴</a>
          <a href='' target='_blank'>乡村振兴</a>
          <a href='' target='_blank'>乡村振兴</a>
        </li>
      </ul>
    </div>
    <!-- 中 搜索结果 分页 -->
    <div class="box mid1">
      <a-card :bordered="false">
        <TimeSearchForm :user-list="data.policyList" @search="(data)=>this.search(data)"></TimeSearchForm>
      </a-card>
    </div>
    <div class="box mid2">
      <div class="search-result">
        <!--搜索结果-->

        <div class="mt-10">
          <ContentListItem :keyword="typeSearchForm.form.policyTitle" v-for="item in contentList" :key="item.id" :detail="item" @show="showArticle(item)" />
        </div>
        <!--分页-->
        <a-pagination v-model="pageParameter.pageNumber" class="mt-10" :page-size="pageParameter.pageSize" :total="pageParameter.total" @change="change" />
      </div>
    </div>
    <!-- 右 日期筛选+热门搜索 -->
<!--    <div class="box right">-->
<!--      <ul>-->
<!--        <li>-->
<!--          <h6>日期筛选</h6>-->
<!--          <a-form-model-->
<!--            ref="searchForm"-->
<!--            :model="searchForm.form"-->
<!--            layout="inline"-->
<!--            @submit.native.prevent-->
<!--            :label-col="{span:5}"-->
<!--            :wrapper-col="{ span: 19 }"-->
<!--          >-->
<!--            <a-form-model-item-->
<!--              label="日期筛选"-->
<!--              :style="{width:searchForm.width}">-->
<!--              <a-range-picker-->
<!--                style="width: 100%"-->
<!--                v-model="searchForm.form.date"-->
<!--                format="YYYY/MM/DD"-->
<!--              />-->
<!--            </a-form-model-item>-->
<!--            <a-form-model-item :label-width="0" style="width: 180px" :wrapper-col="{ span: 24 }">-->
<!--              <a-button type="primary" icon="search" @click="search">一周内</a-button>-->
<!--              <a-button type="primary" icon="search" @click="search">一个月内</a-button>-->
<!--              <a-button type="primary" icon="search" @click="search">一年内</a-button>-->
<!--              <a-button type="primary" icon="search" @click="search">搜索</a-button>-->
<!--              <a-button icon="redo" class="ml-5" @click="reset">重置</a-button>-->
<!--            </a-form-model-item>-->
<!--          </a-form-model>-->
<!--        </li>-->
<!--        <li>-->
<!--          <h6>热门搜索</h6>-->
<!--          <ul>-->
<!--            <li>-->
<!--              <a href='' target='_blank'>乡村振兴</a>-->
<!--              <a href='' target='_blank'>乡村振兴</a>-->
<!--              <a href='' target='_blank'>乡村振兴</a>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </li>-->
<!--      </ul>-->

<!--    </div>-->
  </div>
</template>

<script>
import Menu from '@/views/search/components/menu'
import ContentListItem from '@/views/search/components/ContentListItem'
// import { listAllPolicy, listPolicyData } from '@/api/policy'
import TimeSearchForm from '@/views/search/components/TimeSearchForm'
import { listAllPolicy } from '@/api/policy'

export default {
  name: 'index',
  components: { Menu, ContentListItem, TimeSearchForm },
  data () {
    return {
      pageParameter: {
        pageNumber: 1,
        pageSize: 7,
        total: 6
      },
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      activeKey: ['1'],
      contentList: [],
      docTypeList: [],
      docNumberList: [],
      themeTypeList: [],
      all: { name: '全部', id: 0 },
      fileList: [],
      isSearch: false,
      tags: [
          { id: 1, name: '北京' },
          { id: 2, name: '上海' }
      ],
      province: [
        { id: 1, name: '北京' },
        { id: 2, name: '上海' }
      ],
      agencys: [
        { id: 1, name: '财务' },
        { id: 2, name: '民政' }
      ],
      tagTrending: [
        '民生',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.'
      ],
      typeSearchForm: {
        form: {
          policyTitle: '',
          // docType: 0,
          // docNumber: 0,
          // themeType: 0
          policyType: 0
        }
      },
      // 日期选择器绑定数据
      searchForm: {
        form: {}
      },
      data: {
        policyList: []
      },
      view: {
        title: '',
        uuid: '',
        show: false
      }
    }
  },
  created () {
    this.getPolicyList()
  },
  mounted () {
    this.getContentList()
    // this.getDocNumber()
    // this.getThemeType()
    // this.getDocType()
  },
  watch: {
    activeKey (key) {
      console.log(key)
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    getContentList () {
      this.contentList = [
        {
          title: '湖北坚决筑牢<span style="color: red">自建房</span>安全防线',
          agency: '一个不重要的机构',
          time: '2019.10.21',
          intro: '自全国<span style="color: red">自建房</span>安全专项整治工作推进视频会议召开以来,湖北省紧紧围绕实现“<span style="color: red">自建房</span>排查摸底基本完成、重大隐患基本管控到位”两个目标,开展“百日行动”,快查快...'
        },
        {
          title: '湖北坚决筑牢<span style="color: red">自建房</span>安全防线',
          intro: '自全国<span style="color: red">自建房</span>安全专项整治工作推进视频会议召开以来,湖北省紧紧围绕实现“<span style="color: red">自建房</span>排查摸底基本完成、重大隐患基本管控到位”两个目标,开展“百日行动”,快查快...'
        },
        {
          title: '湖北坚决筑牢<span style="color: red">自建房</span>安全防线',
          intro: '自全国<span style="color: red">自建房</span>安全专项整治工作推进视频会议召开以来,湖北省紧紧围绕实现“<span style="color: red">自建房</span>排查摸底基本完成、重大隐患基本管控到位”两个目标,开展“百日行动”,快查快...'
        },
        {
          title: '湖北坚决筑牢<span style="color: red">自建房</span>安全防线',
          content: '自全国<span style="color: red">自建房</span>安全专项整治工作推进视频会议召开以来,湖北省紧紧围绕实现“<span style="color: red">自建房</span>排查摸底基本完成、重大隐患基本管控到位”两个目标,开展“百日行动”,快查快...'
        },
        {
          title: '湖北坚决筑牢<span style="color: red">自建房</span>安全防线',
          content: '自全国<span style="color: red">自建房</span>安全专项整治工作推进视频会议召开以来,湖北省紧紧围绕实现“<span style="color: red">自建房</span>排查摸底基本完成、重大隐患基本管控到位”两个目标,开展“百日行动”,快查快...'
        }
      ]
      // const requestParameters = Object.assign({}, this.pageParameter, this.typeSearchForm.form)
      // listAllPolicy(requestParameters).then(res => {
      //   this.contentList = res.data
      //   this.pageParameter.total = res.total
      // })
    },
    change (page, size) {
      this.pageParameter.pageNumber = page
      this.getContentList()
    },
    searchType () {
      this.pageParameter.pageNumber = 1
      this.getContentList()
    },
    // getDocType () {
    //   listPolicyData({ dictLabel: 'doc_type' }).then(res => {
    //     this.docTypeList = res.data
    //     this.docTypeList.unshift(this.all)
    //   })
    // },
    // getDocNumber () {
    //   listPolicyData({ dictLabel: 'doc_number' }).then(res => {
    //     this.docNumberList = res.data
    //     this.docNumberList.unshift(this.all)
    //   })
    // },
    // getThemeType () {
    //   listPolicyData({ dictLabel: 'theme_type' }).then(res => {
    //     this.themeTypeList = res.data
    //     this.themeTypeList.unshift(this.all)
    //   })
    // },
    // search () {
    //   if (isEmpty(this.typeSearchForm.form.title)) {
    //     this.isSearch = false
    //     this.getContentList()
    //     return
    //   }
    //   this.isSearch = true
    //   this.getContentList()
    //   listArticleTimeline(this.typeSearchForm.form).then(res => {
    //     this.fileList = res.data
    //   })
    // },
    showArticle (item) {
      this.view.title = item['policyTitle']
      this.view.uuid = item['contentUuid']
      this.view.show = true
    },
    search (data) {
      this.searchForm.form = data
      this.$refs.table.refresh()
    },
    getPolicyList () {
      listAllPolicy().then(response => {
        this.data.policyList = response.data
      })
    }
  }
}
</script>

<style scoped>

ol, ul, li {
  list-style: none outside none;
}
.body{
  width: 1200px;
  margin: 0 auto;
}
.box{
  height: 582px;
  background-color: #fff;
  border: 1px solid #e4e8eb;
  border-top: 4px solid #7dacf0;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  box-shadow: 0 0 6px rgba(0,0,0,.15);
  -o-box-shadow: 0 0 6px rgba(0,0,0,.15);
  -ms-box-shadow: 0 0 6px rgba(0,0,0,.15);
  -moz-box-shadow: 0 0 6px rgba(0,0,0,.15);
  -webkit-box-shadow: 0 0 6px rgba(0,0,0,.15);
}

.box h6{
  display: block;
  font-size: 15px;
  color: rgb(47, 154, 255);
  margin-top: 5px;
  font-weight: normal;
  line-height: 28px;
  clear: both;
  overflow: hidden;
}
.left{
  float: left;
  width: 200px;
  margin-right: 8px;
}
.ant-tabs-nav-container-scrolling {
  padding-right: 2px;
  padding-left: 2px;
}
/deep/ .ant-collapse-content > .ant-collapse-content-box {
  padding: 6px;
}

/deep/ .ant-tabs-nav .ant-tabs-tab {
  position: relative;
  display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  margin: 0 2px 0 0;
  padding: 6px;
  text-decoration: none;
  cursor: pointer;
  -webkit-transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/*/deep/ .ant-collapse > .ant-collapse-item:last-child, .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {*/
/*  border-radius: 0 0 2px 2px;*/
/*  color: #e30;*/
/*  font-weight: bold;*/
/*}*/
.mid1{
  float: left;
  width: 900px;
  height: auto;
  margin-right: 8px;
}
.mid2{
  float: left;
  width: 900px;
  margin-right: 8px;
  margin-top: 10px;
  border-top: 0;
  border-radius: 0;
}
.right{
  float: left;
  width: 200px;
  margin-right: 8px;
}
.box li>a {
  margin-right: 12px;
  font-size: 12px;
  color: #778193;
  line-height: 22px;
}

a {
  white-space: nowrap;
  margin-right: 12px;
  font-size: 12px;
  color: #778193;
  line-height: 22px;
}

/deep/ .ant-list-bordered.ant-list-sm .ant-list-header, .ant-list-bordered.ant-list-sm .ant-list-footer {
  padding: 8px 16px;
  color: #e30;
  font-weight: bold;
}

sup {
  font-size: 12px;
  color: #f60;
  -o-animation: flash 5s linear infinite;
  -ms-animation: flash 5s linear infinite;
  -moz-animation: flash 5s linear infinite;
  -webkit-animation: flash 5s linear infinite;
  animation: flash 1s linear infinite;
}

</style>
