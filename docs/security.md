# 安全性
## 身份认证
本章只涉及Session-Cookie身份验证方案（通用认证方案，与Laravel无关）
> 此外，Laravel也提供了基于Token、OAuth 2.0的认证方案

### 认证流程
验证登录凭证成功后，在服务端建立Session会话并保存用户身份信息，同时通过Cookie将Session ID 发送给浏览器，由浏览器存储在Cookie中。后续请求携带该Cookie，Laravel根据Session ID 恢复用户的认证状态
```text
第一次请求
  ↓
提交登录凭证（账号密码）
  ↓
验证凭证通过（此时，登录成功，跳转）
  ↓
在服务端：建立当前用户的Session会话，并存入会话数据（身份信息、登录状态等）
（Session会话存储在指定的驱动器中，默认为database的sessions表）
  ↓
在客户端：在Cookie中保存服务端分配的Session ID

---------------------------------------

后续请求
  ↓
携带 Cookie
  ↓
获取 Session ID
  ↓
找到对应 Session
  ↓
恢复用户身份
```
> 验证凭证决定“能不能登录”，Session + Cookie负责“记住已经登录”，避免HTTP无状态

Session会话存储驱动可以存储某用户session会话的会话数据,这些数据通常包括
用户身份（user_id = 1001）、登录状态（authenticated = true）等

