$.ajax({
    type:"get",
    url:"/my/userinfo",
    headers:{
        Authorization:window.localStorage.getItem("token")
    },
    success:function(res){
        $(".userinfo .welcome").html(`欢迎&nbsp;&nbsp;${res.data.username}`);

        if(res.data.user_pic){
            $(".userinfo .layui-nav-img").show().attr("src",res.data.user_pic);
            $(".layui-tx .layui-nav-img").show().attr("src",res.data.user_pic);
            $(".userinfo .text-avater,layui-tx .text-avater").hiden();
        }else{
            $(".userinfo .text-avater").text(res.data.username.slice(0,1).toUpperCase());
            $(".layui-tx .text-avater").text(res.data.username.slice(0,1).toUpperCase());
        }
    }
});