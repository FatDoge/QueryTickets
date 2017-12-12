var stuId;
var stuPwd;
//登录判断
function login(){
	stuId=$("#stuId").val().trim();
	stuPwd=$("#stuPwd").val();
	console.log("学号:"+stuId);
	console.log("密码:"+stuPwd);
	if(stuId===''||stuPwd===''){
		layer.msg('账户名或密码为空!');
	}
	else
	// 登录
	$.post("http://e.hduzjh.cn/QueryTickets/loginconfirm",
		{
			"username":stuId,
			"password":stuPwd,
			"dataType": 'jsonp',
		},function(result){
			// ret判断
			if(result.status!=200){
				layer.msg('用户名或密码错误!');
			}else{
				//插入数据并跳转
				localStorage.setItem('queryTickets_id',result.data.name);
				switch(result.data.type){
					case 0:
					window.location='./home.html';
					break;
					case 1:
					window.location='./admin.html';
				}			
			}
  });
}