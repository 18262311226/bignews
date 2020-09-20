$(".tolog").click(function(){
    $(".login").show().next().hide();
});

$(".toreg").click(function(){
    $(".register").show().prev().hide();
});

var form = layui.form;
form.verify({
  username: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符'
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return '用户名首尾不能出现下划线\'_\''
    }
    // if(/^\d+\d+\d$/.test(value)){
    //   return '用户名不能全为数字';
    // }
  },
  // 重新定义一个两次密码是否一样的规则
  repass: function (value, item) {
    // value: 是获取到的确认密码框中的值
    // item： 就是确认密码框这个标签对象
    //  2.1 获取第一次输入的密码
    var passVal = $('.register .myForm input[name=password]').val()
    // 2.2 判断两次密码是否一样
    if (passVal !== value) {
      // 清空两次输入框
      $('.register .myForm .reg-pass,.register .myForm .reg-repass').val('')
      return '两次输入的密码不一样'
    }
  }

  //我们既支持上述函数式的方式，也支持下述数组的形式
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  // \S 非空字符  \d数字
  , pass: [
    /^[\d]{6,12}$/
    , '密码必须6到12位数字，且不能出现空格'
  ]
});

$(".register .myForm").on("submit",function(e){
    e.preventDefault();

    $.ajax({
        type:"post",
        url:"http://ajax.frontend.itheima.net/api/reguser",
        data:$(this).serialize(),
        success:function(res){
            if(res.status == 0){
                $(".login").show().next().hide();
            }else{
                layer.open({
                    title: '温馨提示',
                    content: res.message,
                    time:2000
                  });
            }
        }
    })
});
