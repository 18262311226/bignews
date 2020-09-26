function rendertext(){
    $.ajax({
        type:"get",
        url:"/my/article/cates",
        success:function(res){
            if(res.status==0){
                var gettexthtml = template("loadtemp",res); 
                $("tbody").html(gettexthtml);
            }
        }
    })
}

rendertext();

$(".btn-add").on("click",function(){
    window.addindex=layer.open({
        type:1,
        title: '添加分类',
        area:"520px",
        content: $("#addtemp").html()
    });    
})

var form = layui.form
  form.verify({
    username: function (value, item) { //value：表单的值、item：表单的DOM对象
      if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
        return '用户名不能有特殊字符'
      }
      if (/(^\_)|(\__)|(\_+$)/.test(value)) {
        return '用户名首尾不能出现下划线\'_\''
      }
      if (/^\d+\d+\d$/.test(value)) {
        return '用户名不能全为数字'
      }
    }
  })

$("body").on("submit",".addForm",function(e){
    e.preventDefault();
    $.ajax({
        type:"post",
        url:"/my/article/addcates",
        data:$(this).serialize(),
        success:function(res){
            if(res.status==0){
                layer.close(window.addindex);
                rendertext();
            }
        }
    })
})

$("tbody").on("click",".delbtn",function(){
    var id = $(this).data("id");
    console.log(id);
    layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {

    $.ajax({
        type:"get",
        url:"/my/article/deletecate/" + id,
        success:function(res){
            if(res.status == 0){
                layer.close(index);
                rendertext();
            }
        }
    })
});
})