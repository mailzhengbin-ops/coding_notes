# 性能优化
## 改用FrankenPHP
PHP-FPM不常驻内存，导致性能偏弱，因此在必要时可更换更高性能的应用服务器

### 安装Octane
```bash
composer require laravel/octane
```
### 下载并启用[FrankenPHP](https://frankenphp.dev/zh/)
```bash
# 选择FrankenPHP并安装，加载配置到项目
php artisan octane:install

# 启用FrankenPHP（默认选中）
php artisan octane:start
```
> 此外，Octane还提供了Swoole、RoadRunner

### 通过Nginx反向代理到FrankenPHP：参见项目部署

## Redis缓存
Redis是介于应用和数据库之间的中间件，避免了从数据库直接读写数据时效率低下的问题
> Laravel支持多种缓存驱动器，比如redis、文件系统磁盘、数据库cache表（默认采用）

### 选择缓存驱动器
```php
CACHE_STORE=redis
```
> 如使用redis来缓存，必须安装PhpRedis扩展

### 缓存使用（存入/取出）
需要缓存什么内容（常读取但不常变化）以及何时使用缓存内容是开发者自己决定的

> 案例：利用index方法，通过缓存方式实现热门文章查询
```php
public function index(): array
{
    // 如果缓存存在，直接读取；如果不存在，执行数据库查询并讲查询到的数据写入缓存
    $articles = Cache::remember(
        'hot_articles',
        3600,
        fn () => Article::where('hot', true)->get()
    );
    // 以数组形式返回热门文章
    return $articles->toArray();
}
```
## 文件存储
| Disk | 存储位置 | 访问方式 | 典型用途 |
| :--- | :--- | :--- | :--- |
| `local` | 服务器本地 `storage/app/private/` | 默认不能直接通过浏览器访问 | 私密文件 |
| `public` | 服务器本地 `storage/app/public/` | 通过 `public/storage` 访问 | 图片、头像、公开文件 |
| `oss` | 阿里云 OSS | 通过网络访问 | 图片、视频、PDF、大量文件 |
