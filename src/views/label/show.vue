<template>
  <div class="col s12 m7" style="float: right;margin-right: 4rem;">
    <div class="card">
      <div id="container" class="card-image container">
        <span class="card-title" style="color: #868181;">Knowlegde Graph</span>
      </div>
      <!--此处为-->
      <div class="card-content" style="background: aliceblue;">
        <p>知识图谱可视化，基于d3.js构建，支持数据导入与配色选择</p>
      </div>
    </div>
  </div>
</template>

<script>
// import { initKG } from '@/api/policy'

// var t1_text = '{' +
//   '"1": {"name": "数据结构","type": "学科"},\n' +
//   '"2": { "name": "二叉树", "type": "知识点"},\n' +
//   '"3": {"name": "链表","type": "知识点"},\n' +
//   '"4": {"name": "平衡二叉树","type": "知识点"},\n' +
//   '"5": {"name": "二叉树的结构讲解","url": "www.mooc.com/15.html",\n' +
//   '"type": "视频资源"},\n' +
//   '"6": {"name": "链表的反转",\n' +
//   '"url": "www.mooc.com/1.ppt",\n' +
//   '"type": "ppt资源"\n' +
//   '},\n' +
//   '"7": {"name": "闲节点","type": "闲"},\n' +
//   '"8": {"name": "闲节点2","type": "闲"},\n' +
//   '"9": {"name": "闲节点3","type": "闲"},\n' +
//   '"10": {"name": "芳芳老师","type": "老师"},\n' +
//   '"11": {"name": "月老师","type": "老师"}\n' +
//   '}'
// document.getElementById('t1').value = t1_text;
// var t2_text = '[\n' +
//   '{ "source": 1, "target": 2, "rela": "包含", "type": "包含关系" },\n' +
//   '{ "source": 1, "target": 3, "rela": "包含", "type": "包含关系" },\n' +
//   '{ "source": 1, "target": 4, "rela": "包含", "type": "包含关系" },\n' +
//   '{ "source": 2, "target": 5, "rela": "视频课程", "type": "资源" },\n' +
//   '{ "source": 3, "target": 6, "rela": "ppt教程", "type": "资源" },\n' +
//   '{ "source": 3, "target": 7, "rela": "没关系" },\n' +
//   '{ "source": 8, "target": 9, "rela": "没关系" },\n' +
//   '{ "source": 10, "target": 5, "rela": "授课", "type": "行为" },\n' +
//   '{ "source": 11, "target": 6, "rela": "授课", "type": "行为" }\n' +
//   ']'
// document.getElementById('t2').value = t2_text;
//
// contentHook = function(item){
//   return "<div>"+item.name+"</div>"
// }
// function render() {
//   try {
//     $('svg').remove()
//     var data = {}
//     data.nodes = JSON.parse(document.getElementById("t1").value);
//     data.links = JSON.parse(document.getElementById("t2").value);
//     var config = {
//       // 鼠标mouseover后的弹窗
//       content: document.getElementById("t5").value,
//       contentHook: null,
//       // 节点配色方案（可为空)
//       nodeColor: document.getElementById("t3").value ? JSON.parse(document.getElementById("t3").value) : null,
//       // 连接线配色方案（可为空）
//       linkColor: document.getElementById("t4").value ? JSON.parse(document.getElementById("t4").value) : null,
//       width: document.getElementById("container").clientWidth,
//       height: document.getElementById("container").clientHeight
//     }
//     initKG(data, config, '#container')
//   } catch (err) {
//     Materialize.toast('渲染存在异常', 2000)
//     console.info(err)
//   }
// }
// render();

</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0,0,0,.45);
    cursor: pointer;
    transition: color .32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
