$(function(){
    getUserInfo()

    let index = null
    $('#btnLogout').click(function(){
        index = layer.confirm('此操作将退出登录，是否继续？', {icon: 3, title:'提示'}, function(index){
            //do something
            
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
    })

})

let layer = layui.layer
function getUserInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        success:res=>{
            if(res.status !== 0) return layer.msg('获取用户信息失败！')
            renderAvator(res.data)
        }
    })
}

function renderAvator(user){
    let name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

      // 渲染头像
      if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avator').hide()
        }else{
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avator').html(first).show()
        }
}