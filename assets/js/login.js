$(function(){

    $('#link_reg').click(function(){
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_log').click(function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],

        repwd:function(value){
            let pwd = $('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    $('.reg-box form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{username:$('.reg-box [name=username]').val(),password:$('.reg-box [name=password]').val()},
            success:res=>{
                if(res.status !== 0) return layer.msg('注册失败')

                layer.msg('注册成功')
                $('#link_log').click()
            }
        })
    })

    $('.login-box form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:res=>{
                if(res.status !== 0 ) return layer.msg('登录失败')

                layer.msg('登录成功')
                location.href = './index.html'
            }
        })
    })
}) 