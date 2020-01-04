<template>

    <div id="body">
        <el-container>
            <el-header>
                <el-row>
                    <!--                    <el-col class="nav" >nav</el-col>-->
                </el-row>
            </el-header>
            <el-main>
                <div>
                    <el-row type="flex" justify="center" class="out">
                        <el-col :span="5">

                            <div id="main">
                                <el-row>
                                    <el-col :span="6" :offset="9" class="out">
                                        <div>
                                            <el-image :src="src">

                                            </el-image>
                                        </div>
                                    </el-col>
                                    <el-col class="out">
                                        <el-input
                                                placeholder="请输入用户名"
                                                v-model="username"
                                                clearable
                                                prefix-icon="el-icon-user">
                                        </el-input>
                                    </el-col>
                                    <el-col class="out">
                                        <el-input placeholder="请输入密码" v-model="password" show-password
                                                  prefix-icon="el-icon-lock"></el-input>
                                    </el-col>

                                    <el-col v-show="slidershow">
                                        <div id="slider">
                                            <slide-verify :l="42"
                                                          :r="10"
                                                          :w="310"
                                                          :h="155"
                                                          @success="onSuccess"
                                                          @fail="onFail"
                                                          @refresh="onRefresh"
                                                          :slider-text="text"
                                            ></slide-verify>

                                        </div>
                                    </el-col>
                                    <!--                                    <el-row>-->

                                    <!--                                    </el-row>-->

                                    <el-col class="out">
                                        <el-button  @click="doLogin" round>登录</el-button>
                                        <router-link to="/">
                                            <el-button round>主页</el-button>
                                        </router-link>
                                        <router-link to="/register">
                                            <el-button round>注册</el-button>
                                        </router-link>

                                    </el-col>


                                </el-row>

                            </div>

                            <div class="out">
                            </div>

                        </el-col>
                    </el-row>


                </div>

            </el-main>
            <!--            <el-footer>Footer</el-footer>-->
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'mylogin',
        data() {
            return {
                src: require("@/assets/image/timg.jpg"),
                username: '',
                password: '',
                msg: '',
                validate: false,  //默认滑块验证没通过
                text: '拖动滑块完成拼图',
                activeIndex: '1',
                activeIndex2: '1',
                token: localStorage.getItem("token"),
                slidershow: false,
            }
        },
        methods: {
            onSuccess() {
                var that = this;
                //this.msg = '拼图成功'
                this.validate = true;
                this.axios.get(this.WebSiteUrl+'/user/login', {
                    params: {
                        username: this.username,
                        password: this.password,
                        token: this.token
                    }
                }).then(function (response) {
                    console.log(response);
                    localStorage.setItem("id",response.data.data.uid);
                    localStorage.setItem("imgaddress",response.data.data.headimgaddress);
                    localStorage.setItem("username",response.data.data.username);
                    that.$message({
                        message: "登录成功",
                        type: 'success'
                    });
                    that.$router.push({name: "index"});
                }).catch(function (err) {
                    console.log(err);
                    that.$message({
                        message: "用户名或密码错误",
                        type: "warning"
                    })
                })
            }
            ,
            onFail() {
                this.msg = ''
                if (!this.validate) {
                    this.$message({
                        message: '滑块验证失败!',
                        type: 'warning'
                    });
                    return;
                }
            }
            ,
            onRefresh() {
                this.msg = ''
            },
            doLogin: function () {
                this.slidershow = true;
            }
        }

    }

</script>


<style scoped>
    #body {
        margin: 0px;
        padding: 0px;
        /*background: url("../../assets/image/nav.jpg");*/
        /*background: url("../assets/image/0de943e54a619fcf79a31dba6ded9e1fc5b90edbfdf740e3d.jpg");*/
        background: url("../../assets/image/timg (1).jpg");
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;

    }

    #main {
        /*background-color:#3be8b0;*/
        padding: 5%;
        border-radius: 5%;
        background: rgba(205, 205, 205, 0.6);
        /*opacity: 0.6;*/
        /*width: auto;*/
        /*       display: inline-block!important;*/
        /*       display: inline;*/
    }

    .out {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    .nav {
        /*background: url("../assets/image/nav.jpg");*/
        position: fixed;
        background-size: 100% 300%;
        height: 20%;
        width: 100%;

    }

    #slider {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: -5%;
        margin-left: 1.3%;

        position: fixed;
        z-index: 1000;
    }


</style>
