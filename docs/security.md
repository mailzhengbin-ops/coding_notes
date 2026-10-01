# 安全性
## 身份认证
Laravel的身份验证机制核心由`guard`和`provider`组成。其中，`guard`提供了身份验证方案
> Laravel提供的身份验证方案包括Session + Cookie（Laravel's Built-in Browser Authentication Services）和Token（API Authentication Services），默认支持的是前者，后者需要通过安装Sanctum（基于普通API Token）或Passport（基于OAuth 2.0 / Access Token）来实现

### Laravel中身份认证方案的配置
web是该guard的名称，driver决定该守卫用什么样的身份验证机制，provider决定使用什么用户来源
```php
'guards' => [
    'web' => [
        'driver' => 'session',
        'provider' => 'users',
    ],
    'api' => [
        'driver' => 'token',
        'provider' => 'users',
    ],
    'admin' => [
        'driver' => 'session',
        'provider' => 'admins',
    ],
],
```
> 注意：guard名称不能决定该守卫采取那种认证方案，真正取决定作用的是`'driver' => 'session'`配置项

```php
// 使用名称为 admin 的 Guard 获取当前认证用户
Auth::guard('admin')->user();
// 指定 /users 路由使用 admin Guard 进行身份认证
Route::get('/users', [UserController::class, 'index'])
    ->middleware('auth:admin');
```
> guard默认提供的web guard支持Session-Cookie方案来实现身份验证，如果


本章只涉及Session-Cookie身份验证方案（通用认证方案，与Laravel无关）
> 基于Token、JWT的认证方案，在本章中不涉及

### Session-Cookie方案验证流程
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
### Laravel Fortify的身份验证实践
Laravel Fortify是一个与前端无关的后端身份验证实现，其提供了所有身份验证功能所需的路由和控制器（登录、注册、密码重置、邮箱验证...），但是不包括视图（这意味着你需要使用自己的视图）
> 
