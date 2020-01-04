<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="16" v-for="(newvideo,o) in videolist" :key="o">
                <el-card :body-style="{ padding: '5%',height:'200px' }">
                    <img :src="newvideo.coveraddress" class="image"  @click="toVideoPlayer(newvideo.id)" >
                    <div style="padding: 0px ;margin:0px" @click="toVideoPlayer(newvideo.id)">
                        <span >{{newvideo.name}}</span>
                    </div>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export  default {
        name:'generalpage',
        data(){
            return {
                videolist:{},

            }
        },

        created(){
            console.log(this.$route.params);
            var url=this.WebSiteUrl+'/video/getvideolistlike?namelike='+ this.$route.params.search;
            this.axios.get(url).then((response)=>{
                console.log(response);
                this.videolist=response.data.data;
            })
        },
        methods:{
            toVideoPlayer(id){
                this.$router.push({
                        name:'videoplayer',
                        params:{
                            id:id
                        }
                    }
                )
            },
        },

    }
</script>
<style scoped>
    .image {
        margin: 0;
        width: 100%;
        display: block;
        height: 100px;
    }
</style>
