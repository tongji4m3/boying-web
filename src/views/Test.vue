
<template>
    <el-radio-group v-model="radio" size="small" @change="changeTheme" fill="#66b1ff">
        <el-radio-button :label="1">主题一</el-radio-button>
        <el-radio-button :label="2">主题二</el-radio-button>
        <el-radio-button :label="3">主题三</el-radio-button>
    </el-radio-group>
</template>
<script>
export default {
    props: {},
    data() {
        return {

            //主题切换
            radio: 1,

        };
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    watch: {},
    methods: {
        //切换主题
        changeTheme(val) {
            console.log(val)
        },
    },
    destroyed() {
    }
};
</script>