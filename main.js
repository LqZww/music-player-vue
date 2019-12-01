var app = new Vue({
    el: '#app',
    data: {
        query: '',
        musicList: [],
        musicUrl: '',
        musicCover: '',
        hotComments: [],
        isShow: false,
        mvUrl: ''
    },
    methods: {
        searchMusic: function () {
            var that = this
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function (response) {
                    // console.log(response)
                    that.musicList = response.data.result.songs
                }, function (err) {

                })
        },
        //播放歌曲
        playMusic: function (musicId) {
            // console.log(musicId)
            var that = this
            //获取歌曲地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    // console.log(response)
                    that.musicUrl = response.data.data[0].url
                }, function (err) {

                })

            //获取歌曲详情
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    // console.log(response)
                    that.musicCover = response.data.songs[0].al.picUrl
                }, function (err) {

                })

            //获取歌曲评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    console.log(response.data.hotComments)
                    that.hotComments = response.data.hotComments
                }, function (err) {

                })
        },

        //播放mv
        playMv: function (mvid) {
            var that = this
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function (response) {
                    // console.log(response)
                    that.isShow = true
                    that.mvUrl = response.data.data.url
                }, function (err) {

                })
        }
    }
})