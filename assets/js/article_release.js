// 1. 初始化富文本编辑器
initEditor()
// tinymce.init({
//   selector: '#mytextarea',
//   branding: false,
//   language:'zh_CN',
//   toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright',
// });

// 2. 启用裁切功能
var options = {
  aspectRatio: 400 / 280, // 裁切比例是多少
  preview: '.img-preview' // 在什么位置预览
}
$('#image').cropper(options)

// 3. 文章发表页面中的文章分类数据的渲染
// 3.1 直接发送ajax请示
$.ajax({
  type: 'get',
  url: '/my/article/cates',
  success: function (res) {
    // console.log(res)
    // 1.2 使用模板将数据渲染到页面中
    if (res.status == 0) {
      var htmlStr = template('categoryList', res)
      // console.log(htmlStr);
      $('#category').html(htmlStr)

      // 因为我们是使用的layui中的下拉菜单，此处在进行数据渲染的时候，会有问题，需要重新调用方法渲染一下
      layui.form.render()

    }
  }
})

// 4. 实现裁切图片的预览功能
// 4.1 给选择封面按钮注册事件
$('.btn-upload').on('click', function (e) {
  // 4.2 阻止默认行为
  e.preventDefault()
  // 4.3 弹出选择文件的窗口
  $('#avatar').click()
})

// 5. 实现图片的本地预览功能
// 5.1 给input标签注册change事件
$('#avatar').on('change', function () {
  // 5.2 获取待上传的图片
  var file = this.files[0]
  // 5.3 生成图片的链接
  var imgUrl = URL.createObjectURL(file)
  // 5.4 实现本地预览功能 需要先销毁之前的 然后再显示新的
  $('#image')
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', imgUrl)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域
})

// 6. 实现文章发布
// 6.1 通过委托的方式来注册click 事件  要通过 '发布'或'存为草稿'这两个按钮来触发
$('.myForm').on('click','.btn',function(e){
  // 6.2 阻止默认行为
  e.preventDefault()
  // 6.3 准备数据
  var data = new FormData($('.myForm')[0])

  // 6.4 确定当前文章是 发布？存为草稿
  // console.log(e.target);
  if($(e.target).hasClass('btn-release')){
    // 单击的是发布按钮  文章的状态是发布状态
    data.append('state','已发布')
  }else {
    // 草稿
    data.append('state','草稿')
  }

  // 6.5 获取裁切图片的二进制形式
  $('#image').cropper('getCroppedCanvas', {
    width: 400,
    height: 280
  })
  .toBlob(function(blod){
    // blod中存储了裁切图片的二进制形式
    data.append('cover_img',blod)
    data.append('content',tinyMCE.activeEditor.getContent())
    // 6.6 发送ajax请示
    $.ajax({
      type:'post',
      url:'/my/article/add',
      data:data,
      contentType:false, // 不需要设置请示头
      processData:false, // 内部不再需要转换成字符串
      success:function(res){
        if(res.status == 0){
          // 6.7 跳转到列表页面
          location.href = './article_list.html'
        }
      }
    })
  })

})