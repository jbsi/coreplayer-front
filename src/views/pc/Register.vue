<template>
    <div>
        <el-container>
            <el-header>欢迎您注册</el-header>
            <el-main>

                <span>您的头像</span>
                <el-row type="flex" justify="center" >
                    <el-col :span="3" v-show="true" >
                        <el-upload style="border: 1px solid black;border-radius: 20px"
                                   class="avatar-uploader"
                                   name="file"
                                   :action="action"
                                   :on-preview="handlePreview"
                                   :on-remove="handleRemove"
                                   :before-remove="beforeRemove"
                                   :on-success="handleAvatarSuccess"
                                   :before-upload="beforeUploadFiles2"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-col>
                </el-row>

                <el-row type="flex" justify="center">
                    <el-col :span="5">
                        <div>
                            <el-input class="out"
                                      prefix-icon="el-icon-user"
                                      placeholder="请输入用户名"
                                      v-model="username"
                                      clearable>
                            </el-input>
                            <el-input class="out"
                                      prefix-icon="el-icon-s-promotion"
                                      placeholder="请输入邮箱"
                                      v-model="email"
                                      clearable>
                            </el-input>
                            <div class="out">
                                <el-input placeholder="请输入验证码" v-model="valuedatacode" class="input-with-select">
                                    <el-button slot="append" @click="sendEmail" :disabled="sendEmailEnable">
                                        {{emailmsg}}
                                    </el-button>
                                </el-input>
                            </div>
                            <el-input class="out" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="password"
                                      show-password></el-input>
                            <el-input class="out" prefix-icon="el-icon-lock" placeholder="请再次输入密码"
                                      v-model="repeatinputpassword" show-password></el-input>
                            <el-alert v-show="ifshow"
                                      title="两次输入的密码不一致"
                                      type="warning"
                                      @close="close">
                            </el-alert>

                            <el-button class="out" plain :disabled="disabled" @click="register"
                                       v-text="msg"></el-button>
                            <el-col>
                                <span>已有账号？<router-link to="/login">请登录</router-link></span>
                            </el-col>


                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                username: '',
                fileList: [],
                imageUrl: '',
                action:this.WebSiteUrl+'/user/headimg',
                token: localStorage.getItem("token"),
                email: '',
                emailmsg: '发送验证码到邮箱',
                emaildisabled: false,

                password: '',
                repeatinputpassword: '',
                ifshow: false,

                valuedatacode: '',
                disabled: false,

                msg: '注册',

                aminute: 60,

                sendEmailEnable: false,

                interval: null,


            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeUploadFiles(file) {
                //const isJPG = file.type === 'image/jpeg';
                const isLt5M = file.size / 1024 / 1024 < 5;

                /*
                if (!isJPG) {
                  this.$message.error('上传头像图片只能是 JPG 格式!');
                }*/

                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB!');
                }
                return isLt5M;
            },
            beforeUploadFiles2(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isBMP = file.type === 'image/bmp';

                const isLt5M = file.size / 1024 / 1024 < 5;


                if ( !(isJPG || isPNG || isBMP)) {
                    this.$message.error('上传头像图片只能是图片格式!');

                }

                if (!isLt5M) {
                    this.$message.error('上传文件大小不能超过 5MB!');
                }
                return isLt5M && (isJPG || isPNG || isBMP);
            },
            close() {
                this.ifshow = false;
                this.repeatinputpassword = null;
            },
            register() {
                this.disabled = true;
                this.msg = "注册中...";
                var that = this;
                if(!this.username.match('^[\u4E00-\u9FA5A-Za-z0-9_]+$')){
                    this.$message({
                        message:'您的用户名不合法，用户名由中文、英文、数字以及下划线组成，请重新输入',
                        type:'warning'
                    })

                    that.msg = "注册";
                    that.disabled = false;
                    return ;
                }

                if(!this.email.match('^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$')){
                    this.$message({
                        message:'您的邮箱不合法，请重新输入',
                        type:'warning'
                    })
                    that.msg = "注册";
                    that.disabled = false;
                    return ;
                }
                if(!this.valuedatacode.match('^[0-9]*$')){
                    this.$message({
                        message:'您的验证码不合法，请重新输入',
                        type:'warning'
                    })
                    that.msg = "注册";
                    that.disabled = false;
                    return;
                }
                if(!this.password.match('^[a-zA-Z]\\w{5,17}$')){
                    this.$message({
                        message:'您的密码不合法，密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线，请重新输入',
                        type:'warning'
                    })
                    that.msg = "注册";
                    that.disabled = false;
                    return ;
                }
                if (this.password == this.repeatinputpassword) {
                    console.log("两次输入的密码相同");
                    var request = this.WebSiteUrl+"/user/register?valuedatacode=" + this.valuedatacode + "&token=" + this.token;

                    this.axios.post(request, {

                        username: this.username,
                        password: this.password,
                        email: this.email,


                    }).then(function (response) {
                        console.log(response);
                        that.$message(
                            {
                                message: '恭喜你，注册成功',
                                type: 'success'
                            }
                        )
                        that.$router.push({name: "login"});
                    }).catch(function (err) {
                        console.log(err);
                        that.$message(
                            {
                                message: '很抱歉，可能是您填写信息有误，注册失败',
                                type: 'warning'
                            }
                        );
                        that.msg = "注册";
                        that.disabled = false;
                    })

                } else {
                    this.ifshow = true;
                    console.log("两次输入的密码不同");
                    return;
                }
            },
            sendEmail() {

                this.emailmsg = '发送中...';
                this.sendEmailEnable = true;
                this.interval = setInterval(this.oneMinute, 1000);

                this.axios.get(this.WebSiteUrl+'/user/sendmail', {
                    params: {
                        email: this.email
                    }
                }).then(function (response) {
                    localStorage.setItem("token", response.data.data);
                    console.log(response.data.data);
                }).catch(function (err) {
                    console.log(err);
                })


            },
            oneMinute() {
                this.aminute--;
                this.emailmsg = this.aminute + '秒后重新发送';
                if (this.aminute === 0) {
                    clearInterval(this.interval);
                    this.aminute = 60;
                    this.emailmsg = '重新发送';
                    this.sendEmailEnable = false;
                }
            },


        },
        computed: {},


    }

</script>
<style scoped>
    .out {
        margin-top: 1.25%;
        margin-bottom: 1.25%;
    }

    .el-select .el-input {
        width: 130px;
    }

    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>
