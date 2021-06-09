<template>
  <div>
    <el-card v-loading="loading">
      <el-backtop :bottom="60" :right="60"> </el-backtop>
      <el-card
        style="width: 80%; margin: auto"
        :body-style="{ padding: '30px' }"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <img width="300" height="430" :src="show.poster" class="image" />
            </div>
          </el-col>
          <el-col :span="16">
            <div class="text">
              <div class="showName">
                <h2>{{ show.name }}</h2>
              </div>
              <br />
              <div
                class="minor-text"
                v-if="show.startTime != undefined && show.endTime != undefined"
              >
                <div class="showAddress">
                  <i
                    class="myicon myiconchengshi"
                    style="padding-right: 7px"
                  ></i
                  >演出城市:{{ show.city }}
                </div>
                <br /><i
                  class="myicon myiconshijian"
                  style="padding-right: 3px"
                ></i>
                演出时间:{{ show.startTime }}~{{ show.endTime }}
              </div>
              <div class="tip">
                <i class="el-icon-info" style="padding-right: 3px"></i>
                演出时间和场次时间均为演出当地时间
              </div>
              <br />
              <!-- <div class="fundText">¥基础票价:{{ show.minPrice }}</div> -->
              <div v-show="this.classList != [] && this.classList.length != 0">
                <div class="fundText">
                  <i
                    class="myicon myiconpiaozhong"
                    style="padding-right: 3px"
                  ></i
                  >票种
                </div>
                <el-radio-group
                  v-model="showClassSelected"
                  @change="classChange()"
                  class="classGroup"
                  v-for="showclass in classList"
                  :key="showclass.id"
                >
                  <el-radio-button
                    :label="showclass.id"
                    class="classRadioButton"
                    v-if="showclass.promoStatus != 2"
                    >{{ showclass.name }} 票价:￥{{ showclass.price }} 票量：{{
                      showclass.stock
                    }}
                    / {{ showclass.capacity }}
                  </el-radio-button>
                  <el-radio-button
                    :label="showclass.id"
                    class="classRadioButton"
                    v-if="showclass.promoStatus == 2"
                    >{{ showclass.name }} 原票价:￥{{
                      showclass.price
                    }}
                    活动价:￥{{ showclass.promoPrice }} 票量：{{
                      showclass.stock
                    }}
                    / {{ showclass.capacity }}
                  </el-radio-button>
                  <!-- <br /> -->
                </el-radio-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <div v-show="this.priceSelected != null">
        <br />
        <el-card style="width: 80%; margin: auto" class="Buy">
          <div v-show="this.priceSelected != null" class="finalPrice">
            票数:
            <el-input-number
              v-model="count"
              :min="1"
              :max="3"
              @change="changeCount"
            ></el-input-number>
            最终价格: ¥{{ this.finalPrice }}
            <el-button
              type="danger"
              icon="myicon myicontubiaozhizuomoEban"
              @click="buyTicket"
              v-if="this.judge == false"
              disabled
            >
              已购票，不得重复购票
            </el-button>
            <el-button
              type="danger"
              icon="myicon myicontubiaozhizuomoEban"
              @click="buyTicket"
              v-if="this.judge == true"
            >
              购票
            </el-button>
          </div>
        </el-card>
      </div>
      <br />
      <el-card style="width: 80%; margin: auto">
        <h1><i class="myicon myiconxiangqing"></i>观影须知</h1>
        <div>{{ this.show.details }}</div>
      </el-card>
    </el-card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>请选择支付方式</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="buyTicketByAli">支付宝支付</el-button>
        <el-button type="primary" @click="buyTicketByWechat"
          >微信支付</el-button
        >
      </span>
    </el-dialog>
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
      loading: true,
      showId: "",
      show: {},
      classList: [],
      showClassSelected: "",
      priceSelected: null,
      priceFinal: null,
      finalPrice: null,
      currentUser: {},
      dialogVisible: false,
      count: 1,
      promoId: 0,
      judge: true,
    };
  },

  created() {
    this.showId = this.$route.query.showId;
    this.count = 1;
    this.getShow();
    this.getShowClass();
    this.getUser();
    this.getOrderJudge();
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async getOrderJudge() {
      try {
        const res = await axios.post(
          this.$api.checkOrderUrl + "/" + this.showId
        );
        console.log(res);
        if (res.data.code === 200) {
          if (res.data.data === false) {
            this.judge = false;
          } else {
            this.judge = true;
          }
        } else {
          this.$message.error(res.data.code + res.data.message);
        }
      } catch (err) {
        this.$message.error("获取演出信息失败");
      }
    },
    changeCount() {
      for (var i of this.classList) {
        if (i.id === this.showClassSelected) {
          if (i.promoStatus == 2) {
            this.priceSelected = i.promoPrice;
          } else {
            this.priceSelected = i.price;
          }
          // this.priceSelected = i.price;
          this.priceFinal = this.priceSelected * this.count;
        }
      }
      this.finalPrice = this.priceFinal;
    },
    classChange() {
      for (var i of this.classList) {
        if (i.id === this.showClassSelected) {
          if (i.promoStatus == 2) {
            this.priceSelected = i.promoPrice;
          } else {
            this.priceSelected = i.price;
          }
          // this.priceSelected = i.price;
          this.priceFinal = this.priceSelected * this.count;
        }
      }
      // this.priceSelected = this.classList[this.showClassSelected - 1].price;
      this.finalPrice = this.priceFinal;
    },
    async getShow() {
      try {
        const res = await axios.post(
          this.$api.getShowDetails + "/" + this.showId
        );
        if (res.data.code === 200) {
          this.show = res.data.data;

          this.show.startTime = this.show.startTime.substring(0, 19);
          this.show.startTime = this.show.startTime.replace("T", " ");

          this.show.endTime = this.show.endTime.substring(0, 19);
          this.show.endTime = this.show.endTime.replace("T", " ");
        } else {
          this.$message.error(res.data.code + res.data.message);
        }
      } catch (err) {
        this.$message.error("获取演出信息失败");
      }
    },

    async getShowClass() {
      try {
        let res = await axios.post(
          this.$api.getShowSeatListUrl + "/" + this.showId
        );
        console.log(res);
        if (res.data.code === 200) {
          this.classList = res.data.data;
          this.showClassSelected = this.classList[0].id;
          if (this.classList[0].promoStatus == 2) {
            this.priceSelected = this.classList[0].promoPrice;
          } else {
            this.priceSelected = this.classList[0].price;
          }
          this.priceFinal = this.priceSelected * this.count;
          this.finalPrice = this.priceFinal;
        } else {
          this.classList = [];
          this.showClassSelected = null;
          this.$message.error(res.data.code + res.data.message);
        }
      } catch (err) {
        this.$message.error("获取演出票种失败");
      }
    },

    async getUser() {
      try {
        const res = await axios.post(this.$api.getUserUrl);
        //
        if (res.data.code === 200) {
          this.currentUser = res.data.data;
        } else {
          this.currentUser.userId = "";
          this.$message.error(res.data.code + res.data.message);
        }
      } catch (err) {
        this.$message.error("获取用户信息失败");
      }
    },

    async buyTicket() {
      this.dialogVisible = true;
    },
    async buyTicketByAli() {
      try {
        const res = await axios.post(this.$api.buyTicketUrl, {
          showId: this.showId,
          seatId: this.showClassSelected,
          count: this.count,
          payment: "支付宝",
          promoId: 0,
        });

        if (res.data.code === 200) {
          this.$message.success("购票成功!可以前往订单界面查看订单");
          await this.getShow();
          await this.getShowClass();
          await this.getUser();
          this.$forceUpdate();
          this.dialogVisible = false;
        } else {
          this.$message.warning("已经购买过该场次的票了，不允许多次抢票");
          this.dialogVisible = false;
          this.$message.error(res.data.code + res.data.message);
        }
      } catch (err) {
        this.$message.error("因未知错误购票失败");
        this.dialogVisible = false;
      }
    },
    async buyTicketByWechat() {
      try {
        const res = await axios.post(this.$api.buyTicketUrl, {
          showId: this.showId,
          seatId: this.showClassSelected,
          count: this.count,
          payment: "微信支付",
          promoId: 0,
        });

        if (res.data.code === 200) {
          this.$message.success("购票成功!可以前往订单界面查看订单");
          await this.getShow();
          await this.getShowClass();
          await this.getUser();
          this.$forceUpdate();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.code + res.data.message);
          this.dialogVisible = false;
        }
      } catch (err) {
        this.$message.error("因未知错误购票失败");
        this.dialogVisible = false;
      }
    },
  },

  watch: {},

  filters: {
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
.firstCard {
  margin-left: 230px;
  margin-right: 230px;
}

.image {
  float: left;
}

.text {
}

.minor-text {
  color: #909399;
}

.tip {
  padding-top: 20px;
  color: #c0c4cc;
  font-size: 5px;
}

.sessionRadioButton {
  margin: 10px;
}

.el-radio-button {
  margin-top: 10px;
  margin-bottom: 10px;
}

.el-radio-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-right: 120px;
}

.classGroup {
  margin-right: 290px;
}

.fundText {
  color: #606266;
  margin-top: 10px;
}

.finalPrice {
  color: #f56c6c;
  font-size: 20px;
  margin: 10px;
}

.Buy {
  margin: 30px;
}

.myiconxiangqing {
  font-size: 25px;
  padding-right: 5px;
}
</style>
