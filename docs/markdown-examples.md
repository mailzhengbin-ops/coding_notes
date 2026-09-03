# 项目结构


```md
app/
│
├── Http/
│   ├── Controllers/     ← 接收 HTTP 请求
│   ├── Middleware/      ← 请求经过的“门”
│   └── Requests/        ← 验证请求数据
│
├── Models/              ← 数据模型 / 数据库
│
├── Providers/           ← 注册、配置服务
│
├── Actions/             ← 一个个具体业务操作
│
├── Services/            ← 复杂业务逻辑
│
├── Console/             ← Artisan 命令
│
└── Exceptions/          ← 异常相关
```

## Providers
```php
class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // 告诉 Container 怎么注册/创建某些服务
    }

    public function boot(): void
    {
        // 应用启动后执行一些初始化工作
    }
}
```
注意：自己在Services中创建的具体Service通常不需要再register中注册，因为Service Container会自动解析具体的类

## Actions和Services
Actions（操作类）通常是一个类里只有一个方法，用于处理一个具体的业务，Services（服务类）里通常是一个类里一组方法，用于处理同类的业务

## Thin Controller
thin controller是一种控制器设计方式：controller内不应该处理一大堆业务逻辑，而是把具体业务交给service完成，自己则负责完成如下逻辑

```md
// 一个thin controller的内部逻辑如下
HTTP Request
     ↓
Controller
     │
     ├─ ① 接收请求
     ├─ ② 验证输入
     ├─ ③ 准备数据（获取用户/参数/文件）
     ├─ ④ 调用 Service / Action
     ├─ ⑤ 接收处理结果
     └─ ⑥ 返回 Response / Redirect
     ↓
HTTP Response
```

用户使用某服务，完整流程为：Service→Service Providers→Service Container

Service（服务类）：真正提供服务的类
Service Providers（服务提供商）：用于注册服务到Service Container，告诉其如何使用该服务类
Service Container（服务容器）：管理类依赖项和执行依赖注入

以系统的服务提供商说明：
vender/laravel/framework/src/Illuminate/Cache/CacheServiceProvider.php，其提供了三个服务类（cache，cache.store，memcached.connect）

```php
public function register()
{
    $this->app->singleton('cache', function ($app) {
        return new CacheManager($app);
    });

    $this->app->singleton('cache.store', function ($app) {
        return $app['cache']->driver();
    });

    $this->app->singleton('memcached.connector', function () {
        return new MemcachedConnector;
    });
}
```
当我们使用cache服务类时，服务容器会解析出CacheManager服务类的实例并返回