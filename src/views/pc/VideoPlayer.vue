<template>
    <el-row>
        <el-col :span="8">
            <div class="test_two_box">
                <video
                        id="myVideo"
                        class="video-js"
                >
                </video>
            </div>
        </el-col>


    </el-row>
</template>

<script>

    export default {
        name: 'videoplayer',
        data() {
            return {
                src: "",
                myvideo: {},

            }
        },
        created() {
            // this.$router.go(0);
            // this.$forceUpdate();
        },
        mounted() {

            var url = this.WebSiteUrl+'/video/getvideobyid?id=' + this.$route.params.id;

            this.axios.get(url).then((response) => {
                console.log(response.data.data.address);

                this.src = response.data.data.address;
                console.log('播放地址：' + this.src);
                this.initVideo();

            })
        },
        destroyed () {
            this.myvideo.dispose();
        },
        methods: {
            initVideo() {   //此处初始化的调用，我放在了获取数据之后的方法内，而不是放在钩子函数mounted
                //页面dom元素渲染完毕，执行回调里面的方法

                this.myvideo = this.$video("myVideo", {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    autoplay: false,
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    // width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    // height: "400px",

                    sources: [{
                        src: this.src,
                        type: 'video/mp4'
                    }]
                });


            }

        },


    }
</script>

<style scoped>

</style>
