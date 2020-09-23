$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
  
    if(options.url.includes("/my")){
        options.headers  = {
          Authorization:window.localStorage.getItem("token")
        }  
    }

    options.complete = function(res){
      
      if(res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！"){
        // 删除本地中的无效token
        console.log(1111);
        // 应该先跳转到登陆页面进行登陆
        location.href = './login.html';
      }
    }
  })