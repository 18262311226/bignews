$(function () {
    // 1. 获取当前登陆的用户信息显示在基本资料页面
    var dataForm;
    // 1.1 直接发送ajax请示
    renderForm()
    function renderForm(){
      $.ajax({
        type: 'get',
        url: '/my/userinfo',
        success: function (res) {
          // console.log(res)
          // 1.2 将数据渲染在页面中
          if (res.status == 0) {
            // $('.myForm input[name=username]').val(res.data.username)
            // $('.myForm input[name=nickname]').val(res.data.nickname)
            // $('.myForm input[name=email]').val(res.data.email)
    
            //给表单赋值 
            // 需要注意的是：为了赋值成功，必须保证input标签的name值和res.data中的属性名一致
            var form = layui.form
            form.val("myForm", res.data)
            // layui.form.val("myForm", res.data)
            dataForm = res.data
          }
        }
      })
    }
  
    // 2. 提交或更新基本资料数据
    // 2.1 给form表单注册submit事件
    $('.myForm').on('submit', function (e) {
      // 2.2 阻止默认请示行为
      e.preventDefault()
      // 2.3 发送ajax请示 注意要获取form表单中的数据
      $.ajax({
        type: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
          // console.log(res);
          // 2.4 成功后要进行提示
          layer.msg(res.message)
        }
      })
    })
  
    // 3. 基本资料重置
    // 3.1 给重置按钮注册事件
    $('.myForm .resetbtn').on('click', function (e) {
      // 3.2 阻止默认请示行为 
      e.preventDefault()
  
      // 3.3 所谓重置就是重新显示原来的数据
  
      // 第1种方式
      // renderForm()
  
      // 第2种方式
      layui.form.val("myForm", dataForm)
    })
  
    
  
  })