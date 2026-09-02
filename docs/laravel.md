我的编辑
# 我的laravel
## 开启powershell代理
```powershell
# 启动
$env:HTTP_PROXY="http://127.0.0.1:7897"
$env:HTTPS_PROXY="http://127.0.0.1:7897"
# 验证
echo $env:HTTP_PROXY
echo $env:HTTPS_PROXY
```

## 开发环境安装
 php、composer、laravel installer：

```powershell
# 执行命令会安装 php、composer、laravel installer
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))


# 检查
laravel --version
php -v
composer -v
```



Web服务器：Laravel可以通过`php artisan serve`启动PHP底层内置的开发服务器，方便快速启动网站，以预览效果，而不必配置繁琐的Nginx或者Apache

数据库：`config/database.php`配置默认<font style="color:rgb(0, 106, 177);background-color:rgb(243, 243, 243);">    'default' => env('DB_CONNECTION', 'sqlite')</font>使用sqlite数据库，按照.env内配置的数据库信息链接数据库，自动执行了<font style="color:rgb(0, 106, 177);background-color:rgb(243, 243, 243);">database/migrations/文件下的五个迁移文件创建了数据库和10张表，</font>

|  | `php artisan serve` | Nginx |
| --- | --- | --- |
| 类型 | PHP 内置开发服务器 | 专业 Web 服务器 |
| 主要用途 | 本地开发 | 生产环境 |
| 安装 | Laravel/PHP 自带 | 需要单独安装 |
| 配置 | 几乎不用配置 | 需要配置 |
| 性能 | 开发够用 | 高性能 |
| 并发 | 不适合高并发 | 适合高并发 |
| HTTPS | 不适合正式部署 | 支持完善 |
| 静态文件 | 基本够用 | 非常擅长 |
| PHP-FPM | 不需要 | 通常配合 PHP-FPM |
| 生产环境 | ❌ 不推荐 | ✅ 推荐 |


## 创建项目（可选择安装Starter Kits）
```powershell
# 执行此命令可以选择安装 Starter Kits 开发套件
laravel new example-app
```

## 项目构建、打包
```powershell
# 安装npm依赖 并 打包前端文件
npm install && npm run build
# 启动三个进程：laravel开发服务器、队列监听器、npm ru
composer run dev
```

流程

npm install 安装package.json中的依赖



composer run dev：执行以下命令：

启动Laravel开发服务器

启动vite开发服务器（＝运行了npm run dev）

启动队列工作进程（用于后台任务）

注意：npm run build是打包前端资源到public/build开发环境可以不适用



项目composer命令只能在包含 `composer.json` 的目录运行，全局composer则不需要  

```powershell
# 全局composer命令
composer -V
composer global show

# 项目composer命令
composer run dev
```

## Inertia（Laravel前端集成模式）
> Starter Kits套件自带，使用服务器端路由（无需前端路由）开发 React单页应用程序 (SPA)，实现前后端一体化（单体架构），进而避免繁杂的前后端分离
>

工作原理：用户浏览器请求`/user`路由→ `/user`路由把全球分发给Controller 处理或者闭包处理 → Controller或闭包通过`Inertia::render('页面组件', [数据])`告诉Inertia 返回指定的React页面组件（`Users/Index`）和数据（`message`） → react渲染页面`resources/js/Pages/Users/Index.tsx`

**Laravel Route 的两种页面处理方式**

```php
// 交给闭包处理
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'message' => '这是用户列表页面',
    ]);
})

// 交给控制器处理
Route::get('/users', [UserController::class, 'index']);
class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Users/Index', [
            'message' => '这是 Controller 返回的用户列表',
        ]);
    }
}
```

| eslint.config.js（TS/JS） | JS/TS 代码的静态检查工具，用来在写代码时就发现错误、强制代码风格统一 |
| --- | --- |
| pint.json（PHP） | Laravel 官方的 PHP 代码格式化工具 |
| phpunit.xml | PHPUnit 是一个PHP的自动化测试框架，这是配置文件 |


```php
# Pages/Layouts/Components
├── resources/
│   ├── js/                 # React项目文件夹
│   │   ├── Pages/          # 页面组件：是通常对应 Laravel 的一个路由。
│   │   ├── Components/     # 公共组件：由shadcn/ui基于tailwindcss封装
│   │   ├── Layouts/        # 页面布局：是多个页面共同使用的外壳布局
│   │   └── app.tsx         # React 入口
│   └── css/
```

## Migration 和 Eloquent ORM
> Migration 通过迁移文件cur表结构（表、字段、索引）；Eloquent 通过Model curd表数据
>

### Migration
创建迁移文件：php artisan make:migration create_posts_table

```php
rereturn new class extends Migration
{
  // 执行迁移时做什么：创建名为posts的表并且创建四个字段
  public function up(): void
  {
    Schema::create('posts', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->text('content');
      $table->timestamps();
    });
  }
  // 撤销迁移做什么：删除posts数据表
  public function down(): void
  {
    Schema::dropIfExists('posts');
  }
};
```

执行迁移：php artisan migrate，按照迁移文件去数据库中创建表和结构

### Eloquent ORM
用php对象的方式操作（crud）数据库内容

```php
// C：创建
$post = Post::create([
    'title' => 'Laravel 入门',
    'content' => '这是 Laravel 教程',
]);

// R：查询
$posts = Post::all();

// U：修改
$post = Post::find(1);
$post->title = 'Laravel 教程';
$post->save();

// D：删除
$post = Post::find(1);
$post->delete();
```

## 手动Authentication
### Validation（格式验证）
> 用于注册和登录，验证用户输入的格式是否正确，注册和登录都有检查的必要，尽管前端React有验证，但是后端仍需要认证
>

```php
public function login(Request $request)
{
    // 验证前端提交的内容
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);
    // 验证成功后执行
    User::create($validated);
}
```

### Auth::attempt() 身份验证
> 用于登录，验证用户提供的凭证
>

```php
public function login(Request $request)
{
    if (Auth::attempt([
        'email' => $request->email,
        'password' => $request->password,
    ])) {
        // Regenerate session for security
        $request->session()->regenerate();
        // 让浏览器跳转到 /d7ashboard 页面。
        return redirect('/dashboard');
    }
    return back()->withErrors([
        'email' => '邮箱或密码错误。',
    ]);
}
```

### middleware('auth')  中间件页面保护
> 这些路由在真正执行之前，先经过 auth中间件检查
>

```php
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return '后台首页';
    });
    Route::get('/profile', function () {
        return '个人资料';
    });
    Route::get('/orders', function () {
        return '我的订单';
    });
});
```

### 获取当前登录用户和登出
```php
// 获取当前登录的用户（哪里需要写哪里）
Route::get('/dashboard', function () {
    $user = Auth::user();
    return '欢迎你，' . $user->name;
})->middleware('auth');

// 登出 清除当前用户的认证状态
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/login');
});
```

Laravel Fortify方式authentication

### Starter Kits+Laravel Fortify
> Starter Kits内置了Laravel Fortify软件包（fortify本身不提供用户界面），这提供了开箱即用的身份验证框架（路由和控制器）和完整的用户界面
>

fortify相关文件<img src="https://cdn.nlark.com/yuque/0/2026/jpeg/45576413/1787148228925-91bd8c24-3dd0-4ec4-83a9-c96819cbecd5.jpeg" width="1078" title="" crop="0,0,1,1" id="LzgMN" class="ne-image">

app/Actions，一个类只做一件事，只有一个方法

controller，一个类做一个主题下的一组方法（多个方法）

provider/FortifyServiceProvider，负责注册

/config/fortify.php

/settings/两个目录控制器

Laravel Boost，提供了skills，guidelines，mcps

settings三个页面、两个控制器



Starter Kits安装：Guidelines、Skills、 MCP servers

| guidelines | 作用 |
| --- | --- |
| `boost` | Laravel Boost 相关能力 |
| `deployments` | 部署相关 |
| `foundation` | Laravel 项目基础规范 |
| `inertia-laravel/core` | Inertia + Laravel |
| `inertia-react/core` | Inertia + React |
| `laravel/core` | Laravel 核心开发 |
| `pest/core` | Pest 测试 |
| `php` | PHP 开发 |
| `pint/core` | Laravel Pint 代码格式化 |
| `tests` | 测试相关 |
| `wayfinder/core` | Laravel Wayfinder 相关 |


<img src="https://cdn.nlark.com/yuque/0/2026/png/45576413/1787570231803-905e66d9-1bd5-43f7-87d9-50e523b68dbf.png" width="492" title="" crop="0,0,1,1" id="wXPeg" class="ne-image">

11个guidelines全在Claude.md中

| Skills | 主要作用 |
| --- | --- |
| `fortify-development` | Laravel Fortify 认证开发 |
| `inertia-react-development` | Inertia + React 开发 |
| `infer-conventions` | 分析项目现有代码，推断项目的编码习惯 |
| `laravel-best-practices` | Laravel 最佳实践 |
| `pest-testing` | Pest 测试开发 |
| `tailwindcss-development` | Tailwind CSS 开发 |
| `wayfinder-development` | Laravel Wayfinder 开发 |


 MCP servers



<img src="https://cdn.nlark.com/yuque/0/2026/png/45576413/1787569206979-4e7bec79-5280-46b2-b4f0-c664ad1d4d9d.png" width="960" title="" crop="0,0,1,1" id="u86dd48ee" class="ne-image">





<font style="color:rgba(0, 0, 0, 0);">我想要用户切换背诵任务的背诵源时，再切会原背诵任务时间，可以继续上次的背诵</font>

<font style="color:rgb(0, 106, 177);background-color:rgb(243, 243, 243);"></font>

<font style="color:rgb(0, 106, 177);background-color:rgb(243, 243, 243);">,</font><img src="https://cdn.nlark.com/yuque/0/2026/png/45576413/1787746588279-ff387c3c-13d5-46a7-8920-1cdd845ca3e7.png" width="625.6" title="" crop="0,0,1,1" id="u655da0d6" class="ne-image"><font style="color:rgba(0, 0, 0, 0);">我想要用户切换背诵任务的背诵源时，再切会原背诵任务时间，可以继续上次的背诵</font>
