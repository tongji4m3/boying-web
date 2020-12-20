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
          :data="
            tableData.filter(
              (data) => data.status == activeIndex - 1 || activeIndex == 1
            )
          "
          v-loading="loading"
          style="width: 100%"
        >
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
                style="float: left; margin-left: 10px"
                >查看订单</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="Delete(scope.$index, scope.row)"
                style="float: right; margin-right: 10px"
                >删除订单</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pageNum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total=totalRecord
    >
    </el-pagination>
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
        pageSize: 5,
        currentPage:1,
        totalRecord:0,
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
    handleSizeChange(val) {
      this.page.pageSize=val;
        this.page.pageNum=1;
      this.reload();

      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.pageNum=val
      this.reload();
      console.log(`当前页: ${val}`);
    },
    //选择不同类型的订单显示在订单列表
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.activeIndex = key;
      console.log(this.activeIndex);
    },

    handleInfo(index, row) {
      this.$router.push({
        path: "/orderDetails",
        query: { orderId: row.orderId },
      });
    },

    Delete(index, row) {
      this.$confirm("此操作将删除该订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.handleDelete(index, row);
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async handleDelete(index, row) {
      try {
        const res = await axios.post(
          this.$api.deleteUserOrder + "/" + row.orderId
        );
        console.log("删除订单");
        console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.reload();
        }
      } catch (err) {
        console.log(err);
      }
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
        const res = await axios.post(this.$api.getOrderListUrl, {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
        });
        console.log(res);
        if (res.data.code == 200) {
          this.tableData = res.data.data.list;
          this.page.totalRecord=this.tableData.length;
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
        if (res.data.message == "当前用户无订单!") {
          this.tableData = null;
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

    dataFilter(data) {},
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