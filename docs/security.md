# 安全性
## 身份认证
本章只涉及Session-Cookie身份验证方案（通用认证方案，与Laravel无关）
> 此外，Laravel也提供了基于Token、OAuth 2.0的认证方案

### 验证流程
如下为Session-Cookie认证方案的完整流程
```text
【第一次请求】
  ↓
提交登录凭证（账号密码）
  ↓
验证凭证通过
  ↓
在服务端：建立当前用户的Session会话，并存入会话数据（身份信息、登录状态等）
（Session会话存储在指定的驱动器中，默认为database的sessions表）
  ↓
在客户端：在Cookie中保存服务端分配的Session ID
  ↓
重定向到后台面板
---------------------------------------
【后续请求】
  ↓
每次请求的Cookie中携带Session ID
  ↓
将Session ID与服务器中存储的身份信息进行匹配，比对成功
  ↓
恢复用户身份
```
> 注意：验证凭证决定“能不能登录”，Session–Cookie负责“记住已经登录”，避免HTTP无状态


