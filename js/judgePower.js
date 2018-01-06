//普通用户权限判断
function judgeUser(){
if(localStorage.getItem('queryTickets_power')!=='0'){
 layui.use('layer', function () {
    var layer = layui.layer;
    layer.msg('非法用户');
});
 setTimeout('window.location="./login.html"',1500)
}
}
//管理用户权限判断
function judgeAdmin(){
if(localStorage.getItem('queryTickets_power')!=='1'){
    layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg('非法用户');
    });
    setTimeout('window.location="./login.html"',1500)
}
}