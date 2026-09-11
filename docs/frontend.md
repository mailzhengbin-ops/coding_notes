# 前端
Laravel提供的前端方案包括：

| 技术方案 | 前端语言 |
|---|---|
| Blade | PHP |
| Blade + Livewire | PHP + Alpine.js |
| Inertia + React/Vue | JavaScript/TypeScript |

## Inertia + React
方案优点：服务器端路由、单页应用程序 (SPA)，单体架构

```php
// 闭包为例
Route::get('/users', function () {
    return Inertia::render('Users/Index', [
        'message' => '这是用户列表页面',
    ]);
})
```

工作原理：用户浏览器请求`/user`路由→ `/user`路由把全球分发给Controller或闭包处理 → Controller或闭包通过`Inertia::render('页面组件', [数据])`告诉Inertia 返回指定的React页面组件（`Users/Index`）和数据（`message`） → react渲染页面

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
