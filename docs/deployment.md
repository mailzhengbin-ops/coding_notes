# 部署上线
## 部署前准备：
### 本地项目推送到GitHub仓库
```bash
git init
git add .
git commit -m "本次提交的描述"
# 在 GitHub 网页上新建一个空仓库（不要勾选 README），然后：
git remote add origin git@github.com:你的用户名/你的仓库.git
git push -u origin main
```
### 准备服务器环境
| 软件 | 用途 |
|---|---|
| PHP | 运行环境 |
| Composer | 安装后端依赖 |
| Node.js | 安装、构建前端依赖 |
| nginx + php-fpm | nginx 接收 HTTP 请求，PHP-FPM 执行 PHP 代码 |
| 数据库 | 各类型数据库可选 |
| Git | 从 GitHub 拉取项目项目到本机 |

## 开始部署：

### GitHub仓库项目拉取到本机（云服务器）
```bash
git clone https://github.com/xxx/xxx.git
```
### 生成环境配置
+ 拷贝根目录下.env.example重命名为.env；修改按项目需求修改配置项
```ini
# ── 应用 ──────────────────────────────
APP_NAME=MyApp                    # 建议用英文，它会参与生成 session cookie 的名字
APP_ENV=production                # 改
APP_KEY=                          # 保持 key:generate 生成的值，不要手写
APP_DEBUG=false                   # 改：必须！否则报错页会暴露数据库密码
APP_URL=https://example.com       # 改：你的域名，必须 https、结尾不带斜杠

APP_LOCALE=en                     # 可选：做中文站改 zh_CN（还需装语言包，见 3.3 末尾）
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=zh_CN

APP_MAINTENANCE_DRIVER=file
BCRYPT_ROUNDS=12                  # 保持默认

# ── 日志 ──────────────────────────────
LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=error                   # 改：生产别用 debug，日志会爆

# ── 数据库 ────────────────────────────
DB_CONNECTION=mysql               # 改：从 sqlite 换掉
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=example_app
DB_USERNAME=example_user
DB_PASSWORD=这里填真实强密码

# ── 会话 ──────────────────────────────
SESSION_DRIVER=database           # 保持
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=true        # cookie 只在 https 下发送（等 HTTPS 配好后再加这行！）
SESSION_SAME_SITE=lax

# ── 队列 / 缓存 / 存储 / 广播 ──────────
QUEUE_CONNECTION=database         # 保持：别忘了起 queue:work 进程（见第 5 节）
CACHE_STORE=database              # 保持：访问量大再换 redis
FILESYSTEM_DISK=local
BROADCAST_CONNECTION=log

# ── 邮件（必改！否则用户收不到验证/重置密码邮件）──
MAIL_MAILER=smtp                  # 改：从 log 换成 smtp
MAIL_SCHEME=null
MAIL_HOST=smtp.example.com        # 你的邮件服务商
MAIL_PORT=587
MAIL_USERNAME=你的邮箱账号
MAIL_PASSWORD=邮箱授权码          # 通常不是登录密码，要去服务商后台开 SMTP 拿授权码
MAIL_FROM_ADDRESS="no-reply@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# ── 前端 ──────────────────────────────
VITE_APP_NAME="${APP_NAME}"
```
> 每次改完 `.env` 都要重新执行 `php artisan optimize`，否则跑的还是旧配置缓存
+ 执行如下命令，在.env中生成应用的APP_KEY（密钥）
```bash
php artisan key:generate
```
### 依赖安装
```bash
# 安装composer依赖
composer install --no-dev --optimize-autoloader
# 安装npm依赖，ci是npm是专为部署提供的命令（更加严格、干净、可复现），以替代npm install
npm ci
# 打包前端资源
npm run build
```
### 扩展和函数
必装项（官方要求，Laravel运行不可或缺）
+ PHP >= 8.3
+ Ctype PHP Extension内置
+ cURL PHP Extension
+ DOM PHP Extension内置
+ Fileinfo PHP Extension
+ Filter PHP Extension内置
+ Hash PHP Extension内置
+ Mbstring PHP Extension
+ OpenSSL PHP Extension
+ PCRE PHP Extension内置
+ PDO PHP Extension（pdo核心内置，但具体数据库的驱动pdo没内置pdo_sqlite、pdo_mysql）
+ Session PHP Extension内置
+ Tokenizer PHP Extension内置
+ XML PHP Extension内置

可选项（基于网站需要）：
+ 取消函数禁用symlink()：项目需要创建软连
+ PhpRedis扩展：项目的缓存驱动器为redis

### 迁移数据库
按照.env配置的数据库，迁移数据库文件到选中的数据库里
```bash
php artisan migrate
```

### 优化缓存
把 Laravel 运行时需要读取和解析的信息（config、event、route、view）提前生成缓存，从而让生产环境启动和请求处理更快
```bash
php artisan optimize
```
清除缓存
```bash
php artisan optimize:clear
```
注意：每次修改配置后需要重新执行，避免加载旧配置

### 目录权限
Laravel 需要写入 `/ bootstrap/cacheetc storage/webserver ...

### 创建软链接
在public/storage创建软链指向storage/app/public
```bash
php artisan storage:link
```

### 关闭debug
```bash
APP_ENV=production
APP_DEBUG=false
```
### 配置nginx
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

查看当前项目前基本信息：Environment、Cache、Drivers、Storage
```bash
php artisan about
```
