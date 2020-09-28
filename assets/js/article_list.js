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
          renderPage(res)
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

  var laypage = layui.laypage;

  function renderPage(res) {
    laypage.render({
      elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
      , count: res.total, //数据总数，从服务端得到
      limit: params.pagesize, // 每页显示的条数
      curr: params.pagenum, // 最新页码值
      limits: [2, 3, 5, 10],
      groups: 3,
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit) //得到每页显示的条数
        // console.log(first) // 首次跳转到列表页的时候first是true 后期单击页码值的时候first是undefined
        //首次不执行
        if (!first) {
          //do something 单击页码的时候，需要在这个大括号中实现分页处理
          // 发送ajax请示 获取当前页码的最新数据 obj.curr 当前的页码值
          // console.log(obj.curr);
          params.pagenum = obj.curr // 获取最新的页码值
          params.pagesize = obj.limit // 当前页显示的条数
          renderList()
        }
      }
    })

     // 5. 删除文章
  // 5.1 通过委托的方式给删除按钮注册事件
  $('tbody').on('click', '.btn-del', function () {
    //  5.6 获取当前页面的文章条数  用什么标签数量来表示都可以 
    var count = $('tbody .btn-del').length
    // 5.2 获取删除按钮中的id
    var id = $(this).data('id')
    // 5.3 弹出提示框
    layer.confirm('真的要删除此条数据吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 5.4 发送ajax请示
      $.ajax({
        type: 'get',
        //  url:'/my/article/delete/',
        url: `/my/article/delete/${id}`,
        success: function (res) {
          layer.close(index)
          if (res.status != 0) {
            // 5.5 提示用户
            layer.msg('删除文章失败')
          } else {
            // 重新渲染列表 
            // 5.7 判断一下是不是最后一条数据，如果是的话，让当前页码减1
            if (count == 1) {
              params.pagenum = params.pagenum == 1 ? 1 : params.pagenum - 1
            }
            // 根据最新页码发送请求获取数据渲染页面
            renderList()
          }
        }
      })
      
    })
  })
}