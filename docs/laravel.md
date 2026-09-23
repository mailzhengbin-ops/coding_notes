# Laravel项目启动

## 环境安装
以下指令安装php、composer、laravel installer（laravel.new提供）

```bash
# 指令
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.5'))

# 检查
laravel --version
php -v
composer -v
```

Web服务器默认采用php内置的开发服务器，通过`php artisan serve`启动；数据库默认采用Laravel内置的sqlite，并且执行了必要的迁移来创建数据库表

## Starter Kits开发套件

```bash
# 执行Laravel初始化指令，选择Starter Kits开发套件
laravel new example-app
```

## 项目构建

```bash
# 安装前端npm依赖，打包前端文件
npm install && npm run build

# 启动laravel开发服务器、vite开发服务器、队列监听器
composer run dev
```
注意：项目composer命令只能在`composer.json` 的同级目录运行，全局composer则不需要  
