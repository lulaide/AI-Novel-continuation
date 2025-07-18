# API Documentation

## Base URL
```
http://localhost:5000/api/v1
```

## Authentication
This API uses session-based authentication. The OpenAI API key is stored in the server session after configuration.

## Endpoints

### 1. Configure OpenAI API
Configure the OpenAI API settings for the session.

**Endpoint**: `POST /openaiapi`

**Request Body**:
```json
{
  "apiKey": "sk-your-openai-api-key",
  "baseUrl": "https://api.openai.com/v1",
  "model": "gpt-3.5-turbo"
}
```

**Response**:
```json
{
  "status": "success"
}
```

**Error Response**:
```json
{
  "status": "error",
  "message": "无效的 OpenAI API 配置。请检查 baseUrl、model 和 apiKey 是否正确。"
}
```

**Status Codes**:
- `200`: Configuration successful
- `400`: Invalid configuration or missing parameters

---

### 2. Generate Novel Endings
Generate 4 different endings for the provided novel content.

**Endpoint**: `POST /novel/endings`

**Request Body**:
```json
{
  "content": "在一个充满魔法的世界里，年轻的法师艾米丽踏上了寻找失落法杖的旅程..."
}
```

**Response**:
```json
{
  "endings": [
    "艾米丽在古老的遗迹中找到了法杖，用它拯救了整个王国。",
    "法杖原来是一个陷阱，艾米丽必须用自己的力量来解决危机。",
    "在寻找法杖的过程中，艾米丽发现了自己内心真正的力量。",
    "法杖被黑暗势力先一步获得，艾米丽必须团结朋友们一起战斗。"
  ]
}
```

**Error Response**:
```json
{
  "status": "error",
  "message": "未配置 OpenAI API"
}
```

**Status Codes**:
- `200`: Endings generated successfully
- `400`: Invalid content or missing parameters
- `401`: OpenAI API not configured
- `500`: Generation error

---

### 3. Continue Novel
Generate a continuation based on the selected ending.

**Endpoint**: `POST /novel/continue`

**Request Body**:
```json
{
  "content": "在一个充满魔法的世界里，年轻的法师艾米丽踏上了寻找失落法杖的旅程...",
  "ending": "艾米丽在古老的遗迹中找到了法杖，用它拯救了整个王国。",
  "maxLength": 500
}
```

**Response**:
```json
{
  "novel": "艾米丽小心翼翼地握住法杖，感受着其中蕴含的强大力量。法杖发出温暖的光芒，照亮了整个遗迹。她知道，这就是传说中的光明法杖，拥有驱散黑暗的神奇力量。\n\n回到王国后，艾米丽用法杖成功击败了入侵的黑暗军团。王国重获和平，人们欢呼雀跃。艾米丽成为了真正的英雄，她的名字将被永远铭记在历史中。\n\n从此以后，艾米丽继续用法杖保护着王国，成为了最伟大的法师。"
}
```

**Error Response**:
```json
{
  "status": "error",
  "message": "内容、结局或最大长度参数不正确。请确保提供有效的小说内容、结局和最大长度。"
}
```

**Status Codes**:
- `200`: Novel continuation generated successfully
- `400`: Invalid parameters (content, ending, or maxLength missing)
- `401`: OpenAI API not configured
- `500`: Generation error

## Parameters

### maxLength Options
- `300`: Short story (approximately 300 characters)
- `500`: Medium story (approximately 500 characters)
- `700`: Long story (approximately 700 characters)

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in Chinese. Common error scenarios include:

1. **Missing Parameters** (400): Required fields are not provided
2. **Invalid API Configuration** (400): OpenAI API settings are incorrect
3. **API Not Configured** (401): OpenAI API has not been configured for the session
4. **Generation Errors** (500): Internal errors during AI text generation

## Rate Limiting

This API does not implement rate limiting, but it depends on the OpenAI API's rate limits. Consider implementing rate limiting for production use.

## Session Management

The API uses Flask sessions to store OpenAI API configuration. Sessions are temporary and will be lost when the server restarts. For production use, consider implementing persistent session storage.

## Example Usage

### Python Example
```python
import requests

# Configure API
config_response = requests.post('http://localhost:5000/api/v1/openaiapi', json={
    'apiKey': 'sk-your-api-key',
    'baseUrl': 'https://api.openai.com/v1',
    'model': 'gpt-3.5-turbo'
})

# Generate endings
endings_response = requests.post('http://localhost:5000/api/v1/novel/endings', json={
    'content': 'Your novel content here...'
})

# Continue novel
continue_response = requests.post('http://localhost:5000/api/v1/novel/continue', json={
    'content': 'Your novel content here...',
    'ending': 'Selected ending...',
    'maxLength': 500
})
```

### JavaScript Example
```javascript
// Configure API
const configResponse = await fetch('/api/v1/openaiapi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        apiKey: 'sk-your-api-key',
        baseUrl: 'https://api.openai.com/v1',
        model: 'gpt-3.5-turbo'
    })
});

// Generate endings
const endingsResponse = await fetch('/api/v1/novel/endings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        content: 'Your novel content here...'
    })
});

// Continue novel
const continueResponse = await fetch('/api/v1/novel/continue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        content: 'Your novel content here...',
        ending: 'Selected ending...',
        maxLength: 500
    })
});
```