function getWeather(value){
    let _img = "";
    switch (value) {
        case "15":
        case "16":
        case "17":
        case "18":
        case "21":
        case "22":
        case "33":
        case "34":
        case "35":
        case "36":
        case "41":
            _img = 'assets/images/day-thunderstorm.svg';  //雷陣雨
            break;
        case "01":
            _img = 'assets/images/day-clear.svg';  //晴天
            break;
        case "25":
        case "26":
        case "27":
        case "28":
            _img = 'assets/images/day-cloudy-fog.svg';  //多雲有霧
            break;
        case "02":
        case "03":
        case "04":
        case "05":
        case "06":
        case "07":
            _img = 'assets/images/day-cloudy.svg';  //多雲時晴
            break;
        case "24":
            _img = 'assets/images/day-fog.svg'; //晴有霧
            break;
        case "08":
        case "09":
        case "10":
        case "11":
        case "12":
        case "13":
        case "14":
        case "19":
        case "20":
        case "29":
        case "30":
        case "31":
        case "32":
        case "38":
        case "39":
            _img = 'assets/images/day-partially-clear-with-rain.svg';  //多雲時晴雷陣雨
            break;
        case "23":
        case "37":
        case "42":
            _img = 'assets/images/day-snowing.svg';  //下雪
            break;
        default:
            return "";
    }
    return _img;
}

(function () {
    var weatherAPI = "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-035?Authorization=CWB-5205EB6A-8913-45D0-BCC2-E54EB14AC8A0&format=JSON&locationName=%E9%95%B7%E6%B2%BB%E9%84%89&elementName=";
    $.getJSON(weatherAPI, {
        format: "json"
    })
        .done(function (data) {

            var eachTable = $('.each-table tbody');
            PoP12h = data.records.locations[0].location[0].weatherElement[0].time;
            Wx = data.records.locations[0].location[0].weatherElement[6].time;
            MaxT = data.records.locations[0].location[0].weatherElement[12].time;
            MinT = data.records.locations[0].location[0].weatherElement[8].time;

            console.log(PoP12h);
            console.log(Wx);
            console.log(MaxT);
            for (var i = 0; i < 6; i++) {
                startTime = PoP12h[i]["startTime"];
                endTime = PoP12h[i]["endTime"];
                PoP12h_value = PoP12h[i]["elementValue"][0]["value"];
                MaxT_value = MaxT[i]["elementValue"][0]["value"];
                MinT_value = MinT[i]["elementValue"][0]["value"];
                Wx_value = Wx[i]["elementValue"][0]["value"];
                Wx_value1 = Wx[i]["elementValue"][1]["value"];

                eachTable.append(
                    '<tr>' +
                    '<td>' + startTime + '</td>' +
                    '<td>' + endTime + '</td>' +
                    '<td>' + PoP12h_value + '%' + '</td>' +
                    '<td>' + MinT_value + '</td>' +
                    '<td>' + MaxT_value + '</td>' +
                    '<td>' + Wx_value + '</td>' +
                    '<td><img src="'+ getWeather(Wx_value1)+'"></img></td>' +
                    '</tr>');
            }
        });
})();


function getFlag(value, para) {
    let _code = "";
    let _img = "";
    let _para = (para.data) ? para.data.coord[0] : para;
    let _hour = _para.substring(6, 8);
    let wx = wxList.find(function (item) {
        return item.startTime.indexOf(_para) === 5
    });
    if (wx) {
        _code = wx.elementValue[1].value;
    }
    switch (_code) {
        case "01":
        case "24":
            if (_hour >= 18 || _hour < 6) {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-02.svg';  //月亮
            } else {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-01.svg';  //太陽
            }

            break;
        case "04":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-05.svg';  //雲
            break;
        case "19":
        case "21":
            if (_hour >= 18 || _hour < 6) {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-09.svg';  //晴天  日夜圖示不同 01 02
            } else {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-08.svg';  //晴天  日夜圖示不同 01 02
            }
            break;
        case "03":
        case "26":
            if (_hour >= 18 || _hour < 6) {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-03.svg';  //雲+月亮
            } else {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-04.svg';  //雲+太陽
            }
            break;

        case "08":
        case "09":
        case "12":
        case "20":
        case "23":
        case "29":
        case "30":
        case "31":
        case "32":
        case "37":
        case "38":
        case "15":
        case "16":
        case "22":
        case "33":
        case "34":
        case "35":
        case "36":
        case "41":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-06.svg'; //雨
            break;
        case "42":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-10.svg'; //下雪'
            break;
        case "02":
        case "25":
            if (_hour >= 18 || _hour < 6) {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-12.svg';  //月亮+雲
            } else {
                _img = HostbaseUrl + 'images/cwbChart/weather-icon-11.svg';  //太陽+雲
            }
            break;
        case "05":
        case "27":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-13.svg';  //雲+烏雲
            break;
        case "06":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-14.svg';  //烏雲+雲
            break;
        case "07":
        case "28":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-15.svg';  //烏雲
            break;
        case "10":
        case "13":
        case "17":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-16.svg';  //烏雲+雲雨
            break;
        case "18":
        case "14":
        case "39":
        case "11":
            _img = HostbaseUrl + 'images/cwbChart/weather-icon-17.svg';  //烏雲雨
            break;
        default:
            return "";
    }
    //console.log(_code);
    //console.log(_img);
    return _img;
}