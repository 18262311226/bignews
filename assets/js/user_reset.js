var form = layui.form
  form.verify({
    // 重新定义一个两次密码是否一样的规则
    repass: function (value, item) {
      // value: 是获取到的确认密码框中的值
      // item： 就是确认密码框这个标签对象
      //  2.1 获取第一次输入的新密码
      var passVal = $('.myForm input[name=newPwd]').val()
      // 1.2 判断两次密码是否一样
      if (passVal !== value) {
        // 清空两次输入框
        $('.myForm .pass,.myForm .repass').val('')
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
  })

  $('.myForm').on('submit', function (e) {
    // 2.2 阻止默认请示行为
    e.preventDefault()
    // 2.3 发送ajax请示
    $.ajax({
      type:'post',
      url:'/my/updatepwd',
      data:$(this).serialize(),
      success:function(res){
         // 2.4 成功之后要进行提示
        layer.msg(res.message)

        // 2.5 清空表单
        $('.myForm')[0].reset()
      }
    })
  })