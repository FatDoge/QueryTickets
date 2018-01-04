var stations;
var distance;
function stationInfo() {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/station/getall',
        success: function (result) {
            if (result.status === 200) stations = result.data;
            else console.log('错误');
        },
        async: false
    })
}

function distanceInfo() {
    $.ajax({
        url: 'http://e.hduzjh.cn/QueryTickets/distance/getall',
        success: function (result) {
            if (result.status === 200) distance = result.data;
            else console.log('错误');
        },
        async: false
    })
}
stationInfo();
distanceInfo();
console.log(distance);
console.log(stations);
var app = new Vue({
    el: '#app',
    data: {
        'nickname': function () {
            return localStorage.getItem('queryTickets_id') || 'admin';
        },
        station: stations,
        check: false,
        checkMiddle: '',
        distance: distance,
    }
})