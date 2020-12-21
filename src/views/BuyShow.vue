<template>
  <div>
    <el-card v-loading="loading">
      <el-backtop :bottom="60" :right="60"> </el-backtop>
      <el-card class="firstCard">
        <img width="300" height="430" :src="show.poster" class="image" />
        <div class="text">
          <el-col :span="25">
            <div class="showName">
              <h2>{{ show.name }}</h2>
            </div>
            <br />
            <div
              class="minor-text"
              v-if="show.dayStart != undefined && show.dayEnd != undefined"
            >
              <div class="showAddress">演出城市:{{ show.city }}</div>
              <br />
              演出时间:{{ show.dayStart.substring(0, 10) }}~{{
                show.dayEnd.substring(0, 10)
              }}
            </div>
            <div class="tip">
              <i class="el-icon-info"></i>
              演出时间和场次时间均为演出当地时间
            </div>
            <br />
            <div>
              场次
              <el-radio-group
                v-model="sessionSelected"
                @change="sessionChange()"
                class="sessionGroup"
                v-for="session in sessionList"
                :key="session.showSessionId"
              >
                <el-radio-button
                  :label="session.showSessionId"
                  class="sessionRadioButton"
                  >{{ session.startTime | formatDateTime }}-{{
                    session.endTime | formatDateTime
                  }}</el-radio-button
                >
                <br />
              </el-radio-group>
            </div>
            <div v-show="this.classList != []||this.classList.length==0">
              票种
              <el-radio-group
                v-model="showClassSelected"
                @change="classChange()"
                class="classGroup"
                v-for="showclass in classList"
                :key="showclass.showClassId"
              >
                <el-radio-button
                  :label="showclass.showClassId"
                  class="classRadioButton"
                  >{{ showclass.name }} 票价:{{ showclass.price }}
                </el-radio-button>
                <br />
              </el-radio-group>
            </div>
            <div>
              最终价格
            </div>
            <div v-show="this.priceSelected==null">
            ¥{{ show.minPrice }}</div>
            <div v-show="this.priceSelected!=null">
              ¥{{ this.finalPrice }}
            </div>
          </el-col>
        </div>
      </el-card>
      <br />
      <el-card> 演出详情 </el-card>
    </el-card>
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
      sessionList: [],
      sessionSelected: "",
      classList: [],
      showClassSelected: "",
      priceSelected:null,
      finalPrice:null,
    };
  },

  async created() {
    this.showId = this.$route.query.showId;
    await this.getShow();
    await this.getShowSession();
    await this.getShowClass();
    console.log(this.showId);
    setTimeout(() => {
      this.loading = false;
    }, 500);
    console.log(this.classList)
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    sessionChange() {
      console.log(this.sessionSelected);
      this.getShowClass();
    },
    classChange() {
      console.log(this.showClassSelected);
      this.priceSelected=this.classList[this.showClassSelected-1].price;
      this.finalPrice=this.show.minPrice+this.priceSelected;
    },
    async getShow() {
      try {
        const res = await axios.post(
          this.$api.getShowDetails + "/" + this.showId
        );
        console.log(res);
        if (res.data.code === 200) {
          this.show = res.data.data;
        }
      } catch (err) {
        console.log(err);
        this.$message.error("获取演出信息失败");
      }
    },

    async getShowSession() {
      try {
        const res = await axios.post(this.$api.getShowSessionUrl, {
          showId: this.showId,
          pageNum: 1,
          pageSize: 10,
        });
        console.log(res);
        if (res.data.code === 200) {
          this.sessionList = res.data.data.list;
          this.sessionSelected = this.sessionList[0].showSessionId;
        }
      } catch (err) {
        console.log(err);
        this.$message.error("获取演出场次信息失败");
      }
    },

    async getShowClass() {
      try {
        const res = await axios.post(this.$api.getShowClassUrl, {
          sessionId: this.sessionSelected,
          pageNum: 1,
          pageSize: 10,
        });
        console.log(res);
        if (res.data.code === 200) {
          this.classList = res.data.data.list;
          this.showClassSelected = this.classList[0].showClassId;
        }
      } catch (err) {
        console.log(err);
        this.$message.error("获取演出票种失败");
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
  float: right;
  padding-right: 200px;
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
}

.el-radio-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}

.classGroup{
  margin-right: 20px;
}
</style>