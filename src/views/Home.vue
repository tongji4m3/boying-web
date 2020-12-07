<template>

    <el-container>
        <el-backtop :bottom="60" :right="60">
        </el-backtop>
        <el-header>
            <div>
            </div>
            <div class="out-button">
                <el-dropdown>
                    <span class="el-dropdown-link" style="margin-right: 15px">

                        <el-badge is-dot class="item">
                         <el-avatar></el-avatar>
                        </el-badge>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="navigation-text" id="username-div"></el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="changePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="systemNotice">系统公告</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" @click.native="goIndex">回到首页</el-dropdown-item>
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register">注册</router-link>
                        <el-dropdown-item class="navigation-text" to="/login">登录</el-dropdown-item>
                        <el-dropdown-item class="navigation-text" id="exit-div" divided @click.native="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-main>
            <!--            走马灯-->
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
            <!--            种类分类-->
            <el-card shadow="never">
                <el-row>
                    <el-col :span="3" v-for="corporation in corporationsList">
                        <!--                    <el-card class="myCard" :body-style="{ padding: '20px'}" shadow="hover">-->
                        <!--                        {{corporation}}-->
                        <!--                    </el-card>-->
                        <div style="text-align: center">
                            <i class="el-icon-share"></i>
                            <br>
                            {{corporation}}
                        </div>
                    </el-col>
                </el-row>
            </el-card>
            <br>
            <!--            每个分类-->
            <div v-for="corporation in corporationsList">
                <el-card shadow="never">
                    {{corporation}}
                    <br><br><br><br><br><br><br><br><br>
                </el-card>
                <br>
            </div>
        </el-main>
        <div id="foot">
            <span id="shineText">石稼晟 1851632 19946254167 1171011192</span>
        </div>
    </el-container>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            corporationsList: ["演唱会","话剧歌剧","体育","展览休闲","音乐会","曲苑杂坛","舞蹈芭蕾","二次元"]
        }
    }
}
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

#foot {
    height: 200px;
    background: rgb(0, 0, 0);
    position: relative;
}

#shineText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px 78px;
    color: #ffffff;
    background: linear-gradient(to right, #4d4d4d 0, #fff 10%, #4d4d4d 20%);
    background-position: 0;
    -webkit-background-clip: text;
    /*background-clip: text;*/
    -webkit-text-fill-color: transparent;
    animation: shine 5.5s linear infinite;
    font-weight: 500;
    font-size: 26px;
    white-space: nowrap;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>