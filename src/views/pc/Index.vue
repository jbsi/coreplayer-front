<template>
    <div style="margin:1% 15% 0px 15%;">
        <el-container>
            <el-header>
                <div>
                    <el-row type="flex" justify="center">

                        <el-col :span="3">
                            <el-image
                                    style="width: 100%; height: 60px"
                                    :src="logo "
                                    fit="fill"></el-image>
                        </el-col>
                        <el-col :span="2">
                            <router-link  to="/mindex">手机端主页</router-link>
                        </el-col>
                        <el-col :span="8" :offset="3">
                            <el-input placeholder="请输入内容" v-model="search" class="input-with-select" size="large">
                                <el-button slot="append" icon="el-icon-search" @click="selectlike"></el-button>
                            </el-input>
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col :span="6">
<!--                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="WHITE">-->
<!--&lt;!&ndash;                                <el-menu-item index="1"></el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-menu-item index="2">热门视频</el-menu-item>&ndash;&gt;-->
<!--&lt;!&ndash;                                <el-menu-item index="3" >收藏</el-menu-item>&ndash;&gt;-->
<!--                            </el-menu>-->
                        </el-col>

                        <el-col :span="1" >
                            <el-dropdown trigger="click" @command="handleCommand" style="padding-top: 10%">
                                <el-avatar size="large" class="el-dropdown-link" :src="headimg||src"></el-avatar>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-user" command="a">个人中心</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-question" command="d">帮助</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-error" command="e">退出</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-error" command="b" v-show="islogin">登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </div>
            </el-header>


            <el-container>
                <el-main>
                    <div>
                        <el-row type="flex" justify="center">
                           <el-col :span="18">
                               <el-carousel height="400px" style="border-radius: 30px">
                                   <el-carousel-item v-for="item in 4" :key="item">
                                       <img :src=pics[item-1] class="image" style="height: 400px" alt="item" @click="toVideoPlayer(item)">
                                   </el-carousel-item>
                               </el-carousel>
                           </el-col>
                        </el-row >
                        <el-row type="flex" justify="center" :gutter="20">
                            <el-col :span="16" v-for="(newvideo,o) in allvideos" :key="o">
                                <el-card :body-style="{ padding: '5%',height:'200px' }" >
                                    <img :src="newvideo.coveraddress" class="image" @click="toVideoPlayer(newvideo.id)" >
                                    <div style="padding: 0px ;margin:0px" @click="toVideoPlayer(newvideo.id)">
                                        <span >{{newvideo.name}}</span>
                                    </div>

                                </el-card>
                            </el-col>
                        </el-row>

                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    // import router from "@/router";

    export default {
        name: 'index',
        data() {
            return {
                islogin:{},
                activeIndex:'1',
                // height:'',
                logo: require("@/assets/image/logo.jpg"),
                search: '',
                userphoto: 'el-icon-user',
                headimg:localStorage.getItem("imgaddress"),

                src: require("@/assets/image/timg.jpg"),
                username:"",
                pics:["http://img.wdehbcj.top/变形金刚五.jfif","http://img.wdehbcj.top/声之形 .jpg","http://img.wdehbcj.top/小黄人.jfif","http://img.wdehbcj.top/绣春刀二修罗战场.jpg"],
                allvideos:{},
            }
        },
        created() {




            this.axios.get(this.WebSiteUrl+'/video/getvideolist').then((response)=> {
                console.log(response);
                this.allvideos=response.data.data;
            })

            if (localStorage.getItem("imgaddress")!=null){
                this.islogin=false;
            }else{
                this.islogin=true;
            }

        },
        mounted(){

        },
        methods: {
            toVideoPlayer(id){
                this.$router.push({
                    name:'videoplayer',
                    params:{
                        id:id
                    }
                    }
                )
            },

            selectlike(){
                console.log(this.search);
                this.$router.push({
                    name:'generalpage',
                    params:{
                        search: this.search,
                }
                })

            },




            handleCommand(command) {
                var that=this;
                switch (command) {
                    case 'a':
                        that.$router.push({name: "usermessage"});
                        break;
                    case 'b':

                        that.$router.push({name: "login"});
                        break;
                    case 'c':
                        break;
                    case 'd':
                        break;
                    case 'e':
                        localStorage.clear();
                        that.$router.push({name: "login"});
                        break;
                }

            },
        }
    }

</script>

<style scoped>
    .el-header, .el-footer {
        /*background-color: #B3C0D1;*/
        color: #333;
        text-align: center;
        line-height: 60px;
        padding: 0px;
    }


    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }
    .menu-height{
        /*line-height: 10%;*/
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }


    .image {
        margin: 0;
        width: 100%;
        display: block;
        height: 100px;
    }


    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        /*background-color: #99a9bf;*/
    }

    .el-carousel__item:nth-child(2n+1) {
        /*background-color: #d3dce6;*/
    }
    .el-row{
        margin-bottom: 1%;
    }
</style>


