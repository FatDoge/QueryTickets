function deleteData(data) {
    console.log(data);
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/admin/deleteusers',
        data: {
            userid: data.id
        },
        success: function (result) {
            layer.msg(result.message)
        }
    })
}

function showInfo() {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/admin/getusers',
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
                                field: 'id',
                                title: 'ID',
                                width: '20%',
                                sort: true,
                                align: 'center'
                            }, {
                                field: 'username',
                                title: '用户名',
                                width: '20%',
                                sort: false,
                                align: 'center',
                                edit: 'text'
                            }, {
                                field: 'password',
                                title: '密码',
                                width: '20%',
                                sort: false,
                                align: 'center',
                                edit: 'text',
                            }, {
                                field: 'name',
                                title: '昵称',
                                width: '20%',
                                align: 'center',
                                edit: 'text'
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

                table.on('tool(demo)', function (obj) {

                    var value = obj.value //得到修改后的值
                        ,
                        data = obj.data //得到所在行所有键值
                        ,
                        field = obj.field; //得到字段
                    console.log('[ID: ' + data.username + '] ' + field + ' 字段更改为：' + value);
                    if (obj.event === 'delete') {
                        // 删除
                        layer.confirm('确认删除该用户么', function (index) {
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
function addUser() {
    //捕获页
    layer.open({
        type: 1,
        skin: 'layui-layer-rim', //加上边框
        area: ['400px', '400px'], //宽高
        content: $('#addUserInfo'),
        title: '填写新增用户信息'
    });
}
// 提交新建用户信息到api
function submitAddUserInfo() {
    var name = $('#name').val();
    var username = $('#username').val();
    var password = $('#password').val();
    if (!name || !username || !password) {
        layer.msg('请填写完整信息')
        return false;
    } else {
        $.ajax({
            url: 'http://e.hduzjh.cn/QueryTickets/admin/addusers',
            data: {
                name: name,
                username: username,
                password: password
            },
            success: function (result) {
                if (result.status === '200') {
                    layer.msg(result.message)
                    showInfo();
                    $('#name').val('');
                    $('#username').val('');
                    $('#password').val('');
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
function submitChangeUserInfo(data) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/admin/updateusers',
        data: {
            name: data.name,
            username: data.username,
            password: data.password,
            userid: data.id
        },
        success: function (result) {
            if (result.status === '200') {
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