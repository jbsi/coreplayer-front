<template>
    <div>


        <el-row type="flex" justify="center">
            <el-col :span="3">
                <img :src="userheadimg" width="100%" style="border-radius: 50%" >

            </el-col>
        </el-row>
        <br>

        <el-row type="flex" justify="center">
            <el-col :span="3">
              用户名  <el-input v-model="username" placeholder="请输入内容" disabled></el-input>
            </el-col>
        </el-row>
        <br>


    </div>
</template>
<script>
    export default {
        name: "usermessage",

        data() {
            return {
                fileList: [],
                imageUrl: '',
                id:localStorage.getItem("id"),
                action:this.WebSiteUrl+'/user/headimg?id='+this.id,
                userheadimg:localStorage.getItem("imgaddress"),
                username:localStorage.getItem("username")
            }
        },
        created(){

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
            }
        }
    }
</script>

<style scoped>
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
