<!--<template>-->

<!--    &lt;!&ndash;    页面布局&ndash;&gt;-->
<!--    <el-container class="home-container">-->
<!--        &lt;!&ndash;        头部区域&ndash;&gt;-->
<!--        <el-header>-->
<!--            <div class="out-button">-->
<!--                <el-dropdown>-->
<!--                    <el-badge is-dot class="item" :hidden="showDot">-->
<!--                        <el-avatar :src="imgUrl"><span class="el-dropdown-link" style="margin-right: 15px">-->
<!--                         </span></el-avatar>-->
<!--                    </el-badge>-->
<!--                    <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--                    <el-dropdown-menu slot="dropdown">-->
<!--                        <el-dropdown-item @click.native="selfInformation">个人信息</el-dropdown-item>-->
<!--                        <el-dropdown-item @click.native="accountManagement">账号设置</el-dropdown-item>-->
<!--                        <el-dropdown-item @click.native="orderManagement">订单管理</el-dropdown-item>-->
<!--                    </el-dropdown-menu>-->
<!--                </el-dropdown>-->
<!--            </div>-->
<!--        </el-header>-->
<!--        &lt;!&ndash;        页面主体&ndash;&gt;-->
<!--        <el-container>-->
<!--            &lt;!&ndash;            内容主体&ndash;&gt;-->
<!--            <el-main style="padding-left: 35px">-->
<!--                <router-view></router-view>-->
<!--            </el-main>-->
<!--        </el-container>-->
<!--    </el-container>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    data()-->
<!--    {-->
<!--        return {-->
<!--            showDot: false,-->
<!--            username: window.sessionStorage.getItem('name'),-->
<!--            // imgUrl: 'https://tongji4m3.oss-cn-beijing.aliyuncs.com/f_f_object_156_s512_f_object_156_0.png'-->
<!--            imgUrl: window.sessionStorage.getItem('imgUrl'),-->

<!--        }-->
<!--    },-->
<!--    mounted()-->
<!--    {-->
<!--        this.$nextTick(() =>-->
<!--        {-->
<!--            setInterval(this.CurentTime, 1000);-->
<!--        })-->
<!--    },-->
<!--    methods: {-->
<!--        CurentTime()-->
<!--        {-->
<!--            let loginTime = window.sessionStorage.getItem('loginTime');-->
<!--            if (loginTime!=null && new Date().getTime() - loginTime > 7200000)//2*60*60*1000 两小时-->
<!--            {-->
<!--                this.$message.success("太久未登录,强制退出!");-->
<!--                this.logout();-->
<!--            }-->
<!--        },-->
<!--        //退出按钮-->
<!--        logout()-->
<!--        {-->
<!--            window.sessionStorage.clear();-->
<!--            this.$router.push("/index")-->
<!--        },-->

<!--        selfInformation()-->
<!--        {-->
<!--            this.$router.push("/")-->
<!--        },-->
<!--        accountManagement()-->
<!--        {-->
<!--            this.showDot = true;-->
<!--            this.$router.push("/")-->
<!--        },-->
<!--        orderManagement()-->
<!--        {-->
<!--            this.showDot = true;-->
<!--            this.$router.push("/")-->
<!--        },-->
<!--        goIndex()-->
<!--        {-->
<!--            this.$router.push("/index")-->
<!--        },-->
<!--        handleCommand(command)-->
<!--        {-->
<!--            this.showDot = true;-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--#clock {-->
<!--    color: white;-->
<!--    margin-right: 30px;-->
<!--}-->

<!--#username-div {-->
<!--    font-size: 20px;-->
<!--    font-weight: bold;-->
<!--    font-family: 楷体;-->
<!--}-->

<!--#exit-div {-->
<!--    text-align: center;-->
<!--    font-weight: bold;-->
<!--}-->

<!--.home-container {-->
<!--    height: 100%;-->
<!--}-->

<!--.el-header {-->
<!--    background-color: rgb(43, 43, 43);-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->
<!--    margin-left: 0;-->
<!--    padding-left: 0;-->

<!--}-->

<!--.el-aside {-->
<!--    /*background-color: gray;*/-->
<!--    background-color: rgb(239, 239, 239);-->
<!--}-->

<!--.el-main {-->
<!--    /*background-color: lightgoldenrodyellow;*/-->
<!--    background-color: rgb(255, 255, 255);-->
<!--}-->

<!--.out-button {-->
<!--    display: flex;-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--}-->

<!--.el-icon-arrow-down {-->
<!--    font-size: 12px;-->
<!--}-->

<!--</style>-->
<!--有前端验证注册信息是否合理-->
<template>
    <body id="poster" >
    <el-scrollbar style="height: 100%">
        <el-form
            ref="registerFormRef"
            :model="registerForm"
            :rules="registerFormRules"
            class="register-container"
            label-position="left"
            label-width="0px"
            v-loading="loading"
            size="medium"
        >
            <h3 class="login_title">注册</h3>

            <el-form-item prop="authCode">
                <el-input
                    v-model="registerForm.authCode"
                    placeholder="验证码"
                    class="authInput"
                ></el-input>
                <el-button class="authButton" v-on:click="getAuthCode">获取验证码
                </el-button>
            </el-form-item>
            <el-upload
                class="upload"
                action
                :drag="true"
                :multiple="true"
                :file-list="images"
                :http-request="uploadHttp"
                :before-upload="beforeAvatarUpload"
                :on-remove="handleRemove"
            >
                <i class="el-icon-plus avatar-uploader-icon"></i>
                <p id="img-context">上传个人头像</p>
                <div class="el-upload__tip" slot="tip">
                    只能上传jpg/jpeg/png文件，且不超过5MB
                </div>
            </el-upload>
        </el-form>
    </el-scrollbar>
    </body>
</template>

<script>
import ossClient from "../assets/config/aliyun.oss.client";
import api from "@/assets/config/api.js";
import axios from "axios";
import qs from "qs";
export default {
    name: "Upload",
    data() {
        return {
            loading: true,
            //上传图片相关
            images: [],
            uploadConf: {
                region: null,
                accessKeyId: null,
                accessKeySecret: null,
                bucket: null,
            },
            //登录表单数据绑定
            registerForm: {
                username: "",
                password: "",
                confirmPassword: "",
                telephone: "",
                authCode: "",
                icon: "",
                // imgUrl: "https://tongji4m3.oss-cn-beijing.aliyuncs.com/OIP.jpg",
            },
            //表单的验证规则
            registerFormRules: {
                //    验证用户名是否合法
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    {
                        min: 3,
                        max: 10,
                        message: "用户名必须在3-10个字符之间",
                        trigger: "blur",
                    },
                ],
                //    验证密码是否合法
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: checkPassword, trigger: "blur" },
                ],
                confirmPassword: [
                    { required: true, message: "请再次确认密码", trigger: "blur" },
                    { validator: checkConfirmPassword, trigger: "blur" },
                ],
                //    验证手机号是否合法
                telephone: [
                    { required: true, message: "请输入手机号", trigger: "blur" },
                    { validator: checktelephone, trigger: "blur" },
                ],
                //    验证验证码是否合法
                authCode: [{ required: true, message: "请验证码", trigger: "blur" }],
            },
        };
    },
    //回车注册操作
    created() {
        //创建后挂载
        let _this = this;
        setTimeout(() => {
            this.loading = false;
        }, 500);
        document.onkeydown = function (e) {
            let key = window.event.keyCode;

            if (key === 13) {
                _this.register(); //注册
            }
        };
    },
    methods: {

        /**
         * 初始化
         */
        async init() {
            //获取阿里云token  这里是后台返回来的数据
            this.uploadConf.region = "oss-cn-shanghai";
            this.uploadConf.accessKeyId = "LTAI4FzMDhgBN9LMBr71T3Ny";
            this.uploadConf.accessKeySecret = "hTPgQQSyBgEDnfMNe06RPf8ecDafpz";
            this.uploadConf.bucket = "tongji-boying";
        },
        /**
         * 阿里云OSS上传
         */
        uploadHttp({ file }) {
            this.init();
            const { imgName } = "ALIOSS_IMG_";
            const fileName = `${imgName}/${Date.parse(new Date())}`; //定义唯一的文件名
            ossClient(this.uploadConf)
                .put(fileName, file, {
                    ContentType: "image/jpeg",
                })
                .then(({ res, url, name }) => {
                    if (res && res.status === 200) {
                        console.log(`阿里云OSS上传图片成功回调`, res, url, name);
                        console.log(url);
                        this.registerForm.icon = url;
                    }
                })
                .catch((err) => {
                    console.log(`阿里云OSS上传图片失败回调`, err);
                });
        },

        /**
         * 图片限制
         */
        beforeAvatarUpload(file) {
            const isJPEG = file.name.split(".")[1] === "jpeg";
            const isJPG = file.name.split(".")[1] === "jpg";
            const isPNG = file.name.split(".")[1] === "png";
            const isLt500K = file.size / 1024 / 1024 / 5 < 2;
            if (!isJPG && !isJPEG && !isPNG) {
                this.$message.error("上传图片只能是 JPEG/JPG/PNG 格式!");
            }
            if (!isLt500K) {
                this.$message.error("单张图片大小不能超过 5MB!");
            }
            return (isJPEG || isJPG || isPNG) && isLt500K;
        },

        /**
         * 移除图片
         */
        handleRemove(file, fileList) {
            console.log(`移除图片回调`, fileList);
        },
    },
};
</script>
<style scoped>
#poster {
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

body {
    color: rgba(255, 255, 255, 0.65);
    background-color: #24292e;
    /*background-image: url(../../assets/img/star-bg.svg),*/
    /*linear-gradient(#191c20, #24292e 15%);*/
    background-repeat: repeat-x;
    background-position: center 0, 0 0, 0 0;
    margin-left: 0;
    margin-top: 1;
}

.register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
}

.login_title {
    letter-spacing: 10px;
    margin: -30px auto 10px auto;
    text-align: center;
    color: #505458;
}

#img-context {
    text-align: center;
    font-size: 17px;
    color: #b0b0b0;
    margin-top: 50px;
}

.el-upload__tip {
    text-align: center;
    font-size: 8px;
    color: rgba(52, 52, 52, 0.7);
}

/* 一下是肯定要用的样式 */
.authInput {
    width: 55%;
}

.authButton {
    margin-left: 45px;
}
</style>
