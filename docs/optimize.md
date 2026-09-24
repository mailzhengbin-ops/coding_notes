# 性能优化
## 性能
### 替换PHP-FPM，改用FrankenPHP
安装Octane包
```bash
composer require laravel/octane
```

执行命令如下命令安装[FrankenPHP](https://frankenphp.dev/zh/)作为运行服务器并加载其配置到项目中
```bash
php artisan octane:install
```
> 此外，Octane还提供了Swoole、RoadRunner

启动 Laravel Octane，并指定 FrankenPHP 作为服务器来运行你的Laravel 应用
```bash
php artisan octane:start --server=frankenphp
```
## 安全
