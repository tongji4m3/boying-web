<template>

    <!--    页面布局-->
    <el-container class="home-container">
        <!--        头部区域-->
        <el-header>
            <div class="out-button">
                <el-dropdown>
                    <el-badge is-dot class="item" :hidden="showDot">
                        <el-avatar :src="imgUrl"><span class="el-dropdown-link" style="margin-right: 15px">
                         </span></el-avatar>
                    </el-badge>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="selfInformation">个人信息</el-dropdown-item>
                        <el-dropdown-item @click.native="accountManagement">账号设置</el-dropdown-item>
                        <el-dropdown-item @click.native="orderManagement">订单管理</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <!--        页面主体-->
        <el-container>
            <!--            内容主体-->
            <el-main style="padding-left: 35px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data()
    {
        return {
            showDot: false,
            username: window.sessionStorage.getItem('name'),
            // imgUrl: 'https://tongji4m3.oss-cn-beijing.aliyuncs.com/f_f_object_156_s512_f_object_156_0.png'
            imgUrl: window.sessionStorage.getItem('imgUrl'),

        }
    },
    mounted()
    {
        this.$nextTick(() =>
        {
            setInterval(this.CurentTime, 1000);
        })
    },
    methods: {
        CurentTime()
        {
            let loginTime = window.sessionStorage.getItem('loginTime');
            if (loginTime!=null && new Date().getTime() - loginTime > 7200000)//2*60*60*1000 两小时
            {
                this.$message.success("太久未登录,强制退出!");
                this.logout();
            }
        },
        //退出按钮
        logout()
        {
            window.sessionStorage.clear();
            this.$router.push("/index")
        },

        selfInformation()
        {
            this.$router.push("/")
        },
        accountManagement()
        {
            this.showDot = true;
            this.$router.push("/")
        },
        orderManagement()
        {
            this.showDot = true;
            this.$router.push("/")
        },
        goIndex()
        {
            this.$router.push("/index")
        },
        handleCommand(command)
        {
            this.showDot = true;
        }
    }
};
</script>

<style scoped>
#clock {
    color: white;
    margin-right: 30px;
}

#username-div {
    font-size: 20px;
    font-weight: bold;
    font-family: 楷体;
}

#exit-div {
    text-align: center;
    font-weight: bold;
}

.home-container {
    height: 100%;
}

.el-header {
    background-color: rgb(43, 43, 43);
    display: flex;
    justify-content: space-between;
    margin-left: 0;
    padding-left: 0;

}

.el-aside {
    /*background-color: gray;*/
    background-color: rgb(239, 239, 239);
}

.el-main {
    /*background-color: lightgoldenrodyellow;*/
    background-color: rgb(255, 255, 255);
}

.out-button {
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-icon-arrow-down {
    font-size: 12px;
}

</style>
