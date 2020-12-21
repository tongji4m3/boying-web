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
            <div class="minor-text" v-if="show.dayStart!=undefined &&show.dayEnd!=undefined">
              <div class="showAddress">演出城市:{{ show.city }}</div>
              <br />
              演出时间:{{ show.dayStart.substring(0, 10) }}~{{show.dayEnd.substring(0, 10)}}
            </div>
            <div class="tip">
              <i class="el-icon-info"></i>
              演出时间和场次时间均为演出当地时间
            </div>
            <br />
            <div>
              场次 
              <div v-for="session in sessionList" :key="session">
              <el-radio-button>{{session.startTime}}-{{session.endTime}}</el-radio-button></div>
            </div>
            ¥{{ show.minPrice }}起
          </el-col>
        </div>
      </el-card>
      <el-card> 演出详情 </el-card>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  props: [""],
  data() {
    return {
      loading: true,
      showId: "",
      show: {},
      sessionList:[],
    };
  },

  async created() {
    this.showId = this.$route.query.showId;
    await this.getShow();
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

    async getShowSession(){
      try {
        const res = await axios.post(
          this.$api.getShowSessionUrl,{
            showId: this.showId,
            pageNum: 1,
            pageSize: 10,
          }
        );
        console.log(res);
        if (res.data.code === 200) {
          this.sessionList = res.data.data;
        }
      } catch (err) {
        console.log(err);
        this.$message.error("获取演出场次信息失败");
      }
    }
  },

  watch: {},
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

.minor-text{
  color:#909399;
}

.tip{
  padding-top:20px;
  color:#C0C4CC;
  font-size: 5px;
}
</style>