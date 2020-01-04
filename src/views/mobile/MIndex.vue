<template>
    <div>
        <van-nav-bar
                :title="title[active]"
        />
        <component :is="currentView[active]"></component>


        <van-tabbar v-model="active">
            <van-tabbar-item replace  icon="home-o">主页</van-tabbar-item>
            <van-tabbar-item replace  icon="search">搜索</van-tabbar-item>

        </van-tabbar>
    </div>
</template>
<script>
    import Vue from 'vue'
    import { Button,Row,Col,Tabbar, TabbarItem,NavBar } from 'vant';
    import MIndexPage from "@/components/MIndexPage";
    import MSearch from "@/components/MSearch"


    Vue.use(Button).use(Row).use(Col).use(Tabbar).use(TabbarItem).use(NavBar)
    export default {
        name:'mindex',
        data(){
            return {

                currentView:["MIndexPage","MSearch"],
                active:0,
                title:['主页','搜索'],
            }
        },
        methods:{


        },
        components: {
            MSearch,
            MIndexPage,

        }

    }
</script>
