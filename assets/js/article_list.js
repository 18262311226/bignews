$.ajax({
    type:"get",
    url:"/my/article/cates",
    success:function(res){
        resinfo = res;
        if(res.status==0){
            var catetexthtml = template("catetemp",res); 
            $(".category").html(catetexthtml);
            layui.form.render();
        }
    }
})
var params = {
    pagenum: 1,
    pagesize: 2,
    cate_id: $('.category').val(),
    state: $('.state').val()
  }
  // 2. 获取文章列表数据渲染页面
  // 2.1 发送ajax请求
  renderList()
  function renderList() {
    $.ajax({
      type: 'get',
      url: '/my/article/list',
      data: params,
      success: function (res) {
        // console.log(res);
        if (res.status == 0) {
          // 2.2 使用模板渲染页面
          var htmlStr = template('listtemp', res)
          $('tbody').html(htmlStr)
        }
      }
    })
  }

  // 3. 实现筛选功能
  // 3.1 给form表单注册事件 通过button按钮来触发
  $('.myForm').on('submit', function (e) {
    // 3.2 阻止默认请示行为
    e.preventDefault()
    // 3.3 发送ajax请示 获取数据
    // 单击了筛选按钮之后，应该要根据分类和状态来筛选数据
    params.cate_id = $('.category').val()
    params.state = $('.state').val()
    renderList()  // 用上面的新的数据来发送请求
   
  })