function addStation() {
    console.log('增加站点');
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}
// 修改站点
function updateStation(id, station) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/station/update',
        data: {
            station: station,
            id: id
        },
        success: function (ret) {
            if (ret.status === 200) {
                layer.msg(ret.message)
            } else {
                layer.msg('请求错误')
            }
            return true;
        },
        error: function (ret) {
            layer.msg('服务端错误')
            return false;
        }
    })
}
// 删除该站
function deleteStation(id) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/station/delete',
        data: {
            id: id
        },
        success: function (ret) {
            if (ret.status === 200) {
                layer.msg(ret.message)
                setTimeout(function () {
                    window.location = './station.html'
                }, 1000)
            } else {
                layer.msg('请求错误')
            }
            return true;
        },
        error: function (ret) {
            layer.msg('服务端错误')
            return false;
        }
    })
}
// 添加站点
function addStation() {
    //prompt层
    layer.prompt({
        title: '请输入站点名'
    }, function (pass, index) {
        layer.close(index);
        $.ajax({
            url: 'http://e.hduzjh.cn/QueryTickets/station/add',
            data: {
                station: pass
            },
            async: false,
            success: function (ret) {
                if (ret.status === 200) {
                    layer.msg('站点添加成功')
                } else {
                    layer.msg('请求错误')
                }
            },
            error: function () {
                layer.msg('服务端错误')
            }
        })
    });
}

function ShowElement(element) {
    var id = element.dataset.id;
    var station = myTrim(element.innerHTML);
    var oldhtml = element.innerHTML;
    var newobj = document.createElement('input');
    //创建新的input元素
    newobj.type = 'text';
    //为新增元素添加类型
    newobj.onblur = function () {

        //当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
        element.innerHTML = this.value ? this.value : oldhtml;
        if (element.innerHTML !== oldhtml)
            updateStation(id, element.innerHTML)
    }
    element.innerHTML = '';
    element.appendChild(newobj);
    newobj.focus();
}

function deleteIt(element) {
    var id = element.dataset.delid;
    //询问框

    layer.confirm('确认删除该站点吗?', {
        btn: ['确认', '取消'] //按钮
    }, function () {
        deleteStation(id)
    });
}