<template>
    <div>
        <van-row>
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="image" style="height:200px;width: 100%" @click="toVideoPlayer(index+1)" />
                </van-swipe-item>
            </van-swipe>
        </van-row>

        <br>
        <van-row>
            <van-grid :border="false" :column-num="2">
                <van-grid-item  v-for="(newvideo,o) in allvideos" :key="o" >
                    <van-image style="height: 100px;width: 100%" :src="newvideo.coveraddress"  @click="toVideoPlayer(newvideo.id)"/>
                    <span>{{newvideo.name}}</span>
                </van-grid-item>
            </van-grid>
        </van-row>



    </div>

</template>

<script>
    import Vue from 'vue';
    import { Grid, GridItem,Swipe, SwipeItem,Row,Col, Lazyload} from 'vant';
    Vue.use(Grid).use(GridItem);
    Vue.use(Swipe).use(SwipeItem).use(Row).use(Col).use(Lazyload);
    export default {
        name: "MIndexPage",
        data(){
            return {
                images:["http://img.wdehbcj.top/变形金刚五.jfif","http://img.wdehbcj.top/声之形 .jpg","http://img.wdehbcj.top/小黄人.jfif","http://img.wdehbcj.top/绣春刀二修罗战场.jpg"],
                allvideos:{},
            }
        },
        created() {




            this.axios.get(this.WebSiteUrl+'/video/getvideolist').then((response)=> {
                console.log(response);
                this.allvideos=response.data.data;
            })


        },
        methods:{
            toVideoPlayer(index){
                this.$router.push({
                    name:"mvideoplayer",
                    params:{
                        id:index,
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
