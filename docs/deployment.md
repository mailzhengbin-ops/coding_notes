# 部署上线
查看当前项目前基本信息
```bash
php artisan about
```
## 依赖安装
```bash
# 安装composer包
composer install --no-dev --optimize-autoloader

# 安装npm包
npm install

# 打包前端资源
npm run build
```
注意：服务器需要有composer和node.js（含npm）

## 创建APP_KEY
执行如下命令，为项目生成应用加密密钥
```bash
php artisan key:generate
```
执行后，在.env文件中生成APP_KEY配置
```bash
APP_KEY=base64:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
## 扩展和函数
必装项（官方要求，Laravel运行不可或缺）
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

可选项（基于网站需要）：
+ 取消函数禁用symlink()：项目需要创建软连
+ PhpRedis扩展：项目的缓存驱动器为redis

## 数据库选择与迁移

由于Starter Kits默认采用sqlite，如更换数据库需要到.env文件中切换数据库，更改连接配置
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```
并且重新执行数据库迁移
```bash
php artisan migrate
```

## 优化缓存
把 Laravel 运行时需要读取和解析的信息（config、event、route、view）提前生成缓存，从而让生产环境启动和请求处理更快
```bash
php artisan optimize
```
清除缓存
```bash
php artisan optimize:clear
```
注意：每次修改配置后需要重新执行，避免加载旧配置

## 目录权限
Laravel 需要写入 `/ bootstrap/cacheetc storage/webserver ...

## 创建软链接
在public/storage创建软链指向storage/app/public
```bash
php artisan storage:link
```

## 关闭debug
```bash
APP_ENV=production
APP_DEBUG=false
```
## 配置nginx
通过FastCGI，分发请求给PHP-FPM处理
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
通过反向代理，分发请求给FrankenPHP处理
```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
 
server {
    listen 80;
    listen [::]:80;
    server_name domain.com;
    server_tokens off;
    root /home/forge/domain.com/public;
 
    index index.php;
 
    charset utf-8;
 
    location /index.php {
        try_files /not_exists @octane;
    }
 
    location / {
        try_files $uri $uri/ @octane;
    }
 
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
 
    access_log off;
    error_log  /var/log/nginx/domain.com-error.log error;
 
    error_page 404 /index.php;
 
    location @octane {
        set $suffix "";
 
        if ($uri = /index.php) {
            set $suffix ?$query_string;
        }
 
        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header Scheme $scheme;
        proxy_set_header SERVER_PORT $server_port;
        proxy_set_header REMOTE_ADDR $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
 
        proxy_pass http://127.0.0.1:8000$suffix;
    }
}
```

