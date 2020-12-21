<template>
  <div>
    <el-container v-loading="loading">
      <el-backtop :bottom="60" :right="60"> </el-backtop>
      <el-card class="firstCard">
        <img width="200" height="280" :src="show.poster" class="image" />
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
            ¥{{ show.minPrice }}起
          </el-col>
        </div>
      </el-card>
      <br/>
      <el-card> 演出详情 </el-card>
    </el-container>
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
    };
  },

  async created() {
    this.showId = this.$route.query.showId;
    await this.getShow();
    await this.getShowSession();
    console.log(this.showId);
    setTimeout(() => {
      this.loading = false;
    }, 500);
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    sessionChange() {
      console.log(this.sessionSelected);
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
}

.image {
  float: left;
}

.text {
  float: right;
  margin-left: 60px;
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

/* 改radio-goupe的填充不起作用 */
.sessionGroup {
  fill: #67c23a;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
</style>