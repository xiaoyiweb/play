$(function(){

    let layer = layui.layer
    let form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        
        rePwd:value=>{
            if(value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致'
            }
        },

        samePwd:value=>{
            if(value === $('[name=oldPwd]').val()){
                return '新密码不能与原密码相同'
            }
        }
    
    })

    
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/updatepwd',
            data:{
                oldPwd:$('[name=oldPwd]').val(),
                newPwd:$('[name=newPwd]').val()
            },
            success:res=>{
                if(res.status !== 0) return layer.msg('重置密码失败')

                layer.msg('重置密码成功')
                $('.layui-form')[0].reset()
            }   
        })

    })

})