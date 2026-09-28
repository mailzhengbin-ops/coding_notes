# 安全性
## 身份认证
Laravel 提供基于Session-Cookie的身份验证
> 同时也提供了基于Token、OAuth 2.0的认证方案，此处主要关注Session认证

### 认证流程
验证登录凭证成功后，在服务端建立Session会话并保存用户身份信息，同时通过Cookie将Session ID 发送给浏览器，由浏览器存储在Cookie中。后续请求携带该Cookie，Laravel根据Session ID 恢复用户的认证状态
```text
第一次请求
  ↓
提交登录凭证（账号密码）
  ↓
验证凭证通过（此时，登录成功）
  ↓
在服务端建立Session会话
  ↓
在服务端：保存用户的身份信息（user_id）
  ↓
在客户端：在Cookie中保存服务端创建的Session ID
  ↓
登录成功
──────────────
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

