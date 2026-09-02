---
outline: deep
---

## 配置powershell代理
```powershell
# 启动
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
# 验证
echo $env:HTTP_PROXY
echo $env:HTTPS_PROXY
```

## 配置Agent
```json
"env": {
  "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
  "ANTHROPIC_AUTH_TOKEN": "sk-1f96926195334b59be3c0be83304f5e0",
  "ANTHROPIC_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_OPUS_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_SONNET_MODEL": "deepseek-v4-pro[1m]",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL": "deepseek-v4-flash[1m]",
  "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
  "CLAUDE_CODE_EFFORT_LEVEL": "max"
},
```