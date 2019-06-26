const weaapi = "https://www.tianqiapi.com/api/?version=v6"

$httpClient.get(weaapi, function(error, response, data){
    if (error){
        console.log(error);
        $done();                   
    } else {
        var obj = JSON.parse(data);
        console.log(obj);
        var city = "所在城市： " + obj.city;
        var wea = "天气状况： " + obj.wea + "  当前" + obj.tem + "℃  " + obj.tem2 + "℃～" + obj.tem1 + "℃";
        var air = "当前风力： " + obj.win + obj.win_speed + "  风速" + obj.win_meter + "\n空气指数： " + obj.air + "  " + obj.air_level + "\n友情提示： " + obj.air_tips + "\n更新时间： " + obj.date + " "+ obj.update_time;
        let wmation = [city,wea,air];
        $notification.post(wmation[0], wmation[1], wmation[2]);
        $done();
    }
}
);


/*****************************************************************

修改自：https://raw.githubusercontent.com/ydzydzydz/Rules/master/js/weather.js

[Script]

# 在每天 7:30 和 14:30 预报天气
cron "30 7,14 * * *" script-path=https://raw.githubusercontent.com/budaobu/Sub-list/master/ExternalResources/Surge/Scripts/tianqiapi.js

*****************************************************************/
