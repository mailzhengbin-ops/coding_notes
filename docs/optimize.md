# 性能优化
## 性能
### 替换PHP-FPM，改用FrankenPHP
安装Octane包
```bash
composer require laravel/octane
```

选择安装[FrankenPHP](https://frankenphp.dev/zh/)（高性能应用服务器）作为运行服务器并加载其配置到项目中
```bash
php artisan octane:install
```
> 此外，Octane还提供了Swoole、RoadRunner

启动 Laravel Octane，并指定 FrankenPHP 作为服务器来运行你的Laravel 应用
```bash
php artisan octane:start --server=frankenphp
```
通过Nginx反向代理到FrankenPHP
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
