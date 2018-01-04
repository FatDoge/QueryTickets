var data;
// 中转站
function middleStationFunc(startPos, endPos, middleStation) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/changetrainquery',
        data: {
            startStation: startPos,
            endStation: endPos,
            changeStation: middleStation,
            order: ''
        },
        success: function (ret) {
            if (ret.status === 200) {
                var data = ret.data;
                // 数据处理展示
                layui.use('table', function () {
                    var table = layui.table;
                    //第一个实例
                    var trainInfo = data;
                    for (i = 0; i < trainInfo.length; i++) {
                        trainInfo[i].firstStart = changeTime(trainInfo[i].firstStart);
                        trainInfo[i].firstEnd = changeTime(trainInfo[i].firstEnd);
                        trainInfo[i].secondStart = changeTime(trainInfo[i].secondStart);
                        trainInfo[i].secondEnd = changeTime(trainInfo[i].secondEnd);
                        trainInfo[i].firstTimeDifference = changeTime(trainInfo[i].firstTimeDifference);
                        trainInfo[i].secondTimeDifference = changeTime(trainInfo[i].secondTimeDifference);
                    }
                    table.render({
                        elem: '#normalSearch',
                        height: 315,
                        page: true //开启分页
                            ,
                        cols: [
                            [{
                                    align: 'center',
                                    title: '第一车次',
                                    colspan: 8
                                },
                                {
                                    align: 'center',
                                    title: '第二车次',
                                    colspan: 8
                                }
                            ],
                            [ //表头
                                {
                                    field: 'firstNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'startStation',
                                    title: '出发站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'changeStation',
                                    title: '目的站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'firstFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'firstEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'changeStation',
                                    title: '出发站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'endStation',
                                    title: '目的站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'secondFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }

                            ]
                        ],
                        data: trainInfo //数据接口
                    });

                });
            } else {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg(ret.message);
                })
            }
        },
        error: function () {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg('请求错误');
            })
        }
    })
}
// 最短路径
function nearestFunc(startPos, endPos) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/changetrainquery',
        data: {
            startStation: startPos,
            endStation: endPos,
            changeStation: '',
            order: 'distance'
        },
        success: function (ret) {
            if (ret.status === 200) {
                var data = ret.data;
                // 数据处理展示
                layui.use('table', function () {
                    var table = layui.table;
                    //第一个实例
                    var trainInfo = data;
                    for (i = 0; i < trainInfo.length; i++) {
                        trainInfo[i].firstStart = changeTime(trainInfo[i].firstStart);
                        trainInfo[i].firstEnd = changeTime(trainInfo[i].firstEnd);
                        trainInfo[i].secondStart = changeTime(trainInfo[i].secondStart);
                        trainInfo[i].secondEnd = changeTime(trainInfo[i].secondEnd);
                        trainInfo[i].firstTimeDifference = changeTime(trainInfo[i].firstTimeDifference);
                        trainInfo[i].secondTimeDifference = changeTime(trainInfo[i].secondTimeDifference);
                    }
                    table.render({
                        elem: '#normalSearch',
                        height: 315,
                        page: true //开启分页
                            ,
                        cols: [
                            [{
                                    align: 'center',
                                    title: '第一车次',
                                    colspan: 7
                                }, {
                                    field: 'changeStation',
                                    title: '中转站',
                                    align: 'center',
                                    colspan: 1,
                                    rowspan: 2
                                },
                                {
                                    align: 'center',
                                    title: '第二车次',
                                    colspan: 7
                                }, {
                                    field: 'sumDistance',
                                    title: '总里程',
                                    align: 'center',
                                    colspan: 1,
                                    rowspan: 2
                                }
                            ],
                            [ //表头
                                {
                                    field: 'firstNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'startStation',
                                    title: '出发站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'firstFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'firstEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'endStation',
                                    title: '目的站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'secondFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }

                            ]
                        ],
                        data: trainInfo //数据接口
                    });

                });
            } else {
                layer.msg(ret.message);
            }
        },
        error: function () {
            layer.msg('请求错误');
        }
    })
}
// 最低费用
function cheapeastFunc(startPos, endPos) {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/changetrainquery',
        data: {
            startStation: startPos,
            endStation: endPos,
            changeStation: '',
            order: 'money'
        },
        success: function (ret) {
            if (ret.status === 200) {
                var data = ret.data;
                // 数据处理展示
                layui.use('table', function () {
                    var table = layui.table;
                    //第一个实例
                    var trainInfo = data;
                    for (i = 0; i < trainInfo.length; i++) {
                        trainInfo[i].firstStart = changeTime(trainInfo[i].firstStart);
                        trainInfo[i].firstEnd = changeTime(trainInfo[i].firstEnd);
                        trainInfo[i].secondStart = changeTime(trainInfo[i].secondStart);
                        trainInfo[i].secondEnd = changeTime(trainInfo[i].secondEnd);
                        trainInfo[i].firstTimeDifference = changeTime(trainInfo[i].firstTimeDifference);
                        trainInfo[i].secondTimeDifference = changeTime(trainInfo[i].secondTimeDifference);
                    }
                    table.render({
                        elem: '#normalSearch',
                        height: 315,
                        page: true //开启分页
                            ,
                        cols: [
                            [{
                                    align: 'center',
                                    title: '第一车次',
                                    colspan: 7
                                }, {
                                    field: 'changeStation',
                                    title: '中转站',
                                    align: 'center',
                                    colspan: 1,
                                    rowspan: 2
                                },
                                {
                                    align: 'center',
                                    title: '第二车次',
                                    colspan: 7
                                }, {
                                    field: 'sumMoney',
                                    title: '总费用',
                                    align: 'center',
                                    colspan: 1,
                                    rowspan: 2
                                }
                            ],
                            [ //表头
                                {
                                    field: 'firstNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'startStation',
                                    title: '出发站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'firstFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'firstStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'firstEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondNumber',
                                    title: '车次',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'endStation',
                                    title: '目的站',
                                    width: '6.4%',
                                    align: 'center'
                                }, {
                                    field: 'secondFirst',
                                    title: '一等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondSecond',
                                    title: '二等',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondBusiness',
                                    title: '商务',
                                    width: '5%',
                                    align: 'center'
                                }, {
                                    field: 'secondStart',
                                    title: '出发时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }, {
                                    field: 'secondEnd',
                                    title: '到达时间',
                                    width: '8%',
                                    align: 'center',
                                    sort: true
                                }

                            ]
                        ],
                        data: trainInfo //数据接口
                    });

                });
            } else {
                layer.msg(ret.message);
            }
        },
        error: function () {
            layer.msg('请求错误');
        }
    })
}

function changeTime(timestamp) {
    var timeTrans = new Date(parseInt(timestamp));
    timeTrans = timeTrans.toLocaleString('chinese', {
        hour12: false
    });
    var arr = timeTrans.split(' ');
    arr = arr[1].split(':');
    var temp = arr[0] + ':' + arr[1];
    return temp;
}

function getIt() {
    var startPos = $("#startPos").val();
    var endPos = $("#endPos").val();
    var proSearch = $("#proSearch").prop('checked');
    console.log('出发站' + startPos);
    // 判断出发地与目的地，不应相同
    if (startPos === endPos) {
        layui.use('layer', function () {
            var layer = layui.layer;
            layer.msg('地点相同');
        });
        return false;
    } else if (startPos !== endPos) {
        if (proSearch === false) {
            console.log("普通搜索");
            console.log(`${startPos},${endPos}`)
            $.post(
                'http://e.hduzjh.cn/QueryTickets/stationQuery', {
                    'startStation': startPos,
                    'endStation': endPos,
                    'orderBy': 'startTime',
                    'async': false,
                },
                function (result) {
                    if (result.status === 201) {
                        layui.use('layer', function () {
                            var layer = layui.layer;
                            layer.msg('无直达站，请尝试高级搜索');
                        });
                    }
                    console.log(result);
                    data = result.data;
                    layui.use('table', function () {
                        var table = layui.table;
                        //第一个实例
                        var trainInfo = data;
                        for (i = 0; i < trainInfo.length; i++) {
                            trainInfo[i].startTime = changeTime(trainInfo[i].startTime);
                            trainInfo[i].endTime = changeTime(trainInfo[i].endTime);
                            trainInfo[i].timeDifference = changeTime(trainInfo[i].timeDifference);
                        }
                        table.render({
                            elem: '#normalSearch',
                            height: 315,
                            page: true //开启分页
                                ,
                            cols: [
                                [ //表头
                                    {
                                        field: 'number',
                                        title: '车次',
                                        width: '6%',
                                        fixed: 'left',
                                        align: 'center'
                                    }, {
                                        field: 'start',
                                        title: '出发站',
                                        width: '6%',
                                        align: 'center'
                                    }, {
                                        field: 'end',
                                        title: '终点站',
                                        width: '6%',
                                        align: 'center'
                                    }, {
                                        field: 'specialSeat',
                                        title: '特等座',
                                        width: '6%',
                                        align: 'center'
                                    }, {
                                        field: 'firstSeat',
                                        title: '一等座',
                                        width: '6%',
                                        align: 'center'
                                    }, {
                                        field: 'secondSeat',
                                        title: '二等座',
                                        width: '6%',
                                        align: 'center'
                                    }, {
                                        field: 'softSeat',
                                        title: '软座',
                                        width: '5%',
                                        align: 'center'
                                    }, {
                                        field: 'hardSeat',
                                        title: '硬座',
                                        width: '5%',
                                        align: 'center'
                                    }, {
                                        field: 'noSeat',
                                        title: '无座',
                                        width: '5%',
                                        align: 'center'
                                    }, {
                                        field: 'highSleeper',
                                        title: '高级软卧',
                                        width: '8%',
                                        align: 'center'
                                    }, {
                                        field: 'softSleeper',
                                        title: '软卧',
                                        width: '5%',
                                        align: 'center'
                                    }, {
                                        field: 'hardSleeper',
                                        title: '硬卧',
                                        width: '5%',
                                        align: 'center'
                                    }, {
                                        field: 'money',
                                        title: '价格',
                                        width: '6%',
                                        sort: true,
                                        align: 'center'
                                    }, {
                                        field: 'startTime',
                                        title: '出发时间',
                                        width: '8%',
                                        sort: true,
                                        align: 'center'
                                    }, {
                                        field: 'endTime',
                                        title: '到达时间',
                                        width: '8%',
                                        sort: true,
                                        align: 'center'
                                    }, {
                                        field: 'timeDifference',
                                        title: '历时',
                                        width: '8%',
                                        sort: true,
                                        align: 'center'
                                    }
                                ]
                            ],
                            data: trainInfo //数据接口
                        });

                    });
                })
        } else if ($('input:radio[name="proSearch"]:checked').val() === undefined) {
            layui.use('layer', function () {
                var layer = layui.layer;
                layer.msg('未选择选项');
            });
            return false;
        } else if ($('input:radio[name="proSearch"]:checked').val() === 'zdlj') {
            layui.use('layer', function () {
                var layer = layui.layer;
                //layer.msg('最短路径');
                nearestFunc(startPos, endPos);
            });
        } else if ($('input:radio[name="proSearch"]:checked').val() === 'zdfy') {
            layui.use('layer', function () {
                var layer = layui.layer;
                //layer.msg('最低费用');
                cheapeastFunc(startPos, endPos);
            });
        } else if ($('input:radio[name="proSearch"]:checked').val() === 'zzz') {
            var middleStation = $("#middleStations").val();
            if (middleStation === startPos) {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg('中转站不能与出发地相同！');
                });
                return false;
            } else if (middleStation === endPos) {
                layui.use('layer', function () {
                    var layer = layui.layer;
                    layer.msg('中转站不能与目的地相同！');
                });
                return false;
            } else {
                // 请求数据
                middleStationFunc(startPos, endPos, middleStation);
            }
        }
    }
    console.log($('input:radio[name="proSearch"]:checked').val())
}

function toggleMiddle() {
    if ($('input:radio[name="proSearch"]:checked').val() === 'zzz') {
        $("#middlePart").show();
    } else {
        $("#middlePart").hide();
    }
}
