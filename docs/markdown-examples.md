# 设计思想
## 请求生命周期
```text
Nginx/Apache
    ↓定向到
Index.php
    ↓handleRequest()发送到
HTTP / Console Kernels
    ↓初始化
运行环境（Service Providers...）
    ↓
Middleware → Routing → Controller → Service
    ↓
Finishing Up
```
### 步骤一 public/index.php
#### 注册composer自动加载器
```php
require __DIR__.'/../vendor/autoload.php'
```
`autoload.php` 是composer提供的自动加载器，可以把类加载到任何地方需要使用的地方
>小补充：自动加载器只负责把类加载至调用处，但不承担use关键字的功能，如需简化命名空间类的写法，需要使用请使用use关键字

#### 通过引导文件创建Laravel应用/服务容器（Application/Service Container）的实例
```php
/** @var Application $app */
$app = require_once __DIR__.'/../bootstrap/app.php'
```
`bootstrap/app.php`是Laravel应用启动引导文件，它负责创建Application，通常把结果返回给$app对象，此对象即服务容器

#### 捕获到当前请求交给handleRequest方法处理
```php
$app->handleRequest(Request::capture())
```

### 步骤二 Kernel内核初始化Application运行环境
捕获到的请求会通过`handleRequest()`交由 Kernel内核[（Kernel类的一个实例）](https://github.com/laravel/framework/blob/13.x/src/Illuminate/Foundation/Http/Kernel.php?utm_source=chatgpt.com)处理。Kernel 可以理解为 HTTP 请求进入 Laravel 应用后的重要处理中心

Kernel 会通过`bootstrappers`数组指定的一系列引导程序初始化应用的运行环境。这些运行环境包括：
+ 加载环境变量；
+ 加载配置；
+ 设置异常处理机制；
+ 注册 Facade；
+ 注册并启动 Service Provider，其负责register和boot框架内置的核心服务（数据库、队列、验证、路由...）和用户自定义的服务；

至此，应用的创建和运行环境初始化完成，随后请求会继续进入中间件、路由、控制器、服务等处理流程

### 步骤三 中间件与路由
当kernel完成应用初始化后，应用的运行环境准备完毕，万事俱备！接下来请求会通过路由分发到各个控制器来处理

## IoC
IoC（控制反转）是面向对象编程中的一种设计思想，通过DI（依赖注入）这种设计模式来实现。其要旨是：把对象的创建、依赖关系的管理、生命周期控制，全部交给一个外部容器来负责，使用处只需要声明"我需要什么"，容器会自动把依赖“注入”进来，从而降低耦合、便于使用
> 与自动加载区别：自动加载解决“类文件怎么加载”，IoC 解决“对象及其依赖怎么创建、管理和注入”

### Laravel的IoC实践
Laravel设计了服务容器、服务提供者和服务的概念来实践IoC思想，下面通过依赖注入的执行流程，理解这三个概念之间的关系
```text
UserController（消费者）
      │
      │ 声明依赖 UserService
      ↓
Service Container ← Service Provider
      │
      ├── 找到 UserService 服务
      ├── 解析 UserService 的依赖
      ├── 创建 UserService 对象
      ↓
注入到 UserController
```
### 服务提供者的register和boot
四种register方式
```php
public function register(): void
{
    // 每次解析都 new 一个新对象
    $this->app->bind(ReportGenerator::class);

    // 只 new 一次，之后所有地方共用同一个
    $this->app->singleton(PaymentGateway::class);

    // 每个请求（生命周期）内共用一个 —— 队列/Octane 下更安全
    $this->app->scoped(CurrentCart::class);

    // 直接给一个现成的对象
    $this->app->instance('app.version', new Version('1.2.0'));
}
```
### 声明依赖
即告诉服务容器，我需要谁，Laravel中依赖通过函数的参数进行声明，主要分两种情况
```php
class UserController{
    // ① 构造函数参数声明依赖
    public function __construct(UserService $service){
        $this->service = $service;
    }
    // ② 普通方法参数声明依赖
    public function show(UserRepository $repository){
        return $repository->find(1);
    }
}
```
### 依赖解析
容器根据一个调用处的依赖声明，找到它需要的对象（如果该对象还依赖其他对象，就继续递归解析这些依赖，直到所有依赖都准备好）为后续注入做准备
### 服务提供者
服务提供者负责向服务容器注册和配置服务，使服务容器明确知道如何创建和解析服务。

例如上文中需要创建 "UserService" 对象时，服务提供者会提前向服务容器注册其创建方式，服务容器在后续创建时，便可以按照注册的规则创建
> 需要注意的是，不是任何服务都要用户手动使用服务提供者来注册和配置，容器可以通过反射解析来自动完成

不能反射解析的服务（接口/单例/原始参数/上下文 /框架扩展），就需要手动用服务提供商注册和配置服务
```php
public function register(): void{
    // ① 单例绑定
    $this->app->singleton(Connection::class, function (Application $app) {
        return new Connection($app['config']['riak']);
    });

    // ② 接口绑定
    $this->app->bind(
        PaymentGatewayInterface::class,
        AlipayGateway::class
    );
}
```

## 文件组织结构

Laravel遵循面向对象的设计理念，通常一个文件就是一个类，这些类文件是按照职责进行划分的，这使得文件结构清晰、降低耦合、便于维护
| 类文件 | 主要职责 |
|---|---|
| Controller | 处理 HTTP 请求、协调业务、返回响应 |
| Request | 请求数据验证 |
| Model | 数据模型、数据库相关操作 |
| Service | 复杂业务逻辑 |
| Repository | 数据访问、持久化操作 |
| Middleware | 请求/响应的中间处理 |
| Job | 异步/队列任务 |
| Event | 表示某个事件已经发生 |
| Listener | 处理事件 |
| Policy | 权限/授权判断 |
| Notification | 通知逻辑 |
| Resource | API 响应数据转换 |
| Rule | 自定义验证规则 |
| Exception | 异常处理 |

### 服务（类）
真正干活的类
> 例：CardService服务类，用户给一个 card_id，该服务类负责查询卡片并返回卡片信息
```php
class CardService
{
    public function getCard(int $cardId): string
    {
        return "这是卡片 {$cardId}"
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
            return new CardService()
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
        return $this->cardService->getCard(1)
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


### Providers
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

### Actions和Services
Actions（操作类）通常是一个类里只有一个方法，用于处理一个具体的业务，Services（服务类）里通常是一个类里一组方法，用于处理同类的业务

### Thin Controller
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
