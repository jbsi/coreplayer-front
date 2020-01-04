<template>
    <div>
        <van-cell-group>
            <van-field
                    v-model="sms"
                    center
                    clearable
                    placeholder="请输入搜索内容"
            >
                <van-button slot="button" size="small"  icon="search" @click="tosearch"></van-button>
            </van-field>
        </van-cell-group>

        <van-row>
            <van-grid :border="false" :column-num="2">
                <van-grid-item  v-for="(newvideo,o) in videolist" :key="o" >
                    <van-image style="height: 100px;width: 100%" :src="newvideo.coveraddress"  @click="toVideoPlayer(newvideo.id)"/>
                    <span>{{newvideo.name}}</span>
                </van-grid-item>
            </van-grid>
        </van-row>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Field,Cell, Icon  } from 'vant';

    Vue.use(Field).use(Cell);
    Vue.use(Icon);
    export default {
        name: "MSearch",
        data(){
            return{
                videolist:{},
                sms:''
            }
        },
    created(){


    },
        methods:{
            tosearch(){
                var url=this.WebSiteUrl+'/video/getvideolistlike?namelike='+ this.sms;
                this.axios.get(url).then((response)=>{
                    console.log(response);
                    this.videolist=response.data.data;
                })
            },
            toVideoPlayer(id){
                this.$router.push({
                    name:"mvideoplayer",
                    params:{
                        id:id,
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>
