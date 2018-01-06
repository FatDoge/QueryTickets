function deleteData(data) {
    console.log(data);
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/train/delete',
        data: {
            id: data.id
        },
        success: function (result) {
            layer.msg(result.message)
        },
        error: function () {
            layer.msg('服务端错误')
        }
    })
}

function showInfo() {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/train/getall',
        success: function (result) {
            var data;
            if (result.status === 200) data = result.data;
            layui.use('table', function () {
                var table = layui.table;

                //第一个实例
                table.render({
                    elem: '#demo',
                    height: 500,
                    data: data,
                    page: true //开启分页
                        ,
                    cols: [
                        [ //表头
                            {
                                field: 'number',
                                title: '车次号',
                                width: '9%',
                                sort: true,
                                align: 'center'
                            }, {
                                field: 'specialSeat',
                                title: '特等座',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text'
                            }, {
                                field: 'firstSeat',
                                title: '一等座',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text',
                            }, {
                                field: 'secondSeat',
                                title: '二等座',
                                width: '9%',
                                align: 'center',
                                edit: 'text'
                            },
                            {
                                field: 'softSeat',
                                title: '软座',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text'
                            }, {
                                field: 'hardSeat',
                                title: '硬座',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text',
                            }, {
                                field: 'noSeat',
                                title: '无座',
                                width: '9%',
                                align: 'center',
                                edit: 'text'
                            }, {
                                field: 'highSleeper',
                                title: '高卧',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text'
                            }, {
                                field: 'softSleeper',
                                title: '软卧',
                                width: '9%',
                                sort: false,
                                align: 'center',
                                edit: 'text',
                            }, {
                                field: 'hardSleeper',
                                title: '硬卧',
                                width: '9%',
                                align: 'center',
                                edit: 'text'
                            }, {
                                fixed: 'right',
                                width: '9%',
                                align: 'center',
                                toolbar: '#barDemo'
                            }
                        ]
                    ]
                });
                //监听单元格编辑

                table.on('tool(demo)', function (obj) {

                    var value = obj.value //得到修改后的值
                        ,
                        data = obj.data //得到所在行所有键值
                        ,
                        field = obj.field; //得到字段
                    console.log('[ID: ' + data.username + '] ' + field + ' 字段更改为：' + value);
                    if (obj.event === 'delete') {
                        // 删除
                        layer.confirm('确认删除该列车么', function (index) {
                            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                            layer.close(index);
                            //向服务端发送删除指令
                            deleteData(data);
                        });
                    }
                });

            });
        }
    })

}
// 添加用户
function addTrain() {
    //捕获页
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['400px', '500px'], //宽高
        content: $('#addTrainInfo'),
        title: '填写新增列车信息'
    });
}
// 提交新建用户信息到api
function submitAddTrainInfo() {
    var number = $('#number').val();
    var specialSeat = $('#specialSeat').val();
    var firstSeat = $('#firstSeat').val();
    var secondSeat = $('#secondSeat').val();
    var softSeat = $('#softSeat').val();
    var hardSeat = $('#hardSeat').val();
    var noSeat = $('#noSeat').val();
    var highSleeper = $('#highSleeper').val();
    var softSleeper = $('#softSleeper').val();
    var hardSleeper = $('#hardSleeper').val();
    if (!(number && specialSeat && firstSeat && secondSeat && softSeat && hardSeat && noSeat && highSleeper && softSleeper && hardSleeper)) {
        layer.msg('请填写完整信息')
        return false;
    } else {
        $.ajax({
            url: 'http://e.hduzjh.cn/QueryTickets/train/add',
            data: {
                number: number,
                specialSeat: specialSeat,
                firstSeat: firstSeat,
                secondSeat: secondSeat,
                softSeat: softSeat,
                hardSeat: hardSeat,
                noSeat: noSeat,
                highSleeper: highSleeper,
                softSleeper: softSleeper,
                hardSleeper: hardSleeper
            },
            success: function (result) {
                if (result.status === 200) {
                    layer.msg(result.message)
                    showInfo();
                    var number = $('#number').val('');
                    var specialSeat = $('#specialSeat').val('');
                    var firstSeat = $('#firstSeat').val('');
                    var secondSeat = $('#secondSeat').val('');
                    var softSeat = $('#softSeat').val('');
                    var hardSeat = $('#hardSeat').val('');
                    var noSeat = $('#noSeat').val('');
                    var highSleeper = $('#highSleeper').val('');
                    var softSleeper = $('#softSleeper').val('');
                    var hardSleeper = $('#hardSleeper').val('');
                    return true;
                } else {
                    layer.msg(result.message)
                    return false;
                }
            }
        })
    }
}
// 提交修改用户信息
function submitChangeTrainInfo(data) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/train/update',
        data: {
            id: data.id,
            number: data.number,
            specialSeat: data.specialSeat,
            firstSeat: data.firstSeat,
            secondSeat: data.secondSeat,
            softSeat: data.softSeat,
            hardSeat: data.hardSeat,
            noSeat: data.noSeat,
            highSleeper: data.highSleeper,
            softSleeper: data.softSleeper,
            hardSleeper: data.hardSleeper
        },
        success: function (result) {
            if (result.status === 200) {
                layer.msg(result.message)
                showInfo();
                return true;
            } else {
                layer.msg(result.message)
                return false;
            }
        }
    })
}