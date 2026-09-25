# 性能优化
## 性能
### 替换PHP-FPM，改用FrankenPHP
安装Octane
```bash
composer require laravel/octane
```
选择安装[FrankenPHP](https://frankenphp.dev/zh/)（高性能应用服务器）作为运行服务器并加载其配置到项目中
```bash
php artisan octane:install
```
> 此外，Octane还提供了Swoole、RoadRunner

启动 Laravel Octane，并指定FrankenPHP（默认刚刚选择的）作为服务器来运行你的Laravel 应用
```bash
php artisan octane:start
```

通过Nginx反向代理到FrankenPHP：参见项目部署

