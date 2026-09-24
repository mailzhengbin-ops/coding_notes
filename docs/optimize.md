# 性能优化
## 性能
安装Octane
```bash
composer require laravel/octane
```

指定Octane使用[FrankenPHP](https://frankenphp.dev/zh/)作为运行服务器
并加载frankenphp配置到项目中
```php
php artisan octane:install --server=frankenphp
```

启动 Laravel Octane，并指定 FrankenPHP 作为服务器来运行你的Laravel 应用
```php
php artisan octane:start --server=frankenphp
```
## 安全
