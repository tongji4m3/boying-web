<template>
    <div>
        <el-card>
            <div>
                城市：
                <el-radio-group v-model="rcity">
                    <el-radio-button label="全国"></el-radio-button>
                    <el-radio-button label="上海"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="广州"></el-radio-button>
                    <el-radio-button label="深圳"></el-radio-button>
                </el-radio-group>
            </div>
            <div>
                <el-divider></el-divider>
                分类：
                <el-radio-group v-model="rcategory" @change="getChildren()">
                    <el-radio-button :label="0">全部</el-radio-button>
                    <el-radio-button v-for="category in categoryList" :label="category.categoryId">
                        {{category.name}}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <div v-if="childrenCategoryVisible">
                <el-divider></el-divider>
                子分类：
<!--                <el-radio-group v-model="rchildrencategory">-->
<!--                    <el-radio-button v-for="category in categoryList" :label="category.categoryId">-->
<!--                        {{category.name}}-->
<!--                    </el-radio-button>-->
<!--                </el-radio-group>-->
            </div>
            <div>
                <el-divider></el-divider>
                时间：
                <el-radio-group v-model="rtime" type="date">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="今天"></el-radio-button>
                    <el-radio-button label="明天"></el-radio-button>
                    <el-radio-button label="本周末"></el-radio-button>
                    <el-radio-button label="一个月内"></el-radio-button>
                </el-radio-group>
                <el-date-picker
                    v-model="rtime"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
            </div>
        </el-card>
        <br>
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
    name: "Search",
    data() {
        return {
            rcity: '全国',
            rcategory: '0',
            rchildrencategory: '',
            rtime: '全部',
            childrenCategoryVisible: false,
            categoryCommand: 0,
            categoryList: [],
            // categoryList: ["演唱会","话剧歌剧","体育","展览休闲","音乐会","曲苑杂坛","舞蹈芭蕾","二次元"]

            categoryForm:{
                categoryId:'',
                parentId:'',
                name:'',
                weight:'',
                description:'',
            },

            searchForm:{
                categoryId:'',
                pageNum: 1,
                pageSize: 6,
            }
        }
    },
    created() {
        this.getCategoryList();
    },
    methods: {
        async getCategoryList(){
            let result = await this.$http.post(
                this.$api.getCategoryListUrl,
                JSON.stringify(0)
            );
            console.log(result)
            this.categoryList = result.data.data;
            // console.log(this.categoryList)
        },
        async getChildren(){
            await this.changeChildrenCategoryVisible(this.rcategory);
        },
        async getShow(){
            console.log(categoryId);
            await this.changeChildrenCategoryVisible(categoryId);
            let result = await this.$http.post(
                this.$api.searchUrl,
                JSON.stringify({
                    city: this.rcity,
                    date:"2020-01-22-2021-01-01",
                    keyword:"",
                    pageNum: 1,
                    pageSize: 6,
                })
            );
            console.log(result);

            return result
        },
        async changeChildrenCategoryVisible(id){
            // console.log(id);
            this.childrenCategoryVisible = id !== 0;
        }
    }
}
</script>

<style scoped>

</style>