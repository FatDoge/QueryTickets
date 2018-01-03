// 定义接口地址
var distanceUrl = 'http://e.hduzjh.cn/QueryTickets/distance';
// 增加站点间距离
function addDistance(distance, startstation, endstation) {
    $.ajax({
        url: distanceUrl + '/add',
        data: {
            distance: distance,
            startstation: startstation,
            endstation: endstation
        },
        success: function (ret) {
            if (ret.status === 200) {
                layer.msg(ret.message);
                showInfo();
                return true;
            } else layer.msg(ret.message);
        },
        error: function () {
            layer.msg('服务端错误');
            return false;
        }
    })
}
// 删除某站点间距离,id为getall中数组中每个对象的属性
function deleteDistance(id) {
    $.ajax({
        url: distanceUrl + '/delete',
        data: {
            id: id
        },
        success: function (ret) {
            if (ret.status === 200) {
                layer.msg(ret.message);
                return true;
            }
        },
        error: function () {
            layer.msg('服务端错误');
            return false;
        }
    })
}
// 更新某站点间距离信息,id为getall中数组中每个对象的属性
function updateDistance(id, distance) {
    $.ajax({
        url: distanceUrl + '/update',
        data: {
            id: id,
            distance: distance
        },
        success: function (ret) {
            if (ret.status === 200) {
                layer.msg(ret.message);
                return true;
            }
        },
        error: function () {
            layer.msg('服务端错误');
            return false;
        }
    })
}
// 弹出层输入距离信息
function submitDistanceInfo() {
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['400px', '500px'], //宽高
        content: $('#pop'),
        title: '添加站点距离'
    });
}

function submitAddInfo() {
    var distance = $('#distance').val(),
        startstation = $('#startPos').val(),
        endstation = $('#endPos').val();
    if (distance && startstation && endstation) {
        if (startstation === endstation) {
            layer.msg('错误!两站点相同。');
            return false;
        } else
            addDistance(distance, startstation, endstation);
    }
}
// 现有距离信息
function showInfo() {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/distance/getall',
        success: function (result) {
            var data;
            if (result.status === 200) data = result.data;
            for (var i = 0; i < data.length; i++) {
                data[i].trainStationByStart = data[i].trainStationByStart.station;
                data[i].trainStationByEnd = data[i].trainStationByEnd.station;
            }
            layui.use('table', function () {
                var table = layui.table;

                //第一个实例
                table.render({
                    elem: '#distanceTable',
                    height: 500,
                    data: data,
                    page: true //开启分页
                        ,
                    cols: [
                        [ //表头
                            {
                                field: 'id',
                                title: 'ID',
                                width: '20%',
                                sort: true,
                                align: 'center'
                            }, {
                                field: 'trainStationByStart',
                                title: '出发站',
                                width: '20%',
                                sort: false,
                                align: 'center'
                            }, {
                                field: 'trainStationByEnd',
                                title: '到达站',
                                width: '20%',
                                sort: false,
                                align: 'center'
                            }, {
                                field: 'distance',
                                title: '站点距离',
                                width: '20%',
                                align: 'center',
                                edit: 'num'
                            }, {
                                fixed: 'right',
                                width: '20%',
                                align: 'center',
                                toolbar: '#barDemo'
                            }
                        ]
                    ]
                });
                //监听单元格编辑

                table.on('tool(distanceTable)', function (obj) {

                    var value = obj.value //得到修改后的值
                        ,
                        data = obj.data //得到所在行所有键值
                        ,
                        field = obj.field; //得到字段
                    console.log('[ID: ' + data.trainStationByStart + '] ' + field + ' 字段更改为：' + value);
                    if (obj.event === 'delete') {
                        // 删除
                        layer.confirm('确认删除该站点距离么', function (index) {
                            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                            layer.close(index);
                            console.log(data)
                            //向服务端发送删除指令
                            deleteDistance(data.id);
                        });
                    }
                });

            });
        }
    })

}