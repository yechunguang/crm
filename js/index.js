$(function(){
   init();
   let $plan=$.Callbacks()

//渲染用户信息和退出登录
   $plan.add((_,baseInfo)=>{
    //    console.log("aaa",baseInfo)
    $(".baseBox span").html(`你好，${baseInfo.name ||''}`)
   })
//退出登录
$(".baseBox a").click( async function(){
    let result=await axios.get("/user/signout");
        // console.log(result);
        if(result.code==0){
            window.location.href="login.html"
            return;
         }
         alert("退出失败")
})
   $plan.add((power)=>{
       console.log("bbb",power);
   })

   async function  init(){
       let result=await axios.get("/user/login");
        // console.log(result);
    if(result.code!=0){
        alert("请先登录")
        window.location.href="login.html"
        return;
     }
      //代表登录成功
     let [power,baseInfo]=await axios.all([
        axios.get("/user/power"),
        axios.get("/user/info"),
     ])
//获取用户通讯录



    //  console.log(power);
    //  console.log(baseInfo);
    baseInfo.code===0 ? baseInfo=baseInfo.data:null;
    $plan.fire(power,baseInfo)
    }
})