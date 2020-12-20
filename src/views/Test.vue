<!--&lt;!&ndash;<template>&ndash;&gt;-->

<!--&lt;!&ndash;    &lt;!&ndash;    页面布局&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;    <el-container class="home-container">&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash;        头部区域&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-header>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="out-button">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-dropdown>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-badge is-dot class="item" :hidden="showDot">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-avatar :src="imgUrl"><span class="el-dropdown-link" style="margin-right: 15px">&ndash;&gt;-->
<!--&lt;!&ndash;                         </span></el-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-badge>&ndash;&gt;-->
<!--&lt;!&ndash;                    <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-dropdown-menu slot="dropdown">&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-dropdown-item @click.native="selfInformation">个人信息</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-dropdown-item @click.native="accountManagement">账号设置</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                        <el-dropdown-item @click.native="orderManagement">订单管理</el-dropdown-item>&ndash;&gt;-->
<!--&lt;!&ndash;                    </el-dropdown-menu>&ndash;&gt;-->
<!--&lt;!&ndash;                </el-dropdown>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-header>&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash;        页面主体&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <el-container>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash;            内容主体&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <el-main style="padding-left: 35px">&ndash;&gt;-->
<!--&lt;!&ndash;                <router-view></router-view>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-main>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-container>&ndash;&gt;-->
<!--&lt;!&ndash;    </el-container>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script>&ndash;&gt;-->
<!--&lt;!&ndash;export default {&ndash;&gt;-->
<!--&lt;!&ndash;    data()&ndash;&gt;-->
<!--&lt;!&ndash;    {&ndash;&gt;-->
<!--&lt;!&ndash;        return {&ndash;&gt;-->
<!--&lt;!&ndash;            showDot: false,&ndash;&gt;-->
<!--&lt;!&ndash;            username: window.sessionStorage.getItem('name'),&ndash;&gt;-->
<!--&lt;!&ndash;            // imgUrl: 'https://tongji4m3.oss-cn-beijing.aliyuncs.com/f_f_object_156_s512_f_object_156_0.png'&ndash;&gt;-->
<!--&lt;!&ndash;            imgUrl: window.sessionStorage.getItem('imgUrl'),&ndash;&gt;-->

<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    mounted()&ndash;&gt;-->
<!--&lt;!&ndash;    {&ndash;&gt;-->
<!--&lt;!&ndash;        this.$nextTick(() =>&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            setInterval(this.CurentTime, 1000);&ndash;&gt;-->
<!--&lt;!&ndash;        })&ndash;&gt;-->
<!--&lt;!&ndash;    },&ndash;&gt;-->
<!--&lt;!&ndash;    methods: {&ndash;&gt;-->
<!--&lt;!&ndash;        CurentTime()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            let loginTime = window.sessionStorage.getItem('loginTime');&ndash;&gt;-->
<!--&lt;!&ndash;            if (loginTime!=null && new Date().getTime() - loginTime > 7200000)//2*60*60*1000 两小时&ndash;&gt;-->
<!--&lt;!&ndash;            {&ndash;&gt;-->
<!--&lt;!&ndash;                this.$message.success("太久未登录,强制退出!");&ndash;&gt;-->
<!--&lt;!&ndash;                this.logout();&ndash;&gt;-->
<!--&lt;!&ndash;            }&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        //退出按钮&ndash;&gt;-->
<!--&lt;!&ndash;        logout()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            window.sessionStorage.clear();&ndash;&gt;-->
<!--&lt;!&ndash;            this.$router.push("/index")&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->

<!--&lt;!&ndash;        selfInformation()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            this.$router.push("/")&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        accountManagement()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            this.showDot = true;&ndash;&gt;-->
<!--&lt;!&ndash;            this.$router.push("/")&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        orderManagement()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            this.showDot = true;&ndash;&gt;-->
<!--&lt;!&ndash;            this.$router.push("/")&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        goIndex()&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            this.$router.push("/index")&ndash;&gt;-->
<!--&lt;!&ndash;        },&ndash;&gt;-->
<!--&lt;!&ndash;        handleCommand(command)&ndash;&gt;-->
<!--&lt;!&ndash;        {&ndash;&gt;-->
<!--&lt;!&ndash;            this.showDot = true;&ndash;&gt;-->
<!--&lt;!&ndash;        }&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;#clock {&ndash;&gt;-->
<!--&lt;!&ndash;    color: white;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-right: 30px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;#username-div {&ndash;&gt;-->
<!--&lt;!&ndash;    font-size: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;    font-family: 楷体;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;#exit-div {&ndash;&gt;-->
<!--&lt;!&ndash;    text-align: center;&ndash;&gt;-->
<!--&lt;!&ndash;    font-weight: bold;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.home-container {&ndash;&gt;-->
<!--&lt;!&ndash;    height: 100%;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.el-header {&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgb(43, 43, 43);&ndash;&gt;-->
<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    justify-content: space-between;&ndash;&gt;-->
<!--&lt;!&ndash;    margin-left: 0;&ndash;&gt;-->
<!--&lt;!&ndash;    padding-left: 0;&ndash;&gt;-->

<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.el-aside {&ndash;&gt;-->
<!--&lt;!&ndash;    /*background-color: gray;*/&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgb(239, 239, 239);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.el-main {&ndash;&gt;-->
<!--&lt;!&ndash;    /*background-color: lightgoldenrodyellow;*/&ndash;&gt;-->
<!--&lt;!&ndash;    background-color: rgb(255, 255, 255);&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.out-button {&ndash;&gt;-->
<!--&lt;!&ndash;    display: flex;&ndash;&gt;-->
<!--&lt;!&ndash;    justify-content: center;&ndash;&gt;-->
<!--&lt;!&ndash;    align-items: center;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;.el-icon-arrow-down {&ndash;&gt;-->
<!--&lt;!&ndash;    font-size: 12px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<template>-->
<!--    <el-table-->
<!--        :data="tableData"-->
<!--        style="width: 100%"-->
<!--        :row-class-name="tableRowClassName">-->
<!--        <el-table-column-->
<!--            prop="date"-->
<!--            label="日期"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="name"-->
<!--            label="姓名"-->
<!--            width="180">-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--            prop="address"-->
<!--            label="地址">-->
<!--        </el-table-column>-->
<!--    </el-table>-->
<!--</template>-->

<!--<style>-->
<!--.el-table .warning-row {-->
<!--    background: oldlace;-->
<!--}-->

<!--.el-table .success-row {-->
<!--    background: #f0f9eb;-->
<!--}-->
<!--</style>-->

<!--<script>-->
<!--export default {-->
<!--    methods: {-->
<!--        tableRowClassName({row, rowIndex}) {-->
<!--            if (rowIndex === 1) {-->
<!--                return 'warning-row';-->
<!--            } else if (rowIndex === 3) {-->
<!--                return 'success-row';-->
<!--            }-->
<!--            return '';-->
<!--        }-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            tableData: [{-->
<!--                date: '2016-05-02',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1518 弄',-->
<!--            }, {-->
<!--                date: '2016-05-04',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1518 弄'-->
<!--            }, {-->
<!--                date: '2016-05-01',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1518 弄',-->
<!--            }, {-->
<!--                date: '2016-05-03',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1518 弄'-->
<!--            }]-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</script>-->