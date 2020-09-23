$.ajax({
    type:"get",
    url:"/my/userinfo",
    success:function(res){
        if(res.status === 0){
            $(".userinfo .welcome").html(`欢迎&nbsp;&nbsp;${res.data.username}`);
            if(res.data.user_pic){
                $(".userinfo .layui-nav-img").show().attr("src",res.data.user_pic);
                $(".layui-tx .layui-nav-img").show().attr("src",res.data.user_pic);
                $(".userinfo .text-avater,.layui-tx .text-avater").hide();
            }else{
                $(".userinfo .text-avater").text(res.data.username.slice(0,1).toUpperCase());
                $(".layui-tx .text-avater").text(res.data.username.slice(0,1).toUpperCase());
            }
        }
    }
});

$(".loginout").click(function(){
    layer.confirm('确定退出?', {icon: 3, title:'提示'}, function(index){
        //do something 写一些业务逻辑
         // 2.3 删除本地存储中的token
        window.localStorage.removeItem('token');
  
        // 2.4 关闭弹出层
        layer.close(index);
  
        // 2.5 跳转到login.html页面
        location.href = './login.html';
    });
})