//Script event auto linked ipv4 nextdns: network-change
/*
[General]
# > NextDNS (https://nextdns.io/)
always-real-ip = link-ip.nextdns.io
[Host]
# NextDNS (https://nextdns.io/)
link-ip.nextdns.io = server:45.90.xx.xx
# > NextDNS
event network-changed script-path=Scripts/nextdns_linkedip.js
*/

$httpClient.post('https://link-ip.nextdns.io/xxxxx/xxxxxxxxxxx', function(error, response, data){
  if (error) {
$notification.post('NEXT DNS ', 'Internet error','');
    $done({});
  } else {
$notification.post('NEXT DNS ', 'IPv4 (with linked IP)', 'ip :' + data);
    $done({});
  }
});
