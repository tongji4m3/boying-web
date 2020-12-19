<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">所有订单</el-menu-item>
      <el-menu-item index="2">待评价</el-menu-item>
      <el-menu-item index="3">已完成</el-menu-item>
      <el-menu-item index="4">已退订单</el-menu-item>
    </el-menu>
    <div>
      <el-card
        class="operate-container"
        shadow="never"
        style="text-align: left"
      >
        <i class="el-icon-tickets"></i>
        <span>订单列表</span>
      </el-card>
      <div class="table-container">
        <el-table
          :key="key"
          :data="tableData"
          v-loading="loading"
          style="width: 100%"
        >
          <!-- <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单编号">
                  <span>{{ props.row.orderId }}</span>
                </el-form-item>
                <el-form-item label="用户账号">
                  <span>{{ props.row.userId }}</span>
                </el-form-item>
                <el-form-item label="演出编号">
                  <span>{{ props.row.showId }}</span>
                </el-form-item>
                <el-form-item label="演出名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="订单状态">
                  <span>{{ props.row.realStatus }}</span>
                </el-form-item>
                <el-form-item label="订单提交时间">
                  <span>{{ props.row.time | formatDateTime }}</span>
                </el-form-item>
                <el-form-item label="订单总金额">
                  <span>{{ props.row.money }}</span>
                </el-form-item>
                <el-form-item label="演出场次编号">
                  <span>{{ props.row.showSessionId }}</span>
                </el-form-item>
                <el-form-item label="订单支付方式">
                  <span>{{ props.row.payment }}</span>
                </el-form-item>
                <el-form-item label="订单地址编号">
                  <span>{{ props.row.addressId }}</span>
                </el-form-item>
                <el-form-item label="该订单对用户是否可见">
                  <span>{{ props.row.userDelete }}</span>
                </el-form-item>
                <el-form-item label="订单所含票数">
                  <span>{{ props.row.ticketCount }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column> -->
          <el-table-column label="订单编号" prop="orderId"> </el-table-column>
          <el-table-column label="用户账号" prop="userId"> </el-table-column>
          <el-table-column label="演出名称" prop="name"> </el-table-column>
          <el-table-column label="订单状态" prop="realStatus">
          </el-table-column>
          <el-table-column label="订单提交时间" align="center">
            <template slot-scope="scope">{{
              scope.row.time | formatDateTime
            }}</template>
          </el-table-column>

          <el-table-column label="订单总金额" prop="money" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="handleInfo(scope.$index, scope.row)"
                style="float: left"
                >查看订单</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                style="float: right"
                >删除订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "@/utils/date";
const fields = [
  { label: "订单编号", prop: "orderId" },
  { label: "用户账号", prop: "userId" },
  { label: "演出编号", prop: "showId" },
  { label: "演出名称", prop: "name" },
  { label: "订单状态编号", prop: "status" },
  { label: "订单状态", prop: "realStatus" },
  { label: "订单提交时间", prop: "time" },
  { label: "订单总金额", prop: "money" },

  // //展开行功能多出的内容
  // { label: "演出场次编号", prop: "showSessionId" },
  // { label: "订单支付方式", prop: "payment" },
  // { label: "订单地址编号", prop: "addressId" },
  // { label: "该订单对用户是否可见", prop: "userDelete" },
  // { label: "订单所含票数", prop: "ticketCount" },
];
export default {
  name: "",
  props: [""],
  data() {
    return {
      activeIndex: "1",
      tableData: [],
      search: "",
      key: 1, // table key
      formThead: fields, // 默认表头 Default header
      loading: true,
      OrderState: ["待评价", "已完成", "已退订单"],
      page: {
        pageNum: 1,
        pageSize: 3,
      },
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    this.reload();
  },

  methods: {
    //选择不同类型的订单显示在订单列表
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

    handleInfo(index,row){
      this.$router.push({path:'/orderDetails',query:{orderId:row.orderId}})
    },

    async getShowName(id, i) {
      try {
        console.log("for循环内根据showId查演出名称");
        const res = await axios.post(this.$api.getShowName + "/" + id);
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data.name);
          this.tableData[i].name = res.data.data.name;
          this.$set(this.tableData, i, this.tableData[i]);
          console.log(this.tableData[i].name);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async reload() {
      try {
        console.log("mounted");
        const res = await axios.post(this.$api.getOrderListUrl, this.page);
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].status == 1) {
              this.tableData[i].realStatus = "待评价";
            } else if (this.tableData[i].status == 2) {
              this.tableData[i].realStatus = "已完成";
            } else {
              this.tableData[i].realStatus = "已退订单";
            }
            this.getShowName(this.tableData[i].showId, i);
          }
        }
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } catch (err) {
        console.log(err);
      }
    },
  },

  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },

  watch: {},
};
</script>
<style scoped>
.demo-table-expand {
  font-size: 0;
}
/* 这个css未生效 也可能这三个都未生效*/
.demo-table-expand .label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>