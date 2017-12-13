var station;
$.ajax({
    url:'http://e.hduzjh.cn/QueryTickets/station/getAll',
    success:function(result){
    if(result.status===200) station=result.date;
    else console.log('错误');
    },
    async:false
})
console.log(station);
var app=new Vue({
    el:'#app',
    data:{
        'nickname':function(){
            return localStorage.getItem('queryTickets_id')||'admin';
        },
        station:station,
        check:false,
        checkMiddle:''
    },
    
    
})
