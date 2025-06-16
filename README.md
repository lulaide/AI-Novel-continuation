# 小说续写器

## 前端
---
## 后端
### API
- OpenAPI 
```http request
POST /api/v1/openaiapi
Content-Type: application/json

{
    "baseUrl": "https://api.openai.com/v1/models"
    "model": "gpt-3.5-turbo",
    "apiKey": "your_api_key_here"
}
```
```http response
HTTP/1.1 200 OK
Content-Type: application/json

{
    "status": "success",
}
```
```http response
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "status": "error",
    "message": "无效的 OpenAI API 配置。请检查 baseUrl、model 和 apiKey 是否正确。",
}
```

- 获取小说不同结局
```http request
POST /api/v1/novel/endings
Content-Type: application/json

{
    "content": "在遥远的魔法国度，有一座……",
}
```
```http response
HTTP/1.1 200 OK
Content-Type: application/json

{
    "endings": [
        "罗兰举起银色法杖，点亮夜空，将园中黑影驱散，魔法国度重现生机。",
        "彼岸花凋零之际，少女献出一滴泪水，唤回沉睡的灵魂，花园得以重生。",
        "寒风中，骑士踏碎魔镜，以血肉之躯封印黑暗，王国迎来久违的曙光。",
        "吟游诗人轻吟旧曲，旋律化为暖流，抚慰受伤心灵，爱与希望蔓延四方。"
  ]
}
```
```http response
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "status": "error",
    "message": "内容不能为空或格式不正确。请提供有效的小说内容。",
}
```

- 获取小说续写
```http request
POST /api/v1/novel/continue
Content-Type: application/json

{
    "content": "在遥远的魔法国度，有一座……",
    "ending": "罗兰举起银色法杖，点亮夜空，将园中黑影驱散，魔法国度重现生机。",
    "maxLength": 500
}
```
```http response
HTTP/1.1 200 OK
Content-Type: application/json

{
    "novel": "在遥远的魔法国度，有一座被岁月遗忘的彼岸花园。漫长的围墙上缠绕着紫红色的花藤，每一朵彼岸花都在月光下低声絮语。传说，花园中央的古井深不见底，井中封印着一段尘封的往事：勇者与魔王的最后一战。\n\n少年罗兰因梦中幻象来到此地。他推开生锈的铁门，踏上铺满落叶的石径。暮色中，幽光闪烁，一只银翼蝴蝶引他穿过迷宫般的花丛。蝴蝶振翅欲飞，却在古井边停下，似在指引。\n\n罗兰俯身向井中探望，却只见漆黑一片。他鼓起勇气，念出古老咒语。顷刻间，井底涌出蓝色雾气，化作一位身披银甲的少女。她映着月华，温柔却带着忧伤：“我是守护者，千年前为拯救王国献祭一切。若要解开封印，需集齐四朵彼岸之泪。”\n\n少女化作光点消散，雾气归于寂静。罗兰抬头，望向花海深处，那儿曳动着微弱光辉，仿佛在召唤。他握紧法杖，毅然踏上寻找之旅——穿越荆棘、对抗黑影、感受花语低吟……\n\n花园的秘密才刚刚揭开，罗兰的试炼才刚刚开始。他决意收集象征勇气、希望、牺牲与救赎的四滴花泪，将古井的封印彻底解开，让沉睡的守护者重返人间，也让魔法国度重获新生。"
}
```
```http response
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
    "status": "error",
    "message": "内容、结局或最大长度参数不正确。请确保提供有效的小说内容、结局和最大长度。",
}
```
---
