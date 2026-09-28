# 安全性
## 身份认证
Laravel 提供基于Session-Cookie的身份验证
> 同时也提供了基于Token、OAuth 2.0的认证方案，此处主要关注Session认证

### 认证流程
验证登录凭证成功后，在服务端建立Session会话并保存用户身份信息，同时通过Cookie将Session ID 发送给浏览器，由浏览器存储在Cookie中。后续请求携带该Cookie，Laravel根据Session ID 恢复用户的认证状态
```text
```text
首次登录                    后续请求
   ↓                          ↓
提交用户名 + 密码          携带 Cookie
   ↓                          ↓
验证凭证                   获取 Session ID
   ↓                          ↓
建立 Session              找到对应 Session
   ↓                          ↓
保存 user_id              恢复用户身份
   ↓
Cookie 保存 Session ID
```

## 限流
## 授权
## CSRF
