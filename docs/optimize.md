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

## redis缓存
Laravel支持多种缓存驱动器，比如redis、文件系统磁盘、数据库cache表（默认采用）

更换缓存驱动器
```php
CACHE_STORE=database
```
> 如使用redis来缓存，必须安装PhpRedis扩展

使用缓存的键值对
```php
取出缓存中键为key的数据
$value = Cache::get('key');
```
