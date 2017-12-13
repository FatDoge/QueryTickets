function getIt(){
    var startPos=$("#startPos").val();
    var endPos=$("#endPos").val();
    var proSearch=$("#proSearch").prop('checked');
    // 判断出发地与目的地，不应相同
    if(startPos===endPos){
        alert("地点相同");
        return false;
    }else if(startPos!==endPos){
        if(proSearch===false){
            console.log("普通搜索");
            // $.ajax({
            //     url:'',
            //     async:false,
            //     success:function(){

            //     }
            // })
        }else if($('input:radio[name="proSearch"]:checked').val()===undefined){
            alert('未选择选项');
            return false;
        }else if($('input:radio[name="proSearch"]:checked').val()==='zdlj'){
            alert('最短路径');
        }else if($('input:radio[name="proSearch"]:checked').val()==='zdfy'){
            alert('最低费用');
        }else if($('input:radio[name="proSearch"]:checked').val()==='zzz'){
            var middleStation=$("#middleStations").val();
            if(middleStation===startPos||middleStation===endPos){
                alert('中转站不能与出发地目的地相同！');
                return false;
            }else{
                // 请求数据
            }
        }
    }
    console.log($('input:radio[name="proSearch"]:checked').val())
}
function toggleMiddle(){
if($('input:radio[name="proSearch"]:checked').val()==='zzz'){
    $("#middlePart").show();
}else{
    $("#middlePart").hide();
}
}