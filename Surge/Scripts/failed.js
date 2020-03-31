/*
[Rule]
SCRIPT,falied,PROXY,requires-resolve

[Script]
rule falied script-path=https://raw.githubusercontent.com/budaobu/Rules/master/Surge/Scripts/failed.js
*/

var ip_1 = $request.dnsResult.v4Addresses[0] === "0.0.0.0";
var ip_2 = $request.dnsResult.v4Addresses[0] === "127.0.0.1";

$done({matched: (ip_1 || ip_2)});
