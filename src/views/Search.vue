<template>
    <div>
        <el-card>
            <div>
                城市：
                <el-radio-group v-model="radioDefalt">
                    <el-radio-button label="全国"></el-radio-button>
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="广州"></el-radio-button>
                    <el-radio-button label="深圳"></el-radio-button>
                </el-radio-group>
            </div>
<!--            <br>-->

            <el-divider></el-divider>
            <div>
                分类：
                <el-radio-group v-model="radioDefalt" v-for="category in categoryList">
                    <el-radio-button label="">{{category}}</el-radio-button>
                </el-radio-group>
            </div>
            <el-divider></el-divider>
            <div>子类：</div>
            <el-divider></el-divider>
            <div>
                时间：
                <el-date-picker
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
<!--            <br>-->

        </el-card>
        <el-card>
            <el-tabs type="card">
                <el-tab-pane label="相关度排序" name="first"></el-tab-pane>
                <el-tab-pane label="推荐排序" name="second"></el-tab-pane>
                <el-tab-pane label="最近开场" name="third"></el-tab-pane>
                <el-tab-pane label="价格升序" name="fourth"></el-tab-pane>
                <el-tab-pane label="价格降序" name="fifth"></el-tab-pane>
            </el-tabs>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="500">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            radioDefalt: '全国',
            categoryList: [],
            searchForm: {
                categoryId: "",
                city: "",
                date: "",
                keyword: "",
                status: false,
            }
        }
    },
    created() {
        this.getFatherList();
    },
    methods: {
        async getFatherList(){
            this.categoryList = await this.$http.post(this.$api.CategoryMapUrl);
        },
        async getChildrenList(){

        },
    }
}
</script>

<style scoped>

</style>