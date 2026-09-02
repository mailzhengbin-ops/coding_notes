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
Actions通常是一个类里只有一个方法，Services里通常是一个类里一组同主题的方法

controller合service
基于 thin controller思想，controller内不应该处理一大堆业务逻辑，而是把具体业务交给service完成，自己则负责接受请求、调用service、返回数据