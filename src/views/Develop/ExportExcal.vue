<template>
  <div class="container">
    <a-button type @click="expost">导出Excal</a-button>
    <!--
   <a-table
      :pagination="pagination"
      :columns="columns"
      :data-source="datas"
      bordered
      :scroll="{x:1700}"
      @change="onChange"
    > 
    </a-table>
      <template slot="name" slot-scope="text">{{text}}</template>
      <div slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="add(record.key)">添加</a-button>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除嘛？" ok-text="确定" cancel-text="取消" @confirm="confirm(record.key)">
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </div>
    -->
    <s-table
      ref="table"
      bordered
      :scroll="{ x: 1200}"
      size="default"
      rowKey="key"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
        <div slot="operation" slot-scope="text, record">
        <a-button type="primary" size="small" @click="add(record.key)">添加</a-button>
        <a-divider type="vertical" />
        <a-button size="small" @click="showDrawer(record.key)">编辑</a-button>
        <a-divider type="vertical" />
        <a-popconfirm title="确定删除嘛？" ok-text="确定" cancel-text="取消" @confirm="confirm(record.key)">
          <a-button type="danger" size="small">删除</a-button>
        </a-popconfirm>
      </div>
    </s-table>
    <!--弹出层-->
     <a-drawer
      title="编辑内容"
      placement="right"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-drawer>
  </div>
</template>
<script>
import { json2excel } from "@/utils/setMethods.js";
import { serverList } from "@/api/index";
import { STable } from "@/components";
import { format } from "path";
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    width: 150,
    fixed: "left"
  },
  {
    title: "金额",
    dataIndex: "description",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo1",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo2",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo3",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo4",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo5",
    width: 150
  },
  {
    title: "简语",
    dataIndex: "callNo6",
    width: 150
  },
  {
    title: "状态",
    dataIndex: "status",
    width: 150
  },
  {
    title: "操作",
    dataIndex: "operation",
    fixed: "right",
    width: 215,
    scopedSlots: { customRender: "operation" }
  }
];

let listData = [];
export default {
  components: {
    STable
  },
  data() {
    return {
      visible:false,
      queryParam: {},
      loadData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam);
        return serverList(requestParameters).then(res => {
          listData = res.data;
          return res;
        });
      },
      columns
    };
  },
  computed: {
  },
  created() {
    // this.datas = this.rolesList.map(item => {
    //   return {
    //     key: item.id,
    //     name: item.name,
    //     money: item.money,
    //     address: item.address
    //   };
    // });
    // console.log(this.datas);
  },
  mounted() {},
  watch: {},
  methods: {
     afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      console.log(1, e);
    },
    add(item) {
      console.log(item);
    },
    confirm(e) {
      console.log(e);
    },
    expost() {
      console.log(listData);
      //注意：组装的导出excel所需要的数据结构
      let excelDatas = [
        {
          tHeader: this.columns.map(item => {
            return item.title;
          }),
          filterVal: ["name", "description", "callNo", "status"],
          tableDatas: listData,
          sheetName: "sheet5555"
        }
      ];
      //   引入的函数
      json2excel(excelDatas, "数据报表", true, "xlsx");
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
}

</style>
