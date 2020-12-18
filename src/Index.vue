<template>
    <el-container class="index-container">
        <!--        上边框-->
        <el-header>
            <div>
            </div>
            <!--            开启了路由模式-->

            <el-menu v-if="!isLogin" router
                     class="el-menu-demo" mode="horizontal" background-color="rgb(43,43,43)"
                     text-color="rgb(255,255,255)" active-text-color="#0099FF" default-active="/Welcome">
                <el-menu-item index="/home">首页</el-menu-item>
                <el-menu-item index="/login">登录</el-menu-item>
                <el-menu-item index="/register">注册</el-menu-item>
            </el-menu>
            <div class="out-button" v-if="isLogin">
                <el-menu  router
                          class="el-menu-demo" mode="horizontal" background-color="rgb(43,43,43)"
                          text-color="rgb(255,255,255)" active-text-color="#0099FF" default-active="/Welcome">
                    <el-menu-item @click.native="selfHome()">个人主页</el-menu-item>
                </el-menu>
            </div>
        </el-header>
        <!--        主体区域-->
        <el-main>
            <!--            路由占位符-->
            <router-view></router-view>
        </el-main>
        <el-footer>
<!--            <div id="foot">-->
<!--                <span id="shineText">石稼晟 1851632 19946254167 1171011192</span>-->
<!--            </div>-->
        </el-footer>
    </el-container>

</template>

<script>
export default {
    data()
    {
        return {
            isLogin: false,
            name: window.sessionStorage.getItem('name'),
        };
    },
    created()
    {
        this.name = window.sessionStorage.getItem('name');
        // console.log(this.name)
        if (this.name != null)
        {
            this.isLogin = true;
        }
    },
    methods: {
        selfHome()
        {
            // let userType = window.sessionStorage.getItem('userType');
            // console.log(userType);
            this.$router.push({path: '/home'});
        },
        login()
        {
            this.$router.push("/login");
        },
        register()
        {
            this.$router.push("/studentRegister")
        }

    }

};
</script>

<style scoped>
#username-div {
    font-size: 20px;
    font-weight: bold;
    font-family: 楷体;
}

.index-container {
    height: 100%;
}

.el-header {
    /*background-color: rgb(255,255,255);*/
    background-color: rgb(43, 43, 43);
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    /* padding-left: 0; */
}

.el-main {
    /*background-color: rgb(239,239,239);*/
    background-color: rgb(255, 255, 255);
    margin: 0;

    padding: 0;
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
</style>
