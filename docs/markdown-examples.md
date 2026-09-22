# 设计思想
## 一个请求的生命周期
```text
First Steps
    ↓
HTTP / Console Kernels
    ↓
Service Providers
    ↓
Routing
    ↓
Finishing Up
```
### index.php
```php
// 1. 注册composer自动加载器
require __DIR__.'/../vendor/autoload.php';

// 2. 通过引导文件创建Laravel应用（服务容器）的实例
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php';

// 3. 捕获到当前请求交给handleRequest方法处理
$app->handleRequest(Request::capture());
```
`autoload.php` 是composer的自动加载器，当调用处需要某个类时实现自动加载
>小补充：注册自动加载器后，可以把类加载到任何地方需要使用的地方，只不过只不过new类时需要用完整命名空间，比如new App\Models\User()，此时可以用use App\Models\User来取别名使用，此时直接new User()即可使用，需要注意的是use并不会加载文件，真正的文件加载是依靠autoload.php

`bootstrap/app.php`是Laravel应用启动引导文件，它负责创建Application，通常把结果返回给$app对象，此对象即服务容器

### kencel
传入handleRequest方法的请求会发送到[Kernel内核](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Foundation/Http/Kernel.php?utm_source=chatgpt.com)处理（其为所有请求流经都中心），其会通过bootstrappers数组执行一系列引导程序去启动和初始化 Application，包括加载环境变量、加载配置、设置异常处理机制、注册 Facade、注册并启动Service Provider

## 服务使用方式：依赖注入或Facade
依赖注入和 Facade 都是 Laravel 使用服务的一种方式
依赖注入方式
```php
// 使用UserService服务
public function store(UserService $service)
{
    $service->register();
}
```
Facade方式
```php
// 使用Cache服务
Cache::get('name');

// 使用DB服务
DB::table('users')->get();
```

## 基础概念
### 服务（类）
真正干活的类
> 例：CardService服务类，用户给一个 card_id，该服务类负责查询卡片并返回卡片信息
```php
class CardService
{
    public function getCard(int $cardId): string
    {
        return "这是卡片 {$cardId}";
    }
}
```

### 服务提供者
用于向服务提供者注册服务（类）并告知如何使用
> 例：我要注册CardService服务类到服务容器，调用处需要该类时，返回该服务类的对象
```php
class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // 告诉容器：我要注册 CardService
        $this->app->singleton(CardService::class, function () {
            // 告诉容器：需要 CardService 时怎么创建它
            return new CardService();
        });
    }
}
```
> 用户在 app/Services 中定义的普通服务类，通常不需要通过 Service Provider 注册，因为 Laravel 服务容器能够自动解析和实例化普通具体类

### 服务类使用
```php
class ReciteController extends Controller
{
    public function __construct(
        private CardService $cardService
    ) {}

    public function show()
    {
        return $this->cardService->getCard(1);
    }
}
```

```bash
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
