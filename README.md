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

```
