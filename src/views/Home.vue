<template>
  <div>
    <el-container v-loading="loading">
      <el-backtop :bottom="60" :right="60"> </el-backtop>
      <el-header v-show="currentUser.userId != ''">
        <div></div>
        <div class="out-button">
          <el-dropdown>
            <span class="el-dropdown-link" style="margin-right: 15px">
              <el-badge is-dot class="item">
                <el-avatar :src="currentUser.icon"></el-avatar>
              </el-badge>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                class="navigation-text"
                id="username-div"
              ></el-dropdown-item>
              <el-dropdown-item
                class="navigation-text"
                @click.native="changePassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item
                class="navigation-text"
                @click.native="systemNotice"
                >系统公告</el-dropdown-item
              >
              <el-dropdown-item
                class="navigation-text"
                @click.native="toSelfInformation"
                >我的信息</el-dropdown-item
              >
              <el-dropdown-item class="navigation-text" @click.native="toOrder"
                >我的订单</el-dropdown-item
              >
              <el-dropdown-item
                class="navigation-text"
                id="exit-div"
                divided
                @click.native="logout"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!--            走马灯-->
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <!--            种类分类-->
        <el-card shadow="never">
          <el-row>
            <el-col :span="3" v-for="category in categoryList">
              <!--                    <el-card class="myCard" :body-style="{ padding: '20px'}" shadow="hover">-->
              <!--                        {{category}}-->
              <!--                    </el-card>-->
              <div style="text-align: center">
                <i class="el-icon-share"></i>
                <br />
                {{ category.name }}
              </div>
            </el-col>
          </el-row>
        </el-card>
        <br />
        <!--            每个分类-->
        <div v-for="(childrenList, i) in showList" :key="i">
          <el-card shadow="never">
            {{ translateList[i] }}：
            <el-row :gutter="40">
              <el-col :span="8" v-for="(show, j) in childrenList" :key="j">
                <el-card
                  class="myCard"
                  :body-style="{ padding: '10px' }"
                  shadow="hover"
                >
                  <el-col :span="10">
                    <img
                      width="100"
                      height="140"
                      :src="show.poster"
                      class="image"
                    />
                  </el-col>
                  <el-col :span="14">
                    {{ show.name }}
                    <br />
                    {{ show.city }}
                    <br />
                    {{ show.dayStart.substring(0, 10) }}~{{
                      show.dayEnd.substring(0, 10)
                    }}
                    <br />
                    ¥{{ show.minPrice }}起
                  </el-col>
                </el-card>
              </el-col>
            </el-row>
          </el-card>
          <br />
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: "Home",
    data() {
        return {
            loading:true,
            categoryCommand: 0,
            categoryList: [],
            showList: [],
            translateList: [],
            // translateList: ["演唱会","话剧歌剧","体育","展览休闲","音乐会","曲苑杂坛","舞蹈芭蕾","二次元"],

            currentUser: {
                userId: "",
                icon: "",
            },
            categoryForm: {
                categoryId: "",
                parentId: "",
                name: "",
                weight: "",
                description: "",
            },

            searchForm: {
                categoryId: "",
                pageNum: 1,
                pageSize: 6,
            },
        };
    },
    created() {
        this.getCategoryList();
        this.getUser();
        setTimeout(() => {
      this.loading = false;
    }, 500);
    },
    methods: {
        toOrder() {
            this.$router.push("/order");
        },
        logout(){
            this.$router.push("/login");
            this.$message.success("退出成功")
        },
        toSelfInformation(){
            this.$router.push("/selfInformation");
        },
        async getCategoryName(id) {
            let result = await this.$http.post(
                this.$api.getCategoryNameUrl,
                JSON.stringify(id+1)
            );
            // console.log(result.data.data);
            return result.data.data;
        },
        async getCategoryList() {
            let result = await this.$http.post(
                this.$api.getCategoryListUrl,
                JSON.stringify(0)
            );
            // console.log(result)
            this.categoryList = result.data.data;
            // console.log(this.categoryList)
            this.showList.length=this.categoryList.length;
            this.translateList.length=this.categoryList.length;
            for (var i = 0; i < this.categoryList.length; i++) {
                this.showList[i] = await this.getShow(this.categoryList[i].categoryId);
                this.translateList[i] = await this.getCategoryName(this.categoryList[i].categoryId-1);
                // this.showList[i].name = this.categoryList[i].name;
            }
            console.log(this.showList);
        },
        async getShow(categoryId) {
            let result = await this.$http.post(
                this.$api.searchUrl,
                JSON.stringify({
                    categoryId: categoryId,
                    pageNum: 1,
                    pageSize: 6,
                }));

            // console.log(result);
            this.$forceUpdate();
            if(result.data.code===200)
            {
                // for (let i = 0; i < result.data.data.list.length; i++)
                // {
                //     result.data.data.list.length[i].dayEnd=result.data.data.list.length[i].dayEnd.substring(0,10);
                //     result.data.data.list.length[i].dayStart=result.data.data.list.length[i].dayStart.substring(0,10);
                // }
                console.log(result);
                return result.data.data.list;
            }

            else
                return [];
        },

        async getUser() {
            try {
                const res = await axios.post(this.$api.getUserUrl);
                console.log(res);
                if (res.data.code === 200) {
                    this.currentUser = res.data.data;
                }
                else{
                    this.currentUser.userId='';
                }
            } catch (err) {
                console.log(err);
                this.$message.error("获取用户信息失败");
            }
        },
    },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
#username-div {
  font-size: 20px;
  font-weight: bold;
}

#exit-div {
  text-align: center;
  font-weight: bold;
}

.el-header {
  background-color: rgb(43, 43, 43);
  display: flex;
  justify-content: space-between;
  margin-left: 0;
  padding-left: 0;
  width: 100%;
}

.out-button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>