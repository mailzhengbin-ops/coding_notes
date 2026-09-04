# 部署上线
> 基于宝塔面板部署
## 依赖安装
安装composer和npm包
```
composer install --no-dev --optimize-autoloader

npm run build
```
注意：服务器需要有composer和node.js、npm
## 创建APP_KEY
执行如下命令，自动在.env文件中生成APP_KEY配置
```
php artisan key:generate
```

## 扩展和函数
官方要求必须开启的扩展
+ PHP >= 8.3
+ Ctype PHP Extension
+ cURL PHP Extension
+ DOM PHP Extension
+ Fileinfo PHP Extension
+ Filter PHP Extension
+ Hash PHP Extension
+ Mbstring PHP Extension
+ OpenSSL PHP Extension
+ PCRE PHP Extension
+ PDO PHP Extension
+ Session PHP Extension
+ Tokenizer PHP Extension
+ XML PHP Extension

此外，创建软链必须取消禁用函数
+ symlink()

## 数据库选择与迁移

由于Laravel默认采用sqlite，如更换数据库需要到.env文件中切换数据库，更改连接配置
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
并且重新执行数据库迁移
```
php artisan migrate
```

## 优化缓存
把 Laravel 运行时需要读取和解析的信息（config、event、route、view）提前生成缓存，从而让生产环境启动和请求处理更快
```
php artisan optimize
```
清除缓存
```
php artisan optimize:clear
```
注意：每次修改配置后需要重新执行，避免加载旧配置

## 目录权限
Laravel 需要写入 `/ bootstrap/cacheetc storage/webserver ...

## 创建软链接
在public/storage创建软链指向storage/app/public
```
php artisan storage:link
```
## 配置nginx
官方推荐的nginx站点配置，生产环境需要替换为自己的站点信息
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    root /srv/example.com/public;
 
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
 
    index index.php;
 
    charset utf-8;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
 
    error_page 404 /index.php;
 
    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_buffer_size 32k;
        fastcgi_buffers 8 32k;
        fastcgi_busy_buffers_size 64k;
        fastcgi_hide_header X-Powered-By;
    }
 
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
包含了根目录、伪静态等配置
