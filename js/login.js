$(function(){
    //登录功能
    $(".submit").click(async function(){
        let account=$(".userName").val().trim();
        let password=$(".userPass").val().trim();

        if(account ===""||password===""){
            alert("账户密码不能为空")
            return//不会向下执行了
        }
        password = md5(password)
         
         let res=await axios.post("/user/login",{ account,password})
         console.log(res);
         if(parseInt(res.code)==0){
             alert("登录成功")
             window.location.href="index.html"
             return
         }
         alert("登录失败")
    })
})