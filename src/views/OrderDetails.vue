<template>
  <div class="detail-container">
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger"
          >当前订单状态：{{ order.status | formatStatus }}</span
        >
        <div
          class="operate-button-container"
          v-show="order.status === 1 || 2 || 3"
        >
          <el-button size="mini" @click="handleDeleteOrder">删除订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status === 1">
          <el-button size="mini" @click="showMarkOrderDialog"
            >评价订单</el-button
          >
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">用户账号</el-col>
          <el-col :span="4" class="table-cell-title">观影人编号</el-col>
          <el-col :span="4" class="table-cell-title">购买票数</el-col>
          <el-col :span="4" class="table-cell-title">票种</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{ order.orderId }}</el-col>
          <el-col :span="4" class="table-cell">{{ order.userId }}</el-col>
          <el-col :span="4" class="table-cell">{{ order.frequentId }}</el-col>
          <el-col :span="4" class="table-cell">{{ order.ticketCount }}</el-col>
          <el-col :span="4" class="table-cell">{{
            isTicket | formatTicket
          }}</el-col>
          <el-col :span="4" class="table-cell">{{ order.payment }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">订单提交时间</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{
            order.time | formatDateTime
          }}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px" v-show="isTicket">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout" v-show="isTicket">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{ receiver.receiver }}</el-col>
          <el-col :span="6" class="table-cell">{{ receiver.phone }}</el-col>
          <el-col :span="6" class="table-cell">{{ address }}</el-col>
        </el-row>
      </div>

      <!-- <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">演出信息</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderItemList"
        style="width: 100%; margin-top: 20px"
        border
      >
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>{{ scope.row.productName }}</p>
            <p>品牌：{{ scope.row.productBrand }}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.productPrice }}</p>
            <p>货号：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productAttr | formatProductAttr }}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.productQuantity }}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{ scope.row.productPrice * scope.row.productQuantity }}
          </template>
        </el-table-column>
      </el-table>
      <div style="float: right; margin: 20px">
        合计：<span class="color-danger">￥{{ order.totalAmount }}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >￥{{ order.freightAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.discountAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ order.totalAmount + order.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                order.payAmount + order.freightAmount - order.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      <!-- </div> -->
    </el-card>
    <!-- <el-dialog
      title="修改收货人信息"
      :visible.sync="receiverDialogVisible"
      width="40%"
    >
      <el-form :model="receiverInfo" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="收货人姓名：">
          <el-input
            v-model="receiverInfo.receiverName"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input v-model="receiverInfo.receiverPhone" style="width: 200px">
          </el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input
            v-model="receiverInfo.receiverPostCode"
            style="width: 200px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域：">
          <v-distpicker
            :province="receiverInfo.receiverProvince"
            :city="receiverInfo.receiverCity"
            :area="receiverInfo.receiverRegion"
            @selected="onSelectRegion"
          ></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input
            v-model="receiverInfo.receiverDetailAddress"
            type="textarea"
            rows="3"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="receiverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateReceiverInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="修改费用信息"
      :visible.sync="moneyDialogVisible"
      width="40%"
    >
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >￥{{ order.totalAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.freightAmount" size="mini"
              ><template slot="prepend">￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.couponAmount }}</el-col
          >
          <el-col :span="6" class="table-cell"
            >-￥{{ order.integrationAmount }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell"
            >-￥{{ order.promotionAmount }}</el-col
          >
          <el-col :span="6" class="table-cell">
            <el-input v-model.number="moneyInfo.discountAmount" size="mini"
              ><template slot="prepend">-￥</template></el-input
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{ order.totalAmount + moneyInfo.freightAmount }}</span
            >
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger"
              >￥{{
                order.payAmount +
                moneyInfo.freightAmount -
                moneyInfo.discountAmount
              }}</span
            >
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moneyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateMoneyInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="发送站内信"
      :visible.sync="messageDialogVisible"
      width="40%"
    >
      <el-form :model="message" ref="receiverInfoForm" label-width="150px">
        <el-form-item label="标题：">
          <el-input v-model="message.title" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input v-model="message.content" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSendMessage">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="关闭订单" :visible.sync="closeDialogVisible" width="40%">
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="closeInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrder">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="备注订单"
      :visible.sync="markOrderDialogVisible"
      width="40%"
    >
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input v-model="markInfo.note" type="textarea" rows="3">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog> -->
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "@/utils/date";
export default {
  name: "",
  props: [""],
  data() {
    return {
      isTicket: false, //是不是实体票,默认为电子票
      orderId: "",
      address: "",
      order: {},
      receiver: {},
      show: {},
    };
  },

  async created() {
    this.orderId = this.$route.query.orderId;
    await this.getOrderDetails(this.orderId);
    await this.getReceiver(this.order.addressId);
    await this.getShowInfo(this.order.showId);
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getOrderDetails(id) {
      try {
        console.log("订单详情");
        const res = await axios.post(this.$api.getOrderDetailsUrl + "/" + id);
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.order = res.data.data;
          console.log(this.order);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getReceiver(id) {
      try {
        console.log("收货人信息");
        const res = await axios.post(this.$api.getAddressUrl + "/" + id);
        console.log(res);
        if (res.data.code == 200) {
          console.log(res.data.data);
          this.receiver = res.data.data;
          console.log(this.receiver);
          this.address =
            this.receiver.province +
            " " +
            this.receiver.city +
            " " +
            this.receiver.region +
            " " +
            this.receiver.street +
            " " +
            this.receiver.details;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getShowInfo(id) {
      if (id === undefined || id === null || id === "") {
        isTicket = false;
      } else {
        this.isTicket = true;

        try {
          console.log("演出详情");
          const res = await axios.post(this.$api.getShowDetails + "/" + id);
          console.log(res);
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.show = res.data.data;
            console.log(this.show);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
  },

  watch: {},

  filters: {
    formatStatus(value) {
      if (value === 1) {
        return "待评价";
      } else if (value === 2) {
        return "已完成";
      } else if (value === 3) {
        return "已退订单";
      }
    },
    formatTicket(value) {
      if (value === false) {
        return "电子票";
      } else if (value === true) {
        return "实体票";
      }
    },
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
  },
};
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}
.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}
.operate-button-container {
  float: right;
  margin-right: 20px;
}
.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}
.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}
.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>