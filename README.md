# Config

subscription

## Surge

### 人人视频

```
[Script]
http-response ^https:\/\/api\.rr\.tv[\s\S]*(channel|Feed|Choice|profile|Medal) script-path=https://raw.githubusercontent.com/Choler/Surge/master/Script/RRtv.js,max-size=524288,requires-body = true

[MITM]
hostname = api.rr.tv
```

### 抖音

```
[Script]
http-response ^https:\/\/[\s\S]*\/v1\/(aweme\/)?(feed|post)\/\? script-path=https://raw.githubusercontent.com/Choler/Surge/master/Script/Aweme.js,max-size=524288,requires-body=true

[MITM]
hostname = aweme*.snssdk.com
```

### 知乎

```
[Rule]
RULE-SET,https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/ad.list,REJECT

# Zhihu(配合 Script 食用)
DOMAIN,mqtt.zhihu.com
DOMAIN-SUFFIX,xdrig.com
URL-REGEX,https://api.zhihu.com/(fringe|zst|real_time|ad-style-service|banners|topstory/hot-lists|market/popover|mqtt|.*launch|.*featured-comment-ad|.*recommendations|search/(top|tabs|preset))
USER-AGENT,AVOS*
AND,((USER-AGENT,ZhihuHybrid*), (NOT,((DOMAIN,www.zhihu.com))), (NOT,((DOMAIN,static.zhihu.com))), (NOT,((DOMAIN-SUFFIX,zhimg.com))))
AND,((USER-AGENT,osee2*), (NOT,((DOMAIN,api.zhihu.com))), (NOT,((DOMAIN,lens.zhihu.com))), (NOT,((DOMAIN,static.zhihu.com))), (NOT,((DOMAIN,www.zhihu.com))), (NOT,((DOMAIN-SUFFIX,zhimg.com))))

[Script]
http-response https://api.zhihu.com/moments\? script-path=ExternalResources/Scripts/ZhihuFeed.js,requires-body=true
http-response https://api.zhihu.com/topstory/recommend script-path=ExternalResources/Scripts/ZhihuRecommend.js,requires-body=true
http-response https://api.zhihu.com/.*/questions script-path=ExternalResources/Scripts/ZhihuAnswer.js,requires-body=true
http-response https://api.zhihu.com/market/header script-path=ExternalResources/Scripts/ZhihuMarket.js,requires-body=true

[MITM]
hostname = api.zhihu.com
```

### bilibili

```
[RULE]
//BiliBili
DOMAIN,dataflow.biliapi.com,REJECT-TINYGIF
DOMAIN,data.bilibili.com,REJECT-TINYGIF
DOMAIN,thirdparty.biliapi.com,REJECT
DOMAIN,cm.bilibili.com,REJECT
URL-REGEX,https://app.bilibili.com/x/v2/param,REJECT
URL-REGEX,https://app.bilibili.com/x/resource/abtest,REJECT
URL-REGEX,http://app.bilibili.com/x/v2/dataflow/report,REJECT-TINYGIF
URL-REGEX,https://app.bilibili.com/x/v2/search/(defaultword|hot|recommend|resource),REJECT
URL-REGEX,https://app.bilibili.com/x/v2/rank.*rid=(168|5),REJECT
URL-REGEX,https://api.bilibili.com/pgc/season/rank/cn,REJECT
AND,((USER-AGENT,bili*), (NOT,((DOMAIN-SUFFIX,bilibili.com))), (NOT,((DOMAIN-SUFFIX,hdslb.com)))),REJECT

[Script]
http-response https://app.bilibili.com/x/resource/show/tab requires-body=true,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20tab.js,requires-body=true
http-response https://app.bilibili.com/x/v2/feed requires-body=true,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20feed.js,requires-body=true
http-response https://app.bilibili.com/x/v2/account/mine requires-body=true,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20account.js,requires-body=true
http-response https://app.bilibili.com/x/v2/view\?access_key requires-body=true,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20view%20relate.js,requires-body=true
http-response https://app.bilibili.com/x/v2/rank requires-body=true,script-path=https://raw.githubusercontent.com/onewayticket255/Surge-Script/master/surge%20bilibili%20rank.js,requires-body=true

[MITM]
hostname = app.bilibili.com, api.bilibili.com
```
