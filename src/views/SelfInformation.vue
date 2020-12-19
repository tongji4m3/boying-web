<template>
    <div>
        <el-card>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.age" style="width: 10%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" style="width: 15%"></el-input>
                </el-form-item>
                <el-form-item label="姓别">
                    <el-select v-model="form.gender" placeholder="请选择" style="width: 10%">
                        <el-option label="男" value="man"></el-option>
                        <el-option label="女" value="woman"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像">
                    <el-upload
                        class="upload"
                        action
                        :drag="true"
                        :multiple="true"
                        :file-list="images"
                        :http-request="uploadHttp"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <p id="img-context">上传个人头像</p>
                        <div class="el-upload__tip" slot="tip">
                            只能上传jpg/jpeg/png文件，且不超过5MB
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="form.identityNumber" style="width: 15%"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.name" style="width: 15%"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input v-model="form.realName" style="width: 15%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">编辑</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <br>
        <el-card>
            <br>
            默认收获地址：
            <el-button type="primary" @click="showAddAddress()">添加收货地址</el-button>
            <el-table :data="defaultAddressList" style="width: 100%">
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="region" label="区"></el-table-column>
                <el-table-column prop="street" label="街道"></el-table-column>
                <el-table-column prop="details" label="详情"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="">查看详情</el-button>
                        <el-button type="danger" @click="">删除</el-button>
                        <el-button type="info" @click="">编辑</el-button>
                        <el-button type="danger" @click="">取消默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            收获地址：
            <el-table :data="addressList" style="width: 100%">
                <el-table-column prop="province" label="省份"></el-table-column>
                <el-table-column prop="city" label="城市"></el-table-column>
                <el-table-column prop="region" label="区"></el-table-column>
                <el-table-column prop="street" label="街道"></el-table-column>
                <el-table-column prop="details" label="详情"></el-table-column>
                <el-table-column label="操作" width="400px">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="showAddress(scope.row.addressId)">查看详情</el-button>
                        <el-button type="danger" @click="deleteAddress(scope.row.addressId)">删除</el-button>
                        <el-button type="info" @click="">编辑</el-button>
                        <el-button type="success" @click="setDefaultAddress(scope.row.addressId)">设为默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--        添加活动对话框-->
            <el-dialog title="添加收货地址" :visible.sync="addDialogVisible"
                       width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <!--绑定到addForm中，绑定验证规则对象addFormRules 表单校验项的引用为addFormRef-->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                    <!-- prop属性指定验证规则-->
                    <el-form-item label="收货人:" prop="receiver">
                        <!--v-model双向绑定-->
                        <el-input style="width: 82%;" v-model="addForm.receiver"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="phone">
                        <el-input style="width: 82%;" v-model="addForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="省:" prop="province">
                        <el-input style="width: 82%;" v-model="addForm.province"></el-input>
                    </el-form-item>
                    <el-form-item label="市:" prop="city">
                        <el-input style="width: 82%;" v-model="addForm.city"></el-input>
                    </el-form-item>
                    <el-form-item label="区:" prop="region">
                        <el-input style="width: 82%;" v-model="addForm.region"></el-input>
                    </el-form-item>
                    <el-form-item label="街道:" prop="street">
                        <el-input style="width: 82%;" v-model="addForm.street"></el-input>
                    </el-form-item>
                    <el-form-item label="详情:" prop="details">
                        <el-input style="width: 82%;" type="textarea"
                                  :autosize="{ minRows: 3, maxRows: 4}" v-model="addForm.details"></el-input>
                    </el-form-item>
                </el-form>
                <!--            底部区域-->
                <span slot="footer" class="dialog-footer">
                    <el-button style="margin-right:20px" @click="cancelAdd()">取 消</el-button>
                    <el-button style="margin-left:20px" type="primary" @click="addAddress()">确 定</el-button>
                </span>
            </el-dialog>
            <!--        展示活动对话框-->
            <el-dialog title="收货地址详情" :visible.sync="showDialogVisible" width="630px" top="60px" center>
                <!--            内容主体区域 放置一个表单-->
                <el-form :model="showForm" ref="addFormRef" label-width="100px">
                    <!-- prop属性指定验证规则-->
                    <el-form-item label="收货人:" prop="receiver">
                        <!--v-model双向绑定-->
                        <el-input style="width: 82%;" v-model="showForm.receiver" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式:" prop="phone">
                        <el-input style="width: 82%;" v-model="showForm.phone" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="省:" prop="province">
                        <el-input style="width: 82%;" v-model="showForm.province" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="市:" prop="city">
                        <el-input style="width: 82%;" v-model="showForm.city" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="区:" prop="region">
                        <el-input style="width: 82%;" v-model="showForm.region" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="街道:" prop="street">
                        <el-input style="width: 82%;" v-model="showForm.street" readonly="true"></el-input>
                    </el-form-item>
                    <el-form-item label="详情:" prop="details">
                        <el-input style="width: 82%;" type="textarea"
                                  :autosize="{ minRows: 3, maxRows: 4}" v-model="showForm.details" readonly="true"></el-input>
                    </el-form-item>
                </el-form>
            </el-dialog>


            <el-divider></el-divider>
            <!--            分页区域-->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNumber"
                :page-sizes="[1, 2, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>

        </el-card>
    </div>
</template>


<script>
import ossClient from "@/assets/config/aliyun.oss.client";

export default {
    name: "SelfInformation",
    data() {
        return {
            images: [],
            form: {
                age: '',
                email: '',
                gender: '',
                icon: '',
                identityNumber: '',
                name: '',
                realName: '',
            },

            totalCount: 0,
            pageNumber: 1,
            pageSize: 5,

            addressList: [],
            defaultAddressList: [],

            addDialogVisible: false,
            editDialogVisible: false,
            showDialogVisible: false,

            addForm: {
                receiver: '',
                phone: '',
                province: '',
                city: '',
                region: '',
                street: '',
                details: '',
            },
            addFormRules: {},

            showForm: {
                receiver: '',
                phone: '',
                province: '',
                city: '',
                region: '',
                street: '',
                details: '',
            },
        };
    },
    created() {
        this.getUserInfo();
        this.getAddressList();
        this.getDefaultAddressList();
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        // 阿里云OSS上传
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
        // 图片限制
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
        // 移除图片
        handleRemove(file, fileList) {
            console.log(`移除图片回调`, fileList);
        },
        // 获取用户信息
        async getUserInfo(){
            var result = await this.$http.post(this.$api.getUserInfoUrl);
            // this.form = result;
            // console.log(result.data.data);
        },
        // 获取收货地址
        async getAddressList(){
            var result = await this.$http.post(this.$api.getAddressListUrl,
                {
                    pageNum: this.pageNumber,
                    pageSize: this.pageSize,
                });
            // console.log(result.data.data);
            if(result.data.code===200){
                this.addressList=result.data.data.list;
            }
            else{
                this.addressList=[];
            }
            this.totalCount=result.data.data.total;
        },
        // 获取默认收货地址
        async getDefaultAddressList(){
            var result = await this.$http.post(this.$api.getDefaultAddressUrl);
            console.log(result.data);
            if(result.data.code===200){
                this.defaultAddressList=result.data.data.list;
            }
            else{
                this.defaultAddressList=[];
            }
        },
        //监听pageSize改变的事件
        async handleSizeChange(newSize)
        {
            this.pageSize = newSize;
            this.pageNumber = 1;
            // console.log("pageSize:"+this.pageSize);
            await this.getAddressList();
        },
        //监听pageNum改变的事件
        async handleCurrentChange(newPage)
        {
            this.pageNumber = newPage;
            // console.log("pageNumber:"+this.pageNumber);
            await this.getAddressList();
        },
        async updateAddress(id)
        {
            var result = await this.$http.post(this.$api.updateAddressUrl,id);
        },
        async deleteAddress(id)
        {
            // console.log(id);
            await this.$http.post(this.$api.deleteAddressUrl + "/" + id);
            this.getAddressList();
            this.getDefaultAddressList();
        },
        async showAddAddress(){
            this.addDialogVisible=true;
        },
        async addAddress(){
            await this.$http.post(this.$api.addAddressUrl,{
                receiver: this.addForm.receiver,
                phone: this.addForm.phone,
                province: this.addForm.province,
                city: this.addForm.city,
                region: this.addForm.region,
                street: this.addForm.street,
                details: this.addForm.details,
            });
            this.getAddressList();
            this.addDialogVisible=false;

            this.addForm.receiver='';
            this.addForm.phone='';
            this.addForm.province='';
            this.addForm.city='';
            this.addForm.region='';
            this.addForm.street='';
            this.addForm.details='';

            // console.log(this.addForm);
            this.$message.info("添加收货地点成功!");
        },
        async cancelAdd(){
            this.addDialogVisible=false;

            this.addForm.receiver='';
            this.addForm.phone='';
            this.addForm.province='';
            this.addForm.city='';
            this.addForm.region='';
            this.addForm.street='';
            this.addForm.details='';

            // console.log(this.addForm);
            this.$message.info("取消添加收货地点!");
        },
        async setDefaultAddress(id){
            await this.$http.post(this.$api.setDefaultAddressUrl + "/" + id);
            this.getAddressList();
            this.getDefaultAddressList();
        },

        async showAddress(id){
            let result = await this.$http.post(this.$api.getAddressUrl + "/" + id);
            this.showForm=result.data.data;
            // console.log(this.showForm);
            this.showDialogVisible=true;
        },
    },

};
</script>

<style scoped>
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

#img-context {
    text-align: center;
    font-size: 17px;
    color: #b0b0b0;
    margin-top: 50px;
}

/*.el-upload__tip {*/
/*    text-align: center;*/
/*    font-size: 8px;*/
/*    color: rgba(52, 52, 52, 0.7);*/
/*}*/
</style>