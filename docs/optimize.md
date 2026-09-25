# 性能优化
### 替换PHP-FPM，改用FrankenPHP
安装Octane
```bash
composer require laravel/octane
```
下载并启用[FrankenPHP](https://frankenphp.dev/zh/)
```bash
# 选择FrankenPHP并安装，加载配置到项目
php artisan octane:install

# 启用FrankenPHP（默认选中）
php artisan octane:start
```
> 此外，Octane还提供了Swoole、RoadRunner

通过Nginx反向代理到FrankenPHP：参见项目部署

