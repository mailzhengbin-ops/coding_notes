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